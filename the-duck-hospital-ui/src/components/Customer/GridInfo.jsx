import styled from "@emotion/styled";
import { CardMedia, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
const CustomTypographyValue = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.text.main,
}));

const CustomTypographyLabel = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "400",
  color: theme.palette.text.main,
}));

const CustomBox = styled(CardMedia)({
  color: "#b1b1b1",
  width: "fit-content",
  height: "20px",
});

GridInfo.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.element,
};
function GridInfo(props) {
  return (
    <>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems={"center"}
        style={{
          minWidth: "120px",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CustomBox>{props.icon}</CustomBox>

        <CustomTypographyLabel>{props.label}</CustomTypographyLabel>
      </Stack>
      <CustomTypographyValue>{props.value}</CustomTypographyValue>
    </>
  );
}

export default GridInfo;
