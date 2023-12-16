import { del, get, post, put } from "../AxiosInstance";

export const getPaginationMedicines = (params) => {
    return get("/admin/medicines/filtered", params, { Authorization: "" });
  };

export const createMedicine = (data) => {
    return post("/admin/medicines", data, { Authorization: "" });
};

export const updateMedicine = (medicineId, data) => {
    return put(`/admin/medicines/${medicineId}`, data, { Authorization: "" });
  };

export const getMedicineById = (medicineId) => {
    return get(`/admin/medicines/${medicineId}`, null, { Authorization: "" });
};

export const deleteMedicine = (medicineId) => {
    return del(`/admin/medicines/${medicineId}`, null, { Authorization: "" });
};

export const restoreMedicine = (medicineId) => {
    return put(`/admin/medicines/${medicineId}/restore`, null, { Authorization: "" });
};