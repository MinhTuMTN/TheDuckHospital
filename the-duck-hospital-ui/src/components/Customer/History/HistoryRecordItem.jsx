import styled from "@emotion/styled";
import { CalendarMonth, LocalHospitalOutlined } from "@mui/icons-material";
import {
  Box,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";

const StyledMedicalBillItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  borderRadius: ".5rem",
  border: "1px solid #ddd",
  backgroundColor: "#fff",
  marginBottom: "8px",
  marginTop: "8px",
}));

function PropertyName(props) {
  const { icon, name } = props;
  const Icon = typeof icon === "string" ? CardMedia : icon;
  return (
    <Grid
      item
      xs={5.5}
      sm={3}
      md={2.5}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Icon
        sx={{ marginRight: 1, width: "16px", height: "16px" }}
        src={typeof icon === "string" ? icon : ""}
        component={typeof icon === "string" ? "img" : ""}
      />
      <Typography variant="body">{name}</Typography>
    </Grid>
  );
}

function Property(props) {
  const { icon, propName, value } = props;
  const displayValue =
    propName === "Chuyên khoa:" ? value.toUpperCase() : value;
  return (
    <Stack direction={"row"}>
      <PropertyName icon={icon} name={propName} />
      <Grid item xs={6.5} sm={9} md={9.5}>
        <Typography variant="body" fontWeight={"600"}>
          {displayValue}
        </Typography>
      </Grid>
    </Stack>
  );
}

function HistoryRecordItem(props) {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <StyledMedicalBillItem onClick={() => navigate(item.bookingId)}>
      <Grid container spacing={1.5} alignItems={"center"}>
        <Grid item xs={11}>
          <Property
            icon={LocalHospitalOutlined}
            propName="Chuyên khoa:"
            value={item.departmentName}
          />
          <Property
            icon={"https://cdn-icons-png.flaticon.com/512/3481/3481061.png"}
            propName="Bác sĩ:"
            value={item.doctorName}
          />
          <Property
            icon={CalendarMonth}
            propName="Ngày khám:"
            value={dayjs(item.date).format("DD/MM/YYYY")}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </StyledMedicalBillItem>
  );
}

export default HistoryRecordItem;
