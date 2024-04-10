import {openWalletDataProps} from '../types';
import {post} from './AxiosInstance';

export const openWallet = async (data: openWalletDataProps) => {
  return post(`/wallet/open-wallet`, data);
};
