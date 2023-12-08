import styled from "@emotion/styled";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CustomTextField = styled(TextField)(({ theme }) => ({
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
  width: "100%",
  background: "#00a0ff",
  ":hover": {
    background: "#1997e0",
  },
}));

const GridBreak = styled(Grid)(({ theme }) => ({
  width: "100%",
}));

function FindPatientCode(props) {
  return (
    <Grid container spacing={2} justifyContent={"center"}>
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
        md={6}
      >
        <CustomTextField
          size="medium"
          variant="outlined"
          id="outlined-basic"
          required
          placeholder="Nhập số điện thoại"
          sx={{
            width: "100% !important",
          }}
        />
      </Grid>

      <GridBreak />
      <Grid item xs={12} md={6}>
        <CustomButton variant="contained">
          <SearchIcon style={{ marginRight: "5px" }} />
          Tìm kiếm
        </CustomButton>
      </Grid>

      <GridBreak />
      <Grid item xs={12} md={6}>
        <Stack
          direction={"row"}
          spacing={0.5}
          sx={{
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              color: "#0b5394",
            },

            xs: {
              width: "100%",
            },

            md: {
              minWidth: "400px",
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
