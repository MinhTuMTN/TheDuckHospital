import { get } from "../AxiosInstance";

export const getPaginationPatients = (params) => {
  return get("/admin/patients/filtered", params);
};

export const getAllPatients = () => {
  return get("/admin/patients");
};

export const getPatientById = (patientId) => {
  return get(`/admin/patients/${patientId}`);
};