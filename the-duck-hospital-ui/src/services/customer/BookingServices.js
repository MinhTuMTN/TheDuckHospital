import { post } from "../AxiosInstance";

export const createBooking = (data) => {
  return post("/booking", data);
};
