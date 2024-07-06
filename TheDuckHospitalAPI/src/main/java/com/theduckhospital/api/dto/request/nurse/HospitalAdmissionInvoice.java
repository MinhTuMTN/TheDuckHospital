package com.theduckhospital.api.dto.request.nurse;

import com.theduckhospital.api.dto.response.nurse.HospitalAdmissionResponse;
import lombok.Data;

import java.util.List;



@Data
public class HospitalAdmissionInvoice {
    private HospitalAdmissionResponse generalInfo;
    private List<InvoiceDetails> details;
    private double provisionalFee;
    private double advanceFee;
    private double totalFee;
    private String paymentCode;
}
