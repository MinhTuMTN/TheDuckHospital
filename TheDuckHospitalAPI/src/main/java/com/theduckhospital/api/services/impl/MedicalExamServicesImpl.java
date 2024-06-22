package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.doctor.AddMedicine;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.doctor.HospitalAdmissionRequest;
import com.theduckhospital.api.dto.request.doctor.UpdateMedicalRecord;
import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.dto.response.PatientHistoryMedicalRecord;
import com.theduckhospital.api.dto.response.PatientHistoryRecordDetails;
import com.theduckhospital.api.dto.response.admin.MedicalRecordResponse;
import com.theduckhospital.api.dto.response.admin.PrescriptionItemResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalRecordResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalTestResponse;
import com.theduckhospital.api.dto.response.doctor.HistoryMedicalRecord;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

@Service
public class MedicalExamServicesImpl implements IMedicalExamServices {
    private final IBookingServices bookingServices;
    private final BookingRepository bookingRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final MedicalTestRepository medicalTestRepository;
    private final MedicalExaminationRepository medicalExaminationRepository;
    private final IDoctorServices doctorServices;
    private final IPatientServices patientServices;
    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionItemRepository prescriptionItemRepository;
    private final MedicineRepository medicineRepository;
    private final IAccountServices accountServices;
    private final HospitalAdmissionRepository hospitalAdmissionRepository;
    private final IMedicalTestServices medicalTestServices;

    public MedicalExamServicesImpl(
            IBookingServices bookingServices,
            BookingRepository bookingRepository,
            MedicalTestRepository medicalTestRepository,
            MedicalExaminationRepository medicalExaminationRepository,
            IPatientServices patientServices,
            PatientProfileRepository patientProfileRepository,
            IDoctorServices doctorServices,
            PrescriptionRepository prescriptionRepository,
            PrescriptionItemRepository prescriptionItemRepository,
            MedicineRepository medicineRepository,
            IAccountServices accountServices,
            HospitalAdmissionRepository hospitalAdmissionRepository,
            IMedicalTestServices medicalTestServices
    ) {
        this.bookingServices = bookingServices;
        this.bookingRepository = bookingRepository;
        this.medicalTestRepository = medicalTestRepository;
        this.medicalExaminationRepository = medicalExaminationRepository;
        this.patientServices = patientServices;
        this.patientProfileRepository = patientProfileRepository;
        this.doctorServices = doctorServices;
        this.prescriptionRepository = prescriptionRepository;
        this.prescriptionItemRepository = prescriptionItemRepository;
        this.medicineRepository = medicineRepository;
        this.accountServices = accountServices;
        this.hospitalAdmissionRepository = hospitalAdmissionRepository;
        this.medicalTestServices = medicalTestServices;
    }

    @Override
    public MedicalExaminationRecord createNonPatientMedicalExamRecord(
            NonPatientMedicalExamRequest request
    ) throws ParseException {
        Booking booking = bookingServices.bookingIsValid(
                request.getBookingCode(),
                request.getRoomId()
        );

        if (booking.getPatientProfile().getPatient() != null)
            throw new StatusCodeException("Patient is registered", 411);

        Optional<MedicalExaminationRecord> medicalExaminationRecordOptional =
                medicalExaminationRepository
                        .findByBooking_BookingCodeAndDeletedIsFalse(
                                booking.getBookingCode()
                        );
        if (medicalExaminationRecordOptional.isPresent())
            return medicalExaminationRecordOptional.get();

        // Create Patient
        Patient patient = patientServices.createPatient(
                request.getIdentityNumber(),
                booking.getPatientProfile()
        );

        return createMedicalExamRecord(booking, patient);
    }


    @Override
    public MedicalExaminationRecord createPatientMedicalExamRecord(PatientMedicalExamRequest request) throws ParseException {
        Booking booking = bookingServices.bookingIsValid(
                request.getBookingCode(),
                request.getRoomId()
        );

        if (booking.getPatientProfile().getPatient() == null)
            throw new StatusCodeException("Patient is not registered", 411);

        Optional<MedicalExaminationRecord> medicalExaminationRecordOptional =
                medicalExaminationRepository
                        .findByBooking_BookingCodeAndDeletedIsFalse(
                                booking.getBookingCode()
                        );
        return medicalExaminationRecordOptional
                .orElseGet(
                        () -> createMedicalExamRecord(
                                booking,
                                booking.getPatientProfile().getPatient()
                        )
                );

    }

