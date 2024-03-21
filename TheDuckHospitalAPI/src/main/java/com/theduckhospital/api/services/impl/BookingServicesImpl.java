package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.MomoConfig;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.constant.VNPayConfig;
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
            ITimeSlotServices timeSlotServices
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
            transaction.setAmount(totalAmount + 10000);
            transaction.setOrigin(origin);
            transactionRepository.save(transaction);

            for (TimeSlot timeSlot : timeSlots) {
                Booking booking = new Booking();
                booking.setPatientProfile(patientProfile);
                booking.setTimeSlot(timeSlot);
                booking.setTransaction(transaction);
                booking.setQueueNumber(-1);
                booking.setDeleted(true);
                bookingRepository.save(booking);
            }

            return switch (request.getPaymentMethod()) {
                case VNPAY -> paymentServices.vnPayCreatePaymentUrl(
                        totalAmount + VNPayConfig.fee,
                        transaction.getTransactionId()
                );
                case MOMO -> paymentServices.momoCreatePaymentUrl(
                        totalAmount + MomoConfig.fee,
                        transaction.getTransactionId(),
                        request.isMobile()
                );
                default -> throw new BadRequestException("Invalid payment method");
            };
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
        return null;
    }

    @Override
    public String checkVNPayBookingCallback(Map<String, String> vnpParams) {
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

            if (transaction.getOrigin() == null)
                return  "https://the-duck-hospital.web.app/payment-failed";
            return transaction.getOrigin() + "/payment-failed";
        }

        Transaction transaction = updateTransactionAndBooking(
                transactionId,
                vnpParams.get("vnp_BankCode"),
                "VNPAY",
                TransactionStatus.SUCCESS
        );

        if (transaction == null)
            return null;

        if (transaction.getOrigin() == null)
            return "https://the-duck-hospital.web.app/payment-success?transactionId=" + transaction.getTransactionId();

        return transaction.getOrigin() + "/payment-success?transactionId=" + transaction.getTransactionId();
    }

    @Override
    public boolean checkMomoBookingCallback(Map<String, String> params) throws Exception {
        String accessKey = MomoConfig.accessKey;
        String amount = params.get("amount");
        String extraData = params.get("extraData");
        String message = params.get("message");
        String orderId = params.get("orderId");
        String orderInfo = params.get("orderInfo");
        String orderType = params.get("orderType");
        String partnerCode = params.get("partnerCode");
        String payType = params.get("payType");
        String requestId = params.get("requestId");
        String responseTime = params.get("responseTime");
        String resultCode = params.get("resultCode");
        String transId = params.get("transId");
        String signatureFromMomo = params.get("signature");
        UUID transactionId = UUID.fromString(orderId.split(":")[1]);

        String signatureRaw = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData
                + "&message=" + message + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&orderType=" + orderType
                + "&partnerCode=" + partnerCode + "&payType=" + payType + "&requestId=" + requestId
                + "&responseTime=" + responseTime + "&resultCode=" + resultCode + "&transId=" + transId;
        String signature = MomoConfig.hashSignature(signatureRaw, MomoConfig.secretKey);

        if (!signature.equals(signatureFromMomo) || !resultCode.equals("0")) {
            updateTransactionAndBooking(
                    transactionId,
                    null,
                    null,
                    TransactionStatus.FAILED
            );

            return false;
        }

        Transaction transaction = updateTransactionAndBooking(
                transactionId,
                transId,
                "MOMO",
                TransactionStatus.SUCCESS
        );

        return transaction != null;
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
                    .stream().limit(15).toList();

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


        // Check date booking with current date
        Date date = booking.getTimeSlot().getDate();
        Date currentDate = DateCommon.getToday();
        if (DateCommon.compareDate(date, currentDate) != 0 )
            throw new StatusCodeException("Invalid examination date", 409);


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
        bookingRepository.save(booking);

        timeSlot.setCurrentSlot(timeSlot.getCurrentSlot() + 1);
        timeSlotRepository.save(timeSlot);

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
        transaction.setBankCode(paymentMethod.equals("MOMO") ? "MOMO" : bankCode);
        transaction.setPaymentMethod(paymentMethod);
        transaction.setMomoTransactionId(paymentMethod.equals("MOMO") ? bankCode : null);
        transactionRepository.save(transaction);

        List<Booking> bookings = transaction.getBookings();
        for (Booking booking : bookings) {
            TimeSlot timeSlot = booking.getTimeSlot();

            booking.setQueueNumber(timeSlot.getStartNumber() + timeSlot.getCurrentSlot());
            booking.setDeleted(false);
            bookingRepository.save(booking);

            timeSlot.setCurrentSlot(timeSlot.getCurrentSlot() + 1);
            timeSlotRepository.save(timeSlot);
        }

        return transaction;
    }

}
