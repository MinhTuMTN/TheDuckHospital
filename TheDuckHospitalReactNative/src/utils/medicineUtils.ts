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
