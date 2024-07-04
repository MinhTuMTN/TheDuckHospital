import { post } from "../AxiosInstance";

export const addRating = async (data) => {
  return post(`/rating`, data);
};
