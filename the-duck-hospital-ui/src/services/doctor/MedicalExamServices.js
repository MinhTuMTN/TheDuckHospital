import { get, put } from "../AxiosInstance";

export const acceptMedicalRecord = (medicalRecordId) => {
  return put(`/doctor/medical-records/${medicalRecordId}/accept`);
};

export const completeMedicalRecord = (medicalRecordId) => {
  return put(`/doctor/medical-records/${medicalRecordId}/complete`);
};

export const getMedicalRecord = (medicalRecordId) => {
  return get(`/doctor/medical-records/${medicalRecordId}`);
};

export const updateMedicalRecord = (medicalRecordId, symptom, diagnosis) => {
  return put(`/doctor/medical-records/${medicalRecordId}`, {
    symptom,
    diagnosis,
  });
};

export const getHistoryMedicalRecord = (medicalRecordId, historyId) => {
  return get(`/doctor/medical-records/${medicalRecordId}/history/${historyId}`);
};
