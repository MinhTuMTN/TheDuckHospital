package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.FindPatientCodeRequest;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.dto.response.admin.FilteredPatientsResponse;
import com.theduckhospital.api.dto.response.admin.PatientResponse;
import com.theduckhospital.api.entity.PatientProfile;

import java.util.UUID;

public interface IPatientServices {
    Patient createPatient(String identityNumber, PatientProfile patientProfile);
    Patient findPatientByIdentityNumber(String identityNumber);

    FilteredPatientsResponse getPaginationFilteredPatients(
            String search,
            int page,
            int limit
    );

    PatientResponse getPatientById(UUID patientId);
    Patient findPatientByPatientCode(String patientCode);
}
