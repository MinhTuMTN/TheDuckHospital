package com.theduckhospital.api.dto.request;

import com.theduckhospital.api.constant.PaymentMethod;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PayMedicalTestRequest {
    private String medicalTestCode;
    private PaymentMethod paymentMethod;
    private String pinCode;
    private boolean mobile;
}
