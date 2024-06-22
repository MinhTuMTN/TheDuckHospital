package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.nurse.InpatientPatientResponse;
import com.theduckhospital.api.entity.HospitalAdmission;

import java.util.List;

public interface IInpatientServices {
    List<RoomResponse> getTreatmentRoomBySchedule(String inpatientNurseAuthorization);
    List<InpatientPatientResponse> getPatientsByRoom(int roomId);
}
