package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.constant.ServiceType;
import com.theduckhospital.api.dto.request.doctor.CreateMedicalTest;
import com.theduckhospital.api.dto.request.doctor.UpdateMedicalRecord;
import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.dto.response.admin.MedicalRecordResponse;
import com.theduckhospital.api.dto.response.admin.PrescriptionItemResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalRecordResponse;
import com.theduckhospital.api.dto.response.doctor.DoctorMedicalTestResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.dto.response.MedicalRecordItemResponse;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.MedicalExaminationRepository;
import com.theduckhospital.api.repository.MedicalTestRepository;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.services.*;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

@Service
public class MedicalExamServicesImpl implements IMedicalExamServices {
    private final IBookingServices bookingServices;
    private final BookingRepository bookingRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final IMedicalServiceServices medicalServiceServices;
    private final MedicalTestRepository medicalTestRepository;
    private final MedicalExaminationRepository medicalExaminationRepository;
    private final IDoctorServices doctorServices;
    private final IPatientServices patientServices;

    public MedicalExamServicesImpl(
            IBookingServices bookingServices,
            BookingRepository bookingRepository,
            IMedicalServiceServices medicalServiceServices, MedicalTestRepository medicalTestRepository, MedicalExaminationRepository medicalExaminationRepository,
            IPatientServices patientServices,
            PatientProfileRepository patientProfileRepository,
            IDoctorServices doctorServices
    ) {
        this.bookingServices = bookingServices;
        this.bookingRepository = bookingRepository;
        this.medicalServiceServices = medicalServiceServices;
        this.medicalTestRepository = medicalTestRepository;
        this.medicalExaminationRepository = medicalExaminationRepository;
        this.patientServices = patientServices;
        this.patientProfileRepository = patientProfileRepository;
        this.doctorServices = doctorServices;
    }

    @Override
    public MedicalExaminationRecord createNonPatientMedicalExamRecord(
            NonPatientMedicalExamRequest request
    ) {
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
    public MedicalExaminationRecord createPatientMedicalExamRecord(PatientMedicalExamRequest request) {
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
    public MedicalRecordItemResponse nurseCreateMedicalExamRecord(NurseCreateBookingRequest request) {
        Optional<Booking> bookingOptional = bookingRepository
                .nurseFindBooking(
                        request.getPatientProfileId(),
                        request.getDoctorScheduleId()
                );
        if (bookingOptional.isPresent())
            return new MedicalRecordItemResponse(bookingOptional.get());

        Booking booking = bookingServices.nurseCreateMedicalExamRecord(
                request
        );
        if (booking == null)
            throw new BadRequestException("Create booking failed");

        MedicalExaminationRecord result = createPatientMedicalExamRecord(
                new PatientMedicalExamRequest(
                        booking.getBookingCode(),
                        booking.getDoctorSchedule().getRoom().getRoomId()
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

        return new DoctorMedicalRecordResponse(medicalExaminationRecord);
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

        Date today = DateCommon.getToday();
        MedicalService medicalService = medicalServiceServices
                .getMedicalServiceByIdAndServiceType(
                        request.getServiceId(),
                        ServiceType.MedicalTest
                );

        MedicalTest medicalTest = new MedicalTest();
        medicalTest.setMedicalService(medicalService);
        medicalTest.setMedicalExaminationRecord(medicalExaminationRecord);
        medicalTest.setNote(
                request.getNote()
        );
        medicalTest.setPrice(
                medicalService.getPrice()
        );
        medicalTest.setQueueNumber(
                (int) (medicalTestRepository
                        .countByMedicalServiceAndDateAndDeletedIsFalse(
                                medicalService,
                                today
                        ) + 1
                )
        );
        medicalTest.setDate(today);

        medicalTestRepository.save(medicalTest);

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
    public DoctorMedicalRecordResponse doctorUpdateMedicalRecord(String authorization, UUID medicalExaminationId, UpdateMedicalRecord request) {
        MedicalExaminationRecord medicalExaminationRecord = doctorGetMedicalExamRecord(
                authorization,
                medicalExaminationId
        );

        medicalExaminationRecord.setSymptom(request.getSymptom());
        medicalExaminationRecord.setDiagnosis(request.getDiagnosis());
        medicalExaminationRepository.save(medicalExaminationRecord);

        return new DoctorMedicalRecordResponse(medicalExaminationRecord);
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
        medicalExaminationRecord.setDoctorSchedule(booking.getDoctorSchedule());

        medicalExaminationRepository.save(medicalExaminationRecord);

        booking.setMedicalExaminationRecord(medicalExaminationRecord);
        bookingRepository.save(booking);

        return medicalExaminationRecord;
    }

    @Override
    public List<MedicalRecordResponse> getMedicalRecordsByPatientProfile(UUID patientProfileId) {
        Optional<PatientProfile> optional = patientProfileRepository.findById(patientProfileId);
        if(optional.isEmpty()) {
            throw new NotFoundException("Patient Profile not found");
        }

        PatientProfile patientProfile = optional.get();

        List<MedicalExaminationRecord> medicalExaminationRecords = patientProfile.getMedicalExaminationRecords();
        List<MedicalRecordResponse> medicalRecordResponses = new ArrayList<>();

        for (MedicalExaminationRecord medicalExaminationRecord : medicalExaminationRecords) {
            Prescription prescription = medicalExaminationRecord.getPrescription();
            List<PrescriptionItem> prescriptionItems;
            List<PrescriptionItemResponse> prescriptionItemResponses = new ArrayList<>();
            if(prescription != null) {
                prescriptionItems = medicalExaminationRecord.getPrescription().getPrescriptionItems();
                for (PrescriptionItem prescriptionItem : prescriptionItems) {
                    prescriptionItemResponses.add(new PrescriptionItemResponse(prescriptionItem));
                }
            }

            medicalRecordResponses.add(new MedicalRecordResponse(medicalExaminationRecord, prescriptionItemResponses));

        }

        return medicalRecordResponses;
    }
}
