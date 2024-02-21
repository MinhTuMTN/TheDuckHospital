import { get, post, postNonAuth } from "../AxiosInstance";

export const forgetPassword = async (data) => {
  return postNonAuth("/auth/forget-password", data);
};

export const changePassword = async (data) => {
  return postNonAuth("/auth/forget-password/verify-change-password", data);
};