    @Override
    public MedicalRecordItemResponse counterNurseCreateBookingAndMedicalRecord(
            NurseCreateBookingRequest request
    ) throws ParseException {
        // Find already exist booking
        Optional<Booking> bookingOptional = bookingRepository
                .nurseFindBooking(
                        request.getPatientProfileId(),
                        request.getDoctorScheduleId()
                );
        if (bookingOptional.isPresent())
            return new MedicalRecordItemResponse(bookingOptional.get());

        // Create booking if not exist
        Booking booking = bookingServices.counterNurseCreateBooking(
                request
        );
        if (booking == null)
            throw new BadRequestException("Create booking failed");

        MedicalExaminationRecord result = createPatientMedicalExamRecord(
                new PatientMedicalExamRequest(
                        booking.getBookingCode(),
                        booking.getTimeSlot().getDoctorSchedule().getRoom().getRoomId()
                )
        );

        if (result == null)
            throw new BadRequestException("Create medical examination record failed");

        return new MedicalRecordItemResponse(booking);
    }

    @Override
    public MedicalExaminationRecord acceptMedicalExamination(
            String authorization,
            UUID medicalExaminationId
    ) {
        return updateStateMedicalExamRecord(
                authorization,
                medicalExaminationId,
                MedicalExamState.PROCESSING
        );
    }

    @Override
    public DoctorMedicalRecordResponse doctorGetMedicalExamination(
            String authorization,
            UUID medicalExaminationId
    ) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        Department department = medicalExaminationRecord
                .getDoctorSchedule()
                .getMedicalService()
                .getDepartment();

        List<MedicalExaminationRecord> history = medicalExaminationRepository
                .findByPatientAndDoctorSchedule_MedicalService_DepartmentAndDeletedIsFalseAndDoctorSchedule_DateBefore(
                        medicalExaminationRecord.getPatient(),
                        department,
                        medicalExaminationRecord.getDoctorSchedule().getDate()
                );

