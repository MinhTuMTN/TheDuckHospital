package com.theduckhospital.api.constant;

import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.repository.BookingRepository;
import com.theduckhospital.api.services.IMedicineReminderServices;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class ScheduledTask {
    private final BookingRepository bookingRepository;
    private final IMedicineReminderServices medicineReminderServices;

    public ScheduledTask(BookingRepository bookingRepository, IMedicineReminderServices medicineReminderServices) {
        this.bookingRepository = bookingRepository;
        this.medicineReminderServices = medicineReminderServices;
    }

    @PostConstruct
    public void onApplicationStart() {
        cancelBookingExpired();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduledTask() {
        cancelBookingExpired();
    }

    private void cancelBookingExpired() {
        List<Booking> expiredBookings = bookingRepository
                .findExpiredBookings(
                        DateCommon.getToday()
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
