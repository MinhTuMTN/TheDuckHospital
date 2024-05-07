package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.PrescriptionItem;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PatientHistoryRecordDetails {
    private PatientProfileItemResponse patientProfile;
    private String bookingCode;
    private Date date;
    private String doctorName;
    private String departmentName;
    private String symptom;
    private String diagnosis;
    private List<PrescriptionItem> prescriptionItems;
    private Date reExaminationDate;
    public PatientHistoryRecordDetails(MedicalExaminationRecord medicalExaminationRecord) {
        this.bookingCode = medicalExaminationRecord.getBooking().getBookingCode();
        this.patientProfile = new PatientProfileItemResponse(
                medicalExaminationRecord.getPatientProfile()
        );
        this.date = medicalExaminationRecord.getDoctorSchedule().getDate();
        this.doctorName = medicalExaminationRecord
                .getDoctorSchedule()
                .getDoctor()
                .getFullName();
        this.departmentName = medicalExaminationRecord
                .getDoctorSchedule()
                .getDoctor()
                .getDepartment()
                .getDepartmentName();
        this.symptom = medicalExaminationRecord.getSymptom();
        this.diagnosis = medicalExaminationRecord.getDiagnosis();
        this.prescriptionItems = medicalExaminationRecord
                .getPrescription() == null ? null : medicalExaminationRecord
                .getPrescription()
                .getPrescriptionItems()
                .stream()
                .filter(prescriptionItem -> !prescriptionItem.isDeleted())
                .toList();
        this.reExaminationDate = medicalExaminationRecord.getReExaminationDate();
    }


}
