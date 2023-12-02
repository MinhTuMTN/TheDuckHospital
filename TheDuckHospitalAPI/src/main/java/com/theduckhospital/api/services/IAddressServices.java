package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.CreateProvinceRequest;
import com.theduckhospital.api.entity.District;
import com.theduckhospital.api.entity.Province;
import com.theduckhospital.api.entity.Ward;

import java.util.List;

public interface IAddressServices {
    Province createProvince(CreateProvinceRequest request);
    District createDistrict(int provinceId, String districtName);
    Ward createWard(int districtId, String wardName);
    List<Province> getAllProvinces();
    List<District> getAllDistrictsByProvinceId(int provinceId);
    List<Ward> getAllWardsByDistrictId(int districtId);
}
