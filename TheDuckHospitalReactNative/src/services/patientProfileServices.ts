import { patientProfileDataProps } from '../types';
import {del, get, post, put} from './AxiosInstance';

export const getAllPatientProfile = async () => {
  return get(`/patients/patient-profiles`);
};

export const createPatientProfile = async (data: patientProfileDataProps) => {
  return post(`/patients/patient-profiles`, data);
};

export const updatePatientProfile = async (patientProfileId: string, data: patientProfileDataProps) => {
  return put(`/patients/patient-profiles/${patientProfileId}`, data);
};

export const deletePatientProfile = async (patientProfileId: string) => {
  return del(`/patients/patient-profiles/${patientProfileId}`);
};
