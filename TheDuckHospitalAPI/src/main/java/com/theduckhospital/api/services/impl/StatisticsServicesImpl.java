package com.theduckhospital.api.services.impl;

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
    private final DoctorScheduleRepository doctorScheduleRepository;
    private final IDepartmentServices departmentServices;
    private final IDoctorServices doctorServices;
    public StatisticsServicesImpl(IDepartmentServices departmentServices,
                                  IDoctorServices doctorServices,
                                  DepartmentRepository departmentRepository,
                                  BookingRepository bookingRepository,
                                  PatientRepository patientRepository,
                                  TransactionRepository transactionRepository,
                                  DoctorScheduleRepository doctorScheduleRepository
    ) {
        this.departmentServices = departmentServices;
        this.doctorServices = doctorServices;
        this.departmentRepository = departmentRepository;
        this.bookingRepository = bookingRepository;
        this.patientRepository = patientRepository;
        this.transactionRepository = transactionRepository;
        this.doctorScheduleRepository = doctorScheduleRepository;
    }

    @Override
    public TotalStatisticsResponse getStatistics() {
        // Top 5 department with the most patient
        List<Department> departments = departmentRepository.findAll();

        List<Booking> bookings = bookingRepository.findAll();

        Map<Department, Long> bookingsPerDepartment = bookings.stream()
                .map(Booking::getDoctorSchedule)
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
                        entry.getValue()))
                .collect(Collectors.toList());

        departmentStatistics.sort((response1, response2) ->
                Long.compare(response2.getTotalPatients(), response1.getTotalPatients()));

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

//    @Override
//    public BookingStatisticsResponse getBookingStatistics(Date startDate, Date endDate) {
//
//        List<Booking> bookings = bookingRepository.findByDoctorScheduleDateBetween(startDate, endDate);
//
//        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
//
//        List<BookingStatisticsResponse> bookingStatistics = new ArrayList<>();
//        List<Long> values = new ArrayList<>();
//        List<String> labels = new ArrayList<>();
//        for (int i = 0; i < bookings.size(); i++) {
//            long numberOfBookings = bookingRepository.countByDoctorSchedule(bookings.get(i).getDoctorSchedule());
//            values.add(numberOfBookings);
//            labels.add(dateFormat.format(bookings.get(i).getDoctorSchedule().getDate()));
//        }
//
//
//        return new BookingStatisticsResponse(values, labels);
//    }

    @Override
    public BookingStatisticsResponse getBookingStatistics(Date startDate, Date endDate) {
        List<Object[]> bookings = bookingRepository.countBookingsByDateRange(startDate, endDate);

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        List<Long> values = bookings.stream()
                .map(entry -> (Long) entry[1]) // Assuming the count is at index 1
                .collect(Collectors.toList());

        List<String> labels = bookings.stream()
                .map(entry -> dateFormat.format((Date) entry[0])) // Assuming the date is at index 0
                .collect(Collectors.toList());

//        List<BookingStatisticsItemResponse> bookingStatistics = new ArrayList<>();
//        for (int i = 0; i < bookings.size(); i++) {
//            long numberOfBookings = bookingRepository.countByDoctorSchedule(bookings.get(i).getDoctorSchedule());
//            bookingStatistics.add(new BookingStatisticsItemResponse(i, numberOfBookings, bookings.get(i).getDoctorSchedule().getDate()));
//        }

        return new BookingStatisticsResponse(values, labels);
    }

    public PieChartItemResponse getPaymentMethodCount(int id, String paymentMethod) {
        long count = transactionRepository.countByPaymentMethod(paymentMethod);
        return new PieChartItemResponse(id, count, paymentMethod == "CASH" ? "Online" : "Tại quầy");
    }
}
