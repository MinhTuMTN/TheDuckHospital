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

export const getMedicineUnit = (unit) => {
  const data = {
    BOX: "Hộp",
    BOTTLE: "Chai",
    TUBE: "Tuýp",
    PIECE: "Viên",
    BAG: "Túi",
    PACKAGE: "Gói",
    OTHER: "Khác",
  };

  return data[unit];
};

export const deleteMedicine = (medicalRecordId, prescriptionItemId) => {
  return del(
    `/doctor/medical-records/${medicalRecordId}/medicines/${prescriptionItemId}`
  );
};
