package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.Fee;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.dto.request.nurse.HospitalAdmissionDetails;
import com.theduckhospital.api.dto.request.nurse.UpdateRoomHospitalAdmission;
import com.theduckhospital.api.entity.HospitalAdmission;
import com.theduckhospital.api.entity.Nurse;
import com.theduckhospital.api.entity.Room;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.HospitalAdmissionRepository;
import com.theduckhospital.api.services.IHospitalAdmissionServices;
import com.theduckhospital.api.services.INurseServices;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HospitalAdmissionServicesImpl implements IHospitalAdmissionServices {
    private final IRoomServices roomServices;
    private final INurseServices nurseServices;
    private final HospitalAdmissionRepository hospitalAdmissionRepository;

    public HospitalAdmissionServicesImpl(
            IRoomServices roomServices,
            INurseServices nurseServices,
            HospitalAdmissionRepository hospitalAdmissionRepository
    ) {
        this.roomServices = roomServices;
        this.nurseServices = nurseServices;
        this.hospitalAdmissionRepository = hospitalAdmissionRepository;
    }

    @Override
    public boolean updateRoomHospitalAdmission(
            String authorization,
            UpdateRoomHospitalAdmission request
    ) {
        Nurse nurse = nurseServices.getNurseByToken(authorization);
        Optional<HospitalAdmission> optionalHospitalAdmission = hospitalAdmissionRepository
                .findByHospitalAdmissionCodeAndDeletedIsFalse(
                        request.getHospitalAdmissionCode()
                );

        if (optionalHospitalAdmission.isEmpty()) {
            throw new BadRequestException("Hospital admission not found");
        }

        HospitalAdmission hospitalAdmission = optionalHospitalAdmission.get();
        if (hospitalAdmission.getDepartment() != nurse.getDepartment()) {
            throw new BadRequestException("Nurse does not have permission to update this hospital admission");
        }

        if (hospitalAdmission.getState() == HospitalAdmissionState.WAITING_FOR_PAYMENT) {
            throw new BadRequestException("Hospital admission is not payment yet", 10060);
        }

        if (hospitalAdmission.getState() != HospitalAdmissionState.WAITING_FOR_TREATMENT) {
            throw new BadRequestException("Hospital admission is not waiting for treatment", 10061);
        }

        Room room = roomServices.findRoomById(request.getRoomId());
        if (room.getDepartment() != nurse.getDepartment()) {
            throw new BadRequestException("Nurse does not have permission to update this room");
        }
        if (room.getBeingUsed() != null && room.getBeingUsed() >= room.getCapacity()) {
            throw new BadRequestException("Room is full", 10062);
        }

        hospitalAdmission.setRoom(room);
        hospitalAdmission.setRoomFee(
                room.getRoomType() == RoomType.TREATMENT_ROOM_STANDARD
                ? Fee.STANDARD_ROOM_FEE
                : Fee.VIP_ROOM_FEE
        );
        hospitalAdmission.setNurse(nurse);
        hospitalAdmission.setState(HospitalAdmissionState.BEING_TREATED);
        hospitalAdmissionRepository.save(hospitalAdmission);

        room.setBeingUsed(room.getBeingUsed() == null ? 1 : room.getBeingUsed() + 1);
        roomServices.saveRoom(room);
        return true;
    }

    @Override
    public HospitalAdmissionDetails getHospitalAdmissionDetails(
            String nurseAuthorization,
            String hospitalAdmissionCode
    ) {
        Nurse nurse = nurseServices.getNurseByToken(nurseAuthorization);
        Optional<HospitalAdmission> optionalHospitalAdmission = hospitalAdmissionRepository
                .findByHospitalAdmissionCodeAndDeletedIsFalse(hospitalAdmissionCode);

        if (optionalHospitalAdmission.isEmpty()) {
            throw new BadRequestException("Hospital admission not found");
        }

        HospitalAdmission hospitalAdmission = optionalHospitalAdmission.get();
        if (hospitalAdmission.getDepartment() != nurse.getDepartment()) {
            throw new BadRequestException("Nurse does not have permission to view this hospital admission");
        }

        return new HospitalAdmissionDetails(hospitalAdmission);
    }
}