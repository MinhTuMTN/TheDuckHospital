import {
  createOrUpdateMedicineDataProps,
  createServiceDataProps,
  updateServiceDataProps,
} from '../types';
import {del, get, post, put} from './AxiosInstance';

export const getPaginationMedicalServices = async (
  search: string,
  limit: number,
  page: number,
  serviceTypes: string[],
) => {
  return get(`/admin/services/filtered`, {search, limit, page, serviceTypes});
};

export const deleteService = async (serviceId: number) => {
  return del(`/admin/services/${serviceId}`);
};

export const restoreService = async (serviceId: number) => {
  return put(`/admin/services/${serviceId}/restore`);
};

export const createService = async (data: createServiceDataProps) => {
  return post(`/admin/services`, data);
};

export const updateService = async (
  serviceId: number,
  data: updateServiceDataProps,
) => {
  return put(`/admin/services/${serviceId}`, data);
};
