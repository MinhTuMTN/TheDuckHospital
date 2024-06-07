import { SearchOutlined } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

SearchPaymentCode.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  width: "30%",
  minWidth: "320px",
  borderRadius: "10px",
}));

function SearchPaymentCode(props) {
  const { value = "", onChange = () => {} } = props;
  return (
    <StyledOutlinedInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
      placeholder="Mã thanh toán"
      color="newPrimary"
      onFocus={(e) => e.target.select()}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {}}
            onMouseDown={() => {}}
            edge="end"
          >
            <SearchOutlined />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export default SearchPaymentCode;
