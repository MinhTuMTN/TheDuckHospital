import React from "react";
import { Box, InputAdornment, TextField, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PropTypes from "prop-types";

SearchServiceList.prototype = {
  borderRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
};

SearchServiceList.defaultProps = {
  onApply: () => { },
};

function SearchServiceList(props) {
  const {
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    onApply,
    value,
    onChange,
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
        placeholder="Tìm kiếm dịch vụ"
      />

      <Button onClick={onApply} sx={{ flexBasis: "15%" }}>
        Áp dụng
      </Button>
    </Box>
  );
}

export default SearchServiceList;
