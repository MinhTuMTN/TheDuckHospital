package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.constant.VNPayConfig;
import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.Transaction;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.IBookingServices;
import com.theduckhospital.api.services.IPatientProfileServices;
import com.theduckhospital.api.services.IScheduleDoctorServices;
import com.theduckhospital.api.services.IVNPayServices;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class BookingServicesImpl implements IBookingServices {
    private final BookingRepository bookingRepository;
    private final TransactionRepository transactionRepository;
    private final IPatientProfileServices patientProfileServices;
    private final IScheduleDoctorServices doctorScheduleServices;
    private final IVNPayServices vnPayServices;

    public BookingServicesImpl(BookingRepository bookingRepository, TransactionRepository transactionRepository, IPatientProfileServices patientProfileServices, IScheduleDoctorServices doctorScheduleServices, IVNPayServices vnPayServices) {
        this.bookingRepository = bookingRepository;
        this.transactionRepository = transactionRepository;
        this.patientProfileServices = patientProfileServices;
        this.doctorScheduleServices = doctorScheduleServices;
        this.vnPayServices = vnPayServices;
    }

    @Override
    @Transactional
    public String createBookingAndPayment(String token, BookingRequest request) {
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

                totalAmount += doctorSchedule.getMedicalService().getPrice();
                doctorSchedules.add(doctorSchedule);
            }

            Transaction transaction = new Transaction();
            transaction.setAmount(totalAmount + 10000);
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
            e.printStackTrace();
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
        return null;
    }

    @Override
    public UUID checkBookingCallback(Map<String, String> vnpParams) {
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
        if (!secureHash.equals(vnp_SecureHash) || !vnpParams.get("vnp_ResponseCode").equals("00"))
            return null;

        UUID transactionId = UUID.fromString(vnpParams.get("vnp_OrderInfo").split(":")[1]);
        String bankCode = vnpParams.get("vnp_BankCode");
        String paymentMethod = "VNPAY";
        updateTransactionAndBooking(transactionId, bankCode, paymentMethod);

        return transactionId;
    }

    private boolean updateTransactionAndBooking(UUID transactionId, String bankCode, String paymentMethod) {
        Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
        if (transaction == null)
            return false;

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

        return true;
    }

}
