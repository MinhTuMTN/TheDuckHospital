package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.dto.request.headnurse.CreateExamNurseScheduleRequest;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.FilteredActiveDoctorsResponse;
import com.theduckhospital.api.dto.response.headnurse.ExaminationNurseScheduleResponse;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.Nurse;
import com.theduckhospital.api.entity.NurseSchedule;
import com.theduckhospital.api.entity.Room;

import java.util.List;
import java.util.UUID;

public interface INurseServices {
    List<Nurse> getNursesNotInDepartment();
    boolean deleteHeadNurse(UUID staffId);
    Nurse getNurseById(UUID staffId);
    PaginationResponse getPaginationActiveNursesDepartment(
            String authorization,
            String search,
            NurseType nurseType,
            int page,
            int limit
    );
    List<Room> getRoomsDepartment(String authorization, RoomType roomType);
    List<ExaminationNurseScheduleResponse> getExaminationRoomSchedules(String authorization, int roomId);
    boolean createExaminationRoomSchedules(
            String authorization,
            int roomId,
            CreateExamNurseScheduleRequest request
    );
    List<NurseSchedule> getNurseSchedules(String authorization, Integer month, Integer year);
}
