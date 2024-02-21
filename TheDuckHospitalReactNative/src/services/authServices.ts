import {
  checkPhoneOrEmailDataProps,
  loginDataProps,
  registerDataProps,
} from '../types';
import {get, postNonAuth} from './AxiosInstance';

export const checkPhoneOrEmail = async (data: checkPhoneOrEmailDataProps) => {
  return postNonAuth('/auth/check-account-exist', data);
};

export const loginWithPassword = async (data: loginDataProps) => {
  return postNonAuth('/auth/login-password', data);
};

export const loginWithOTP = async (data: any) => {
  return postNonAuth('/auth/login-otp', data);
};

export const sendOTP = async (data: any) => {
  return postNonAuth('/auth/send-otp', data);
};

export const register = async (data: registerDataProps) => {
  return postNonAuth('/auth/register', data);
};

export const checkToken = async () => {
  return get('/auth/check-token');
};

export const checkInfo = async () => {
  return get('/auth/check-info');
};
