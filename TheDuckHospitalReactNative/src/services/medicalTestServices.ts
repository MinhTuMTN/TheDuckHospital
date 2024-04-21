import {get} from './AxiosInstance';

export const getAllMedicalTestTypes = async () => {
  return get(`/medical-tests`);
};
