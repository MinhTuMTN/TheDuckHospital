import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = styled(TextField)(({ theme }) => ({
  input: {
    height: "100%",
  },
}));

function MuiTextFeild(props) {
  const {
    label,
    name,
    value,
    onChange,
    error = null,
    children,
    ...others
  } = props;

  return (
    <CustomTextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...others}
    >
      {children}
    </CustomTextField>
  );
}

export default MuiTextFeild;
