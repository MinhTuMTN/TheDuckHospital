import {openWalletDataProps} from '../types';
import {post} from './AxiosInstance';

export const openWallet = async (data: openWalletDataProps) => {
  return post(`/wallet/open-wallet`, data);
};

export const checkPinCode = async (pinCode: string) => {
  return post(`/wallet/check-wallet-code`, {pinCode});
};
