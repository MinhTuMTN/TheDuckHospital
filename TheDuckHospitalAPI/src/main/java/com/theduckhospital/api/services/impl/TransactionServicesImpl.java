package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.response.admin.*;
import com.theduckhospital.api.entity.Account;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.Transaction;
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

    @Override
    public FilteredTransactionsResponse getTransactionsPagination(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Page<Transaction> transactionPage = transactionRepository.findPaginationBy(pageable);

        List<TransactionResponse> filteredTransactions = new ArrayList<>();

        String userName = "";

        for (Transaction transaction : transactionPage.getContent()) {
            List<Booking> bookings = transaction.getBookings();
            List<BookingResponse> bookingResponses = new ArrayList<>();
            if(!bookings.isEmpty()) {
                for (Booking booking : bookings) {
                    Account account = booking.getPatientProfile().getAccount();
                    if (account == null) {
                        userName = booking.getPatientProfile().getPatient().getFullName();
                    } else {
                        userName = booking.getPatientProfile().getAccount().getFullName();
                    }

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

            filteredTransactions.add(new TransactionResponse(transaction, bookingResponses, userName));
        }

        List<Transaction> transaction = transactionRepository.findAll();

        return new FilteredTransactionsResponse(filteredTransactions, transaction.size(), page, limit);
    }
}
