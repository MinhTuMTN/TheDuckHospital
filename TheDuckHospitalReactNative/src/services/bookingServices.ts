import {get} from './AxiosInstance';

export const getAllBooking = async () => {
  return get('/booking');
};

export const getDetailsMedicalBill = async (bookingId: string) => {
  return get(`/booking/${bookingId}`);
};
