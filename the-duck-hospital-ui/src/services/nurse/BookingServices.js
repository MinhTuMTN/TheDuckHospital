import { get, post } from "../AxiosInstance";

export const searchBooking = (bookingCode, roomId) => {
  return get("/nurse/bookings/check-booking", {
    bookingCode,
    roomId,
  });
};

export const searchPatient = (identityNumber) => {
  return get("/nurse/bookings/check-patient-code", {
    identityNumber,
  });
};
export const createBookingAndMedicalRecord = (
  patientProfileId,
  doctorScheduleId
) => {
  return post("/nurse/bookings", {
    patientProfileId,
    doctorScheduleId,
  });
};
