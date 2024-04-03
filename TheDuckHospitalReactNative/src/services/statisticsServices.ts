import {get} from './AxiosInstance';

export const getBookingStatistics = async (
  startDate: string,
  endDate: string,
) => {
  return get(`/admin/statistics/booking`, {startDate, endDate});
};

export const getRevenueStatistics = async (
  startDate: string,
  endDate: string,
) => {
  return get(`/admin/statistics/revenue`, {startDate, endDate});
};

export const getAllStatistics = async () => {
  return get(`/admin/statistics`);
};
