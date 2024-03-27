import {get} from './AxiosInstance';

export const getAllNations = async () => {
  return get(`/nations`);
};
