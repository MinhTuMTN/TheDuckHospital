package com.theduckhospital.api.dto.request;

import com.theduckhospital.api.constant.PaymentMethod;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class BookingRequest {
    private UUID patientProfileId;
    private List<String> timeSlotIds;
    private PaymentMethod paymentMethod;
    private boolean mobile = false;
    private String pinCode;
}
