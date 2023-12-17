import { get } from "../AxiosInstance";

export const getSchedulesByRoomIdAndDate = (params) => {
  return get(`/admin/doctor-schedules/room`, params, { Authorization: "" });
};

export const getSchedulesByStaffIdAndDate = (params) => {
  return get(`/admin/doctor-schedules/doctor`, params, { Authorization: "" });
};