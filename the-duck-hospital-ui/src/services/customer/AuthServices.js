import { get, postNonAuth } from "../AxiosInstance";

export const checkPhoneOrEmail = async (data) => {
  return postNonAuth("/auth/check-account-exist", data);
};

export const loginWithPassword = async (data) => {
  return postNonAuth("/auth/login-password", data);
};

export const loginWithOTP = async (data) => {
  return postNonAuth("/auth/login-otp", data);
};

export const sendOTP = async (data) => {
  return postNonAuth("/auth/send-otp", data);
};

export const register = async (data) => {
  return postNonAuth("/auth/register", data);
};

export const checkToken = async () => {
  return get("/auth/check-token");
};

export const checkInfo = async () => {
  return get("/auth/check-info");
};
