import { get } from "../AxiosInstance";

export const getPaginationTransactions = (params) => {
    return get("/admin/transactions/filter", params, { Authorization: "" });
  };


export const getTransactionById = (transactionId) => {
    return get(`/admin/transactions/${transactionId}`, null, { Authorization: "" });
};