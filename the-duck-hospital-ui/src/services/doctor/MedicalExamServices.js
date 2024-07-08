import { get, post, put } from "../AxiosInstance";

export const acceptMedicalRecord = (medicalRecordId, doctorScheduleId) => {
  return put(
    `/doctor/medical-records/${medicalRecordId}/accept/${doctorScheduleId}`
  );
};

export const completeMedicalRecord = (medicalRecordId) => {
  return put(`/doctor/medical-records/${medicalRecordId}/complete`);
};

export const getMedicalRecord = (medicalRecordId) => {
  return get(`/doctor/medical-records/${medicalRecordId}`);
};

export const updateMedicalRecord = (
  medicalRecordId,
  symptom,
  diagnosis,
  dateOfReExamination
) => {
  return put(`/doctor/medical-records/${medicalRecordId}`, {
    symptom,
    diagnosis,
    dateOfReExamination,
  });
};

export const getHistoryMedicalRecord = (medicalRecordId, historyId) => {
  return get(`/doctor/medical-records/${medicalRecordId}/history/${historyId}`);
};

export const createHospitalAdmissionLetter = (medicalRecordId, data) => {
  return post(
    `/doctor/medical-records/${medicalRecordId}/hospital-admission`,
    data
  );
};
