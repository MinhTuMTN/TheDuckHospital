package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.response.AccountBookingResponse;
import com.theduckhospital.api.dto.response.BookingItemResponse;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;
import com.theduckhospital.api.dto.response.PaymentResponse;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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
    private final PasswordEncoder passwordEncoder;

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
            PasswordEncoder passwordEncoder) {
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
        this.passwordEncoder = passwordEncoder;
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
    public List<AccountBookingResponse> getBookings(String token) {
        List<AccountBookingResponse> responses = new ArrayList<>();
        Account account = accountServices.findAccountByToken(token);

        List<PatientProfile> patientProfile = account.getPatientProfile();

        for (PatientProfile profile : patientProfile) {
            List<Booking> bookings = profile.getBookings().stream()
                    .filter(booking -> !booking.isDeleted())
                    .toList().stream()
                    .sorted((b1, b2) -> {
                        if (b1.getTimeSlot().getDate().after(b2.getTimeSlot().getDate()))
                            return 1;
                        else if (b1.getTimeSlot().getDate().before(b2.getTimeSlot().getDate()))
                            return -1;
                        else
                            return 0;
                    })
                    .toList()
                    .stream().limit(30).toList();

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
    public Booking nurseCreateMedicalExamRecord(NurseCreateBookingRequest request) throws ParseException {
        PatientProfile patientProfile = patientProfileRepository.findById(
                request.getPatientProfileId()
        ).orElseThrow(() -> new NotFoundException("Patient profile not found"));

        if (patientProfile.isDeleted() || patientProfile.getPatient() == null)
            throw new BadRequestException("Patient profile not valid");

        TimeSlot timeSlot = timeSlotServices
                .findTimeSlotByTimeSlotId(request.getTimeSlotId());

        Transaction transaction = new Transaction();
        transaction.setAmount(timeSlot.getDoctorSchedule().getMedicalService().getPrice());
        transaction.setStatus(TransactionStatus.SUCCESS);
        transaction.setPaymentType(PaymentType.BOOKING);
        transaction.setAccount(patientProfile.getAccount());
        transaction.setBankCode(null);
        transaction.setPaymentMethod("CASH");
        transactionRepository.save(transaction);

        transaction.setStatus(TransactionStatus.SUCCESS);
        transactionRepository.save(transaction);


        Booking booking = new Booking();
        booking.setPatientProfile(patientProfile);
        booking.setTimeSlot(timeSlot);
        booking.setTransaction(transaction);
        booking.setQueueNumber(timeSlot.getStartNumber() + timeSlot.getCurrentSlot());
        booking.setDeleted(false);
        booking.setCancelled(false);
        bookingRepository.save(booking);

        timeSlot.setCurrentSlot(timeSlot.getCurrentSlot() + 1);
        timeSlotRepository.save(timeSlot);

        return booking;
    }
}
