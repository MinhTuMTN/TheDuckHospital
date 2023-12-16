package com.theduckhospital.api.constant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Component
public class DateCommon {
    private static Environment environment;

    @Autowired
    public DateCommon(Environment environment) {
        DateCommon.environment = environment;
    }

    public static int compareDate(Date date1, Date date2) {
        Calendar calendar1 = getCalendar(date1);
        Calendar calendar2 = getCalendar(date2);

        return calendar1.compareTo(calendar2);
    }

    public static Date getToday() throws ParseException {
        String todayString = environment.getProperty("settings.date");
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.parse(todayString);
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
