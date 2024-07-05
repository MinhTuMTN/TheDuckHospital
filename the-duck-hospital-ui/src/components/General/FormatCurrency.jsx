import React, { memo } from "react";
import PropTypes from "prop-types";

FormatCurrency.propTypes = {
  amount: PropTypes.number,
  showCurrencySymbol: PropTypes.bool,
};

FormatCurrency.defaultProps = {
  amount: 0,
  showCurrencySymbol: true,
};

function formatCurrency(amount, showCurrencySymbol = true) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const formattedAmount = formatter.format(amount);

  return showCurrencySymbol
    ? formattedAmount.replace("₫", "VNĐ")
    : formattedAmount.replace("₫", "").trim();
}

function FormatCurrency(props) {
  const { amount, showCurrencySymbol } = props;
  // Sử dụng dấu ?? để mặc định giá trị của showCurrencySymbol là true nếu nó không được truyền vào
  return <>{formatCurrency(amount, showCurrencySymbol ?? true)}</>;
}

FormatCurrency.propTypes = {
  amount: PropTypes.number,
  showCurrencySymbol: PropTypes.bool,
};

FormatCurrency.defaultProps = {
  amount: 0,
  showCurrencySymbol: true,
};

export { formatCurrency };
export default memo(FormatCurrency);
