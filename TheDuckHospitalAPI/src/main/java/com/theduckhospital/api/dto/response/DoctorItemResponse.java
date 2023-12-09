package com.theduckhospital.api.dto.response;

import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.Gender;
import com.theduckhospital.api.entity.Department;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.DoctorSchedule;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class DoctorItemResponse {
    private UUID doctorId;
    private String doctorName;
    private Gender gender;
    private Degree degree;
    private Department department;
    private List<DoctorSchedule> doctorSchedules;
    private double price;

    public DoctorItemResponse(Doctor doctor) {
        this.doctorId = doctor.getStaffId();
        doctorName = doctor.getFullName();
        degree = doctor.getDegree();
        gender = doctor.getGender();
        department = doctor.getDepartment();
        doctorSchedules = doctor.getDoctorSchedules().stream().filter(
                doctorSchedule -> !doctorSchedule.isDeleted()
        ).toList();
        price = doctor.getDoctorSchedules().stream().filter(
                doctorSchedule -> !doctorSchedule.isDeleted()
        ).mapToDouble(ds -> ds.getMedicalService().getPrice()).min().orElse(0);
    }
}
