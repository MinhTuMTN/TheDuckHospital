import {get, getNonAuth} from './AxiosInstance';

export const searchDoctor = async (
  doctorName: string,
  departmentId: number | null = null,
  degree: string,
) => {
  return getNonAuth(`/doctors`, {
    fullName: doctorName,
    departmentId: departmentId,
    degree,
  });
};

export const getAllHeadDoctor = async () => {
  return getNonAuth(`/doctors/head-doctors`);
};
