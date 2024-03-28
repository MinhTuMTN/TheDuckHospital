import {addPatientProfileProps} from '../types';
import {get, post} from './AxiosInstance';

export const getAllPatientProfile = async () => {
  return get(`/patients/patient-profiles`);
};
export const getPatientProfileByPatientCode = async (patientCode: string) => {
  return get(`/patients/patient-profiles/search?patientCode=${patientCode}`);
};

export const addPatientProfile = async (data: addPatientProfileProps) => {
  return post(`/patients/patient-profiles/add-profile`, data);
};
