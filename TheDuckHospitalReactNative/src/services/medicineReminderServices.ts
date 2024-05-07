import {creatReminderDataProps} from '../types';
import {get, getNonAuth, post} from './AxiosInstance';

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

export const creatReminder = async (data: creatReminderDataProps) => {
  return post('/medicine-reminders', data);
};
