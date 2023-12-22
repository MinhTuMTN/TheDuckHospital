import { del, get, post, put } from "../AxiosInstance";

export const getPaginationDepartments = (params) => {
  return get("/admin/departments/filtered", params);
};

export const getAllDepartments = () => {
  return get("/admin/departments");
};

export const getDepartmentsWithoutServices = () => {
  return get("/admin/departments/without-services");
};

export const getActiveDoctorsDepartment = (departmentId) => {
  return get(`/admin/departments/${departmentId}/doctors`);
};

export const getDepartmentById = (departmentId) => {
  return get(`/admin/departments/${departmentId}`);
};

export const addDepartment = (data) => {
  return post(`/admin/departments`, data);
};

export const updateDepartment = (departmentId, data) => {
  return put(`/admin/departments/${departmentId}`, data);
};

export const deleteDepartment = (departmentId) => {
  return del(`/admin/departments/${departmentId}`);
};

export const restoreDepartment = (departmentId) => {
  return put(`/admin/departments/${departmentId}/restore`);
};

export const addDoctorDepartment = (departmentId, doctorId) => {
  return put(`/admin/departments/${departmentId}/doctors/${doctorId}`);
};

export const removeDoctorDepartment = (departmentId, doctorId) => {
  return del(`/admin/departments/${departmentId}/doctors/${doctorId}`);
};