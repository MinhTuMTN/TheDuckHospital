import {get, getNonAuth} from './AxiosInstance';

export const getAllBooking = async () => {
  return get('/booking');
};

export const getDetailsMedicalBill = async (bookingId: string) => {
  return get(`/booking/${bookingId}`);
};

export const getAllDoctor = async (departmentId: number, page: number) => {
  return get(`/doctors?departmentId=${departmentId}&page=${page}`);
};

export const getAllDepartment = async () => {
  return get('/departments');
};
