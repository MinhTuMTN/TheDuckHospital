package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;
import com.theduckhospital.api.entity.MedicalExaminationRecord;

public interface IMedicalExamServices {
    MedicalExaminationRecord createNonPatientMedicalExamRecord(
            NonPatientMedicalExamRequest request
    );

    MedicalExaminationRecord createPatientMedicalExamRecord(
            PatientMedicalExamRequest request
    );

    MedicalRecordItemResponse nurseCreateMedicalExamRecord(
            NurseCreateBookingRequest request
    );
}
