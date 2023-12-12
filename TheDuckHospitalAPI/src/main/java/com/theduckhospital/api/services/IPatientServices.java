package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.PatientProfile;

public interface IPatientServices {
    Patient createPatient(String identityNumber, PatientProfile patientProfile);
    Patient findPatientByIdentityNumber(String identityNumber);
}
