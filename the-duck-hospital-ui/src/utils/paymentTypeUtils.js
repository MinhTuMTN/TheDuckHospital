export const getPaymentType = (paymentType) => {
  switch (paymentType) {
    case "MEDICAL_TEST":
      return "Xét nghiệm";
    case "ADVANCE_FEE":
      return "Thanh toán tạm ứng";
    default:
      return "Khám bệnh";
  }
};
