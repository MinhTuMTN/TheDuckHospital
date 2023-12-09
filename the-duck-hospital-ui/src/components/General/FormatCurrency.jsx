import React, { memo } from "react";
import PropTypes from "prop-types";

FormatCurrency.propTypes = {
  amount: PropTypes.number,
};

FormatCurrency.defaultProps = {
  amount: 0,
};

function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(amount).replace("₫", "VNĐ");
}

function FormatCurrency(props) {
  const { amount } = props;
  return <>{formatCurrency(amount)}</>;
}

FormatCurrency.propTypes = {
  amount: PropTypes.number,
};

FormatCurrency.defaultProps = {
  amount: 0,
};

export { formatCurrency };
export default memo(FormatCurrency);
