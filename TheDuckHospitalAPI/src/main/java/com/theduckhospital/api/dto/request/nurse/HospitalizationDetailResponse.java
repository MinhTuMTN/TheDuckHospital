package com.theduckhospital.api.dto.request.nurse;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.HospitalizationDetail;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class HospitalizationDetailResponse {
    private UUID hospitalizationDetailId;
    private Date hospitalizationDate;
    private String bloodPressure;
    private String diagnosis;
    private String diseaseProgression;
    private String heartRate;
    private String symptom;
    private String temperature;
    private double totalFee;
    private Date updatedAt;
    private UUID doctorId;
    private String doctorName;
    private Degree doctorDegree;

    public HospitalizationDetailResponse(HospitalizationDetail hospitalizationDetail) {
        this.hospitalizationDetailId = hospitalizationDetail.getHospitalizationDetailId();
        this.hospitalizationDate = hospitalizationDetail.getHospitalizationDate();
        this.bloodPressure = hospitalizationDetail.getBloodPressure();
        this.diagnosis = hospitalizationDetail.getDiagnosis();
        this.diseaseProgression = hospitalizationDetail.getDiseaseProgression();
        this.heartRate = hospitalizationDetail.getHeartRate();
        this.symptom = hospitalizationDetail.getSymptom();
        this.temperature = hospitalizationDetail.getTemperature();
        this.totalFee = hospitalizationDetail.getTotalFee();
        this.updatedAt = hospitalizationDetail.getUpdatedAt();

        Doctor doctor = hospitalizationDetail.getTreatingDoctor();
        if (doctor != null) {
            this.doctorId = doctor.getStaffId();
            this.doctorName = doctor.getFullName();
            this.doctorDegree = doctor.getDegree();
        }
    }
}
