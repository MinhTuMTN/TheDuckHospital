package com.theduckhospital.api.dto.response.cashier;

import com.theduckhospital.api.constant.PaymentType;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class BillDetailsResponse {
    private String code;
    private UUID id;
    private String patientName;
    private int yearOfBirth = 1900;
    private String phoneNumber;
    private Date date;
    private double amount;
    private PaymentType paymentType;
    private String note;
}
