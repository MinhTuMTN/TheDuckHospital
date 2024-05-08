import {formatCurrency} from './currencyUtils';

// BOOKING, MEDICAL_TEST, TOP_UP, REFUND
export const getTransactionType = (type: string, lang: 'en' | 'vi' = 'vi') => {
  switch (type) {
    case 'BOOKING':
      return lang === 'vi' ? 'Đặt lịch' : 'Booking';
    case 'MEDICAL_TEST':
      return lang === 'vi' ? 'Xét nghiệm' : 'Medical test';
    case 'TOP_UP':
      return lang === 'vi' ? 'Nạp tiền' : 'Top up';
    case 'REFUND':
      return lang === 'vi' ? 'Hoàn tiền' : 'Refund';
    default:
      return lang === 'vi' ? 'Khác' : 'Other';
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

export const getTransactionColor = (type: string) => {
  switch (type) {
    case 'BOOKING':
      return '#009FFF';
    case 'MEDICAL_TEST':
      return '#FFA5BA';
    case 'TOP_UP':
      return '#009FFF';
    case 'REFUND':
      return '#FFA5BA';
    default:
      return '#FFA5BA';
  }
};

export const getCenterGradientColor = (type: string) => {
  switch (type) {
    case 'BOOKING':
      return '#006DFF';
    case 'MEDICAL_TEST':
      return '#FF7F97';
    case 'TOP_UP':
      return '#006DFF';
    case 'REFUND':
      return '#FF7F97';
    default:
      return '#FF7F97';
  }
};
