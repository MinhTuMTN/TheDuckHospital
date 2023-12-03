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
  console.log(isName);
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          minWidth: "150px",
        }}
      >
        {props.icon}
        <Typography
          marginLeft={1}
          sx={{
            color: "#003553",
          }}
        >
          {props.title}
        </Typography>
      </Box>
      <Typography className={isName ? "name-text" : "default-text"}>
        {props.value}
      </Typography>
    </Stack>
  );
}

export default RowInfo;
