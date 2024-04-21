import {get} from './AxiosInstance';

export const getPaginationPatients = async (
  search: string,
  limit: number,
  page: number,
) => {
  return get(`/admin/patients/filtered`, {search, limit, page});
};