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
    placeholder,
    disabled = false,
    onChange,
    error = null,
    children,
    type = "text",
    ...others
  } = props;

  return (
    <CustomTextField
      variant="outlined"
      label={label}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      {...(error && { error: true, helperText: error })}
      {...others}
    >
      {children}
    </CustomTextField>
  );
}

export default MuiTextFeild;
