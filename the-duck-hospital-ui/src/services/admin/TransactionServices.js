import { get } from "../AxiosInstance";

export const getPaginationTransactions = (params) => {
    return get("/admin/transactions/filtered", params);
  };

export const getTransactionById = (transactionId) => {
    return get(`/admin/transactions/${transactionId}`);
};