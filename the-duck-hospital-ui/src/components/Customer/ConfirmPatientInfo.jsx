import styled from "@emotion/styled";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import GridInfo from "./GridInfo";

const Header = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, #5ab2f7, #12cff3)`,
  color: "white",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  paddingLeft: "30px",
  paddingRight: "30px",
  paddingTop: "8px",
  paddingBottom: "8px",
}));

const Body = styled(Grid)(({ theme }) => ({
  paddingLeft: "25px",
  paddingRight: "25px",
  paddingTop: "10px",
  paddingBottom: "20px",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderBottomLeftRadius: "8px !important",
  borderBottomRightRadius: "8px !important",
  width: "100%",
  rowGap: "0.5rem",
  [theme.breakpoints.down("md")]: {
    padding: "10px 16px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 14px",
  },
}));

const CustomGrid = styled(Grid)(({ theme }) => ({
  textAlign: "left",
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  width: "100%",
}));

function ConfirmPatientInfo(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <Paper
      elevation={3}
      sx={{
        width: {
          xs: "100%",
          md: "85%",
        },
      }}
    >
      <Stack direction={"column"} sx={{ width: "100%", borderRadius: "8px" }}>
        <Header>
          <Typography
            variant="h6"
            color={"#fff"}
            style={{
              fontSize: isLgUp ? "20px" : "18px",
              fontWeight: "500",
            }}
          >
            Thông tin bệnh nhân
          </Typography>
        </Header>
        <Body container alignItems="flex-start">
          <CustomGrid item md={6}>
            <GridInfo
              label={"Họ và tên:"}
              value={"Nguyễn Ngọc Tuyết Vi"}
              icon={
                <PersonOutlineOutlinedIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
              }
            />
          </CustomGrid>
          <CustomGrid item md={6}>
            <GridInfo
              label={"Giới tính:"}
              value={"Nữ"}
              icon={
                <WcOutlinedIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
              }
            />
          </CustomGrid>
          <CustomGrid item md={6}>
            <GridInfo
              label={"Ngày sinh:"}
              value={"12/01/1999"}
              icon={
                <CalendarMonthOutlinedIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
              }
            />
          </CustomGrid>
          <CustomGrid item md={6}>
            <GridInfo
              label={"CMND:"}
              value={"291234567"}
              icon={
                <BadgeOutlinedIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
              }
            />
          </CustomGrid>
          <CustomGrid item md={6}>
            <GridInfo
              label={"Email:"}
              value={"20110758@student.hcmute.edu.vn"}
              icon={
                <AlternateEmailOutlinedIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
              }
            />
          </CustomGrid>
          <CustomGrid item md={6}>
            <GridInfo
              label={"Dân tộc:"}
              value={"Kinh"}
              icon={
                <GroupsOutlinedIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
              }
            />
          </CustomGrid>
          <CustomGrid item md={12}>
            <GridInfo
              label={"Địa chỉ:"}
              value={"210 Lê Văn Thịnh, Phường Cát Lái, Quận 2, TP.HCM"}
              icon={
                <LocationOnOutlinedIcon
                  sx={{
                    fontSize: "16px",
                  }}
                />
              }
            />
          </CustomGrid>
        </Body>
      </Stack>
    </Paper>
  );
}

export default ConfirmPatientInfo;
