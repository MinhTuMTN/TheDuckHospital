import { del, get, post, put } from "../AxiosInstance";

export const getPaginationMedicines = (params) => {
    return get("/admin/medicines/filtered", params);
  };

export const createMedicine = (data) => {
    return post("/admin/medicines", data);
};

export const updateMedicine = (medicineId, data) => {
    return put(`/admin/medicines/${medicineId}`, data);
  };

export const getMedicineById = (medicineId) => {
    return get(`/admin/medicines/${medicineId}`);
};

export const deleteMedicine = (medicineId) => {
    return del(`/admin/medicines/${medicineId}`);
};

export const restoreMedicine = (medicineId) => {
    return put(`/admin/medicines/${medicineId}/restore`);
};