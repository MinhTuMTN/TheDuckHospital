import styled from "@emotion/styled";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CustomTextField = styled(TextField)(({ theme }) => ({
  minWidth: "400px",
  "& .MuiOutlinedInput-root": {
    padding: "11px 8px",
  },
}));
const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "2px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
  minWidth: "400px",
  background: "#00a0ff",
  ":hover": {
    background: "#1997e0",
  },
}));
function FindPatientCode(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          style={{
            color: "#12263f",
            fontWeight: "bold",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        >
          NHẬP MÃ SỐ BỆNH NHÂN
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomTextField
          size="medium"
          variant="outlined"
          id="outlined-basic"
          required
          placeholder="Nhập số điện thoại"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomButton variant="contained">
          <SearchIcon style={{ marginRight: "5px" }} />
          Tìm kiếm
        </CustomButton>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"row"}
          spacing={0.5}
          sx={{
            alignItems: "center",
            minWidth: "400px",
            cursor: "pointer",
            "&:hover": {
              color: "#0b5394",
            },
          }}
        >
          <KeyboardArrowRightIcon sx={{ fontSize: "24px" }} />
          <Typography
            variant="body1"
            sx={{
              color: "#12263f",
              fontSize: "1rem",
              "&:hover": {
                color: "#0b5394",
              },
            }}
          >
            Tôi mất mã bệnh nhân của mình
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default FindPatientCode;
