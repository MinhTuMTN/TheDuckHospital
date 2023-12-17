import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropTypes from "prop-types";

SearchMedicineList.prototype = {
  borderRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
};

function SearchMedicineList(props) {
  const {
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    value,
    onChange,
    handleEnterKeyPressed,
  } = props;
  return (
    <Box
      sx={{
        padding: 2,
        borderTopLeftRadius: { borderTopLeftRadius },
        borderTopRightRadius: { borderTopRightRadius },
        borderRadius: { borderRadius },
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        variant="standard"
        autoComplete="off"
        fullWidth
        size="medium"
        sx={{
          fontSize: "14px",
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm kiếm thuốc"
        onKeyDown={(e) => {
          handleEnterKeyPressed(e);
        }}
      />
    </Box>
  );
}

export default SearchMedicineList;
