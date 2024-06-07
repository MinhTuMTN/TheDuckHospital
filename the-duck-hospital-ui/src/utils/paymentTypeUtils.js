export const getPaymentType = (paymentType) => {
  switch (paymentType) {
    case "MEDICAL_TEST":
      return "Xét nghiệm";
    default:
      return "Khám bệnh";
  }
};
