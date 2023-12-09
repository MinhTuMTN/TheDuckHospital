import styled from "@emotion/styled";
import {
  CalendarMonth,
  LocalHospitalOutlined,
  LooksOneOutlined,
} from "@mui/icons-material";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

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

const StyledStatus = styled(Card)(({ theme }) => ({
  width: "fit-content",
  padding: "4px 10px",
  textAlign: "center",
  backgroundColor: theme.status === "true" ? "#02CD60" : "#f44336",
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
  return (
    <StyledMedicalBillItem>
      <Grid container spacing={1.5}>
        <Property
          icon={LocalHospitalOutlined}
          propName="Chuyên khoa"
          value="Chuyên khoa da liễu - trị mụn bla bla"
        />
        <Property
          icon={"https://cdn-icons-png.flaticon.com/512/3481/3481061.png"}
          propName="Bác sĩ"
          value="Nguyễn Thị C"
        />
        <Property
          icon={CalendarMonth}
          propName="Ngày khám"
          value="11/11/2021"
        />
        <Property icon={LooksOneOutlined} propName="Số thứ tự" value="420" />
        <Property
          icon={LooksOneOutlined}
          propName="Trạng thái"
          value={<StyledStatus status={"false"}>Đã khám</StyledStatus>}
        />
      </Grid>
    </StyledMedicalBillItem>
  );
}

export default MedicalBillItem;
