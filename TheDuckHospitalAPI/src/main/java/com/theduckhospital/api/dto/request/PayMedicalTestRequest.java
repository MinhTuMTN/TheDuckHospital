package com.theduckhospital.api.dto.request;

import com.theduckhospital.api.constant.PaymentMethod;
import lombok.Data;

@Data
public class PayMedicalTestRequest {
    private String medicalTestCode;
    private PaymentMethod paymentMethod;
}
