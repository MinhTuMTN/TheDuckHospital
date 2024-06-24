package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.constant.NurseType;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.nurse.InpatientPatientResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.HospitalAdmissionRepository;
import com.theduckhospital.api.repository.NurseScheduleRepository;
import com.theduckhospital.api.services.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InpatientServicesImpl implements IInpatientServices {
    private final NurseScheduleRepository nurseScheduleRepository;
    private final IRoomServices roomServices;
    private final HospitalAdmissionRepository hospitalAdmissionRepository;
    private final INurseServices nurseServices;
    private final IMedicalTestServices medicalTestServices;
    private final IMedicalServiceServices medicalServiceServices;

    public InpatientServicesImpl(
            NurseScheduleRepository nurseScheduleRepository,
            IRoomServices roomServices,
            HospitalAdmissionRepository hospitalAdmissionRepository,
            INurseServices nurseServices,
            IMedicalTestServices medicalTestServices,
            IMedicalServiceServices medicalServiceServices
    ) {
        this.nurseScheduleRepository = nurseScheduleRepository;
        this.roomServices = roomServices;
        this.hospitalAdmissionRepository = hospitalAdmissionRepository;
        this.nurseServices = nurseServices;
        this.medicalTestServices = medicalTestServices;
        this.medicalServiceServices = medicalServiceServices;
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

    @Override
    public boolean createInpatientMedicalTest(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            CreateMedicalTest request
    ) {
        HospitalAdmission hospitalAdmission = findHospitalAdmissionById(hospitalizationId);
        if (noPermission(inpatientNurseAuthorization, hospitalAdmission)) {
            throw new BadRequestException("Permission denied", 10090);
        }

        MedicalTest medicalTest = medicalTestServices
                .createMedicalTest(
                        request,
                        null,
                        hospitalAdmission
                );

        if (medicalTest == null) {
            throw new BadRequestException("Create medical test failed", 400);
        }
        return true;
    }

    @Override
    public PaginationResponse getInpatientMedicalTests(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            int page,
            int size
    ) {
        HospitalAdmission hospitalAdmission = findHospitalAdmissionById(hospitalizationId);
        if (noPermission(inpatientNurseAuthorization, hospitalAdmission)) {
            throw new BadRequestException("Permission denied", 10090);
        }

        Page<MedicalTest> medicalTests = medicalTestServices
                .getMedicalTestsByHospitalAdmission(
                        hospitalAdmission,
                        page,
                        size
                );

        return PaginationResponse.builder()
                .totalItems((int) medicalTests.getTotalElements())
                .totalPages(medicalTests.getTotalPages())
                .page(page)
                .limit(size)
                .items(medicalTests.getContent())
                .build();
    }

    private boolean noPermission(
            String inpatientNurseAuthorization,
            HospitalAdmission hospitalAdmission
    ) {
        Nurse nurse = nurseServices.getNurseByToken(inpatientNurseAuthorization);
        if (nurse.getNurseType() != NurseType.INPATIENT_NURSE)
            return true;

        return hospitalAdmission.getDepartment() != nurse.getDepartment();
    }

    @Override
    public HospitalAdmission findHospitalAdmissionById(UUID hospitalAdmissionId) {
        Optional<HospitalAdmission> hospitalAdmission = hospitalAdmissionRepository
                .findByHospitalAdmissionIdAndDeletedIsFalse(hospitalAdmissionId);
        if (hospitalAdmission.isEmpty()) {
            throw new BadRequestException("Hospitalization not found", 404);
        }

        return hospitalAdmission.get();
    }

    @Override
    public boolean deleteInpatientMedicalTest(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UUID medicalTestId
    ) {
        HospitalAdmission hospitalAdmission = findHospitalAdmissionById(hospitalizationId);
        if (noPermission(inpatientNurseAuthorization, hospitalAdmission)) {
            throw new BadRequestException("Permission denied", 10090);
        }
        medicalTestServices.deleteHospitalAdmissionMedicalTest(
                hospitalAdmission,
                medicalTestId
        );
        return true;
    }

    @Override
    public List<MedicalService> getAllMedicalTestServices() {
        return medicalServiceServices.doctorGetAllMedicalTests();
    }
}
