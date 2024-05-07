package com.theduckhospital.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class CheckBookingRefundResponse {
    private String bookingCode;
    private String departmentName;
    private String doctorName;
    private String patientName;
    private Date bookingDate;
    private double refundAmount;
    private boolean isRefundable;
}
