package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.doctor.UpdateMedicalRecord;
import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;
import com.theduckhospital.api.dto.response.admin.MedicalRecordResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalRecordResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalTestResponse;
import com.theduckhospital.api.entity.MedicalExaminationRecord;

import java.text.ParseException;
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
    MedicalRecordItemResponse nurseCreateMedicalExamRecord(
            NurseCreateBookingRequest request
    );

    MedicalExaminationRecord acceptMedicalExamination(String authorization, UUID medicalExaminationId);

    DoctorMedicalRecordResponse doctorGetMedicalExamination(String authorization, UUID medicalExaminationId);

    List<DoctorMedicalTestResponse> doctorCreateMedicalTest(String authorization, UUID medicalExaminationId, CreateMedicalTest request) throws ParseException;

    List<DoctorMedicalTestResponse> doctorGetMedicalTests(String authorization, UUID medicalExaminationId);

    List<DoctorMedicalTestResponse> doctorDeleteMedicalTest(String authorization, UUID medicalExaminationId, UUID medicalTestId);

    DoctorMedicalRecordResponse doctorUpdateMedicalRecord(String authorization, UUID medicalExaminationId, UpdateMedicalRecord request);
}
