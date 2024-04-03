package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.MedicalTest;
import lombok.Data;

@Data
public class MedicalTestResponse {
    private String doctorName;
    private String departmentName;
    private String serviceName;
    private double price;

    public MedicalTestResponse(MedicalTest medicalTest)
    {
        Doctor doctor = medicalTest.getMedicalExaminationRecord().getDoctorSchedule().getDoctor();
        this.doctorName = doctor.getFullName();
        this.departmentName = doctor.getDepartment().getDepartmentName();
        this.serviceName = medicalTest.getMedicalService().getServiceName();
        this.price = medicalTest.getMedicalService().getPrice();
    }
}
