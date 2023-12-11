import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
RowInfo.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  value: PropTypes.string,
};
function RowInfo(props) {
  const isName = props.title.toLowerCase().includes("họ và tên");
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Box
        display="flex"
        alignItems="center"
        flex={{
          md: 1,
          sm: 1,
          xs: 2,
        }}
      >
        {props.icon}
        <Typography
          marginLeft={1}
          sx={{
            color: "#003553",
            textAlign: "left",
          }}
        >
          {props.title}
        </Typography>
      </Box>
      <Typography
        flex={{
          md: 2,
          sm: 3,
          xs: 3,
        }}
        sx={{
          width: "100%",
          textAlign: "left",
          fontWeight: isName ? "bold" : "500",
          color: isName ? "#42a5f5" : "#161414",
          textTransform: isName ? "uppercase" : "none",
        }}
      >
        {props.value}
      </Typography>
    </Stack>
  );
}

export default RowInfo;
