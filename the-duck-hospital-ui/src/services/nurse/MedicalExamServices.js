import { post } from "../AxiosInstance";

export const accepctPatientBooking = (bookingCode, roomId) => {
  return post("/nurse/medical-exams/patient", {
    bookingCode,
    roomId,
  });
};

export const accepcNonPatientBooking = (
  bookingCode,
  identityNumber,
  roomId
) => {
  return post("/nurse/medical-exams/non-patient", {
    bookingCode,
    identityNumber,
    roomId,
  });
};
