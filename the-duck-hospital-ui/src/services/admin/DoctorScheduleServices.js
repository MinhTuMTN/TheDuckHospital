import { get } from "../AxiosInstance";

export const getSchedulesByRoomIdAndDate = (params) => {
  return get(`/admin/doctor-schedules/room`, params);
};

export const getSchedulesByStaffIdAndDate = (params) => {
  return get(`/admin/doctor-schedules/doctor`, params);
};

export const getDateHasDoctorSchedule = (staffId) => {
  return get(`/admin/doctor-schedules/${staffId}/date-has-schedule`);
};

export const getDateHasDoctorScheduleRoom = (roomId) => {
  return get(`/admin/doctor-schedules/room/${roomId}/date-has-schedule`);
};

