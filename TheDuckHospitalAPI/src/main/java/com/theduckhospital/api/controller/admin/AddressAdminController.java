package com.theduckhospital.api.controller.admin;

import com.theduckhospital.api.dto.request.admin.CreateDistrictRequest;
import com.theduckhospital.api.dto.request.admin.CreateProvinceRequest;
import com.theduckhospital.api.dto.request.admin.CreateWardRequest;
import com.theduckhospital.api.dto.response.GeneralResponse;
import com.theduckhospital.api.entity.District;
import com.theduckhospital.api.entity.Province;
import com.theduckhospital.api.entity.Ward;
import com.theduckhospital.api.services.IAddressServices;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/addresses")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AddressAdminController {
    private final IAddressServices addressServices;
    public AddressAdminController(IAddressServices addressServices) {
        this.addressServices = addressServices;
    }

    @PostMapping("/provinces")
    public ResponseEntity<?> createProvince(@RequestBody @Valid CreateProvinceRequest request) {
        Province province = addressServices.createProvince(request);

        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .message("Create province successfully")
                        .success(true)
                        .data(province)
                        .build()
        );
    }

    // POST /api/admin/address/district?provinceId=1
    @PostMapping("/districts")
    public ResponseEntity<?> createDistrict(
            @RequestBody @Valid CreateDistrictRequest request,
            @RequestParam(name = "provinceId") int provinceId
    ) {
        District district = addressServices.createDistrict(provinceId, request.getDistrictName());

        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .message("Create province successfully")
                        .success(true)
                        .data(district)
                        .build()
        );
    }

    // POST /api/admin/address/ward?districtId=1
    @PostMapping("/wards")
    public ResponseEntity<?> createWard(
            @RequestBody @Valid CreateWardRequest request,
            @RequestParam(name = "districtId") int districtId
    ) {
        Ward ward = addressServices.createWard(districtId, request.getWardName());

        return ResponseEntity.ok(
                GeneralResponse.builder()
                        .message("Create province successfully")
                        .success(true)
                        .data(ward)
                        .build()
        );
    }
}
