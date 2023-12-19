import { get } from "../AxiosInstance";

export const getAllStatistics = () => {
  return get("/admin/statistics", null, { Authorization: "" });
};

export const getRevenueStatistics = (params) => {
  return get("/admin/statistics/revenue", params, { Authorization: "" });
};

export const getBookingStatistics = (params) => {
  return get("/admin/statistics/booking", params, { Authorization: "" });
};