import {del, get, put} from './AxiosInstance';

export const getPaginationDepartments = async (
  search: string,
  limit: number,
  page: number,
) => {
  return get(`/admin/departments/filtered`, {search, limit, page});
};

export const deleteDepartment = async (departmentId: number) => {
  return del(`/admin/departments/${departmentId}`);
};

export const restoreDepartment = async (departmentId: number) => {
  return put(`/admin/departments/restore/${departmentId}`);
};

export const getDoctorWithinDepartment = async (departmentId: number) => {
  return get(`/admin/departments/${departmentId}/doctors`);
};

export const getDoctorWithoutDepartment = async (departmentId: number) => {
  return get(`/admin/doctors/not-in-department`);
};

export const deleteHeadDoctor = async (staffId: string) => {
  return get(`/admin/doctors/${staffId}/head-doctor`);
};

export const deleteDoctorInDepartment = async (departmentId: number, doctorId: string) => {
  return del(`/admin/departments/${departmentId}/doctors/${doctorId}`);
};

export const addDoctorToDepartment = async (departmentId: number, doctorId: string) => {
  return put(`/admin/departments/${departmentId}/doctors/${doctorId}`);
};