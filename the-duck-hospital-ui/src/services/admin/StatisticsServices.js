import { get } from "../AxiosInstance";

export const getAllStatistics = () => {
  return get("/admin/statistics");
};

export const getRevenueStatistics = (params) => {
  return get("/admin/statistics/revenue", params);
};

export const getBookingStatistics = (params) => {
  return get("/admin/statistics/booking", params);
};

export const getStatisticsByDepartment = (departmentId) => {
  return get(`/admin/statistics/${departmentId}`);
};

export const getBookingStatisticsByDepartment = (departmentId, params) => {
  return get(`/admin/statistics/booking/${departmentId}`, params);
};

export const getRevenueStatisticsByDepartment = (departmentId, params) => {
  return get(`/admin/statistics/revenue/${departmentId}`, params);
};
