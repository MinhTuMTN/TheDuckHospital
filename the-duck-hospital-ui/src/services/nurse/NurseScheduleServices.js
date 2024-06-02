import { get } from "../AxiosInstance";

export const getClinicalSchedule = () => {
  return get("/nurse/schedules");
};

export const getTodayExaminationDoctorSchedule = () => {
  return get("/nurse/schedules/today-examination-schedules");
};
