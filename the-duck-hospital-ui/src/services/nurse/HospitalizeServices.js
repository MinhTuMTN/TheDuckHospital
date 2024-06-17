import { get } from "../AxiosInstance";

export const getRoomStatistic = () => {
  return get("/nurse/hospital-admissions/room-statistics");
};

export const getAdmissionRecords = (admissionCode) => {
  return get(`/nurse/hospital-admissions/${admissionCode}`);
};

export const getTreatmentRooms = (roomType) => {
  return get(`/nurse/hospital-admissions/treatment-rooms`, {
    roomType,
  });
};
