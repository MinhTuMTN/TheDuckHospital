import { del, get, post } from "../AxiosInstance";

export const getAllMedicalTests = () => {
  return get("/doctor/medical-tests");
};

export const getMedicalTestByMedicalRecordId = (medicalRecordId) => {
  return get(`/doctor/medical-records/${medicalRecordId}/medical-test`);
};

export const createMedicalTest = (medicalRecordId, data) => {
  return post(`/doctor/medical-records/${medicalRecordId}/medical-test`, data);
};

export const deleteMedicalTest = (medicalRecordId, medicalTestId) => {
  return del(
    `/doctor/medical-records/${medicalRecordId}/medical-test/${medicalTestId}`
  );
};
