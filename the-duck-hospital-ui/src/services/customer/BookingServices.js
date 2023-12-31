import { get, post } from "../AxiosInstance";

export const createBooking = (data) => {
  return post("/booking", data);
};

export const getBookings = () => {
  return get("/booking");
};

export const getBookingById = (id) => {
  return get(`/booking/${id}`);
};
