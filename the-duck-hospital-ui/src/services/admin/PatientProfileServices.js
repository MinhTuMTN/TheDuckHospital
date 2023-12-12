import { del, get, put } from "../AxiosInstance";

export const getPatientProfileById = (patientProfileId) => {
  return get(`/admin/patient-profiles/${patientProfileId}`, null, { Authorization: "" });
};

export const deletePatientProfile = (patientProfileId) => {
  return del(`/admin/patient-profiles/${patientProfileId}`, null, { Authorization: "" });
};

export const restorePatientProfile = (patientProfileId) => {
  return put(`/admin/patient-profiles/${patientProfileId}/restore`, null, { Authorization: "" });
};
