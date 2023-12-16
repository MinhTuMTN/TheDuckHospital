import { get } from "../AxiosInstance";

export const getDoctorSchedules = (departmentId) => {
  return get("nurse/doctor-schedules", {
    departmentId,
  });
};
