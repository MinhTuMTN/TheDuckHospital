package com.theduckhospital.api.dto.request.nurse;

import lombok.Data;

@Data
public class InvoiceDetails {
    private String serviceName;
    private double quantity;
    private double unitPrice;
    private double total;
}
