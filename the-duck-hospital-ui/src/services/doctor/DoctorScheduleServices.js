import { get } from "../AxiosInstance";

export const getTodaySchedule = () => {
  return get("/doctor/doctor-schedules");
};

export const searchMedicalRecord = (
  doctorScheduleId,
  state,
  page,
  patientName = ""
) => {
  return get(`/doctor/doctor-schedules/${doctorScheduleId}/medical-records`, {
    patientName,
    state,
    page,
  });
};

export const getCounterMedicalRecord = (doctorScheduleId) => {
  return get(
    `/doctor/doctor-schedules/${doctorScheduleId}/medical-records/count`
  );
};
