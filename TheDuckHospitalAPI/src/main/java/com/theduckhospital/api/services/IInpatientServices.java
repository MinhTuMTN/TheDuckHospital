package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.doctor.AddMedicine;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.nurse.*;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalTestResponse;
import com.theduckhospital.api.dto.response.nurse.DischargeDetails;
import com.theduckhospital.api.dto.response.nurse.HospitalAdmissionResponse;
import com.theduckhospital.api.dto.response.nurse.InpatientPatientResponse;
import com.theduckhospital.api.entity.*;

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
    List<TreatmentMedicine> createTreatmentMedicine(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            CreateTreatmentMedicineRequest request
    );
    List<TreatmentMedicine> deleteTreatmentMedicine(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UUID treatmentMedicineId,
            boolean deleteFromTomorrow
    );
    List<DoctorMedicalTestResponse> getInpatientMedicalTestsByDate(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            Date date
    );
    HospitalizationDetailResponse convertHospitalizationDetailDTO(
            HospitalizationDetail hospitalizationDetail
    );
    HospitalAdmissionInvoice getInvoicesOfHospitalAdmission(
            String inpatientNurseAuthorization,
            UUID hospitalizationId
    );
    HospitalAdmissionInvoice getInvoicesOfHospitalAdmission(
            HospitalAdmission hospitalAdmission
    );
    DischargeDetails getDischargeDetails(
            String inpatientNurseAuthorization,
            UUID hospitalizationId
    );
    DischargeDetails updateDischargeDetails(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UpdateDischargeDetails request
    );
    boolean confirmDischarge(
            String inpatientNurseAuthorization,
            UUID hospitalizationId
    );
    List<PrescriptionItem> addDischargeMedicines(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            AddMedicine request
    );
    List<PrescriptionItem> getDischargeMedicines(
            String inpatientNurseAuthorization,
            UUID hospitalizationId
    );
    List<PrescriptionItem> deleteDischargeMedicine(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UUID prescriptionItemId
    );
}
