package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.CreateProvinceRequest;
import com.theduckhospital.api.entity.District;
import com.theduckhospital.api.entity.Province;
import com.theduckhospital.api.entity.Ward;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.DistrictRepository;
import com.theduckhospital.api.repository.ProvinceRepository;
import com.theduckhospital.api.repository.WardRepository;
import com.theduckhospital.api.services.IAddressServices;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServicesImpl implements IAddressServices {
    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;

    public AddressServicesImpl(
            ProvinceRepository provinceRepository,
            DistrictRepository districtRepository,
            WardRepository wardRepository
    ) {
        this.provinceRepository = provinceRepository;
        this.districtRepository = districtRepository;
        this.wardRepository = wardRepository;
    }
    @Override
    public Province createProvince(CreateProvinceRequest request) {
        Province province = new Province();
        province.setProvinceName(request.getProvinceName());

        return provinceRepository.save(province);
    }

    @Override
    public District createDistrict(int provinceId, String districtName) {
        Optional<Province> province = provinceRepository.findById(provinceId);
        if (province.isEmpty()) {
            throw new NotFoundException("Province not found");
        }

        District district = new District();
        district.setProvince(province.get());
        district.setDistrictName(districtName);

        return districtRepository.save(district);
    }

    @Override
    public Ward createWard(int districtId, String wardName) {
        Optional<District> district = districtRepository.findById(districtId);
        if (district.isEmpty()) {
            throw new NotFoundException("District not found");
        }

        Ward ward = new Ward();
        ward.setDistrict(district.get());
        ward.setWardName(wardName);

        return wardRepository.save(ward);
    }

    @Override
    public List<Province> getAllProvinces() {
       return provinceRepository.findProvincesByDeletedIsFalseOrderByProvinceNameAsc();
    }

    @Override
    public List<District> getAllDistrictsByProvinceId(int provinceId) {
        return districtRepository.findDistrictsByDeletedIsFalseAndProvince_ProvinceIdOrderByDistrictNameAsc(
                provinceId
        );
    }

    @Override
    public List<Ward> getAllWardsByDistrictId(int districtId) {
        return wardRepository.findWardsByDeletedIsFalseAndDistrict_DistrictIdOrderByWardNameAsc(
                districtId
        );
    }
}
