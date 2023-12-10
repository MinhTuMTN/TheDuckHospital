import { get } from "../AxiosInstance";

export const getPaginationPatients = (params) => {
  return get("/admin/patients/filter", params, { Authorization: "" });
};

export const getAllPatients = () => {
  return get("/admin/patients", null, { Authorization: "" });
};

export const getPatientById = (patientId) => {
  return get(`/admin/patients/${patientId}`, null, { Authorization: "" });
};