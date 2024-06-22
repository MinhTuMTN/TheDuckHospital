import { del, get } from "../AxiosInstance";

export const deleteHeadOfDepartment = (staffId) => {
  return del(`/admin/doctors/${staffId}/head-doctor`);
};

export const getDoctorsNotInDepartment = () => {
  return get("/admin/doctors/not-in-department");
};

export const getPatientStatistics = (params) => {
  return get("/admin/doctors/patient-statistics", params);
};

export const getReviews = (staffId) => {
  return get(`/admin/doctors/${staffId}/reviews`);
};
