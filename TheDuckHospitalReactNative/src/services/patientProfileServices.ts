import {addPatientProfileProps, patientProfileDataProps} from '../types';
import {del, get, post, put} from './AxiosInstance';

export const getAllPatientProfile = async () => {
  return get(`/patients/patient-profiles`);
};

export const createPatientProfile = async (data: patientProfileDataProps) => {
  return post(`/patients/patient-profiles`, data);
};

export const updatePatientProfile = async (
  patientProfileId: string,
  data: patientProfileDataProps,
) => {
  return put(`/patients/patient-profiles/${patientProfileId}`, data);
};

export const deletePatientProfile = async (patientProfileId: string) => {
  return del(`/patients/patient-profiles/${patientProfileId}`);
};

export const getPatientProfileByPatientCode = async (patientCode: string) => {
  return get(`/patients/patient-profiles/search?patientCode=${patientCode}`);
};

export const addPatientProfile = async (data: addPatientProfileProps) => {
  return post(`/patients/patient-profiles/add-profile`, data);
};

export const findProfileCode = async (data: any) => {
  return post(`/patients/patient-profiles/search-patient_code`, data);
};

export const confirmPatientProfileViaOTP = async (
  data: addPatientProfileProps,
) => {
  return post(`/patients/patient-profiles/send-otp`, data);
};

export const addPatientProfileViaOTP = async (data: any) => {
  return post(`/patients/patient-profiles/add-profile`, data);
};
