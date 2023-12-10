package com.theduckhospital.api.services;

import com.theduckhospital.api.dto.request.admin.CreateRoomRequest;
import com.theduckhospital.api.dto.response.admin.FilteredPatientsResponse;
import com.theduckhospital.api.dto.response.admin.FilteredRoomsResponse;
import com.theduckhospital.api.dto.response.admin.PatientResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.entity.Room;

import java.util.List;
import java.util.UUID;

public interface IPatientServices {
    FilteredPatientsResponse getPaginationPatientsDeleted(int page, int limit);
    PatientResponse getPatientById(UUID patientId);
}
