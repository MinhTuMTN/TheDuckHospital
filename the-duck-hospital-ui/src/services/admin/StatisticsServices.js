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