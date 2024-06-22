import { get, post } from "../AxiosInstance";

export const getPaymentDetails = (paymentCode) => {
  return get(`/cashiers/payments/${paymentCode}`);
};

export const createPayment = (paymentData) => {
  return post("/cashiers/payments", paymentData);
};
