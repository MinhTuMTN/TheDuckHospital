import {
  Box,
  CardMedia,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { appColors } from "../../../utils/appColorsUtils";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
const patientCardStyle = {
  paddingX: "12px",
  flex: "0 0 auto",
  marginTop: "16px",
  backgroundColor: appColors.white,
  borderRadius: "10px",
  border: "1px solid #f0f0f0",
  display: "flex",
  boxShadow: "0px 10px 40px 10px rgba(0, 0, 0, 0.0784313725)",
};

function HospitalizationDetails() {
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href=">"
      onClick={() => navigate("/")}
      style={{
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Trang chủ
    </Link>,
    <Typography
      key="2"
      color={"inherit"}
      style={{
        fontWeight: "500",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Nội trú
    </Typography>,
    <Typography
      key="3"
      color={"inherit"}
      style={{
        fontWeight: "500",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Phòng A202
    </Typography>,
    <Typography
      key="4"
      color={"#5a5a5a"}
      style={{
        fontWeight: "560",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Bệnh nhận Mạnh Hùng
    </Typography>,
  ];
  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: appColors.backgroundColorMain,
      }}
    >
      <Box flex={1} display={"flex"}>
        <LayoutComponent container>
          <Grid
            item
            xs={12}
            md={6}
            component={Stack}
            direction={"column"}
            style={patientCardStyle}
          >
            <Box
              padding={"50px 24px 24px 24px"}
              position={"relative"}
              sx={{ zIndex: 1 }}
              minWidth={"270px"}
            >
              <Stack
                display={"block"}
                sx={{
                  textAlign: "center",
                }}
              >
                <CardMedia
                  style={{
                    padding: "3px",
                    marginBottom: "10px",
                    display: "inline-block",
                    width: "auto",
                    backgroundColor: "#f7f7f7",

                    borderRadius: "50%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      backgroundColor: "#c80000",
                      height: "120px",
                      width: "120px",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      color={appColors.white}
                      fontSize={"35px"}
                      fontWeight={500}
                    >
                      MH
                    </Typography>
                  </Box>
                </CardMedia>
                <Typography
                  color={appColors.black}
                  fontSize={"20px"}
                  fontWeight={600}
                  style={{
                    marginBottom: "4px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  Ân Mạnh Hùng
                </Typography>
                <Typography
                  color={appColors.textDarkGreen}
                  fontSize={"14px"}
                  fontWeight={"normal"}
                >
                  Mã bệnh nhân:{" "}
                  <span style={{ letterSpacing: 0.5 }}>BN920W2343</span>
                </Typography>
                <Typography
                  color={appColors.textDarkGreen}
                  fontSize={"14px"}
                  fontWeight={500}
                  letterSpacing={"0.5px"}
                  marginTop={"4px"}
                >
                  Nữ - 25 tuổi
                </Typography>
              </Stack>
              <CardMedia
                component="img"
                image="https://doccure.dreamstechnologies.com/html/template/assets/img/doctors-dashboard/doctor-sidebar-bg.jpg"
                alt="Doctor Sidebar Background"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  borderRadius: "10px 10px 0 0",
                  height: "125px",
                  width: "100%",
                }}
              />
            </Box>
            <Stack
              sx={{
                padding: "15px",
              }}
            >
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Inbox" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Drafts" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Stack>
          </Grid>
        </LayoutComponent>
      </Box>
    </Box>
  );
}

export default HospitalizationDetails;
