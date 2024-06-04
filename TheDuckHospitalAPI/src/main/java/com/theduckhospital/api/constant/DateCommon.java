package com.theduckhospital.api.constant;

import com.theduckhospital.api.error.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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

    public static Date getToday() {
        try {
            String todayString = environment.getProperty("settings.date");
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            return formatter.parse(todayString);
        } catch (Exception e) {
            return new Date();
        }

//        return new Date();
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

    public static Date getStarOfDay(Date date) {
        Calendar calendar = getCalendar(date);
        return calendar.getTime();
    }

    public static Date getEndOfDay(Date date) {
        Calendar calendar = getCalendar(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);

        return calendar.getTime();
    }

    public static Map<String, Date> getStartAndEndOfWeek(Integer week, Integer year) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);

        year = year == null ? calendar.get(Calendar.YEAR) : year;
        week = week == null ? calendar.get(Calendar.WEEK_OF_YEAR) : week;

        // Check week and year
        if (week < 1 || week > 52 || year < 1970 || year > 2100) {
            throw new BadRequestException("Invalid week");
        }
        calendar.set(Calendar.WEEK_OF_YEAR, week);
        calendar.set(Calendar.YEAR, year);

        Date startOfWeek = DateCommon.getStarOfDay(calendar.getTime());
        calendar.add(Calendar.DATE, 6);
        Date endOfWeek = DateCommon.getEndOfDay(calendar.getTime());

        Map<String, Date> startAndEndOfWeek = new HashMap<>();
        startAndEndOfWeek.put("startOfWeek", startOfWeek);
        startAndEndOfWeek.put("endOfWeek", endOfWeek);

        return startAndEndOfWeek;
    }
}
