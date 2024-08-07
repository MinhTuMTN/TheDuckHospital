package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.doctor.AddMedicine;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.doctor.HospitalAdmissionRequest;
import com.theduckhospital.api.dto.request.doctor.UpdateMedicalRecord;
import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.PatientHistoryMedicalRecord;
import com.theduckhospital.api.dto.response.PatientHistoryRecordDetails;
import com.theduckhospital.api.dto.response.admin.MedicalRecordResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalRecordResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalTestResponse;
import com.theduckhospital.api.dto.response.doctor.HistoryMedicalRecord;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.PrescriptionItem;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

public interface IMedicalExamServices {
    MedicalExaminationRecord createNonPatientMedicalExamRecord(
            NonPatientMedicalExamRequest request
    ) throws ParseException;
    MedicalExaminationRecord createPatientMedicalExamRecord(
            PatientMedicalExamRequest request
    ) throws ParseException;
    List<MedicalRecordResponse> getMedicalRecordsByPatientProfile(UUID patientProfileId);
    MedicalRecordItemResponse counterNurseCreateBookingAndMedicalRecord(
            NurseCreateBookingRequest request
    ) throws ParseException;
    MedicalExaminationRecord acceptMedicalExamination(
            String authorization,
            UUID medicalExaminationId,
            UUID doctorScheduleId
    );
    DoctorMedicalRecordResponse doctorGetMedicalExamination(String authorization, UUID medicalExaminationId);

    List<DoctorMedicalTestResponse> doctorCreateMedicalTest(String authorization, UUID medicalExaminationId, CreateMedicalTest request) throws ParseException;

    List<DoctorMedicalTestResponse> doctorGetMedicalTests(String authorization, UUID medicalExaminationId);

    List<DoctorMedicalTestResponse> doctorDeleteMedicalTest(String authorization, UUID medicalExaminationId, UUID medicalTestId);

    DoctorMedicalRecordResponse doctorUpdateMedicalRecord(String authorization, UUID medicalExaminationId, UpdateMedicalRecord request) throws ParseException;

    List<PrescriptionItem> doctorAddMedicine(String authorization, UUID medicalExaminationId, AddMedicine request);

    List<PrescriptionItem> doctorGetMedicines(String authorization, UUID medicalExaminationId);

    List<PrescriptionItem> doctorDeleteMedicine(String authorization, UUID medicalExaminationId, UUID prescriptionItemId);

    HistoryMedicalRecord doctorGetHistoryMedicalExamination(
            String authorization,
            UUID medicalExaminationId,
            UUID historyId
    );

    MedicalExaminationRecord completeMedicalExamination(String authorization, UUID medicalExaminationId);

    List<PatientHistoryMedicalRecord> patientGetMedicalRecords(String authorization);
    PaginationResponse patientGetMedicalRecordsByProfile(
            String authorization,
            UUID patientProfileId,
            int page,
            int limit
    );

    PatientHistoryRecordDetails patientGetMedicalRecordDetails(String authorization, UUID medicalRecordId);
    HospitalAdmission doctorHospitalAdmission(
            String authorization,
            UUID medicalExaminationId,
            HospitalAdmissionRequest request
    );
}
