package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.admin.*;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Booking;
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
import java.util.UUID;

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

        Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
        if (transaction == null)
            return null;

        if (!transaction.getBookings().get(0).getPatientProfile().getAccount().equals(account))
            return null;

        return transaction;
    }

//    @Override
//    public FilteredTransactionsResponse getTransactionsPagination(int page, int limit) {
//        Pageable pageable = PageRequest.of(page, limit);
//        Page<Transaction> transactionPage = transactionRepository.findPaginationByOrderByCreatedAtDesc(pageable);
//
//        List<TransactionResponse> filteredTransactions = new ArrayList<>();
//
//        for (Transaction transaction : transactionPage.getContent()) {
//            List<Booking> bookings = transaction.getBookings();
//            List<BookingResponse> bookingResponses = getBookingResponseList(bookings);
//
//            filteredTransactions.add(new TransactionResponse(transaction, bookingResponses));
//        }
//
//        List<Transaction> transaction = transactionRepository.findAll();
//
//        return new FilteredTransactionsResponse(filteredTransactions, transaction.size(), page, limit);
//    }

    @Override
    public FilteredTransactionsResponse getFilteredTransactionsPagination(
            int page,
            int limit,
            List<String> transactionPayment,
            List<TransactionStatus> transactionStatus
    ) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Transaction> transactionPage = transactionRepository
                .findByPaymentMethodInAndStatusInOrderByCreatedAtDesc(transactionPayment, transactionStatus, pageable);

        List<TransactionResponse> filteredTransactions = new ArrayList<>();
        for (Transaction transaction : transactionPage.getContent()) {
            List<Booking> bookings = transaction.getBookings();
            List<BookingResponse> bookingResponses = getBookingResponseList(bookings);

            filteredTransactions.add(new TransactionResponse(transaction, bookingResponses));
        }

        List<Transaction> transaction = transactionRepository
                .findByPaymentMethodInAndStatusIn(transactionPayment, transactionStatus);

        return new FilteredTransactionsResponse(filteredTransactions, transaction.size(), page, limit);
    }

    private List<BookingResponse> getBookingResponseList(List<Booking> bookings) {
        List<BookingResponse> bookingResponses = new ArrayList<>();
        if(!bookings.isEmpty()) {
            for (Booking booking : bookings) {
                PatientProfileResponse patientProfileResponse = new PatientProfileResponse(booking.getPatientProfile());
                long numberOfBooking = bookingRepository.
                        countByDoctorScheduleAndDeletedIsFalseAndQueueNumberGreaterThan(
                                booking.getDoctorSchedule(),
                                -1
                        );
                DoctorScheduleRoomResponse doctorScheduleRoomResponse = new DoctorScheduleRoomResponse(
                        booking.getDoctorSchedule(),
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

        return new TransactionResponse(transaction, bookingResponses);
    }
}
