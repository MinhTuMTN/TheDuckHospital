import { del, get, put } from "../AxiosInstance";

export const getPaginationAccounts = (params) => {
  return get("/admin/accounts/filtered", params);
};

export const getAccountById = (userId) => {
  return get(`/admin/accounts/${userId}`);
};

export const deleteAccount = (userId) => {
  return del(`/admin/accounts/${userId}`);
};

export const restoreAccount = (userId) => {
  return put(`/admin/accounts/${userId}/restore`);
};