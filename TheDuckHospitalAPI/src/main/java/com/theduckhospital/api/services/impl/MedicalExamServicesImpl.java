package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.request.nurse.NonPatientMedicalExamRequest;
import com.theduckhospital.api.dto.request.nurse.PatientMedicalExamRequest;
import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.entity.MedicalExaminationRecord;
import com.theduckhospital.api.entity.Patient;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.repository.MedicalExaminationRepository;
import com.theduckhospital.api.services.IBookingServices;
import com.theduckhospital.api.services.IMedicalExamServices;
import com.theduckhospital.api.services.IPatientServices;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MedicalExamServicesImpl implements IMedicalExamServices {
    private final IBookingServices bookingServices;
    private final BookingRepository bookingRepository;
    private final MedicalExaminationRepository medicalExaminationRepository;
    private final IPatientServices patientServices;

    public MedicalExamServicesImpl(
            IBookingServices bookingServices,
            BookingRepository bookingRepository, MedicalExaminationRepository medicalExaminationRepository,
            IPatientServices patientServices) {
        this.bookingServices = bookingServices;
        this.bookingRepository = bookingRepository;
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
}
