export const howToUse = (value: string) => {
  switch (value) {
    case 'TUBE':
      return 'Bôi';
    case 'BOTTLE':
      return 'Uống';
    case 'SYRINGE':
      return 'Tiêm';
    default:
      return 'Uống';
  }
};

export const getMedicineUnit = (value: string) => {
  switch (value) {
    case 'TUBE':
      return 'ml';
    case 'BOTTLE':
      return 'ml';
    case 'SYRINGE':
      return 'ống';
    default:
      return 'viên';
  }
};
