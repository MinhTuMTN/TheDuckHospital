import { get } from "../AxiosInstance";

export const findRoom = (roomName) => {
  return get(`/nurse/rooms?q=${roomName}`);
};

export const getDoctorSchedule = (roomId) => {
  return get(`/nurse/rooms/${roomId}/doctor-schedules`);
};
