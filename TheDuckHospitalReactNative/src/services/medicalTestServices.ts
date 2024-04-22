import {medicalTestResultDataProps} from '../types';
import {get} from './AxiosInstance';

export const getAllMedicalTestTypes = async () => {
  return get(`/medical-tests`);
};

export const getMedicalTestResults = async (
  patientCode: string,
  data: medicalTestResultDataProps,
) => {
  return get(`/medical-tests/results/${patientCode}`, data);
};
