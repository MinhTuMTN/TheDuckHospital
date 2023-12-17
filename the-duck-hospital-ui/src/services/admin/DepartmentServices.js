import { del, get, post, put } from "../AxiosInstance";

export const getPaginationDepartments = (params) => {
  return get("/admin/departments/filtered", params, { Authorization: "" });
};

export const getAllDepartments = () => {
  return get("/admin/departments", null, { Authorization: "" });
};

export const getDepartmentsWithoutServices = () => {
  return get("/admin/departments/without-services", null, { Authorization: "" });
};

export const getActiveDoctorsDepartment = (departmentId) => {
  return get(`/admin/departments/${departmentId}/doctors`, null, { Authorization: "" });
};

export const getDepartmentById = (departmentId) => {
  return get(`/admin/departments/${departmentId}`, null, { Authorization: "" });
};

export const addDepartment = (data) => {
  return post(`/admin/departments`, data, { Authorization: "" });
};

export const updateDepartment = (departmentId, data) => {
  return put(`/admin/departments/${departmentId}`, data, { Authorization: "" });
};

export const deleteDepartment = (departmentId) => {
  return del(`/admin/departments/${departmentId}`, null, { Authorization: "" });
};

export const restoreDepartment = (departmentId) => {
  return put(`/admin/departments/${departmentId}/restore`, null, { Authorization: "" });
};

export const addDoctorDepartment = (departmentId, doctorId) => {
  return put(`/admin/departments/${departmentId}/doctors/${doctorId}`, null, { Authorization: "" });
};

export const removeDoctorDepartment = (departmentId, doctorId) => {
  return del(`/admin/departments/${departmentId}/doctors/${doctorId}`, null, { Authorization: "" });
};