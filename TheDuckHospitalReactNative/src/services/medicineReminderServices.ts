import {get, getNonAuth} from './AxiosInstance';

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
