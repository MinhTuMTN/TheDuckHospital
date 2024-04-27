import {createDepartmentDataProps, updateDepartmentDataProps} from '../types';
import {del, get, post, put} from './AxiosInstance';

export const getPaginationDepartments = async (
  search: string,
  limit: number,
  page: number,
) => {
  return get(`/admin/departments/filtered`, {search, limit, page});
};

export const createDepartment = async (data: createDepartmentDataProps) => {
  return post(`/admin/departments`, data);
};

export const updateDepartment = async (
  departmentId: number,
  data: updateDepartmentDataProps,
) => {
  return put(`/admin/departments/${departmentId}`, data);
};

export const deleteDepartment = async (departmentId: number) => {
  return del(`/admin/departments/${departmentId}`);
};

export const restoreDepartment = async (departmentId: number) => {
  return put(`/admin/departments/${departmentId}/restore`);
};

export const getDoctorWithinDepartment = async (departmentId: number) => {
  return get(`/admin/departments/${departmentId}/doctors`);
};

export const getDoctorWithoutDepartment = async (departmentId: number) => {
  return get(`/admin/doctors/not-in-department`);
};

export const deleteHeadDoctor = async (staffId: string) => {
  return del(`/admin/doctors/${staffId}/head-doctor`);
};

export const deleteDoctorInDepartment = async (
  departmentId: number,
  doctorId: string,
) => {
  return del(`/admin/departments/${departmentId}/doctors/${doctorId}`);
};

export const addDoctorToDepartment = async (
  departmentId: number,
  doctorId: string,
) => {
  return put(`/admin/departments/${departmentId}/doctors/${doctorId}`);
};

export const getDepartmentWithoutService = async () => {
  return get(`/admin/departments/without-services`);
}

export const getAllDepartments = async () => {
  return get(`/admin/departments`);
}

export const getDepartmentById = async (departmentId: number) => {
  return get(`/admin/departments/${departmentId}`);
}
