const baseURL = 'https://tb7drp6q-8080.asse.devtunnels.ms/api';
export const ignoreAxiosIntercepter = [
  baseURL + '/auth/check-account-exist',
  baseURL + '/auth/login-password',
  baseURL + '/auth/login-otp',
  baseURL + '/auth/register',
  baseURL + '/auth/forget-password',
  baseURL + '/auth/forget-password/verify-change-password',
  baseURL + '/auth/logout',
];
