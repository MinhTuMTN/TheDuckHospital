import {createReminderDataProps, updateReminderDataProps} from '../types';
import {get, getNonAuth, post, put} from './AxiosInstance';

export const getMedicineReminder = async () => {
  return get('/medicine-reminders');
};

export const confirmReceivedReminder = async (
  reminderId: string,
  confirmId: string,
) => {
  return getNonAuth('/medicine-reminders/received', {
    reminderId,
    confirmId,
  });
};

export const creatReminder = async (data: createReminderDataProps) => {
  return post('/medicine-reminders', data);
};

export const updateReminder = async (
  medicineReminderId: string,
  data: updateReminderDataProps,
) => {
  return put(`/medicine-reminders/${medicineReminderId}`, data);
};
