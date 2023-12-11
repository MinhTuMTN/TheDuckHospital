import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import FormatCurrency from "../../General/FormatCurrency";
CustomLi.prototype = {
  lableName: PropTypes.string,
  value: PropTypes.string,
};
function CustomLi(props) {
  const { color = "#000", currency, uppercase } = props;
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "10px",
        textAlign: "left",
        textTransform: uppercase ? "uppercase" : "none",
      }}
    >
      <Typography variant="body1" sx={{ fontSize: "14px" }}>
        {props.lableName}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          fontWeight: "700",
          textAlign: "right",
          color: color,
        }}
      >
        {currency ? <FormatCurrency amount={props.value} /> : props.value}
      </Typography>
    </li>
  );
}

export default CustomLi;
