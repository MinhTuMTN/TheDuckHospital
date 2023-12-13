import { get, post } from "../AxiosInstance";

export const increaseQueueNumber = (doctorScheduleId) => {
  return post(`/nurse/queue-number-schedules/${doctorScheduleId}`);
};

export const getQueueNumber = (doctorScheduleId) => {
  return get(`/nurse/queue-number-schedules/${doctorScheduleId}`);
};
