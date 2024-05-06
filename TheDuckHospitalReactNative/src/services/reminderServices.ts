import {del, get} from './AxiosInstance';

export const searchPrescription = async (
  patientProfileId: string,
  startDate: string,
  endDate: string,
) => {
  return get(`/medicine-reminders/prescription`, {
    patientProfileId,
    startDate,
    endDate,
  });
};

export const getPrescriptionDetail = async (
  prescripatientProfileId: string,
  prescriptionId: string,
) => {
  return get(
    `/medicine-reminders/prescription/${prescriptionId}?patientProfileId=${prescripatientProfileId}`,
  );
};

export const remindersDetail = async (date: string) => {
  return get(`/medicine-reminders?date=${date}`);
};

export const useMedicine = async (
  reminderId: string,
  remindersDetailId: string,
  type: 'used' | 'ignore',
) => {
  return del(
    `/medicine-reminders/${reminderId}/${remindersDetailId}?type=${type}`,
  );
};
