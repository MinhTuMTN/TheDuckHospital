import {createStaffDataProps, updateStaffDataProps} from '../types';
import {del, get, post, put} from './AxiosInstance';

export const getPaginationStaffs = async (
  search: string,
  limit: number,
  page: number,
  staffRole: string[],
  staffStatus: boolean[],
) => {
  return get(`/admin/staffs/filtered`, {
    search,
    limit,
    page,
    staffRole,
    staffStatus,
  });
};

export const createStaff = async (data: createStaffDataProps) => {
  return post(`/admin/staffs`, data);
};

export const updateStaff = async (
  staffId: string,
  data: updateStaffDataProps,
) => {
  return put(`/admin/staffs/${staffId}`, data);
};
export const deleteStaff = async (staffId: string) => {
  return del(`/admin/staffs/${staffId}`);
};

export const restoreStaff = async (staffId: string) => {
  return put(`/admin/staffs/${staffId}/restore`);
};
