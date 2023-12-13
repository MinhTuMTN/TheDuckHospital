package com.theduckhospital.api.constant;

import java.util.Calendar;
import java.util.Date;

public class DateCommon {
    public static int compareDate(Date date1, Date date2) {
        Calendar calendar1 = getCalendar(date1);
        Calendar calendar2 = getCalendar(date2);

        return calendar1.compareTo(calendar2);
    }

    public static Calendar getCalendar(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        // Reset time part of the date
        calendar.set(Calendar.HOUR_OF_DAY, 0); // 0 == 12:00 AM midnight
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0); // last millisecond of the day.

        return calendar;
    }
}
