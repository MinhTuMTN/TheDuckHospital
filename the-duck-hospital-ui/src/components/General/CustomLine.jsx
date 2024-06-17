import { Stack, Typography, styled } from "@mui/material";
import React from "react";

const CustomLable = styled(Typography)({
  color: "#303e67",
  fontSize: "14px",
});

const CustomValue = styled(Typography)({
  fontWeight: 400,
  fontSize: "14px",
  paddingLeft: "10px",
});
function CustomLine(props) {
  const {
    lable,
    value,
    lableColor,
    valueColor,
    valueSize,
    lableFontWeight,
    valueFontWeight,
    valueLetterSpacing,
    lableAlign,
    marginTop,
    minWidth,
    ...others
  } = props;
  return (
    <Stack
      direction="row"
      marginTop={marginTop}
      alignItems={"flex-start"}
      width={"100%"}
    >
      <CustomLable
        style={{
          minWidth: minWidth ? minWidth : "120px",
          textAlign: lableAlign ? lableAlign : "left",
          color: lableColor ? lableColor : "#303e67",
          fontWeight: lableFontWeight ? lableFontWeight : 500,
        }}
        {...others}
      >
        {lable}
      </CustomLable>
      <Typography
        marginLeft={"10px"}
        color={lableColor ? lableColor : "#303e67"}
      >
        :
      </Typography>
      <CustomValue
        style={{
          color: valueColor ? valueColor : "#303e67",
          fontSize: valueSize ? valueSize : "14px",
          fontWeight: valueFontWeight ? valueFontWeight : 400,
          letterSpacing: valueLetterSpacing ? valueLetterSpacing : "0px",
        }}
        {...others}
      >
        {value}
      </CustomValue>
    </Stack>
  );
}

export default CustomLine;
