package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.response.*;
import com.theduckhospital.api.dto.response.nurse.NurseBookingItemResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.repository.TimeSlotRepository;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.text.ParseException;
import java.util.*;

@Service
public class BookingServicesImpl implements IBookingServices {
    private final BookingRepository bookingRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final TransactionRepository transactionRepository;
    private final IPatientProfileServices patientProfileServices;
    private final PatientProfileRepository patientProfileRepository;
    private final IPatientServices patientServices;
    private final IScheduleDoctorServices doctorScheduleServices;
    private final IPaymentServices paymentServices;
    private final IAccountServices accountServices;
    private final ITimeSlotServices timeSlotServices;
    private final IPatientProfileServices profileServices;

    public BookingServicesImpl(
            BookingRepository bookingRepository,
            TimeSlotRepository timeSlotRepository,
            TransactionRepository transactionRepository,
            IPatientProfileServices patientProfileServices,
            PatientProfileRepository patientProfileRepository,
            IPatientServices patientServices,
            IScheduleDoctorServices doctorScheduleServices,
            IPaymentServices paymentServices,
            IAccountServices accountServices,
            ITimeSlotServices timeSlotServices,
            IPatientProfileServices profileServices
    ) {
        this.bookingRepository = bookingRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.transactionRepository = transactionRepository;
        this.patientProfileServices = patientProfileServices;
        this.patientProfileRepository = patientProfileRepository;
        this.patientServices = patientServices;
        this.doctorScheduleServices = doctorScheduleServices;
        this.paymentServices = paymentServices;
        this.accountServices = accountServices;
        this.timeSlotServices = timeSlotServices;
        this.profileServices = profileServices;
    }

