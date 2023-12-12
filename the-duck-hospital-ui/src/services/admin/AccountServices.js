import { del, get, put } from "../AxiosInstance";

export const getPaginationAccounts = (params) => {
  return get("/admin/accounts/filter", params, { Authorization: "" });
};

export const getAccountById = (userId) => {
  return get(`/admin/accounts/${userId}`, null, { Authorization: "" });
};

export const deleteAccount = (userId) => {
  return del(`/admin/accounts/${userId}`, null, { Authorization: "" });
};

export const restoreAccount = (userId) => {
  return put(`/admin/accounts/${userId}/restore`, null, { Authorization: "" });
};