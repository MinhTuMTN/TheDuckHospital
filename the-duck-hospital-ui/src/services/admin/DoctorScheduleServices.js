import { get } from "../AxiosInstance";

export const getSchedules = (roomId, params) => {
    return get(`/admin/doctor-schedules/${roomId}`, params, { Authorization: "" });
  };