    @Override
    @Transactional
    public PaymentResponse createBookingAndPayment(String token, BookingRequest request, String origin) {
        try {
            if (request.getTimeSlotIds().size() > 3)
                throw new BadRequestException("Maximum 3 doctor schedules per booking");

            PatientProfile patientProfile = patientProfileServices.getPatientProfileById(
                    token,
                    request.getPatientProfileId()
            );

            double totalAmount = 0;
            List<TimeSlot> timeSlots = new ArrayList<>();
            List<DoctorSchedule> tempDoctorSchedules = new ArrayList<>();
            for (String timeSlotId : request.getTimeSlotIds()) {
                TimeSlot timeSlot = timeSlotServices.findTimeSlotByTimeSlotId(timeSlotId);

                DoctorSchedule doctorSchedule = doctorScheduleServices
                        .getDoctorScheduleByTimeSlotId(timeSlotId);

                // Check duplicate doctor schedule
                if (tempDoctorSchedules.contains(doctorSchedule))
                    throw new BadRequestException("Duplicate doctor schedule");

                // Check duplicate department
                for (DoctorSchedule schedule : tempDoctorSchedules) {
                    if (schedule.getDoctor().getDepartment().getDepartmentId() ==
                            doctorSchedule.getDoctor().getDepartment().getDepartmentId()) {
                        throw new BadRequestException("Duplicate department");
                    }
                }

                // Check doctor schedule is full
                if (timeSlot.getCurrentSlot() >= timeSlot.getMaxSlot())
                    throw new BadRequestException("Doctor schedule is full");

                // Check already booked
                Optional<Booking> bookingOptional = bookingRepository
                        .findByPatientProfileAndTimeSlot_DoctorScheduleAndDeletedIsFalse(
                                patientProfile,
                                doctorSchedule
                        );
                if (bookingOptional.isPresent())
                    throw new BadRequestException("Doctor schedule already booked");

                totalAmount += doctorSchedule.getMedicalService().getPrice();
                tempDoctorSchedules.add(doctorSchedule);
                timeSlots.add(timeSlot);
            }

            if (timeSlots.isEmpty())
                throw new BadRequestException("No doctor schedule available");

            Transaction transaction = new Transaction();
            transaction.setAmount(totalAmount);
            transaction.setFee(request.getPaymentMethod() == PaymentMethod.WALLET
                    ? 0D
                    : request.getPaymentMethod() == PaymentMethod.VNPAY
                    ? Fee.VNPAY_BOOKING_FEE
                    : Fee.MOMO_BOOKING_FEE
            );
            transaction.setOrigin(origin);
            transaction.setPaymentType(PaymentType.BOOKING);
            transaction.setAccount(patientProfile.getAccount());
            transactionRepository.save(transaction);

            List<Booking> bookings = new ArrayList<>();
            for (TimeSlot timeSlot : timeSlots) {
                Booking booking = new Booking();
                booking.setServicePrice(timeSlot.getDoctorSchedule().getMedicalService().getPrice());
                booking.setPatientProfile(patientProfile);
                booking.setTimeSlot(timeSlot);
                booking.setTransaction(transaction);
                booking.setQueueNumber(-1);
                bookingRepository.save(booking);

                booking.setDeleted(true);
                bookingRepository.save(booking);

                bookings.add(booking);
            }

            transaction.setBookings(bookings);
            transaction.setPaymentMethod(request.getPaymentMethod() == null ? "CASH" : request.getPaymentMethod().name());
            return paymentServices.createBookingPaymentUrl(transaction, request);
        } catch (BadRequestException e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new BadRequestException(e.getMessage(), e.getErrorCode());
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw new BadRequestException(e.getMessage(), 400);
        }
    }
    @Override
    public PaginationResponse getBookingsByProfile(
            String token,
            UUID patientProfileId,
            int page,
            int limit
    ) {
        PatientProfile patientProfile = profileServices
                .getPatientProfileById(
                        token,
                        patientProfileId
                );

        Pageable pageable = PageRequest.of(page, limit);
        Page<Booking> bookingPage = bookingRepository
                .findByPatientProfileAndDeletedIsFalseOrderByTimeSlot_DateDesc(
                        patientProfile,
                        pageable
                );
        List<Booking> bookings = bookingPage.getContent();
        AccountBookingResponse response = new AccountBookingResponse();
        response.setFullName(patientProfile.getFullName());
        response.setBookings(bookings.stream().map(BookingItemResponse::new).toList());
        response.setPatientProfileId(patientProfile.getPatientProfileId());

        return PaginationResponse
                .builder()
                .limit(limit)
                .page(page)
                .totalItems((int) bookingPage.getTotalElements())
                .totalPages(bookingPage.getTotalPages())
                .items(List.of(response))
                .build();
    }

    @Override
    public List<AccountBookingResponse> getBookings(String token) {
        List<AccountBookingResponse> responses = new ArrayList<>();

        Account account = accountServices.findAccountByToken(token);
        List<PatientProfile> patientProfiles = account.getPatientProfile();
        for (PatientProfile profile : patientProfiles) {
            Pageable pageable = PageRequest.of(0, 15);
            List<Booking> bookings = bookingRepository
                    .findByPatientProfileAndDeletedIsFalseOrderByTimeSlot_DateDesc(
                            profile,
                            pageable
                    ).getContent();

            if (bookings.isEmpty())
                continue;

            AccountBookingResponse response = new AccountBookingResponse();
            response.setFullName(profile.getFullName());
            response.setBookings(bookings.stream().map(BookingItemResponse::new).toList());
            response.setPatientProfileId(profile.getPatientProfileId());
            responses.add(response);
        }

        return responses;
    }

    @Override
    public MedicalRecordItemResponse getBooking(String token, UUID bookingId) {
        Account account = accountServices.findAccountByToken(token);
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking == null || booking.isDeleted() || booking.getQueueNumber() == -1)
            throw new BadRequestException("Booking not found");

        if (!booking.getPatientProfile().getAccount().getUserId().equals(account.getUserId()))
            throw new BadRequestException("Booking not found");

