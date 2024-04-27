import {formatCurrency} from './currencyUtils';

// BOOKING, MEDICAL_TEST, TOP_UP, REFUND
export const getTransactionType = (type: string) => {
  switch (type) {
    case 'BOOKING':
      return 'Đặt lịch';
    case 'MEDICAL_TEST':
      return 'Xét nghiệm';
    case 'TOP_UP':
      return 'Nạp tiền';
    case 'REFUND':
      return 'Hoàn tiền';
    default:
      return 'Khác';
  }
};

export const getTransactionAmount = (type: string, amount: number) => {
  switch (type) {
    case 'BOOKING':
      return `- ${formatCurrency(amount.toString() || '0')} VND`;
    case 'MEDICAL_TEST':
      return `- ${formatCurrency(amount.toString() || '0')} VND`;
    case 'TOP_UP':
      return `+ ${formatCurrency(amount.toString() || '0')} VND`;
    case 'REFUND':
      return `+ ${formatCurrency(amount.toString() || '0')} VND`;
    default:
      return `+ ${formatCurrency(amount.toString() || '0')} VND`;
  }
};
