package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.constant.VNPayConfig;
import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.response.AccountBookingResponse;
import com.theduckhospital.api.dto.response.BookingItemResponse;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;
import com.theduckhospital.api.dto.response.nurse.NurseBookingItemResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.*;
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
    private final TransactionRepository transactionRepository;
    private final IPatientProfileServices patientProfileServices;
    private final PatientProfileRepository patientProfileRepository;
    private final IPatientServices patientServices;
    private final IScheduleDoctorServices doctorScheduleServices;
    private final IVNPayServices vnPayServices;
    private final IAccountServices accountServices;

    public BookingServicesImpl(
            BookingRepository bookingRepository,
            TransactionRepository transactionRepository,
            IPatientProfileServices patientProfileServices,
            PatientProfileRepository patientProfileRepository,
            IPatientServices patientServices,
            IScheduleDoctorServices doctorScheduleServices,
            IVNPayServices vnPayServices,
            IAccountServices accountServices
    ) {
        this.bookingRepository = bookingRepository;
        this.transactionRepository = transactionRepository;
        this.patientProfileServices = patientProfileServices;
        this.patientProfileRepository = patientProfileRepository;
        this.patientServices = patientServices;
        this.doctorScheduleServices = doctorScheduleServices;
        this.vnPayServices = vnPayServices;
        this.accountServices = accountServices;
    }

    @Override
    @Transactional
    public String createBookingAndPayment(String token, BookingRequest request, String origin) {
        try {
            if (request.getDoctorScheduleIds().size() > 3)
                throw new BadRequestException("Maximum 3 doctor schedules per booking");

            PatientProfile patientProfile = patientProfileServices.getPatientProfileById(
                    token,
                    request.getPatientProfileId()
            );

            double totalAmount = 0;
            List<DoctorSchedule> doctorSchedules = new ArrayList<>();
            for (UUID doctorScheduleId : request.getDoctorScheduleIds()) {
                DoctorSchedule doctorSchedule = doctorScheduleServices
                        .getDoctorScheduleByIdForBooking(doctorScheduleId);

                // Check duplicate doctor schedule
                if (doctorSchedules.contains(doctorSchedule))
                    throw new BadRequestException("Duplicate doctor schedule");

                // Check duplicate department
                for (DoctorSchedule schedule : doctorSchedules) {
                    if (schedule.getDoctor().getDepartment().getDepartmentId() ==
                            doctorSchedule.getDoctor().getDepartment().getDepartmentId()) {
                        throw new BadRequestException("Duplicate department");
                    }
                }

                // Check doctor schedule is full
                long maxQueueNumber = bookingRepository
                        .countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
                                doctorSchedule,
                                -1
                        );
                if (maxQueueNumber >= doctorSchedule.getSlot())
                    continue;

                // Check already booked
                Optional<Booking> bookingOptional = bookingRepository
                        .findByPatientProfileAndDoctorScheduleAndDeletedIsFalse(
                                patientProfile,
                                doctorSchedule
                        );
                if (bookingOptional.isPresent())
                    continue;

                totalAmount += doctorSchedule.getMedicalService().getPrice();
                doctorSchedules.add(doctorSchedule);
            }

            if (doctorSchedules.isEmpty())
                throw new BadRequestException("No doctor schedule available");

            Transaction transaction = new Transaction();
            transaction.setAmount(totalAmount + 10000);
            transaction.setOrigin(origin);
            transactionRepository.save(transaction);

            for (DoctorSchedule doctorSchedule : doctorSchedules) {
                Booking booking = new Booking();
                booking.setPatientProfile(patientProfile);
                booking.setDoctorSchedule(doctorSchedule);
                booking.setTransaction(transaction);
                booking.setQueueNumber(-1);
                booking.setDeleted(true);
                bookingRepository.save(booking);
            }

            return vnPayServices.createPaymentUrl(
                    transaction.getAmount(),
                    transaction.getTransactionId()
            );
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
        return null;
    }

    @Override
    public String checkBookingCallback(Map<String, String> vnpParams) {
        Map<String, String> results = new HashMap<>();
        List<String> keys = vnpParams.keySet().stream().toList();
        for (String key : keys) {
            results.put(
                    URLEncoder.encode(key, StandardCharsets.US_ASCII),
                    URLEncoder.encode(vnpParams.get(key), StandardCharsets.US_ASCII)
            );
        }

        results.remove("vnp_SecureHashType");
        results.remove("vnp_SecureHash");
        String secureHash = VNPayConfig.hashAllFields(results);
        String vnp_SecureHash = vnpParams.get("vnp_SecureHash");

        UUID transactionId = UUID.fromString(vnpParams.get("vnp_OrderInfo").split(":")[1]);

        if (!secureHash.equals(vnp_SecureHash)
                || !vnpParams.get("vnp_ResponseCode").equals("00")
        ) {
            Transaction transaction = updateTransactionAndBooking(
                    transactionId,
                    null,
                    null,
                    TransactionStatus.FAILED
            );
            if (transaction == null)
                return null;

            return transaction.getOrigin() + "/payment-failed";
        }

        String bankCode = vnpParams.get("vnp_BankCode");
        String paymentMethod = "VNPAY";
        Transaction transaction = updateTransactionAndBooking(transactionId, bankCode, paymentMethod, TransactionStatus.SUCCESS);

        if (transaction == null)
            return null;

        return transaction.getOrigin() + "/payment-success?transactionId=" + transaction.getTransactionId();
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
                        if (b1.getDoctorSchedule().getDate().after(b2.getDoctorSchedule().getDate()))
                            return 1;
                        else if (b1.getDoctorSchedule().getDate().before(b2.getDoctorSchedule().getDate()))
                            return -1;
                        else
                            return 0;
                    })
                    .toList()
                    .stream().limit(15).toList();

            if (bookings.isEmpty())
                continue;

            AccountBookingResponse response = new AccountBookingResponse();
            response.setFullName(profile.getFullName());
            response.setBookings(bookings.stream().map(BookingItemResponse::new).toList());
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


        // Check date booking with current date
        Date date = booking.getDoctorSchedule().getDate();
        Date currentDate = DateCommon.getToday();
        if (DateCommon.compareDate(date, currentDate) != 0 )
            throw new StatusCodeException("Invalid examination date", 409);


        if (booking.getDoctorSchedule().getRoom().getRoomId() != roomId)
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

        DoctorSchedule doctorSchedule = doctorScheduleServices
                .getDoctorScheduleByIdForBooking(request.getDoctorScheduleId());

        Transaction transaction = new Transaction();
        transaction.setAmount(doctorSchedule.getMedicalService().getPrice());
        transaction.setStatus(TransactionStatus.SUCCESS);
        transaction.setBankCode(null);
        transaction.setPaymentMethod("CASH");
        transactionRepository.save(transaction);

        transaction.setStatus(TransactionStatus.SUCCESS);
        transactionRepository.save(transaction);

        long maxQueueNumber = bookingRepository
                .countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
                        doctorSchedule,
                        -1
                );
        Booking booking = new Booking();
        booking.setPatientProfile(patientProfile);
        booking.setDoctorSchedule(doctorSchedule);
        booking.setTransaction(transaction);
        booking.setQueueNumber((int) maxQueueNumber + 1);
        booking.setDeleted(false);
        bookingRepository.save(booking);

        return booking;
    }

    private Transaction updateTransactionAndBooking(UUID transactionId, String bankCode, String paymentMethod, TransactionStatus status) {
        Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
        if (transaction == null)
            return null;

        if (status == TransactionStatus.FAILED) {
            transaction.setStatus(status);
            transactionRepository.save(transaction);
            return transaction;
        }
        transaction.setStatus(TransactionStatus.SUCCESS);
        transaction.setBankCode(bankCode);
        transaction.setPaymentMethod(paymentMethod);
        transactionRepository.save(transaction);

        List<Booking> bookings = transaction.getBookings();
        for (Booking booking : bookings) {
            DoctorSchedule doctorSchedule = booking.getDoctorSchedule();

            long maxQueueNumber = bookingRepository
                    .countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
                            doctorSchedule,
                            -1
                    );

            booking.setQueueNumber((int) maxQueueNumber + 1);
            booking.setDeleted(false);
            bookingRepository.save(booking);
        }

        return transaction;
    }

}
