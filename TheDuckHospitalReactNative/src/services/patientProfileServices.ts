import {get} from './AxiosInstance';

export const getAllPatientProfile = async () => {
  return get(`/patients/patient-profiles`);
};
