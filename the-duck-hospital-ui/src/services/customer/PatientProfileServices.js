import { del, get, post, put } from "../AxiosInstance";

export const createPatientProfile = (data) => {
  return post("/patients/patient-profiles", data);
};

export const updatePatientProfile = (id, data) => {
  return put(`/patients/patient-profiles/${id}`, data);
};

export const getAllPatientProfiles = () => {
  return get("/patients/patient-profiles");
};

export const deletePatientProfile = (id) => {
  return del(`/patients/patient-profiles/${id}`);
};
