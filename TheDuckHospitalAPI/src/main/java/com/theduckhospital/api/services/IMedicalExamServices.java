package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.dto.response.admin.MedicalRecordResponse;
import com.theduckhospital.api.entity.MedicalExaminationRecord;

import java.util.List;
import java.util.UUID;

public interface IMedicalExamServices {
    MedicalExaminationRecord createNonPatientMedicalExamRecord(
            NonPatientMedicalExamRequest request
    );

    MedicalExaminationRecord createPatientMedicalExamRecord(
            PatientMedicalExamRequest request
    );

    List<MedicalRecordResponse> getMedicalRecordsByPatientProfile(UUID patientProfileId);
}
