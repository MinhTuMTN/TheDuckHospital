import {get} from './AxiosInstance';

export const getPaginationTransactions = async (
  search: string,
  limit: number,
  page: number,
  transactionPayment: string[],
  transactionStatus: string[],
) => {
  return get(`/admin/transactions/filtered`, {
    search,
    limit,
    page,
    transactionPayment,
    transactionStatus,
  });
};