        return new DoctorMedicalRecordResponse(medicalExaminationRecord, history);
    }

    @Override
    public List<DoctorMedicalTestResponse> doctorCreateMedicalTest(
            String authorization,
            UUID medicalExaminationId,
            CreateMedicalTest request
    ) throws ParseException {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );
        MedicalTest medicalTest = medicalTestServices.createMedicalTest(
                request,
                medicalExaminationRecord,
                null
        );

        List<MedicalTest> medicalTests = medicalExaminationRecord.getMedicalTest();
        medicalTests.add(medicalTest);
        medicalExaminationRecord.setMedicalTest(medicalTests);
        medicalExaminationRepository.save(medicalExaminationRecord);

        return medicalTests.stream()
                .filter(medicalTest1 -> !medicalTest1.isDeleted())
                .map(DoctorMedicalTestResponse::new)
                .toList();
    }

    @Override
    public List<DoctorMedicalTestResponse> doctorGetMedicalTests(String authorization, UUID medicalExaminationId) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        return medicalExaminationRecord.getMedicalTest()
                .stream()
                .filter(medicalTest -> !medicalTest.isDeleted())
                .map(DoctorMedicalTestResponse::new)
                .toList();
    }

    @Override
    public List<DoctorMedicalTestResponse> doctorDeleteMedicalTest(String authorization, UUID medicalExaminationId, UUID medicalTestId) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        List<MedicalTest> medicalTests = medicalExaminationRecord.getMedicalTest();
        MedicalTest medicalTest = medicalTests
                .stream()
                .filter(medicalTest1 -> medicalTest1
                        .getMedicalTestId()
                        .equals(medicalTestId)
                )
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Medical Test not found"));

        medicalTest.setDeleted(true);
        medicalTestRepository.save(medicalTest);

        return medicalTests
                .stream()
                .filter(medicalTest1 -> !medicalTest1.isDeleted())
                .map(DoctorMedicalTestResponse::new)
                .toList();
    }

    @Override
    public DoctorMedicalRecordResponse doctorUpdateMedicalRecord(String authorization, UUID medicalExaminationId, UpdateMedicalRecord request) throws ParseException {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        // Check re-examination date is valid
        if (request.getDateOfReExamination() != null) {
            if (request.getDateOfReExamination().before(DateCommon.getToday())) {
                throw new BadRequestException("Re-examination date is invalid");
            }
        }

        medicalExaminationRecord.setSymptom(request.getSymptom());
        medicalExaminationRecord.setDiagnosis(request.getDiagnosis());
        medicalExaminationRecord.setReExaminationDate(request.getDateOfReExamination());
        medicalExaminationRepository.save(medicalExaminationRecord);

        Department department = medicalExaminationRecord
                .getDoctorSchedule()
                .getMedicalService()
                .getDepartment();

        List<MedicalExaminationRecord> history = medicalExaminationRepository
                .findByPatientAndDoctorSchedule_MedicalService_DepartmentAndDeletedIsFalseAndDoctorSchedule_DateBefore(
                        medicalExaminationRecord.getPatient(),
                        department,
                        medicalExaminationRecord.getDoctorSchedule().getDate()
                );

        return new DoctorMedicalRecordResponse(
                medicalExaminationRecord,
                history
        );
    }

    @Override
    public List<PrescriptionItem> doctorAddMedicine(
            String authorization,
            UUID medicalExaminationId,
            AddMedicine request
    ) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        Prescription prescription = medicalExaminationRecord.getPrescription();
        if (prescription == null) {
            prescription = new Prescription();
            prescription.setMedicalExaminationRecord(medicalExaminationRecord);
            prescription.setPharmacist(null);
            prescription.setPrescriptionItems(new ArrayList<>());
            prescription.setTotalCost(0);

            prescriptionRepository.save(prescription);
        }

        List<PrescriptionItem> prescriptionItems = prescription.getPrescriptionItems();
        PrescriptionItem alreadyExist = prescriptionItems
                .stream()
                .filter(prescriptionItem1 ->
                        prescriptionItem1
                                .getMedicine()
                                .getMedicineId() == request.getMedicineId()
                        && !prescriptionItem1.isDeleted()
                )
                .findFirst()
                .orElse(null);

        if (alreadyExist != null) {
            alreadyExist.setDeleted(true);
            prescriptionItems.remove(alreadyExist);
            prescriptionItemRepository.save(alreadyExist);

            prescription.setTotalCost(
                    prescription.getTotalCost() - alreadyExist.getTotalCost()
            );
        }

        PrescriptionItem prescriptionItem = createPrescriptionItem(
                prescription,
                request
        );
        prescriptionItems.add(prescriptionItem);
        prescription.setPrescriptionItems(prescriptionItems);

        prescription.setTotalCost(
                prescription.getTotalCost() + prescriptionItem.getTotalCost()
        );
        prescriptionRepository.save(prescription);

        return prescriptionItems.stream()
                .filter(prescriptionItem1 -> !prescriptionItem1.isDeleted())
                .toList();
    }

    @Override
    public List<PrescriptionItem> doctorGetMedicines(String authorization, UUID medicalExaminationId) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        Prescription prescription = medicalExaminationRecord.getPrescription();
        if (prescription == null)
            return new ArrayList<>();

        return prescription.getPrescriptionItems().stream().filter(
                prescriptionItem -> !prescriptionItem.isDeleted()
        ).toList();
    }

    @Override
    public List<PrescriptionItem> doctorDeleteMedicine(String authorization, UUID medicalExaminationId, UUID prescriptionItemId) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        Prescription prescription = medicalExaminationRecord.getPrescription();
        if (prescription == null)
            return new ArrayList<>();

        List<PrescriptionItem> prescriptionItems = prescription.getPrescriptionItems();
        PrescriptionItem prescriptionItem = prescriptionItems
                .stream()
                .filter(prescriptionItem1 -> prescriptionItem1
                        .getPrescriptionItemId()
                        .equals(prescriptionItemId)
                )
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Prescription Item not found"));

        prescriptionItem.setDeleted(true);
        prescriptionItemRepository.save(prescriptionItem);

        prescription.setTotalCost(
                prescription.getTotalCost() - prescriptionItem.getTotalCost()
        );
        prescriptionRepository.save(prescription);

        return prescriptionItems.stream().filter(
                prescriptionItem1 -> !prescriptionItem1.isDeleted()
        ).toList();
    }

    @Override
    public HistoryMedicalRecord doctorGetHistoryMedicalExamination(
            String authorization,
            UUID medicalExaminationId,
            UUID historyId) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        MedicalExaminationRecord historyRecord = medicalExaminationRepository
                .findById(historyId).orElseThrow(
                        () -> new NotFoundException("History not found")
                );

        if (historyRecord.isDeleted() || !historyRecord.getPatient().equals(medicalExaminationRecord.getPatient()))
            throw new BadRequestException("History is deleted or not belong to this patient");


        return new HistoryMedicalRecord(historyRecord);
    }

    @Override
    public MedicalExaminationRecord completeMedicalExamination(String authorization, UUID medicalExaminationId) {
        return updateStateMedicalExamRecord(
                authorization,
                medicalExaminationId,
                MedicalExamState.DONE
        );
    }

    @Override
    public List<PatientHistoryMedicalRecord> patientGetMedicalRecords(String authorization) {
        Account account = accountServices.findAccountByToken(authorization);

        List<PatientProfile> patientProfiles = account
                .getPatientProfile()
                .stream()
                .filter(patientProfile -> !patientProfile.isDeleted())
                .toList();

        List<PatientHistoryMedicalRecord> patientHistoryMedicalRecords = new ArrayList<>();
        for (PatientProfile patientProfile : patientProfiles) {
            Pageable pageable = PageRequest.of(0, 5);
            List<MedicalExaminationRecord> medicalExaminationRecords = medicalExaminationRepository
                    .findByPatientProfileAndDeletedIsFalseAndStateOrderByDoctorSchedule_CreatedDateDesc(
                            patientProfile,
                            MedicalExamState.DONE,
                            pageable
                    ).toList();

            patientHistoryMedicalRecords.add(
                    new PatientHistoryMedicalRecord(
                            patientProfile.getFullName(),
                            medicalExaminationRecords
                    )
            );
        }

        return patientHistoryMedicalRecords;
    }

    @Override
    public PatientHistoryRecordDetails patientGetMedicalRecordDetails(
            String authorization,
            UUID medicalRecordId
    ) {
        Account account = accountServices.findAccountByToken(authorization);

        MedicalExaminationRecord medicalExaminationRecord = medicalExaminationRepository
                .findById(medicalRecordId)
                .orElseThrow(() -> new NotFoundException("Medical Examination Record not found"));

        if (medicalExaminationRecord.isDeleted() ||
                !medicalExaminationRecord
                        .getPatientProfile()
                        .getAccount().equals(account))
            throw new BadRequestException("Medical Examination Record is deleted or not belong to this patient");

        return new PatientHistoryRecordDetails(medicalExaminationRecord);
    }

    @Override
    public HospitalAdmission doctorHospitalAdmission(
            String authorization,
            UUID medicalExaminationId,
            HospitalAdmissionRequest request
    ) {
        Doctor doctor = doctorServices.getDoctorByToken(authorization);
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        HospitalAdmission hospitalAdmission;
        HospitalAdmission oldHospitalAdmission = medicalExaminationRecord.getHospitalAdmission();
        if (oldHospitalAdmission != null) {
            if (oldHospitalAdmission.getState() == HospitalAdmissionState.WAITING_FOR_PAYMENT)
                hospitalAdmission = oldHospitalAdmission;
            else
                throw new BadRequestException(("Hospital Admission cannot be updated"));
        } else {
            hospitalAdmission = new HospitalAdmission();
            hospitalAdmission.setMedicalExaminationRecord(medicalExaminationRecord);
        }

        hospitalAdmission.setDoctor(doctor);
        hospitalAdmission.setDoctorName(doctor.getFullName());
        hospitalAdmission.setPatientProfile(medicalExaminationRecord.getPatientProfile());
        hospitalAdmission.setDepartment(doctor.getDepartment());
        hospitalAdmission.setAdmissionDate(request.getAdmissionDate());
        hospitalAdmission.setSymptom(request.getSymptom());
        hospitalAdmission.setDiagnosis(request.getDiagnosis());
        hospitalAdmissionRepository.save(hospitalAdmission);

        medicalExaminationRecord.setSymptom(request.getSymptom());
        medicalExaminationRecord.setDiagnosis(request.getDiagnosis());
        medicalExaminationRepository.save(medicalExaminationRecord);

        return hospitalAdmission;
    }

    private PrescriptionItem createPrescriptionItem(
            Prescription prescription,
            AddMedicine request
    ) {
        Medicine medicine = medicineRepository.findById(
                request.getMedicineId()
        ).orElseThrow(() -> new NotFoundException("Medicine not found")
        );

        if (medicine.isDeleted())
            throw new BadRequestException("Medicine is deleted");

        PrescriptionItem prescriptionItem = new PrescriptionItem();
        prescriptionItem.setPrescription(prescription);
        prescriptionItem.setPrescriptionCode(prescription.getPrescriptionCode());
        prescriptionItem.setMedicine(medicine);
        prescriptionItem.setPrice(medicine.getPrice());
        prescriptionItem.setQuantity(request.getQuantity());
        prescriptionItem.setTotalCost(
                medicine.getPrice() * request.getQuantity()
        );

        prescriptionItem.setTimesPerDay(request.getTimesPerDay());
        prescriptionItem.setDays(request.getDays());
        prescriptionItem.setQuantityPerTime(request.getQuantityPerTime());
        prescriptionItem.setMorning(request.isMorning());
        prescriptionItem.setNoon(request.isNoon());
        prescriptionItem.setAfternoon(request.isAfternoon());
        prescriptionItem.setEvening(request.isEvening());

        prescriptionItem.setDosageInstruction(
                request.getNote()
        );
        prescriptionItemRepository.save(prescriptionItem);

        return prescriptionItem;
    }

    private MedicalExaminationRecord updateStateMedicalExamRecord(
            String authorization,
            UUID medicalExaminationId,
            MedicalExamState state
    ) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        medicalExaminationRecord.setState(state);
        medicalExaminationRepository.save(medicalExaminationRecord);

        return medicalExaminationRecord;
    }

    private MedicalExaminationRecord doctorGetMedicalExamRecord(
            String authorization,
            UUID medicalExaminationId
    ) {
        Doctor doctor = doctorServices.getDoctorByToken(authorization);

        MedicalExaminationRecord medicalExaminationRecord = medicalExaminationRepository
                .findById(medicalExaminationId)
                .orElseThrow(() -> new NotFoundException("Medical Examination Record not found"));

        if (medicalExaminationRecord.isDeleted())
            throw new BadRequestException("Medical Examination Record is deleted");

        if (!medicalExaminationRecord
                .getDoctorSchedule()
                .getDoctor()
                .getStaffId()
                .equals(doctor.getStaffId())
        )
            throw new BadRequestException("You are not the doctor of this medical examination record");

        return medicalExaminationRecord;
    }

    private MedicalExaminationRecord createMedicalExamRecord(Booking booking, Patient patient) {
        MedicalExaminationRecord medicalExaminationRecord = new MedicalExaminationRecord();
        medicalExaminationRecord.setPatient(patient);
        medicalExaminationRecord.setBooking(booking);
        medicalExaminationRecord.setPatientProfile(booking.getPatientProfile());
        medicalExaminationRecord.setDoctorSchedule(booking.getTimeSlot().getDoctorSchedule());

        medicalExaminationRepository.save(medicalExaminationRecord);

        booking.setMedicalExaminationRecord(medicalExaminationRecord);
        bookingRepository.save(booking);

        return medicalExaminationRecord;
    }

    @Override
    public List<MedicalRecordResponse> getMedicalRecordsByPatientProfile(UUID patientProfileId) {
        Optional<PatientProfile> optional = patientProfileRepository.findById(patientProfileId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Patient Profile not found");
        }

        PatientProfile patientProfile = optional.get();

        List<MedicalExaminationRecord> medicalExaminationRecords = patientProfile.getMedicalExaminationRecords();
        List<MedicalRecordResponse> medicalRecordResponses = new ArrayList<>();

        for (MedicalExaminationRecord medicalExaminationRecord : medicalExaminationRecords) {
            Prescription prescription = medicalExaminationRecord.getPrescription();
            List<PrescriptionItem> prescriptionItems;
            List<PrescriptionItemResponse> prescriptionItemResponses = new ArrayList<>();
            if (prescription != null) {
                prescriptionItems = medicalExaminationRecord.getPrescription().getPrescriptionItems();
                for (PrescriptionItem prescriptionItem : prescriptionItems) {
                    if(!prescriptionItem.isDeleted()) {
                        prescriptionItemResponses.add(new PrescriptionItemResponse(prescriptionItem));
                    }
                }
            }

            medicalRecordResponses.add(new MedicalRecordResponse(medicalExaminationRecord, prescriptionItemResponses));

        }

        return medicalRecordResponses;
    }
}
