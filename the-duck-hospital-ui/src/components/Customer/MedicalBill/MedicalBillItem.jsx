import styled from "@emotion/styled";
import {
  CalendarMonth,
  LocalHospitalOutlined,
  LooksOneOutlined,
} from "@mui/icons-material";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
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
  cursor: "pointer",
}));

const StyledStatus = styled(Card)(({ theme, status }) => ({
  width: "fit-content",
  padding: "4px 10px",
  textAlign: "center",
  backgroundColor: status === "true" ? "#02CD60" : "#f44336",

  color: "#fff",
  borderRadius: ".5rem",
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
  return (
    <>
      <PropertyName icon={icon} name={propName} />
      <Grid item xs={6.5} sm={9} md={9.5}>
        <Typography variant="body" fontWeight={"600"}>
          {value}
        </Typography>
      </Grid>
    </>
  );
}

function MedicalBillItem(props) {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <StyledMedicalBillItem onClick={() => navigate(item.bookingId)}>
      <Grid container spacing={1.5}>
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
        <Property
          icon={LooksOneOutlined}
          propName="Số thứ tự:"
          value={item.queueNumber}
        />
        <Property
          icon={LibraryAddCheckOutlinedIcon}
          propName="Trạng thái:"
          value={
            <StyledStatus status={item.status}>
              {item.status ? "Đã khám" : "Chưa khám"}
            </StyledStatus>
          }
        />
      </Grid>
    </StyledMedicalBillItem>
  );
}

export default MedicalBillItem;
