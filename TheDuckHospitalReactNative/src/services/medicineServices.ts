import {createOrUpdateMedicineDataProps} from '../types';
import {del, get, post, put} from './AxiosInstance';

export const getPaginationMedicines = async (
  search: string,
  limit: number,
  page: number,
) => {
  return get(`/admin/medicines/filtered`, {search, limit, page});
};

export const deleteMedicine = async (medicineId: number) => {
  return del(`/admin/medicines/${medicineId}`);
};

export const restoreMedicine = async (medicineId: number) => {
  return put(`/admin/medicines/${medicineId}/restore`);
};

export const createMedicine = async (data: createOrUpdateMedicineDataProps) => {
  return post(`/admin/medicines`, data);
};

export const updateMedicine = async (
  medicineId: number,
  data: createOrUpdateMedicineDataProps,
) => {
  return put(`/admin/medicines/${medicineId}`, data);
};
