import { getNonAuth } from "../AxiosInstance";

export const getAllProvinces = () => {
  return getNonAuth("/addresses/provinces");
};

export const getAllDistricts = (provinceId) => {
  return getNonAuth(`/addresses/districts?provinceId=${provinceId}`);
};

export const getAllWards = (districtId) => {
  return getNonAuth(`/addresses/wards?districtId=${districtId}`);
};
