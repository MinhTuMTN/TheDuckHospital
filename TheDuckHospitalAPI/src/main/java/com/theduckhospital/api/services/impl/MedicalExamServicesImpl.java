package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.repository.MedicalExaminationRepository;
import com.theduckhospital.api.services.IBookingServices;
import com.theduckhospital.api.services.IMedicalExamServices;
import com.theduckhospital.api.services.IPatientServices;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MedicalExamServicesImpl implements IMedicalExamServices {
    private final IBookingServices bookingServices;
    private final MedicalExaminationRepository medicalExaminationRepository;
    private final IPatientServices patientServices;

    public MedicalExamServicesImpl(
            IBookingServices bookingServices,
            MedicalExaminationRepository medicalExaminationRepository,
            IPatientServices patientServices) {
        this.bookingServices = bookingServices;
        this.medicalExaminationRepository = medicalExaminationRepository;
        this.patientServices = patientServices;
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
            throw new BadRequestException("Patient is registered");

        Optional<MedicalExaminationRecord> medicalExaminationRecordOptional =
                medicalExaminationRepository.findByBookingAndDeletedIsFalse(booking);
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
            throw new BadRequestException("Patient is not registered");

        Optional<MedicalExaminationRecord> medicalExaminationRecordOptional =
                medicalExaminationRepository.findByBookingAndDeletedIsFalse(booking);
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

        return medicalExaminationRepository.save(medicalExaminationRecord);
    }
}
