import {
  checkPhoneOrEmailDataProps,
  loginDataProps,
  registerDataProps,
  forgetPasswordDataProps,
  changePasswordDataProps,
  updateDeviceInformationDataProps,
  changePasswordWithOldPasswordDataProps,
  remoteLogoutDataProps,
} from '../types';
import {get, post, postNonAuth} from './AxiosInstance';

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

export const forgetPassword = async (data: forgetPasswordDataProps) => {
  return postNonAuth('/auth/forget-password', data);
};

export const changePassword = async (data: changePasswordDataProps) => {
  return postNonAuth('/auth/forget-password/verify-change-password', data);
};

export const updateDeviceInformation = async (
  data: updateDeviceInformationDataProps,
) => {
  return post('/auth/update-device-info', data);
};

export const logoutServer = async () => {
  return get('/auth/logout');
};

export const changePasswordWithOldPassword = async (
  data: changePasswordWithOldPasswordDataProps,
) => {
  return post('/auth/change-password', data);
};

export const getMyDevices = async () => {
  return get('/auth/devices');
};

export const remoteLogout = async (data: remoteLogoutDataProps) => {
  return post('/auth/remote-logout', data);
};

export const remoteLogoutAll = async () => {
  return get('/auth/remote-logout-all');
};

export const updateProfile = async (data: FormData) => {
  return post(
    '/auth/update-profile',
    data,
    {
      'Content-Type': 'multipart/form-data',
    },
    10000,
  );
};
