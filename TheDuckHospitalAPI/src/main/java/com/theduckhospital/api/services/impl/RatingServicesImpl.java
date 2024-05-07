package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.*;
import com.theduckhospital.api.dto.request.BookingRequest;
import com.theduckhospital.api.dto.request.admin.AddRatingRequest;
import com.theduckhospital.api.dto.request.admin.CreateServicesRequest;
import com.theduckhospital.api.dto.request.nurse.NurseCreateBookingRequest;
import com.theduckhospital.api.dto.response.*;
import com.theduckhospital.api.dto.response.nurse.NurseBookingItemResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.BadRequestException;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.error.StatusCodeException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.util.*;

@Service
public class RatingServicesImpl implements IRatingServices {
    private final RatingRepository ratingRepository;
    private final DoctorRepository doctorRepository;
    private final BookingRepository bookingRepository;
    private final IPatientServices patientServices;

    public RatingServicesImpl(
            RatingRepository ratingRepository,
            DoctorRepository doctorRepository,
            BookingRepository bookingRepository,
            IPatientServices patientServices
    ) {
        this.ratingRepository = ratingRepository;
        this.doctorRepository = doctorRepository;
        this.bookingRepository = bookingRepository;
        this.patientServices = patientServices;
    }

    @Override
    public Rating addRating(AddRatingRequest request) {
//        Patient patient = patientServices.findPatientByPatientCode(request.getPatientCode());
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new NotFoundException("Phiếu đặt khám không tồn tại"));
        Doctor doctor = booking.getMedicalExaminationRecord().getDoctorSchedule().getDoctor();
        Patient patient = patientServices.findPatientByPatientCode(request.getPatientCode());

        Rating rating = new Rating();

        rating.setDoctor(doctor);
        rating.setPatient(patient);
        rating.setReview(request.getReview());
        rating.setBooking(booking);
        rating.setRatingPoint(request.getRating());

        int numberOfRatings = doctor.getRatings().size();

        double newAverageRating = (doctor.getRating() + request.getRating())/(numberOfRatings + 1);

        doctor.setRating(Math.round(newAverageRating * 10) / 10.0);
        doctorRepository.save(doctor);

        booking.setRated(true);
        bookingRepository.save(booking);

        return ratingRepository.save(rating);
    }

    @Override
    public RatingResponse getRatingByBookingId(UUID bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Phiếu đặt khám không tồn tại"));

        if (booking.getMedicalExaminationRecord() == null) {
            throw new NotFoundException("Bệnh nhân chưa khám bệnh");
        }

        if (!booking.isRated()) {
            throw new NotFoundException("Bệnh nhân chưa đánh giá");
        }

        return new RatingResponse(booking);
    }
}
