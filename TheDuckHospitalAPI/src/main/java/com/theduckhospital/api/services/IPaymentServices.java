package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.PaymentMethod;
import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.request.PayMedicalTestRequest;
import com.theduckhospital.api.dto.response.PaymentResponse;
import com.theduckhospital.api.entity.Cashier;
import com.theduckhospital.api.entity.Transaction;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.UUID;

public interface IPaymentServices {
    PaymentResponse vnPayCreatePaymentUrl(double amount, UUID transactionId) throws UnsupportedEncodingException;
    PaymentResponse momoCreatePaymentUrl(double amount, UUID transactionId, boolean mobile) throws IOException;
    PaymentResponse createBookingPaymentUrl(Transaction transaction, BookingRequest request);
    PaymentResponse createMedicalTestPaymentUrl(Transaction transaction, PayMedicalTestRequest request);
    PaymentResponse createHospitalAdmissionPaymentUrl(Transaction transaction, PayMedicalTestRequest request);
    PaymentResponse createTopUpWalletPaymentUrl(Transaction transaction, PaymentMethod paymentMethod);
    String checkVNPayBookingCallback(Map<String,String> params);
    boolean checkMomoBookingCallback(Map<String, String> params) throws Exception;
    boolean paymentWithWallet(Transaction transaction, String pinCode);
    boolean paymentWithCash(Transaction transaction);
    Transaction createMedicalTestTransaction(PayMedicalTestRequest request, String origin, Cashier cashier);
    Transaction createHospitalAdmissionTransaction(PayMedicalTestRequest request, String origin, Cashier cashier);
}
