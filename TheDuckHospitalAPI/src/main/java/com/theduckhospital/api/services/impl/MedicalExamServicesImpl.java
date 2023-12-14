package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.dto.response.admin.MedicalRecordResponse;
import com.theduckhospital.api.dto.response.admin.PrescriptionItemResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.MedicalExaminationRepository;
import com.theduckhospital.api.repository.PatientProfileRepository;
import com.theduckhospital.api.services.IBookingServices;
import com.theduckhospital.api.services.IMedicalExamServices;
import com.theduckhospital.api.services.IPatientServices;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MedicalExamServicesImpl implements IMedicalExamServices {
    private final IBookingServices bookingServices;
    private final BookingRepository bookingRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final MedicalExaminationRepository medicalExaminationRepository;
    private final IPatientServices patientServices;

    public MedicalExamServicesImpl(
            IBookingServices bookingServices,
            BookingRepository bookingRepository,
            MedicalExaminationRepository medicalExaminationRepository,
            IPatientServices patientServices,
            PatientProfileRepository patientProfileRepository
            ) {
        this.bookingServices = bookingServices;
        this.bookingRepository = bookingRepository;
        this.medicalExaminationRepository = medicalExaminationRepository;
        this.patientServices = patientServices;
        this.patientProfileRepository = patientProfileRepository;
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
