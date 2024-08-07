package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.constant.DateCommon;
import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.constant.PaymentType;
import com.theduckhospital.api.constant.TransactionStatus;
import com.theduckhospital.api.dto.response.HomeStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.*;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.repository.*;
import com.theduckhospital.api.services.IDepartmentServices;
import com.theduckhospital.api.services.IDoctorServices;
import com.theduckhospital.api.services.IStatisticsServices;
import org.springframework.stereotype.Service;

import java.text.ParseException;
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
        List<Object[]> bookingsPerDepartment = bookingRepository.findTop5DepartmentsWithBookingsCount();

        List<DepartmentStatisticsResponse> departmentStatisticsResponses = new ArrayList<>();
        for (Object[] result : bookingsPerDepartment) {
            Department department = (Department) result[0];
            Optional<Doctor> optional = doctorRepository.findByDepartmentAndHeadOfDepartmentIsTrue(department);
            Doctor headDoctor = optional.orElse(null);
            Long totalPatients = (Long) result[1];

            DepartmentStatisticsResponse response = new DepartmentStatisticsResponse(department, headDoctor, totalPatients);
            departmentStatisticsResponses.add(response);
        }

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


        return new TotalStatisticsResponse(departmentStatisticsResponses, totalPatients, totalDepartments, pieChartData);
    }

    @Override
    public TotalStatisticsByDepartmentResponse getStatisticsByDepartment(int departmentId) {
        Department department = departmentServices.getDepartmentById(departmentId);

        List<Doctor> doctors = doctorRepository.findTop5DoctorsByDepartment(department.getDepartmentId());
        List<DoctorItemStatisticsResponse> topDoctors = new ArrayList<>();
//        List<MedicalExaminationRecord> medicalExaminationRecords = medicalExaminationRepository
//                .findByDeletedIsFalseAndState(MedicalExamState.DONE);

        for (Doctor doctor : doctors) {
            long totalPatients = medicalExaminationRepository
                    .countByDeletedIsFalseAndStateInAndDoctorSchedule_Doctor(
                            Arrays.asList(MedicalExamState.DONE, MedicalExamState.PROCESSING),
                            doctor);

//            long totalPatients = medicalExaminationRecords.stream()
//                    .filter(record -> record.getDoctorSchedule().getDoctor().getStaffId() == doctor.getStaffId())
//                    .count();

            topDoctors.add(new DoctorItemStatisticsResponse(doctor, totalPatients));
        }

        topDoctors.sort(Comparator.comparingDouble(DoctorItemStatisticsResponse::getRating)
                .thenComparingLong(DoctorItemStatisticsResponse::getTotalPatients).reversed());

        // Total patients
        long totalPatients = patientRepository.count();

        // Total doctors
        long totalDoctors = doctorRepository.countByDepartmentAndDeletedIsFalse(department);

        //Total nurses
        long totalNurses = nurseRepository.countByDepartmentAndDeletedIsFalse(department);

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

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        List<Transaction> bookingAndTestTransactions = transactionRepository.findByCreatedAtBetweenAndPaymentTypeInAndStatus(
                startDateCalendar.getTime(),
                endDateCalendar.getTime(),
                Arrays.asList(PaymentType.BOOKING, PaymentType.MEDICAL_TEST, PaymentType.ADVANCE_FEE),
                TransactionStatus.SUCCESS
        );

        LinkedHashMap<String, Double> totalAmountByDate = bookingAndTestTransactions.stream()
//                .filter(t -> t.getPaymentType() == PaymentType.BOOKING || t.getPaymentType() == PaymentType.MEDICAL_TEST)
                .sorted(Comparator.comparing(Transaction::getCreatedAt))
                .collect(Collectors.groupingBy(
                        transaction -> dateFormat.format(transaction.getCreatedAt()),
                        LinkedHashMap::new,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        List<Transaction> testTransactions = transactionRepository.findByCreatedAtBetweenAndPaymentTypeInAndStatus(
                startDateCalendar.getTime(),
                endDateCalendar.getTime(),
                List.of(PaymentType.MEDICAL_TEST),
                TransactionStatus.SUCCESS
        );

        Map<String, Double> totalAmountMedicalTestByDate = testTransactions.stream()
//                .filter(t -> t.getPaymentType() == PaymentType.MEDICAL_TEST)
                .collect(Collectors.groupingBy(
                        transaction -> dateFormat.format(transaction.getCreatedAt()),
                        LinkedHashMap::new,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        List<Transaction> bookingTransactions = transactionRepository.findByCreatedAtBetweenAndPaymentTypeInAndStatus(
                startDateCalendar.getTime(),
                endDateCalendar.getTime(),
                Arrays.asList(PaymentType.BOOKING, PaymentType.ADVANCE_FEE),
                TransactionStatus.SUCCESS
        );

        Map<String, Double> totalAmountBookingByDate = bookingTransactions.stream()
//                .filter(t -> t.getPaymentType() == PaymentType.BOOKING)
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

        List<String> labels = getLabelsRevenueStatistics(totalAmountByDate);

        List<Double> values = getValuesRevenueStatistics(totalAmountByDate);

        List<Double> bookingValues = getValuesRevenueStatistics(totalAmountBookingByDateFiltered);

        List<Double> testValues = getValuesRevenueStatistics(totalAmountMedicalTestByDateFiltered);

        return new RevenueStatisticsResponse(values, bookingValues, testValues, labels);
    }

    private List<String> getLabelsRevenueStatistics(LinkedHashMap<String, Double> totalAmount){
        List<String> labels = new ArrayList<>();
        for (String date : totalAmount.keySet()) {
            labels.add(date.length() > 5 ? date.substring(0, 5) : date);
        }
        return labels;
    }

    private List<Double> getValuesRevenueStatistics(LinkedHashMap<String, Double> linkedHashMap){
        return linkedHashMap.values()
                .stream()
                .map(amount -> Math.round(amount / 1000))
                .map(Long::doubleValue)
                .collect(Collectors.toList());
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
//        LinkedHashMap<String, Double> totalAdmissionAmountFiltered = new LinkedHashMap<>();
//        LinkedHashMap<String, Double> totalExaminationAmountFiltered = new LinkedHashMap<>();
//        for (String date : totalAmountAdmissionByDateAndDepartment.keySet()
//        ) {
//            totalAmountExaminationByDateAndDepartment.put(date, totalAmountExaminationByDateAndDepartment.getOrDefault(date, 0.0));
//        }
//        for (String date : totalAmountExaminationByDateAndDepartment.keySet()
//        ) {
//            totalExaminationAmountFiltered.put(date, totalAmountExaminationByDateAndDepartment.getOrDefault(date, 0.0));
//        }
//        for (String date : totalExaminationAmountFiltered.keySet()
//        ) {
//            totalAdmissionAmountFiltered.put(date, totalAmountAdmissionByDateAndDepartment.getOrDefault(date, 0.0));
//        }

        Map<Date, String> dateMap = new TreeMap<>();
        for (String dateStr : totalAmountAdmissionByDateAndDepartment.keySet()) {
            try {
                Date date = dateFormat.parse(dateStr);
                dateMap.put(date, dateStr);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        for (String dateStr : totalAmountExaminationByDateAndDepartment.keySet()) {
            try {
                Date date = dateFormat.parse(dateStr);
                dateMap.put(date, dateStr);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        LinkedHashMap<String, Double> totalAdmissionAmountFiltered = new LinkedHashMap<>();
        LinkedHashMap<String, Double> totalExaminationAmountFiltered = new LinkedHashMap<>();
        LinkedHashMap<String, Double> totalAmount = new LinkedHashMap<>();

        for (String dateStr : dateMap.values()) {
            totalExaminationAmountFiltered.put(dateStr, totalAmountExaminationByDateAndDepartment.getOrDefault(
                    dateStr, 0.0
            ));

            totalAdmissionAmountFiltered.put(dateStr, totalAmountAdmissionByDateAndDepartment.getOrDefault(
                    dateStr, 0.0
            ));

            totalAmount.put(dateStr, totalExaminationAmountFiltered.getOrDefault(dateStr, 0.0)
                    + totalAdmissionAmountFiltered.getOrDefault(dateStr, 0.0));
        }

        List<String> labels = getLabelsRevenueStatistics(totalAmount);

        List<Double> values = getValuesRevenueStatistics(totalAmount);

        List<Double> examinationValues = getValuesRevenueStatistics(totalExaminationAmountFiltered);

        List<Double> admissionValues = getValuesRevenueStatistics(totalAdmissionAmountFiltered);

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
