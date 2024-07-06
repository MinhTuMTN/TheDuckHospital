package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.HospitalAdmissionState;
import com.theduckhospital.api.constant.RoomType;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.nurse.*;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.RoomResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalTestResponse;
import com.theduckhospital.api.dto.response.nurse.HospitalAdmissionResponse;
import com.theduckhospital.api.dto.response.nurse.InpatientPatientResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.NurseScheduleRepository;
import com.theduckhospital.api.services.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InpatientServicesImpl implements IInpatientServices {
    private final NurseScheduleRepository nurseScheduleRepository;
    private final IHospitalAdmissionServices hospitalAdmissionServices;
    private final INurseServices nurseServices;
    private final IMedicalTestServices medicalTestServices;
    private final IMedicalServiceServices medicalServiceServices;
    private final IHospitalizationDetailServices hospitalizationDetailServices;
    private final IDoctorServices doctorServices;
    private final ITreatmentMedicineServices treatmentMedicineServices;

    public InpatientServicesImpl(
            NurseScheduleRepository nurseScheduleRepository,
            IHospitalAdmissionServices hospitalAdmissionServices,
            INurseServices nurseServices,
            IMedicalTestServices medicalTestServices,
            IMedicalServiceServices medicalServiceServices,
            IHospitalizationDetailServices hospitalizationDetailServices,
            IDoctorServices doctorServices,
            ITreatmentMedicineServices treatmentMedicineServices
    ) {
        this.nurseScheduleRepository = nurseScheduleRepository;
        this.hospitalAdmissionServices = hospitalAdmissionServices;
        this.nurseServices = nurseServices;
        this.medicalTestServices = medicalTestServices;
        this.medicalServiceServices = medicalServiceServices;
        this.hospitalizationDetailServices = hospitalizationDetailServices;
        this.doctorServices = doctorServices;
        this.treatmentMedicineServices = treatmentMedicineServices;
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
                .distinct()
                .map(RoomResponse::new)
                .toList();
    }

    @Override
    public List<InpatientPatientResponse> getPatientsByRoom(int roomId, String patientName) {
        List<HospitalAdmission> hospitalAdmissions = hospitalAdmissionServices
                .findByRoomAndStateAndDeletedIsFalse(
                        roomId,
                        HospitalAdmissionState.BEING_TREATED,
                        patientName
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
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        inpatientNurseAuthorization,
                        hospitalizationId
                );

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
            int serviceId,
            int page,
            int size
    ) {
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        inpatientNurseAuthorization,
                        hospitalizationId
                );

        Page<MedicalTest> medicalTests = medicalTestServices
                .getMedicalTestsByHospitalAdmission(
                        hospitalAdmission,
                        serviceId,
                        page,
                        size
                );

        return PaginationResponse.builder()
                .totalItems((int) medicalTests.getTotalElements())
                .totalPages(medicalTests.getTotalPages())
                .page(page)
                .limit(size)
                .items(medicalTests.getContent().stream()
                        .map(DoctorMedicalTestResponse::new)
                        .toList()
                )
                .build();
    }

    @Override
    public boolean deleteInpatientMedicalTest(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UUID medicalTestId
    ) {
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        inpatientNurseAuthorization,
                        hospitalizationId
                );

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

    @Override
    public HospitalizationDetail updateDailyHospitalAdmissionDetails(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UpdateDailyHospitalAdmissionDetails request
    ) {
        Nurse nurse = nurseServices.getNurseByToken(inpatientNurseAuthorization);
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        nurse,
                        hospitalizationId
                );

        return hospitalizationDetailServices.updateDailyHospitalAdmissionDetails(
                nurse,
                hospitalAdmission,
                request
        );
    }

    @Override
    public HospitalizationDetail getDailyHospitalAdmissionDetails(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            Date date
    ) {
        Date today = DateCommon.getEndOfDay(DateCommon.getToday());
        date = DateCommon.getStarOfDay(date);
        if (date.after(today)) {
            throw new BadRequestException("Date must be before today", 400);
        }

        Nurse nurse = nurseServices.getNurseByToken(inpatientNurseAuthorization);
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        nurse,
                        hospitalizationId
                );

        return hospitalizationDetailServices.getDailyHospitalAdmissionDetails(
                nurse,
                hospitalAdmission,
                date
        );
    }

    @Override
    public List<DoctorDetails> getDoctorsInDepartment(
            String inpatientNurseAuthorization
    ) {
        Nurse nurse = nurseServices.getNurseByToken(inpatientNurseAuthorization);
        Department department = nurse.getDepartment();
        if (department == null) {
            throw new BadRequestException("Nurse does not have department", 400);
        }

        List<Doctor> doctors = doctorServices
                .getDoctorsByDepartment(department);
        return doctors.stream()
                .map(DoctorDetails::new)
                .toList();
    }

    @Override
    public HospitalAdmissionResponse getGeneralInfoOfHospitalAdmission(
            String inpatientNurseAuthorization,
            UUID hospitalizationId
    ) {
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        inpatientNurseAuthorization,
                        hospitalizationId
                );

        return new HospitalAdmissionResponse(hospitalAdmission);
    }

    @Override
    public List<TreatmentMedicine> getMedicinesOfHospitalAdmission(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            Date date
    ) {
        HospitalizationDetail hospitalizationDetail = getDailyHospitalAdmissionDetails(
                inpatientNurseAuthorization,
                hospitalizationId,
                date
        );

        if (hospitalizationDetail.getTreatmentMedicines().isEmpty()) {
            // Subtract 1 day
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.DATE, -1);

            HospitalizationDetail yesterdayHospitalizationDetail = hospitalizationDetailServices
                    .getDailyHospitalAdmissionDetailsOrNull(
                            hospitalizationDetail.getNurse(),
                            hospitalizationDetail.getHospitalAdmission(),
                            calendar.getTime()
                    );
            if (yesterdayHospitalizationDetail == null) {
                return List.of();
            }

            return treatmentMedicineServices
                    .getTreatmentMedicinesByYesterdayHospitalizationDetail(
                            yesterdayHospitalizationDetail,
                            hospitalizationDetail
                    );
        }

        return treatmentMedicineServices
                .getTreatmentMedicinesByHospitalizationDetail(
                        hospitalizationDetail
                );
    }

    @Override
    public List<TreatmentMedicine> createTreatmentMedicine(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            CreateTreatmentMedicineRequest request
    ) {
        if (request.getQuantityPerTime() <= 0)
            throw new BadRequestException("Quantity per time must be greater than 0", 400);

        HospitalizationDetail hospitalizationDetail = getDailyHospitalAdmissionDetails(
                inpatientNurseAuthorization,
                hospitalizationId,
                DateCommon.getStarOfDay(request.getDate())
        );

        return treatmentMedicineServices
                .createTreatmentMedicinesByHospitalizationDetail(
                        hospitalizationDetail,
                        request
                );
    }

    @Override
    public List<TreatmentMedicine> deleteTreatmentMedicine(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            UUID treatmentMedicineId,
            boolean deleteFromTomorrow
    ) {
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        inpatientNurseAuthorization,
                        hospitalizationId
                );

        return treatmentMedicineServices
                .deleteTreatmentMedicine(
                        hospitalAdmission,
                        treatmentMedicineId,
                        deleteFromTomorrow
                );
    }

    @Override
    public List<DoctorMedicalTestResponse> getInpatientMedicalTestsByDate(
            String inpatientNurseAuthorization,
            UUID hospitalizationId,
            Date date
    ) {
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        inpatientNurseAuthorization,
                        hospitalizationId
                );

        List<MedicalTest> medicalTests = medicalTestServices
                .getMedicalTestsByHospitalAdmissionAndDate(
                        hospitalAdmission,
                        date
                );

        return medicalTests.stream()
                .map(DoctorMedicalTestResponse::new)
                .toList();
    }

    @Override
    public HospitalizationDetailResponse convertHospitalizationDetailDTO(
            HospitalizationDetail hospitalizationDetail
    ) {
        return new HospitalizationDetailResponse(hospitalizationDetail);
    }

    @Override
    public HospitalAdmissionInvoice getInvoicesOfHospitalAdmission(
            String inpatientNurseAuthorization,
            UUID hospitalizationId
    ) {
        HospitalAdmissionInvoice hospitalAdmissionInvoice = new HospitalAdmissionInvoice();
        HospitalAdmission hospitalAdmission = hospitalAdmissionServices
                .checkNursePermissionForHospitalAdmission(
                        inpatientNurseAuthorization,
                        hospitalizationId
                );
        Date admissionDate = hospitalAdmission.getAdmissionDate();
        Date today = DateCommon.getStarOfDay(
                DateCommon.getToday()
        );

        // Room Fee
        long days = DateCommon.getDaysBetween(admissionDate, today) + 1;
        InvoiceDetails roomFee = new InvoiceDetails();
        Room room = hospitalAdmission.getRoom();
        roomFee.setServiceName(room.getRoomType()
            == RoomType.TREATMENT_ROOM_STANDARD
                ? "Phòng điều trị thường"
                : "Phòng dịch vụ"
        );
        roomFee.setQuantity(days);
        roomFee.setUnitPrice(hospitalAdmission.getRoomFee());
        roomFee.setTotal(roomFee.getUnitPrice() * roomFee.getQuantity());

        // Medicine Fee
        List<InvoiceDetails> treatmentMedicineFees = treatmentMedicineServices
                .getTreatmentMedicineInvoices(hospitalAdmission);

        // Advance Fee
        hospitalAdmissionInvoice.setAdvanceFee(
                hospitalAdmissionInvoice.getAdvanceFee()
        );

        // Total Fee
        double totalProvisionalFee = roomFee.getTotal() + treatmentMedicineFees.stream()
                .mapToDouble(InvoiceDetails::getTotal)
                .sum();

        hospitalAdmissionInvoice.setGeneralInfo(new HospitalAdmissionResponse(hospitalAdmission));
        hospitalAdmissionInvoice.setPaymentCode(
                "DI" + hospitalAdmission.getHospitalAdmissionCode()
                        .substring(2)
        );
        hospitalAdmissionInvoice.setProvisionalFee(totalProvisionalFee);
        hospitalAdmissionInvoice.setAdvanceFee(
                hospitalAdmissionInvoice.getAdvanceFee()
        );
        hospitalAdmissionInvoice.setTotalFee(
                totalProvisionalFee - hospitalAdmissionInvoice.getAdvanceFee()
        );

        List<InvoiceDetails> details = new ArrayList<>(List.of(roomFee));
        details.addAll(treatmentMedicineFees);
        hospitalAdmissionInvoice.setDetails(details);

        return hospitalAdmissionInvoice;
    }
}
