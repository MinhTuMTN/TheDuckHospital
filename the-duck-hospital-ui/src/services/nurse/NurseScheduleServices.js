import { get, post } from "../AxiosInstance";

export const getNurseSchedules = (month, year) => {
  return get("/nurse/schedules", {
    month,
    year,
  });
};

export const getTodayExaminationDoctorSchedule = () => {
  return get("/nurse/schedules/today-examination-schedules");
};

export const deteleListNurseSchedule = (scheduleIds) => {
  return post("/head-nurse/schedules/delete-all", {
    scheduleIds: scheduleIds,
  });
};
