import { del, get, post } from "../AxiosInstance";

export const createPatientProfile = (data) => {
  return post("/patients/patient-profiles", data);
};

export const getAllPatientProfiles = (data) => {
  return get("/patients/patient-profiles");
};

export const deletePatientProfile = (id) => {
  return del(`/patients/patient-profiles/${id}`);
};
