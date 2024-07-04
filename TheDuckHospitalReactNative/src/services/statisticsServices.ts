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

export const getAllStatisticsByDepartment = async (departmentId: number) => {
  return get(`/admin/statistics/${departmentId}`);
};

export const getRevenueStatisticsByDepartment = async (
  departmentId: number,
  startDate: string,
  endDate: string,
) => {
  return get(`/admin/statistics/revenue/${departmentId}`, {startDate, endDate});
};

export const getBookingStatisticsByDepartment = async (
  departmentId: number,
  startDate: string,
  endDate: string,
) => {
  return get(`/admin/statistics/booking/${departmentId}`, {startDate, endDate});
};
