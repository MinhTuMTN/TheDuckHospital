import { put } from "../AxiosInstance";

export const acceptMedicalRecord = (medicalRecordId) => {
  return put(`/doctor/medical-records/${medicalRecordId}/accept`);
};
