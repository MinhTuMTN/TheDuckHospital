package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.nurse.HospitalAdmissionDetails;
import com.theduckhospital.api.dto.request.nurse.UpdateRoomHospitalAdmission;

public interface IHospitalAdmissionServices {
    boolean updateRoomHospitalAdmission(
            String authorization,
            UpdateRoomHospitalAdmission updateRoomHospitalAdmission
    );

    HospitalAdmissionDetails getHospitalAdmissionDetails(
            String nurseAuthorization,
            String hospitalAdmissionCode
    );
}