        return new MedicalRecordItemResponse(booking);
    }

    @Override
    public NurseBookingItemResponse checkBooking(String bookingCode, int roomId) throws ParseException {
        Booking booking = bookingIsValid(bookingCode, roomId);

        return new NurseBookingItemResponse(booking);
    }

    @Override
    public Booking bookingIsValid(String bookingCode, int roomId) throws ParseException {
        Booking booking = bookingRepository
                .findByBookingCodeAndDeletedIsFalse(
                        bookingCode
                ).orElse(null);

        if (booking == null)
            throw new NotFoundException("Booking not found");

        if (booking.isCancelled())
            throw new StatusCodeException("Booking is cancelled", 400);


        // Check date booking with current date
        Date date = booking.getTimeSlot().getDate();
        Date currentDate = DateCommon.getToday();
//        if (DateCommon.compareDate(date, currentDate) != 0 )
//            throw new StatusCodeException("Invalid examination date", 409);


        if (booking.getTimeSlot().getDoctorSchedule().getRoom().getRoomId() != roomId)
            throw new StatusCodeException("Room not valid", 410);

        return booking;
    }

    @Override
    public Map<String, String> checkPatientCode(String identityNumber) {
        Patient patient = patientServices.findPatientByIdentityNumber(identityNumber);
        if (patient == null)
            throw new NotFoundException("Patient not found");

        Map<String, String> data = new HashMap<>();
        data.put("patientCode", patient.getPatientCode());
        data.put("fullName", patient.getFullName());

        return data;
    }

    @Override
    public Booking counterNurseCreateBooking(NurseCreateBookingRequest request) throws ParseException {
        PatientProfile patientProfile = patientProfileRepository.findById(
                request.getPatientProfileId()
        ).orElseThrow(() -> new NotFoundException("Patient profile not found"));

        if (patientProfile.isDeleted() || patientProfile.getPatient() == null)
            throw new BadRequestException("Patient profile not valid");

        DoctorSchedule doctorSchedule = doctorScheduleServices
                .getDoctorScheduleByIdForBooking(request.getDoctorScheduleId());
        List<TimeSlot> timeSlots = doctorSchedule.getTimeSlots()
                .stream()
                .sorted(Comparator.comparingInt(TimeSlot::getTimeId))
                .toList();
        TimeSlot selectedTimeSlot = null;
        for (TimeSlot timeSlot : timeSlots) {
            if (timeSlot.getCurrentSlot() < timeSlot.getMaxSlot()
                    || timeSlot.getTimeId() == 3
                    || timeSlot.getTimeId() == 7
            ) {
                selectedTimeSlot = timeSlot;
                break;
            }
        }

        if (selectedTimeSlot == null)
            throw new BadRequestException("Doctor schedule is full");

        Transaction transaction = new Transaction();
        transaction.setAmount(selectedTimeSlot.getDoctorSchedule().getMedicalService().getPrice());
        transaction.setPaymentType(PaymentType.BOOKING);
        transaction.setAccount(patientProfile.getAccount());
        transaction.setBankCode(null);
        transaction.setPaymentMethod("CASH");
        transactionRepository.save(transaction);
        transaction.setStatus(TransactionStatus.SUCCESS);
        transactionRepository.save(transaction);


        Booking booking = new Booking();
        booking.setPatientProfile(patientProfile);
        booking.setServicePrice(selectedTimeSlot.getDoctorSchedule().getMedicalService().getPrice());
        booking.setTimeSlot(selectedTimeSlot);
        booking.setTransaction(transaction);
        booking.setQueueNumber(selectedTimeSlot.getStartNumber() + selectedTimeSlot.getCurrentSlot());
        booking.setDeleted(false);
        booking.setCancelled(false);
        bookingRepository.save(booking);

        selectedTimeSlot.setCurrentSlot(selectedTimeSlot.getCurrentSlot() + 1);
        timeSlotRepository.save(selectedTimeSlot);

        return booking;
    }
}
