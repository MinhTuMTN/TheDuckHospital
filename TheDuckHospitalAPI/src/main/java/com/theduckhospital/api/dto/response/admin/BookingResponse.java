package com.theduckhospital.api.dto.response.admin;

import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.DoctorSchedule;
import com.theduckhospital.api.entity.PatientProfile;
import com.theduckhospital.api.entity.Transaction;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class BookingResponse {
    private Booking booking;
    private PatientProfileResponse patientProfile;
    private DoctorScheduleRoomResponse doctorSchedule;
    private MedicalRecordResponse medicalRecord;

    public BookingResponse(Booking booking, PatientProfileResponse patientProfile, DoctorScheduleRoomResponse doctorSchedule) {
        this.booking = booking;
        this.patientProfile = patientProfile;
        this.doctorSchedule = doctorSchedule;
        this.medicalRecord = booking.getMedicalExaminationRecord() != null ?
                new MedicalRecordResponse(booking.getMedicalExaminationRecord(), new ArrayList<>()) :
                null;
    }
}
