import { get } from "../AxiosInstance";

export const checkTransaction = (transactionId) => {
  return get(`/transactions/${transactionId}`);
};
