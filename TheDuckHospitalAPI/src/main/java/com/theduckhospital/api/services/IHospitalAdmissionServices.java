package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.dto.request.nurse.HospitalAdmissionDetails;
import com.theduckhospital.api.dto.request.nurse.UpdateRoomHospitalAdmission;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.Nurse;

import java.util.List;
import java.util.UUID;

public interface IHospitalAdmissionServices {
    boolean updateRoomHospitalAdmission(
            String authorization,
            UpdateRoomHospitalAdmission updateRoomHospitalAdmission
    );
    HospitalAdmissionDetails getHospitalAdmissionDetails(
            String nurseAuthorization,
            String hospitalAdmissionCode
    );
    List<HospitalAdmission> findByRoomAndStateAndDeletedIsFalse(
            int roomId,
            HospitalAdmissionState state,
            String patientName
    );
    HospitalAdmission findHospitalAdmissionById(UUID hospitalAdmissionId);
    HospitalAdmission checkNursePermissionForHospitalAdmission(
            String nurseAuthorization,
            UUID hospitalAdmissionId
    );
    HospitalAdmission checkNursePermissionForHospitalAdmission(
            Nurse nurse,
            UUID hospitalAdmissionId
    );
}
