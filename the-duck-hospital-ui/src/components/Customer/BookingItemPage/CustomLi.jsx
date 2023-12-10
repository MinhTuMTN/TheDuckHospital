import { Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import FormatCurrency from "../../General/FormatCurrency";
CustomLi.prototype = {
  lableName: PropTypes.string,
  value: PropTypes.string,
};
function CustomLi(props) {
  const isNgayKham = props.lableName.includes("Ngày khám");
  const isBuoiKham = props.lableName.includes("Buổi khám");
  const isTienKham = props.lableName.includes("Phí khám");
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "10px",
        textAlign: "left",
      }}
    >
      <Typography variant="body1" sx={{ fontSize: "14px" }}>
        {props.lableName}
      </Typography>

      {isTienKham ? (
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            textAlign: "right",
          }}
        >
          <FormatCurrency amount={props.value} />
        </Typography>
      ) : (
        <Typography
          variant="body1"
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            textAlign: "right",
            color: isNgayKham || isBuoiKham ? "#1abc9c" : "#000",
          }}
        >
          {props.value}
        </Typography>
      )}
    </li>
  );
}

export default CustomLi;
