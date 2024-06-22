package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.nurse.InpatientPatientResponse;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.Nurse;
import com.theduckhospital.api.entity.NurseSchedule;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.repository.HospitalAdmissionRepository;
import com.theduckhospital.api.repository.NurseScheduleRepository;
import com.theduckhospital.api.services.IInpatientServices;
import com.theduckhospital.api.services.INurseServices;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class InpatientServicesImpl implements IInpatientServices {
    private final NurseScheduleRepository nurseScheduleRepository;
    private final IRoomServices roomServices;
    private final HospitalAdmissionRepository hospitalAdmissionRepository;
    private final INurseServices nurseServices;

    public InpatientServicesImpl(
            NurseScheduleRepository nurseScheduleRepository,
            IRoomServices roomServices, HospitalAdmissionRepository hospitalAdmissionRepository,
            INurseServices nurseServices
    ) {
        this.nurseScheduleRepository = nurseScheduleRepository;
        this.roomServices = roomServices;
        this.hospitalAdmissionRepository = hospitalAdmissionRepository;
        this.nurseServices = nurseServices;
    }

    @Override
    public List<RoomResponse> getTreatmentRoomBySchedule(String inpatientNurseAuthorization) {
        Date today = DateCommon.getStarOfDay(new Date());
        Nurse nurse = nurseServices.getNurseByToken(inpatientNurseAuthorization);
        List<NurseSchedule> nurseSchedules = nurseScheduleRepository
                .findByNurseAndDateAndScheduleTypeAndDeletedIsFalse(
                        nurse,
                        today,
                        ScheduleType.INPATIENT_EXAMINATION
                );

        return nurseSchedules.stream()
                .map(NurseSchedule::getRoom)
                .toList()
                .stream()
                .map(RoomResponse::new)
                .toList();
    }

    @Override
    public List<InpatientPatientResponse> getPatientsByRoom(int roomId) {
        Room room = roomServices.findRoomById(roomId);
        List<HospitalAdmission> hospitalAdmissions = hospitalAdmissionRepository
                .findByRoomAndStateAndDeletedIsFalse(
                        room,
                        HospitalAdmissionState.BEING_TREATED
                );
        return hospitalAdmissions.stream()
                .map(InpatientPatientResponse::new)
                .toList();
    }
}
