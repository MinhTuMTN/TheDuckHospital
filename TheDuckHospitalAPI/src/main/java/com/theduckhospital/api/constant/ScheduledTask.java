package com.theduckhospital.api.constant;

import com.theduckhospital.api.entity.Booking;
import com.theduckhospital.api.repository.BookingRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class ScheduledTask {
    private final BookingRepository bookingRepository;

    public ScheduledTask(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
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
}
