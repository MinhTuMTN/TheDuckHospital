package com.theduckhospital.api.services;

import com.theduckhospital.api.constant.MedicalExamState;
import com.theduckhospital.api.dto.request.headdoctor.CreateDoctorScheduleRequest;
import com.theduckhospital.api.dto.request.headdoctor.UpdateDoctorScheduleRequest;
import com.theduckhospital.api.dto.response.PaginationResponse;
import com.theduckhospital.api.dto.response.admin.DoctorScheduleRoomResponse;
import com.theduckhospital.api.dto.response.doctor.*;
import com.theduckhospital.api.dto.response.nurse.QueueBookingResponse;
import com.theduckhospital.api.entity.Doctor;
import com.theduckhospital.api.entity.DoctorSchedule;

import javax.print.Doc;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface IScheduleDoctorServices {
    List<DoctorSchedule> createDoctorSchedule(
            String authorization,
            CreateDoctorScheduleRequest doctorSchedule
    ) throws ParseException;
    DoctorSchedule getDoctorScheduleByIdForBooking(UUID doctorScheduleId) throws ParseException;
    DoctorSchedule getDoctorScheduleByTimeSlotId(String timeSlotId);
    List<DoctorScheduleRoomResponse> getDoctorSchedulesByRoomAndDateAdmin(int roomId, Date date);

    List<DoctorScheduleRoomResponse> getDoctorSchedulesByDoctorAndDateAdmin(UUID staffId, Date date);

    QueueBookingResponse increaseQueueNumber(UUID doctorScheduleId) throws ParseException;
    QueueBookingResponse getQueueNumber(UUID doctorScheduleId) throws ParseException;

    ScheduleRoomHeadDoctorResponse getScheduleHeadDoctor(
            String authorization,
            int roomId,
            Date date
    );

    InvalidDateResponse getInvalidExaminationDateSchedule(
            String authorization,
            int roomId,
            UUID doctorId
    );
    InvalidDateResponse getInvalidTreatmentDateSchedule(
            String authorization,
            int roomId,
            UUID doctorId
    );
    List<DoctorScheduleRoomResponse> getDoctorSchedulesByDepartmentId(Integer departmentId) throws ParseException;
    List<DoctorScheduleResponse> getTodayDoctorSchedules(String authorization) throws ParseException;

    PaginationResponse searchMedicalExaminationRecord(
            String authorization,
            UUID doctorScheduleId,
            String patientName,
            MedicalExamState state,
            int page,
            int size
    );

    Map<String, String> countMedicalExaminationRecord(String authorization, UUID doctorScheduleId);

    DoctorScheduleListsResponse getDoctorTimeTable(String authorization);

    boolean deleteDoctorSchedule(
            String authorization,
            UUID doctorScheduleId
    );

    List<Date> getDateHasSchedule(
            String authorization,
            int roomId
    );

    List<Date> getDateHasDoctorSchedule(UUID staffId);

    List<Date> getDateHasDoctorScheduleRoom(int roomId);

    List<Doctor> getActiveDoctorsInDepartment(String authorization);

    DoctorSchedule updateDoctorSchedule(
            String authorization,
            UUID doctorScheduleId,
            UpdateDoctorScheduleRequest request
    );
    DoctorSchedule getDoctorScheduleById(UUID doctorScheduleId);
    DoctorSchedule getDoctorScheduleByIdForAccept(UUID doctorScheduleId);
}
