import {openWalletDataProps, topUpWalletDataProps} from '../types';
import {get, post} from './AxiosInstance';

export const openWallet = async (data: openWalletDataProps) => {
  return post(`/wallet/open-wallet`, data);
};

export const checkPinCode = async (pinCode: string) => {
  return post(`/wallet/check-wallet-code`, {pinCode});
};

export const topUpWallet = async (data: topUpWalletDataProps) => {
  return post(`/wallet/top-up`, data);
};

export const getWalletInfo = async () => {
  return get(`/wallet/wallet-info`);
};

export const getWalletStatistic = async (month: number, year: number) => {
  return get(`/wallet/statistic`, {month, year});
};
