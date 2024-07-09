import { get, post } from "../AxiosInstance";

export const createBooking = (data) => {
  return post("/booking", data);
};

export const getBookings = (patientProfileId, page) => {
  return get("/booking/by-profile", {
    patientProfileId,
    page,
    limit: 5,
  });
};

export const getBookingById = (id) => {
  return get(`/booking/${id}`);
};
