import { del, get, post } from "../AxiosInstance";

export const searchMedicine = (search) => {
  return get("/doctor/medicines", {
    q: search,
  });
};

export const addMedicine = (medicalRecordId, data) => {
  return post(`/doctor/medical-records/${medicalRecordId}/medicines`, data);
};

export const getMedicineItems = (medicalRecordId) => {
  return get(`/doctor/medical-records/${medicalRecordId}/medicines`);
};

export const deleteMedicine = (medicalRecordId, prescriptionItemId) => {
  return del(
    `/doctor/medical-records/${medicalRecordId}/medicines/${prescriptionItemId}`
  );
};
