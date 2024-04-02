import {get, getNonAuth} from './AxiosInstance';

export const getAllProvinces = async () => {
  return getNonAuth(`/addresses/provinces`);
};

export const getAllDistricts = async (provinceId: number) => {
  return get(`/addresses/districts?provinceId=${provinceId}`);
};

export const getAllWards = async (districtId: number) => {
  return get(`/addresses/wards?districtId=${districtId}`);
};
