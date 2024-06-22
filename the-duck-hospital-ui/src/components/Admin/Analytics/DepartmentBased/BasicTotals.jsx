import styled from "@emotion/styled";
import EastIcon from "@mui/icons-material/East";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import PatientPic from "../../../../assets/patient.png";

const BoxStyle = styled(Paper)(({ theme }) => ({
  padding: "8px !important",
  borderRadius: "16px",
  marginTop: theme.spacing(2),

  boxShadow: `0px 2px 5px #676a6f`,
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "16px !important",
  color: "  #676a6f",
  variant: "subtitle1",
  fontWeight: "550 !important",
}));

const TieuDeCot = styled(Typography)(({ theme }) => ({
  fontSize: "24px !important",
  variant: "body1",
  fontWeight: "650 !important",
  color: "  #101828 !important",
}));

function BasicTotals(props) {
  const { total, label, managementLabel, managementLink } = props;
  const navigate = useNavigate();
  return (
    <BoxStyle
      sx={{
        background: "linear-gradient(45deg, #e9f9ff 30%, #a4e1ff 90%)",
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        sx={{
          borderBottom: "0.1rem solid #484848",
          paddingBottom: "12px",
          paddingLeft: "24px",
        }}
      >
        <img
          src={PatientPic}
          alt="patient"
          style={{
            width: "4.5rem",
            height: "4.5rem",
            objectFit: "contain",
            marginTop: "8px",
          }}
        />
        <Stack direction={"column"}>
          <TieuDe>{label}</TieuDe>
          <TieuDeCot>{total}</TieuDeCot>
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        spacing={0.5}
        sx={{
          paddingLeft: ["36px", "36px", "12px"],
          paddingRight: "12px",
          alignItems: "center",
          paddingTop: "4px",
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          style={{
            color: "#676a6f",
            fontSize: "14px",
            fontWeight: "550",
            width: "100%",
          }}
        >
          {managementLabel}
        </Typography>
        <IconButton
          size="small"
          style={{
            fontSize: "14px",
          }}
          onClick={() => navigate(managementLink)}
        >
          <EastIcon
            sx={{
              fontSize: "18px",
            }}
          />
        </IconButton>
      </Stack>
    </BoxStyle>
  );
}

export default BasicTotals;
