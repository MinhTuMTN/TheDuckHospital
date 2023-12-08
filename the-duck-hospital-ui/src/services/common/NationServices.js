import { getNonAuth } from "../AxiosInstance";

export const getAllNations = () => {
  return getNonAuth("/nations");
};
