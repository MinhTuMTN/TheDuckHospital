export const getPaymentType = (paymentType) => {
  switch (paymentType) {
    case "MEDICAL_TEST":
      return "Xét nghiệm";
    case "ADVANCE_FEE":
      return "Thanh toán tạm ứng";
    case "DISCHARGE":
      return "Thanh toán xuất viện";
    default:
      return "Khám bệnh";
  }
};
