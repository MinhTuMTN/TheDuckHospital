import {get, getNonAuth} from './AxiosInstance';

export const searchDoctor = async (
  doctorName: string,
  departmentId: number | null = null,
  degree: string,
  page: number,
  limit: number,
) => {
  return getNonAuth(`/doctors`, {
    fullName: doctorName,
    departmentId: departmentId,
    degree,
    page,
    limit,
  });
};
