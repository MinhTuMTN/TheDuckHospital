import { del, get, put } from "../AxiosInstance";

export const getPatientProfileById = (patientProfileId) => {
  return get(`/admin/patient-profiles/${patientProfileId}`);
};

export const deletePatientProfile = (patientProfileId) => {
  return del(`/admin/patient-profiles/${patientProfileId}`);
};

export const restorePatientProfile = (patientProfileId) => {
  return put(`/admin/patient-profiles/${patientProfileId}/restore`);
};

export const getMedicalRecordsByPatientProfileId = (patientProfileId) => {
  return get(`admin/patient-profiles/${patientProfileId}/medical-records`);
};
