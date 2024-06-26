package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.nurse.UpdateDailyHospitalAdmissionDetails;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.Nurse;

public interface IHospitalizationDetailServices {
    HospitalizationDetail updateDailyHospitalAdmissionDetails(
            Nurse nurse,
            HospitalAdmission hospitalAdmission,
            UpdateDailyHospitalAdmissionDetails request
    );
}
