package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.admin.DoctorItemStatisticsResponse;
import com.theduckhospital.api.dto.response.HomeStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.*;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IStatisticsServices;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class StatisticsServicesImpl implements IStatisticsServices {
    private final DepartmentRepository departmentRepository;
    private final BookingRepository bookingRepository;
    private final PatientRepository patientRepository;
    private final TransactionRepository transactionRepository;
    private final DoctorRepository doctorRepository;
    private final NurseRepository nurseRepository;
    private final MedicalExaminationRepository medicalExaminationRepository;

    private final IDoctorServices doctorServices;
    private final IDepartmentServices departmentServices;

    public StatisticsServicesImpl(IDoctorServices doctorServices,
                                  DepartmentRepository departmentRepository,
                                  BookingRepository bookingRepository,
                                  PatientRepository patientRepository,
                                  TransactionRepository transactionRepository,
                                  DoctorRepository doctorRepository,
                                  IDepartmentServices departmentServices,
                                  NurseRepository nurseRepository,
                                  MedicalExaminationRepository medicalExaminationRepository
    ) {
        this.doctorServices = doctorServices;
        this.departmentRepository = departmentRepository;
        this.bookingRepository = bookingRepository;
        this.patientRepository = patientRepository;
        this.transactionRepository = transactionRepository;
        this.doctorRepository = doctorRepository;
        this.departmentServices = departmentServices;
        this.nurseRepository = nurseRepository;
        this.medicalExaminationRepository = medicalExaminationRepository;
    }

    @Override
    public TotalStatisticsResponse getStatistics() {

        List<Department> departments = departmentRepository.findAll();

        List<Booking> bookings = bookingRepository.findAll();

        Map<Department, Long> bookingsPerDepartment = bookings.stream()
                .filter(booking -> !booking.isDeleted())
                .map(Booking::getTimeSlot)
                .filter(Objects::nonNull)
                .map(TimeSlot::getDoctorSchedule)
                .filter(Objects::nonNull)
                .map(DoctorSchedule::getDoctor)
                .filter(Objects::nonNull)
                .map(Doctor::getDepartment)
                .filter(Objects::nonNull)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        departments.forEach(department -> bookingsPerDepartment.putIfAbsent(department, 0L));

        List<DepartmentStatisticsResponse> departmentStatistics = bookingsPerDepartment
                .entrySet().stream()
                .map(entry -> new DepartmentStatisticsResponse(
                        entry.getKey(),
                        doctorServices.findHeadDoctor(entry.getKey()),
                        entry.getValue())).sorted((response1, response2) ->
                        Long.compare(response2.getTotalPatients(), response1.getTotalPatients())).toList();

        List<DepartmentStatisticsResponse> topDepartment = departmentStatistics.stream().limit(10)
                .collect(Collectors.toList());

        // Total patients
        long totalPatients = patientRepository.count();

        // Total departments
        long totalDepartments = departmentRepository.count();

        // Statistics payment method
        List<PieChartItemResponse> pieChartData = new ArrayList<>();
        pieChartData.add(getPaymentMethodCount(1, "VNPAY"));
        pieChartData.add(getPaymentMethodCount(2, "CASH"));
        pieChartData.add(getPaymentMethodCount(3, "MOMO"));
        pieChartData.add(getPaymentMethodCount(4, "WALLET"));


        return new TotalStatisticsResponse(topDepartment, totalPatients, totalDepartments, pieChartData);
    }

    @Override
    public TotalStatisticsByDepartmentResponse getStatisticsByDepartment(int departmentId) {
        Department department = departmentServices.getDepartmentById(departmentId);

        List<Doctor> doctors = doctorRepository.findByDepartmentOrderByRatingDesc(department);
        List<DoctorItemStatisticsResponse> topDoctors = new ArrayList<>();
        List<MedicalExaminationRecord> medicalExaminationRecords = medicalExaminationRepository
                .findByDeletedIsFalseAndState(MedicalExamState.DONE);

        for (Doctor doctor : doctors) {
            long totalPatients = medicalExaminationRecords.stream()
                    .filter(record -> record.getDoctorSchedule().getDoctor().getStaffId() == doctor.getStaffId())
                    .count();

            topDoctors.add(new DoctorItemStatisticsResponse(doctor, totalPatients));
        }

//        List<Department> departments = departmentRepository.findAll();
//
//        List<Booking> bookings = bookingRepository.findAll();
//
//        Map<Department, Long> bookingsPerDepartment = bookings.stream()
//                .filter(booking -> !booking.isDeleted())
//                .map(Booking::getTimeSlot)
//                .filter(Objects::nonNull)
//                .map(TimeSlot::getDoctorSchedule)
//                .filter(Objects::nonNull)
//                .map(DoctorSchedule::getDoctor)
//                .filter(Objects::nonNull)
//                .map(Doctor::getDepartment)
//                .filter(Objects::nonNull)
//                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
//
//        departments.forEach(department -> bookingsPerDepartment.putIfAbsent(department, 0L));
//
//        List<DepartmentStatisticsResponse> departmentStatistics = bookingsPerDepartment
//                .entrySet().stream()
//                .map(entry -> new DepartmentStatisticsResponse(
//                        entry.getKey(),
//                        doctorServices.findHeadDoctor(entry.getKey()),
//                        entry.getValue())).sorted((response1, response2) ->
//                        Long.compare(response2.getTotalPatients(), response1.getTotalPatients())).toList();
//
//        List<DepartmentStatisticsResponse> topDepartment = departmentStatistics.stream().limit(10)
//                .collect(Collectors.toList());

        // Total patients
        long totalPatients = patientRepository.count();

        // Total doctors
        long totalDoctors = doctorRepository.countByDepartmentAndDeletedIsFalse(department);

        //Total nurses
        long totalNurses = nurseRepository.countByDepartmentAndDeletedIsFalse(department);

        // Statistics payment method
//        List<PieChartItemResponse> pieChartData = new ArrayList<>();
//        pieChartData.add(getPaymentMethodCount(1, "VNPAY"));
//        pieChartData.add(getPaymentMethodCount(2, "CASH"));
//        pieChartData.add(getPaymentMethodCount(3, "MOMO"));
//        pieChartData.add(getPaymentMethodCount(4, "WALLET"));


        return new TotalStatisticsByDepartmentResponse(topDoctors, totalPatients, totalDoctors, totalNurses);
    }

    @Override
    public RevenueStatisticsResponse getRevenueStatistics(Date startDate, Date endDate) {
        Calendar startDateCalendar = DateCommon.getCalendar(startDate);
        Calendar endDateCalendar = DateCommon.getCalendar(endDate);

        endDateCalendar.set(Calendar.HOUR_OF_DAY, 23);
        endDateCalendar.set(Calendar.MINUTE, 59);
        endDateCalendar.set(Calendar.SECOND, 59);
        endDateCalendar.set(Calendar.MILLISECOND, 99);

        List<Transaction> transactions = transactionRepository.findByCreatedAtBetween(
                startDateCalendar.getTime(),
                endDateCalendar.getTime());

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        Map<String, Double> totalAmountByDate = transactions.stream()
                .filter(t -> t.getPaymentType() == PaymentType.BOOKING || t.getPaymentType() == PaymentType.MEDICAL_TEST)
                .sorted(Comparator.comparing(Transaction::getCreatedAt))
                .collect(Collectors.groupingBy(
                        transaction -> dateFormat.format(transaction.getCreatedAt()),
                        LinkedHashMap::new,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        Map<String, Double> totalAmountMedicalTestByDate = transactions.stream()
                .filter(t -> t.getPaymentType() == PaymentType.MEDICAL_TEST)
                .collect(Collectors.groupingBy(
                        transaction -> dateFormat.format(transaction.getCreatedAt()),
                        LinkedHashMap::new,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        Map<String, Double> totalAmountBookingByDate = transactions.stream()
                .filter(t -> t.getPaymentType() == PaymentType.BOOKING)
                .collect(Collectors.groupingBy(
                        transaction -> dateFormat.format(transaction.getCreatedAt()),
                        LinkedHashMap::new,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        LinkedHashMap<String, Double> totalAmountMedicalTestByDateFiltered = new LinkedHashMap<>();
        LinkedHashMap<String, Double> totalAmountBookingByDateFiltered = new LinkedHashMap<>();
        for (String date : totalAmountByDate.keySet()
        ) {
            totalAmountMedicalTestByDateFiltered.put(date, totalAmountMedicalTestByDate.getOrDefault(date, 0.0));
            totalAmountBookingByDateFiltered.put(date, totalAmountBookingByDate.getOrDefault(date, 0.0));
        }

        List<String> labels = new ArrayList<>();
        for (String date : totalAmountByDate.keySet()) {
            labels.add(date.length() > 5 ? date.substring(0, 5) : date);
        }
        List<Double> values = totalAmountByDate.values()
                .stream()
                .map(amount -> Math.round(amount / 1000))
                .map(Long::doubleValue)
                .collect(Collectors.toList());

        List<Double> bookingValues = totalAmountBookingByDateFiltered.values()
                .stream()
                .map(amount -> Math.round(amount / 1000))
                .map(Long::doubleValue)
                .collect(Collectors.toList());

        List<Double> testValues = totalAmountMedicalTestByDateFiltered.values()
                .stream()
                .map(amount -> Math.round(amount / 1000))
                .map(Long::doubleValue)
                .collect(Collectors.toList());

        return new RevenueStatisticsResponse(values, bookingValues, testValues, labels);
    }


    @Override
    public RevenueStatisticsByDepartmentResponse getRevenueStatisticsByDepartment(
            int departmentId,
            Date startDate,
            Date endDate
    ) {
        Calendar startDateCalendar = DateCommon.getCalendar(startDate);
        Calendar endDateCalendar = DateCommon.getCalendar(endDate);

        endDateCalendar.set(Calendar.HOUR_OF_DAY, 23);
        endDateCalendar.set(Calendar.MINUTE, 59);
        endDateCalendar.set(Calendar.SECOND, 59);
        endDateCalendar.set(Calendar.MILLISECOND, 99);

        List<Booking> successExaminations = bookingRepository.
                findSuccessfulBookingsWithinDateRangeAndByDepartment(
                        startDateCalendar.getTime(),
                        endDateCalendar.getTime(),
                        TransactionStatus.SUCCESS,
                        departmentId
                );
//        List<Booking> bookings = bookingRepository.
//                .findByCancelledIsFalseAndDeletedIsFalseAndRefundedTransactionIdIsNull();

//        List<Booking> successExaminations = bookings.stream()
//                .filter(booking ->
//                        !DateCommon.getCalendar(booking.getTransaction().getCreatedAt()).before(startDateCalendar)
//                                && !DateCommon.getCalendar(booking.getTransaction().getCreatedAt()).after(endDateCalendar)
//                                && booking.getTransaction().getStatus() == TransactionStatus.SUCCESS
//                                && booking.getTimeSlot().getDoctorSchedule().getDoctor()
//                                .getDepartment().getDepartmentId() == departmentId)
//                .toList();



        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        Map<String, Double> totalAmountExaminationByDateAndDepartment = successExaminations.stream()
                .collect(Collectors.groupingBy(
                        booking -> dateFormat.format(booking.getTransaction().getCreatedAt()),
                        LinkedHashMap::new,
                        Collectors.summingDouble(Booking::getServicePrice)
                ));

//        List<Transaction> admissionTransactions = transactionRepository
//                .findByStatusAndHospitalAdmissionIsNotNullAndCreatedAtBetween(
//                        TransactionStatus.SUCCESS,
//                        startDateCalendar.getTime(),
//                        endDateCalendar.getTime()
//                );
        List<Transaction> admissionTransactions = transactionRepository
                .findByStatusAndHospitalAdmissionIsNotNullAndHospitalAdmission_Department_DepartmentIdAndCreatedAtBetweenOrderByCreatedAtAsc(
                        TransactionStatus.SUCCESS,
                        departmentId,
                        startDateCalendar.getTime(),
                        endDateCalendar.getTime()
                );

        Map<String, Double> totalAmountAdmissionByDateAndDepartment = admissionTransactions.stream()
//                .filter(t -> t.getHospitalAdmission().getDepartment().getDepartmentId() == departmentId)
//                .sorted(Comparator.comparing(Transaction::getCreatedAt))
                .collect(Collectors.groupingBy(
                        transaction -> dateFormat.format(transaction.getCreatedAt()),
                        LinkedHashMap::new,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        LinkedHashMap<String, Double> totalAdmissionAmountFiltered = new LinkedHashMap<>();
        LinkedHashMap<String, Double> totalExaminationAmountFiltered = new LinkedHashMap<>();
        for (String date : totalAmountExaminationByDateAndDepartment.keySet()
        ) {
            totalExaminationAmountFiltered.put(date, totalAmountExaminationByDateAndDepartment.getOrDefault(date, 0.0));
        }
        for (String date : totalExaminationAmountFiltered.keySet()
        ) {
            totalAdmissionAmountFiltered.put(date, totalAmountAdmissionByDateAndDepartment.getOrDefault(date, 0.0));
        }

        LinkedHashMap<String, Double> totalAmount = new LinkedHashMap<>();
        for (String date : totalAmountExaminationByDateAndDepartment.keySet()
        ) {
            totalAmount.put(date, totalExaminationAmountFiltered.getOrDefault(date, 0.0)
                    + totalAdmissionAmountFiltered.getOrDefault(date, 0.0));
        }
        List<String> labels = new ArrayList<>();
        for (String date : totalExaminationAmountFiltered.keySet()) {
            labels.add(date.length() > 5 ? date.substring(0, 5) : date);
        }
        List<Double> values = totalAmount.values()
                .stream()
                .map(amount -> Math.round(amount / 1000))
                .map(Long::doubleValue)
                .collect(Collectors.toList());

        List<Double> examinationValues = totalExaminationAmountFiltered.values()
                .stream()
                .map(amount -> Math.round(amount / 1000))
                .map(Long::doubleValue)
                .collect(Collectors.toList());

        List<Double> admissionValues = totalAdmissionAmountFiltered.values()
                .stream()
                .map(amount -> Math.round(amount / 1000))
                .map(Long::doubleValue)
                .collect(Collectors.toList());

        return new RevenueStatisticsByDepartmentResponse(values, examinationValues, admissionValues, labels);
    }

    @Override
    public HomeStatisticsResponse getHomeStatistics() {
        long totalDepartments = departmentRepository.countByDeletedFalse();

        long totalDoctors = doctorRepository.countByDeletedFalse();

        return new HomeStatisticsResponse(totalDoctors, totalDepartments);
    }

    @Override
    public BookingStatisticsResponse getBookingStatistics(Date startDate, Date endDate) {
        Calendar startDateCalendar = DateCommon.getCalendar(startDate);
        Calendar endDateCalendar = DateCommon.getCalendar(endDate);

        endDateCalendar.set(Calendar.HOUR_OF_DAY, 23);
        endDateCalendar.set(Calendar.MINUTE, 59);
        endDateCalendar.set(Calendar.SECOND, 59);
        endDateCalendar.set(Calendar.MILLISECOND, 99);

        List<Object[]> bookings = bookingRepository.countBookingsByCreatedAtBetweenAndDeletedIsFalse(
                startDateCalendar.getTime(),
                endDateCalendar.getTime());

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM");

        List<Long> values = bookings.stream()
                .map(entry -> (Long) entry[1])
                .collect(Collectors.toList());

        List<String> labels = bookings.stream()
                .map(entry -> dateFormat.format((Date) entry[0]))
                .collect(Collectors.toList());


        return new BookingStatisticsResponse(values, labels);
    }

    @Override
    public BookingStatisticsResponse getBookingStatisticsByDepartment(int departmentId, Date startDate, Date endDate) {
        Calendar startDateCalendar = DateCommon.getCalendar(startDate);
        Calendar endDateCalendar = DateCommon.getCalendar(endDate);

        endDateCalendar.set(Calendar.HOUR_OF_DAY, 23);
        endDateCalendar.set(Calendar.MINUTE, 59);
        endDateCalendar.set(Calendar.SECOND, 59);
        endDateCalendar.set(Calendar.MILLISECOND, 99);

        List<Object[]> bookings = bookingRepository.countBookingsByCreatedAtBetweenAndDepartmentAndDeletedIsFalse(
                startDateCalendar.getTime(),
                endDateCalendar.getTime(),
                departmentId);

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM");

        List<Long> values = bookings.stream()
                .map(entry -> (Long) entry[1])
                .collect(Collectors.toList());

        List<String> labels = bookings.stream()
                .map(entry -> dateFormat.format((Date) entry[0]))
                .collect(Collectors.toList());


        return new BookingStatisticsResponse(values, labels);
    }

    public PieChartItemResponse getPaymentMethodCount(int id, String paymentMethod) {
        if (Objects.equals(paymentMethod, "CASH"))
            paymentMethod = null;
        long count = transactionRepository.countByPaymentMethod(paymentMethod);
        String label;
        if (Objects.equals(paymentMethod, "MOMO")) {
            label = "Momo";
        } else if (Objects.equals(paymentMethod, null)) {
            label = "Tiền mặt";
        } else if (Objects.equals(paymentMethod, "WALLET")) {
            label = "Ví điện tử";
        } else label = "VNPay";
        return new PieChartItemResponse(id, count, label);
    }
}
