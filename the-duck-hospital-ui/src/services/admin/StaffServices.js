import { del, get, post, put } from "../AxiosInstance";

export const getAllStaffs = () => {
    return get("/admin/staffs", null, { Authorization: "" });
};

export const getPaginationStaffs = (params) => {
    return get("/admin/staffs/filtered", params, { Authorization: "" });
};

export const createStaff = (data) => {
    return post("/admin/staffs", data, { Authorization: "" });
};

export const updateStaff = (staffId, data) => {
    return put(`/admin/staffs/${staffId}`, data, { Authorization: "" });
};

export const getStaffById = (staffId) => {
    return get(`/admin/staffs/${staffId}`, null, { Authorization: "" });
};

export const deleteStaff = (staffId) => {
    return del(`/admin/staffs/${staffId}`, null, { Authorization: "" });
};

export const restoreStaff = (staffId) => {
    return put(`/admin/staffs/${staffId}/restore`, null, { Authorization: "" });
};