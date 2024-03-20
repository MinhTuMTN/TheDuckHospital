package com.theduckhospital.api.services.impl;

import com.theduckhospital.api.entity.TimeSlot;
import com.theduckhospital.api.error.NotFoundException;
import com.theduckhospital.api.repository.TimeSlotRepository;
import com.theduckhospital.api.services.ITimeSlotServices;
import org.springframework.stereotype.Service;

@Service
public class TimeSlotServicesImpl implements ITimeSlotServices {
    private final TimeSlotRepository timeSlotRepository;

    public TimeSlotServicesImpl(TimeSlotRepository timeSlotRepository) {
        this.timeSlotRepository = timeSlotRepository;
    }

    @Override
    public TimeSlot findTimeSlotByTimeSlotId(String timeSlotId) {
        return timeSlotRepository.findById(timeSlotId)
                .orElseThrow(() -> new NotFoundException("Time slot not found"));
    }
}
