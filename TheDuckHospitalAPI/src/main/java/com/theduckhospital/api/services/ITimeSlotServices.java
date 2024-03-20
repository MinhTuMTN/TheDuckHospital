package com.theduckhospital.api.services;

import com.theduckhospital.api.entity.TimeSlot;
import com.theduckhospital.api.repository.TimeSlotRepository;

public interface ITimeSlotServices {
    TimeSlot findTimeSlotByTimeSlotId(String timeSlotId);
}
