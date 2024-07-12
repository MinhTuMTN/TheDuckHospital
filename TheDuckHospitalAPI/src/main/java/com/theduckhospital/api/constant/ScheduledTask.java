package com.theduckhospital.api.constant;

import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.services.IMedicineReminderServices;
import com.theduckhospital.api.services.IRoomServices;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class ScheduledTask {
    private final BookingRepository bookingRepository;
    private final IMedicineReminderServices medicineReminderServices;
    private final IRoomServices roomServices;

    public ScheduledTask(
            BookingRepository bookingRepository,
            IMedicineReminderServices medicineReminderServices,
            IRoomServices roomServices
    ) {
        this.bookingRepository = bookingRepository;
        this.medicineReminderServices = medicineReminderServices;
        this.roomServices = roomServices;
    }

    @PostConstruct
    public void onApplicationStart() {
        cancelBookingExpired();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduledTask() {
        cancelBookingExpired();
        roomServices.resetLaboratoryRoom();
    }


    private void cancelBookingExpired() {
        System.out.println("Checking and cancelling expired bookings...");
        List<Booking> expiredBookings = bookingRepository
                .findExpiredBookings(
                        DateCommon.getStarOfDay(DateCommon.getToday())
                );

        expiredBookings.forEach(booking -> {
            booking.setCancelled(true);
        });
        bookingRepository.saveAll(expiredBookings);
    }

    // Run every 30 seconds
    @Scheduled(fixedRate = 300000)
    public void checkAndSendMedicineReminder() {
        System.out.println("Checking and sending medicine reminder...");
        medicineReminderServices.checkAndSendMedicineReminder();
    }
}
