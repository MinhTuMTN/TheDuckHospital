import { get, put } from "../AxiosInstance";

export const acceptMedicalRecord = (medicalRecordId) => {
  return put(`/doctor/medical-records/${medicalRecordId}/accept`);
};

export const getMedicalRecord = (medicalRecordId) => {
  return get(`/doctor/medical-records/${medicalRecordId}`);
};
