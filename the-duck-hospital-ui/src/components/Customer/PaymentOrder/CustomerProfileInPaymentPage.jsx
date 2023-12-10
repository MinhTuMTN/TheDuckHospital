import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes from "prop-types";
const Body = styled(Box)(({ theme }) => ({
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "10px",
  paddingBottom: "10px",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
}));
const CustomTypographyValue = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: theme.palette.text.main,
  textAlign: "justify",
}));
CustomTypographyValue.propTypes = {
  patient: PropTypes.object,
};
function CustomerProfileInPaymentPage(props) {
  return (
    <Body
      sx={{
        justifyContent: "flex-start",
      }}
    >
      <Stack direction={"row"} spacing={0.7} alignItems={"center"}>
        <AccountCircleOutlinedIcon
          sx={{
            fontSize: "18px",
            color: "#b1b1b1",
          }}
        />
        <CustomTypographyValue
          variant="subtitle1"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {props.patient.name}
        </CustomTypographyValue>
      </Stack>
      <Stack
        direction={"row"}
        spacing={0.7}
        alignItems={"center"}
        sx={{
          marginTop: "4px",
        }}
      >
        <SmartphoneIcon
          sx={{
            fontSize: "18px",
            color: "#b1b1b1",
          }}
        />
        <CustomTypographyValue variant="subtitle1">
          {props.patient.phone}
        </CustomTypographyValue>
      </Stack>
      <Stack
        direction={"row"}
        spacing={0.7}
        alignItems={"flex-start"}
        sx={{
          marginTop: "4px",
        }}
      >
        <LocationOnIcon
          sx={{
            fontSize: "18px",
            paddingTop: "3px",
            color: "#b1b1b1",
          }}
        />
        <CustomTypographyValue variant="subtitle1">
          {props.patient.address}
        </CustomTypographyValue>
      </Stack>
    </Body>
  );
}

export default CustomerProfileInPaymentPage;
