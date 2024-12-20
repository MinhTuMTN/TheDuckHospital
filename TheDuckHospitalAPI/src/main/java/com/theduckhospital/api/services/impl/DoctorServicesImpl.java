package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.Degree;
import com.theduckhospital.api.constant.ScheduleType;
import com.theduckhospital.api.dto.response.DoctorItemResponse;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.RatingItemResponse;
import com.theduckhospital.api.dto.response.admin.*;
import com.theduckhospital.api.dto.response.doctor.HeadDoctorResponse;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.security.JwtTokenProvider;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class DoctorServicesImpl implements IDoctorServices {
    private final DoctorRepository doctorRepository;
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final MedicalExaminationRepository medicalExaminationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountRepository accountRepository;
    private final RatingRepository ratingRepository;
    private final IDepartmentServices departmentServices;

    public DoctorServicesImpl(
            DoctorRepository doctorRepository,
            DoctorScheduleRepository doctorScheduleRepository, JwtTokenProvider jwtTokenProvider,
            AccountRepository accountRepository,
            RatingRepository ratingRepository,
            IDepartmentServices departmentServices,
            MedicalExaminationRepository medicalExaminationRepository
    ) {
        this.doctorRepository = doctorRepository;
        this.doctorScheduleRepository = doctorScheduleRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.accountRepository = accountRepository;
        this.departmentServices = departmentServices;
        this.medicalExaminationRepository = medicalExaminationRepository;
        this.ratingRepository = ratingRepository;
    }

    @Override
    public boolean deleteHeadDoctor(UUID staffId) {
        Doctor doctor = getDoctorById(staffId);
        doctor.setHeadOfDepartment(false);
        doctorRepository.save(doctor);

        return true;
    }

    @Override
    public Doctor getDoctorById(UUID staffId) {
        Optional<Doctor> optional = doctorRepository.findById(staffId);
        if (optional.isEmpty()) {
            throw new NotFoundException("Doctor not found");
        }

        return optional.get();
    }

    @Override
    public List<Doctor> getDoctorNotInDepartment() {
        return doctorRepository.findByDepartmentIsNull();
    }

    public Doctor getDoctorByToken(String token) {
        // Remove "Bearer " from token
        token = token.substring(7);

        UUID userId = UUID.fromString(jwtTokenProvider.getUserIdFromJwt(token));
        Account account = accountRepository.findById(userId).orElseThrow(() -> new NotFoundException("Account not found"));
        if (account.isDeleted())
            throw new NotFoundException("Account not found");

        if (account.getStaff() == null)
            throw new NotFoundException("Doctor not found");

        Doctor doctor = doctorRepository.findById(account.getStaff().getStaffId())
                .orElseThrow(() -> new NotFoundException("Doctor not found"));
        if (doctor.isDeleted())
            throw new NotFoundException("Doctor not found");

        return doctor;
    }

    @Override
    public FilteredActiveDoctorsResponse getPaginationActiveDoctorsDepartment(
            String authorization,
            String search,
            int page,
            int limit
    ) {
        Doctor headDoctor = getDoctorByToken(authorization);
        if (!headDoctor.isHeadOfDepartment()) {
            throw new RuntimeException("You are not head of department");
        }

        Department department = headDoctor.getDepartment();

        Pageable pageable = PageRequest.of(page, limit);
        Page<Doctor> doctorPage = doctorRepository
                .findByFullNameContainingAndDeletedFalseAndDepartment(search, department, pageable);

        List<ActiveDoctorResponse> filteredDoctors = new ArrayList<>();

        for (Doctor doctor : doctorPage.getContent()) {
            filteredDoctors.add(new ActiveDoctorResponse(doctor));
        }

        return new FilteredActiveDoctorsResponse(
                filteredDoctors,
                doctorRepository.countByDeletedFalseAndDepartment(department),
                page,
                limit);
    }

    @Override
    public PaginationResponse getMedicalExaminationDoctors(
            String fullName,
            Integer departmentId,
            Degree degree,
            int page,
            int limit
    ) {
        Pageable pageable = PageRequest.of(page - 1, limit);
        Department department = departmentId == null
                ? null
                : departmentServices.getDepartmentById(departmentId);
        String departmentName = department == null
                ? ""
                : department.getDepartmentName();
        Page<Doctor> doctors = doctorRepository
                .findDoctorsForBooking(
                        fullName,
                        degree,
                        departmentName,
                        DateCommon.getToday(),
                        ScheduleType.EXAMINATION,
                        pageable
                );

        List<DoctorItemResponse> results = new ArrayList<>();
        AtomicInteger removeCount = new AtomicInteger();
        for (Doctor doctor : doctors.getContent()) {
            List<DoctorSchedule> doctorSchedules = doctorScheduleRepository
                    .findValidSchedulesForBooking(
                            doctor,
                            DateCommon.getStarOfDay(DateCommon.getToday()),
                            ScheduleType.EXAMINATION
                    );

            if (doctorSchedules.isEmpty()) {
                removeCount.getAndIncrement();
            } else {
                doctor.setDoctorSchedules(doctorSchedules);

                double price = doctorSchedules.get(0)
                                .getMedicalService()
                                        .getPrice();
                results.add(new DoctorItemResponse(doctor, doctorSchedules, price));
            }
        }

        int totalElements = (int) doctors.getTotalElements() - removeCount.get();
        int totalPages = (int) Math.ceil((double) totalElements / limit);


        return PaginationResponse.builder()
                .totalPages(totalPages)
                .totalItems(totalElements)
                .page(page)
                .limit(limit)
                .items(results)
                .build();
    }

    @Override
    public Doctor findHeadDoctor(Department department) {
        Optional<Doctor> optional = doctorRepository.findByDepartmentAndHeadOfDepartmentIsTrue(department);
        return optional.orElse(null);
        //        if (department.getDoctors() != null) {
//            return department.getDoctors().stream()
//                    .filter(Doctor::isHeadOfDepartment)
//                    .findFirst()
//                    .orElse(null);
//        }
//        return null;
    }

    @Override
    public List<HeadDoctorResponse> getAllHeadDoctors() {
        return doctorRepository.findAllByHeadOfDepartmentIsTrue().stream()
                .map(doctor -> new HeadDoctorResponse(doctor, doctor.getDepartment()))
                .collect(Collectors.toList());
    }

    @Override
    public PatientStatisticsResponse getPatientStatistics(Date startDate, Date endDate, UUID staffId) {
        Calendar startDateCalendar = DateCommon.getCalendar(startDate);
        Calendar endDateCalendar = DateCommon.getCalendar(endDate);

        endDateCalendar.set(Calendar.HOUR_OF_DAY, 23);
        endDateCalendar.set(Calendar.MINUTE, 59);
        endDateCalendar.set(Calendar.SECOND, 59);
        endDateCalendar.set(Calendar.MILLISECOND, 99);

        List<Object[]> patients = medicalExaminationRepository.countPatientsByCreatedAtBetweenAndDeletedIsFalse(
                startDateCalendar.getTime(),
                endDateCalendar.getTime(),
                staffId
        );

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM");

        List<Long> values = patients.stream()
                .map(entry -> (Long) entry[1])
                .collect(Collectors.toList());

        List<String> labels = patients.stream()
                .map(entry -> dateFormat.format((Date) entry[0]))
                .collect(Collectors.toList());


        return new PatientStatisticsResponse(values, labels);
    }

    @Override
    public RatingStatisticsResponse getReviews(UUID staffId) {
        Doctor doctor = getDoctorById(staffId);
        List<Rating> ratings = ratingRepository.findByDoctorAndDeletedIsFalseOrderByRatingPointDescCreatedAtDesc(doctor);

        Map<Integer, Long> defaultRatingStatistics = new TreeMap<>(Comparator.reverseOrder());
        for (int i = 1; i <= 5; i++) {
            defaultRatingStatistics.put(i, 0L);
        }

        Map<Integer, Long> ratingStatistics = ratings.stream()
                .collect(Collectors.groupingBy(
                        Rating::getRatingPoint,
                        () -> new TreeMap<>(Comparator.reverseOrder()),
                        Collectors.counting()
                ));

        defaultRatingStatistics.forEach((ratingPoint, count) ->
                ratingStatistics.merge(ratingPoint, count, Long::sum));

        List<RatingItemResponse> ratingResponse = new ArrayList<>();
        for (Rating rating: ratings) {
            ratingResponse.add(new RatingItemResponse(rating));
        }

        return new RatingStatisticsResponse(ratingResponse, ratings.size(), doctor.getRating(), ratingStatistics);
    }

    @Override
    public List<Doctor> getDoctorsByDepartment(Department department) {
        return doctorRepository.findDoctorsByDepartmentAndDeletedIsFalse(department);
    }
}
