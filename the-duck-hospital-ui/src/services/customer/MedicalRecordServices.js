import { get } from "../AxiosInstance";

export const getHistoryMedicalRecord = () => {
  return get("/medical-records");
};

export const getHistoryMedicalRecordDetails = (medicalRecordId) => {
  return get(`/medical-records/${medicalRecordId}`);
};
