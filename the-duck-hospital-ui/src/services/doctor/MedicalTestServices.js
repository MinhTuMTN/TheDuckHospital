import { del, get, post, put } from "../AxiosInstance";

export const getAllMedicalTests = () => {
  return get("/doctor/medical-tests");
};

export const getMedicalTestByMedicalRecordId = (medicalRecordId) => {
  return get(`/doctor/medical-records/${medicalRecordId}/medical-test`);
};

export const getMedicalTestRecord = (medicalTestId) => {
  return get(`/doctor/medical-tests/${medicalTestId}`);
};

export const createMedicalTest = (medicalRecordId, data) => {
  return post(`/doctor/medical-records/${medicalRecordId}/medical-test`, data);
};

export const deleteMedicalTest = (medicalRecordId, medicalTestId) => {
  return del(
    `/doctor/medical-records/${medicalRecordId}/medical-test/${medicalTestId}`
  );
};

export const getCounterMedicalTest = (params) => {
  return get(`/doctor/medical-tests/count`, params);
};

export const getMedicalTestByMedicalServiceAndState = (params) => {
  return get(`/doctor/medical-tests/medical-service`, params);
};

export const getCurrentQueueNumber = (params) => {
  return get(`/doctor/medical-tests/current-queue-number`, params);
};

export const acceptMedicalTest = (data) => {
  return put(`/doctor/medical-tests/accept`, data);
};

export const updateMedicalTestRecord = (medicalTestId, data) => {
  return put(`/doctor/medical-tests/${medicalTestId}/complete`,
  data,
  {
    "Content-Type": "multipart/form-data",
  });
};
