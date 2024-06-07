import { get } from "../AxiosInstance";

export const getPaymentDetails = (paymentCode) => {
  return get(`/cashiers/payments/${paymentCode}`);
};
