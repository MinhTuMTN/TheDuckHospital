package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.dto.response.HomeStatisticsResponse;
import com.theduckhospital.api.dto.response.admin.*;
import com.theduckhospital.api.entity.*;
import com.theduckhospital.api.repository.*;
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

    private final IDoctorServices doctorServices;
    public StatisticsServicesImpl(IDoctorServices doctorServices,
                                  DepartmentRepository departmentRepository,
                                  BookingRepository bookingRepository,
                                  PatientRepository patientRepository,
                                  TransactionRepository transactionRepository,
                                  DoctorRepository doctorRepository
    ) {
        this.doctorServices = doctorServices;
        this.departmentRepository = departmentRepository;
        this.bookingRepository = bookingRepository;
        this.patientRepository = patientRepository;
        this.transactionRepository = transactionRepository;
        this.doctorRepository = doctorRepository;
    }

    @Override
    public TotalStatisticsResponse getStatistics() {
        // Top 5 department with the most patient
        List<Department> departments = departmentRepository.findAll();

        List<Booking> bookings = bookingRepository.findAll();

        Map<Department, Long> bookingsPerDepartment = bookings.stream()
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

        List<DepartmentStatisticsResponse> topDepartment = departmentStatistics.stream().limit(5)
                .collect(Collectors.toList());

        // Total patients
        long totalPatients = patientRepository.count();

        // Statistics payment method
        List<PieChartItemResponse> pieChartData = new ArrayList<>();
        pieChartData.add(getPaymentMethodCount(1, "VNPay"));
        pieChartData.add(getPaymentMethodCount(2, "CASH"));


        return new TotalStatisticsResponse(topDepartment, totalPatients, pieChartData);
    }

    @Override
    public RevenueStatisticsResponse getRevenueStatistics(Date startDate, Date endDate) {

        List<Transaction> transactions = transactionRepository.findByCreatedAtBetween(startDate, endDate);

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        Map<String, Double> totalAmountByDate = transactions.stream()
                .sorted(Comparator.comparing(Transaction::getCreatedAt))
                .collect(Collectors.groupingBy(
                        transaction -> dateFormat.format(transaction.getCreatedAt()),
                        LinkedHashMap::new,
                        Collectors.summingDouble(Transaction::getAmount)
                ));


        List<String> labels = new ArrayList<>(totalAmountByDate.keySet());
        List<Double> values = new ArrayList<>(totalAmountByDate.values());

        return new RevenueStatisticsResponse(values, labels);
    }

    @Override
    public HomeStatisticsResponse getHomeStatistics() {
        long totalDepartments = departmentRepository.countByDeletedFalse();

        long totalDoctors = doctorRepository.countByDeletedFalse();

        return new HomeStatisticsResponse(totalDoctors, totalDepartments);
    }

    @Override
    public BookingStatisticsResponse getBookingStatistics(Date startDate, Date endDate) {
        List<Object[]> bookings = bookingRepository.countBookingsByDateRange(startDate, endDate);

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        List<Long> values = bookings.stream()
                .map(entry -> (Long) entry[1])
                .collect(Collectors.toList());

        List<String> labels = bookings.stream()
                .map(entry -> dateFormat.format((Date) entry[0]))
                .collect(Collectors.toList());


        return new BookingStatisticsResponse(values, labels);
    }

    public PieChartItemResponse getPaymentMethodCount(int id, String paymentMethod) {
        long count = transactionRepository.countByPaymentMethod(paymentMethod);
        return new PieChartItemResponse(id, count, !Objects.equals(paymentMethod, "CASH") ? "Online" : "Tại quầy");
    }
}
