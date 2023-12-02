package com.theduckhospital.api.controller;

import com.theduckhospital.api.dto.request.GeneralResponse;
import com.theduckhospital.api.services.IAddressServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {
    private final IAddressServices addressServices;

    public AddressController(IAddressServices addressServices) {
        this.addressServices = addressServices;
    }
    @GetMapping("/provinces")
    public ResponseEntity<?> getAllProvinces() {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all provinces successfully")
                        .data(addressServices.getAllProvinces())
                        .build()
        );
    }

    @GetMapping("/districts")
    public ResponseEntity<?> getAllDistricts(
            @RequestParam(name = "provinceId") int provinceId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all districts successfully")
                        .data(addressServices.getAllDistrictsByProvinceId(provinceId))
                        .build()
        );
    }

    @GetMapping("/wards")
    public ResponseEntity<?> getAllWards(
            @RequestParam(name = "districtId") int districtId
    ) {
        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .success(true)
                        .message("Get all wards successfully")
                        .data(addressServices.getAllWardsByDistrictId(districtId))
                        .build()
        );
    }
}
