import {get, post} from './AxiosInstance';

export const getMedicalTestDetails = async (paymentId: string) => {
  return get(`/medical-tests/${paymentId}`);
};

export const payment = async (data: any) => {
  return post('/medical-tests/payment', data);
};
