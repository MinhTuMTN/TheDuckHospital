package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.entity.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class TransactionResponse {
    private UUID transactionId;
    private double amount;
    private String userName;
    private String accountUserName;
    private String patientName;
    private TransactionStatus status;
    private Date createdAt;
    private String paymentMethod;
    private String bankCode;
    private PaymentType paymentType;
    private List<BookingResponse> bookings;
    private MedicalTestResponse medicalTestResponse;
    private Booking refundedBooking;
    private HospitalAdmission hospitalAdmission;
    private DischargeResponse discharge;

    public TransactionResponse(Transaction transaction, List<BookingResponse> bookings, Booking refundedBooking) {
        this.transactionId = transaction.getTransactionId();
        this.userName = !bookings.isEmpty() ? bookings.get(0).getPatientProfile().getFullName() : "";
        this.accountUserName =
                transaction.getPaymentType() == PaymentType.TOP_UP || transaction.getPaymentType() == PaymentType.REFUND ?
                        transaction.getAccount().getFullName() : "";
        this.amount = transaction.getAmount();
        this.paymentType = transaction.getPaymentType();
        this.status = transaction.getStatus();
        this.createdAt = transaction.getCreatedAt();
        this.paymentMethod = transaction.getPaymentMethod();
        this.bankCode = transaction.getBankCode();
        this.bookings = bookings;
        if(transaction.getMedicalTest() != null) {
            this.medicalTestResponse = new MedicalTestResponse(transaction.getMedicalTest());
        }
        this.refundedBooking = refundedBooking;
        if(transaction.getPaymentType() == PaymentType.ADVANCE_FEE) {
            this.hospitalAdmission = transaction.getHospitalAdmission();
            this.patientName = transaction.getHospitalAdmission().getPatientProfile().getFullName();
            if(transaction.getHospitalAdmission().getDischarge() != null) {
                this.discharge = new DischargeResponse(transaction.getHospitalAdmission().getDischarge());
            } else {
                this.discharge = null;
            }
        } else {
            this.hospitalAdmission = null;
            this.patientName = null;
            this.discharge = null;
        }
    }
}
