import {get} from './AxiosInstance';

export const getMedicalRecordDetail = async (medicalRecordId: string) => {
  return get(`/medical-records/${medicalRecordId}`);
};