import { Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
PatientItemCounter.propTypes = {
  lableName: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.element,
};
function PatientItemCounter(props) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        width: "100%",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fonWeight: "400",
          lineHeight: "1.5",
          fontSize: "16px",
          alignItems: "center",
          display: "flex",
        }}
      >
        {props.icon}
        {props.lableName}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fonWeight: "600 !important",
          lineHeight: "1.5",
          fontSize: "16px",
        }}
      >
        {props.value}
      </Typography>
    </Stack>
  );
}

export default PatientItemCounter;
