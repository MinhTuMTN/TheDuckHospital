import { get } from "../AxiosInstance";

export const getTodaySchedule = () => {
  return get("/doctor/doctor-schedules");
};
