import { del, get, post, put } from "../AxiosInstance";

export const getPaginationServices = (params) => {
  return get("/admin/services/filtered", params, { Authorization: "" });
};

export const getAllServices = () => {
  return get("/admin/services", null, { Authorization: "" });
};

export const getServiceById = (serviceId) => {
  return get(`/admin/services/${serviceId}`, null, { Authorization: "" });
};

export const addService = (data) => {
  return post(`/admin/services`, data, { Authorization: "" });
};

export const updateService = (serviceId, data) => {
  return put(`/admin/services/${serviceId}`, data, { Authorization: "" });
};

export const deleteService = (serviceId) => {
  return del(`/admin/services/${serviceId}`, null, { Authorization: "" });
};

export const restoreService = (serviceId) => {
  return put(`/admin/services/${serviceId}/restore`, null, { Authorization: "" });
};