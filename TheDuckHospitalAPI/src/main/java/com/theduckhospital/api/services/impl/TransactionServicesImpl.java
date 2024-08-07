package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.PaymentMethod;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.admin.*;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.MedicalTest;
import com.theduckhospital.api.entity.Transaction;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.TransactionRepository;
import com.theduckhospital.api.services.IAccountServices;
import com.theduckhospital.api.services.ITransactionServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TransactionServicesImpl implements ITransactionServices {
    private final IAccountServices accountServices;
    private final TransactionRepository transactionRepository;
    private final BookingRepository bookingRepository;

    public TransactionServicesImpl(IAccountServices accountServices,
                                   TransactionRepository transactionRepository,
                                   BookingRepository bookingRepository
    ) {
        this.accountServices = accountServices;
        this.transactionRepository = transactionRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public Transaction getTransactionById(String token, UUID transactionId) {
        Account account = accountServices.findAccountByToken(token);
        if (account == null)
            return null;

        //        if (!transaction.getBookings().get(0).getPatientProfile().getAccount().equals(account))
//            return null;

        return transactionRepository.findById(transactionId).orElse(null);
    }
    public static PaymentMethod toPaymentMethod(String name) {
        try {
            return PaymentMethod.valueOf(name);
        } catch (IllegalArgumentException e) {
            // Log error or handle exception
            return null;
        }
    }
    public static TransactionStatus toTransactionStatus(String name) {
        try {
            return TransactionStatus.valueOf(name);
        } catch (IllegalArgumentException e) {
            // Log error or handle exception
            return null;
        }
    }
    @Override
    public FilteredTransactionsResponse getFilteredTransactionsPagination(
            int page,
            int limit,
            List<String> transactionPayment,
            List<TransactionStatus> transactionStatus,
            List<PaymentType> paymentTypes
    ) {
//        String cashMethod = "";
//        boolean hasCashMethod = false;
//        for (String method: transactionPayment
//             ) {
//            if(method.equals("CASH")){
//                cashMethod = method;
//                hasCashMethod = true;
//                break;
//            }
//        }
//        if (hasCashMethod) {
//            transactionPayment.remove(cashMethod);
//        }
//        List<String> transactionPaymentStr = transactionPayment.isEmpty() ? null : transactionPayment.stream()
//                .map(Enum::name)
//                .toList();
//
//        List<String> transactionStatusStr = transactionStatus.isEmpty() ? null : transactionStatus.stream()
//                .map(Enum::name)
//                .toList();

        Pageable pageable = PageRequest.of(page, limit);
        Page<Transaction> transactionPage =
//                hasCashMethod ? transactionRepository.findFilteredTransactionsHasCashMethod(
//                transactionPayment,
//                transactionStatus,
//                transactionPayment != null ? transactionPayment.stream().map(p -> toPaymentMethod(p.name())).collect(Collectors.toList()) : null,
//                transactionStatus != null ? transactionStatus.stream().map(s -> toTransactionStatus(s.name())).collect(Collectors.toList()) : null,
//                pageable
//        ) :
                transactionRepository
                        .findByPaymentMethodInAndStatusInAndPaymentTypeInOrderByCreatedAtDesc(
                                transactionPayment,
                                transactionStatus,
                                paymentTypes,
                                pageable
                        );
//                null;

        List<TransactionResponse> filteredTransactions = new ArrayList<>();
        List<Booking> bookings;
        List<BookingResponse> bookingResponses = new ArrayList<>();
        Booking refundedBooking = null;
        for (Transaction transaction : transactionPage.getContent()) {
            if(transaction.getPaymentType() == PaymentType.BOOKING) {
                bookings = transaction.getBookings();
                bookingResponses = getBookingResponseList(bookings);
            } else if(transaction.getPaymentType() == PaymentType.REFUND){
                Optional<Booking> optionalBooking = bookingRepository.findByRefundedTransactionId(transaction.getTransactionId());
                refundedBooking = optionalBooking.orElse(null);
            }

            filteredTransactions.add(new TransactionResponse(transaction, bookingResponses, refundedBooking));
        }

        List<Transaction> transaction = transactionRepository
                .findByPaymentMethodInAndStatusInAndPaymentTypeInOrderByCreatedAtDesc(
                        transactionPayment,
                        transactionStatus,
                        paymentTypes
                );

        return new FilteredTransactionsResponse(filteredTransactions, transaction.size(), page, limit);
    }

    private List<BookingResponse> getBookingResponseList(List<Booking> bookings) {
        List<BookingResponse> bookingResponses = new ArrayList<>();
        if (!bookings.isEmpty()) {
            for (Booking booking : bookings) {
                PatientProfileResponse patientProfileResponse = new PatientProfileResponse(booking.getPatientProfile());
                long numberOfBooking = bookingRepository.
                        countByTimeSlot_DoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
                                booking.getTimeSlot().getDoctorSchedule(),
                                -1
                        );
                DoctorScheduleRoomResponse doctorScheduleRoomResponse = new DoctorScheduleRoomResponse(
                        booking.getTimeSlot().getDoctorSchedule(),
                        numberOfBooking
                );
                bookingResponses.add(new BookingResponse(booking, patientProfileResponse, doctorScheduleRoomResponse));
            }
        }
        return bookingResponses;
    }

    @Override
    public TransactionResponse getTransactionByIdAdmin(UUID transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
        if (transaction == null)
            throw new NotFoundException("Transaction not found");

        List<Booking> bookings = transaction.getBookings();
        List<BookingResponse> bookingResponses = getBookingResponseList(bookings);
        Optional<Booking> optionalBooking = bookingRepository.findByRefundedTransactionId(transaction.getTransactionId());
        Booking refundedBooking = optionalBooking.orElse(null);
        return new TransactionResponse(transaction, bookingResponses, refundedBooking);
    }
}
