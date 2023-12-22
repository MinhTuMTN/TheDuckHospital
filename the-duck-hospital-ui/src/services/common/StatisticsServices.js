import { getNonAuth } from "../AxiosInstance";

export const getAllHomeStatistics = () => {
  return getNonAuth("/statistics");
};