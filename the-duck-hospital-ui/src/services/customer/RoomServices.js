import { get } from "../AxiosInstance";

export const findRoom = (roomName) => {
  return get(`/nurse/rooms?q=${roomName}`);
};
