import { del, get, post, put } from "../AxiosInstance";

export const getPaginationServices = (params) => {
  return get("/admin/services/filtered", params);
};

export const getAllServices = () => {
  return get("/admin/services");
};

export const getServiceById = (serviceId) => {
  return get(`/admin/services/${serviceId}`);
};

export const addService = (data) => {
  return post(`/admin/services`, data);
};

export const updateService = (serviceId, data) => {
  return put(`/admin/services/${serviceId}`, data);
};

export const deleteService = (serviceId) => {
  return del(`/admin/services/${serviceId}`);
};

export const restoreService = (serviceId) => {
  return put(`/admin/services/${serviceId}/restore`);
};