import { del, get, post, put } from "../AxiosInstance";

export const getAllStaffs = () => {
  return get("/admin/staffs");
};

export const getPaginationStaffs = (params) => {
  return get("/admin/staffs/filtered", params);
};

export const createStaff = (data) => {
  return post("/admin/staffs", data, {
    "Content-Type": "multipart/form-data",
  });
};

export const updateStaff = (staffId, data) => {
  return put(`/admin/staffs/${staffId}`, data, {
    "Content-Type": "multipart/form-data",
  });
};

export const getStaffById = (staffId) => {
  return get(`/admin/staffs/${staffId}`);
};

export const deleteStaff = (staffId) => {
  return del(`/admin/staffs/${staffId}`);
};

export const restoreStaff = (staffId) => {
  return put(`/admin/staffs/${staffId}/restore`);
};
