package com.theduckhospital.api.services;

import com.google.api.services.storage.Storage;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.nurse.CreateTreatmentMedicineRequest;
import com.theduckhospital.api.dto.request.nurse.DoctorDetails;
import com.theduckhospital.api.dto.request.nurse.UpdateDailyHospitalAdmissionDetails;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.nurse.HospitalAdmissionResponse;
import com.theduckhospital.api.dto.response.nurse.InpatientPatientResponse;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.HospitalizationDetail;
import com.theduckhospital.api.entity.MedicalService;
import com.theduckhospital.api.entity.TreatmentMedicine;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface IInpatientServices {
    List<RoomResponse> getTreatmentRoomBySchedule(String inpatientNurseAuthorization);
    List<InpatientPatientResponse> getPatientsByRoom(int roomId, String patientName);
    boolean createInpatientMedicalTest(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            CreateMedicalTest request
    );
    PaginationResponse getInpatientMedicalTests(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            int serviceId,
            int page,
            int size
    );
    boolean deleteInpatientMedicalTest(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UUID medicalTestId
    );
    List<MedicalService> getAllMedicalTestServices();
    HospitalizationDetail updateDailyHospitalAdmissionDetails(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UpdateDailyHospitalAdmissionDetails request
    );
    HospitalizationDetail getDailyHospitalAdmissionDetails(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            Date date
    );
    List<DoctorDetails> getDoctorsInDepartment(
            String inpatientNurseAuthorization
    );
    HospitalAdmissionResponse getGeneralInfoOfHospitalAdmission(
            String inpatientNurseAuthorization,
            UUID hospitalizationId
    );
    List<TreatmentMedicine> getMedicinesOfHospitalAdmission(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            Date date
    );
    boolean createTreatmentMedicine(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            CreateTreatmentMedicineRequest request
    );
}
