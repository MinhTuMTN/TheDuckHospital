import {get, post} from './AxiosInstance';

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

export const createBooking = async (
  patientProfileId: string,
  timeSlotIds: string[],
  paymentMethod: 'MOMO' | 'VNPAY' | 'WALLET' | '',
  mobile: boolean = true,
) => {
  return post('/booking', {
    patientProfileId,
    timeSlotIds,
    paymentMethod,
    mobile,
  });
};
