import { get } from "../AxiosInstance";

export const getClinicalSchedule = () => {
  return get("/nurse/schedules");
};
