import { post } from "../AxiosInstance";

export const createPatientProfile = (data) => {
  return post("/patients/patient-profiles", data);
};
