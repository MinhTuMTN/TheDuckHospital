import Dns from "@mui/icons-material/Dns";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import {
  Box,
  Breadcrumbs,
  CardMedia,
  Grid,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { appColors } from "../../../utils/appColorsUtils";
import AdmissionDetailsByDate from "../../../components/Nurse/Hospitalize/AdmissionDetailsByDate";
const patientCardStyle = {
  flex: "0 0 auto",
  marginTop: "16px",
  backgroundColor: appColors.white,
  borderRadius: "10px",
  border: "1px solid #f0f0f0",
  display: "flex",
  boxShadow: "0px 10px 40px 10px rgba(0, 0, 0, 0.0784313725)",
};

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 12,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const data = [
  { icon: <FolderSharedIcon />, label: "Hồ sơ bệnh án" },
  { icon: <Dns />, label: "Xest nghiệm" },
  { icon: <ExitToAppIcon />, label: "Xuất viện" },
];

const StyledGrid = styled(Grid)(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 15,
  paddingBottom: 25,
  flex: 1,
  backgroundColor: appColors.backgroundColorMain,
  width: "100%",
  [theme.breakpoints.up("lg")]: {},
}));

function HospitalizationDetails() {
  const [selectedTab, setSelectedTab] = React.useState("");

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
      color={"#5a5a5a"}
      style={{
        fontWeight: "560",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Phòng A202
    </Typography>,
  ];
  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: appColors.backgroundColorMain,
      }}
    >
      <StyledGrid container>
        <Grid
          item
          xs={12}
          sm={4}
          md={3.95}
          lg={3}
          sx={{ paddingX: "12px" }}
          width={"100%"}
          minWidth={"290px"}
        >
          <Stack direction={"column"} style={patientCardStyle}>
            <Box
              padding={"50px 24px 12px 24px"}
              position={"relative"}
              sx={{ zIndex: 1 }}
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
                <Stack
                  marginTop={2}
                  paddingY={1.5}
                  direction={"column"}
                  textAlign={"left"}
                  spacing={1}
                  style={{
                    borderTop: "1px solid #d3d3d3",
                    borderBottom: "1px solid #d3d3d3",
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={"4px"}
                    marginBottom={1}
                  >
                    <NewReleasesIcon
                      style={{
                        fontSize: "16px",
                        color: "#02119d",
                      }}
                    />
                    <Typography
                      color={"#02119d"}
                      fontSize={"16px"}
                      fontWeight={500}
                      marginTop={"4px"}
                    >
                      Tiền sử bệnh và dị ứng
                    </Typography>
                  </Stack>
                  <Typography
                    color={appColors.textDarkGreen}
                    fontSize={"14px"}
                    fontWeight={"bold"}
                  >
                    - Tiền sử bệnh:{" "}
                    <span style={{ fontWeight: "normal" }}>
                      Tiểu đường tuýt 2, cao huyết áp, máu đông
                    </span>
                  </Typography>
                  <Typography
                    color={appColors.textDarkGreen}
                    fontSize={"14px"}
                    fontWeight={"bold"}
                  >
                    - Dị ứng:{" "}
                    <span
                      style={{
                        fontWeight: "400",
                      }}
                    >
                      Không có
                    </span>
                  </Typography>
                </Stack>
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
                }}
              />
            </Box>
            <Stack
              sx={{
                padding: "0 15px 15px 15px",
              }}
            >
              <FireNav component="nav" disablePadding>
                {data.map((item, index) => (
                  <ListItemButton
                    key={item.label}
                    onClick={() => setSelectedTab(index)}
                    sx={{
                      py: 0,
                      minHeight: 40,
                      color:
                        selectedTab === index
                          ? "white"
                          : "rgba(84, 84, 84, 0.8)",
                      backgroundColor:
                        selectedTab === index ? "#0e82fd" : "inherit",
                      "&:hover": {
                        backgroundColor:
                          selectedTab === index
                            ? "#0e82fd"
                            : "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          selectedTab === index ? appColors.white : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium",
                        color:
                          selectedTab === index ? appColors.white : "inherit",
                      }}
                    />
                  </ListItemButton>
                ))}
              </FireNav>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={8.05}
          lg={9}
          marginTop={2}
          sx={{
            paddingX: "12px",
          }}
        >
          <Typography variant="h5" fontWeight={600} letterSpacing={1}>
            Phòng A202
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <AdmissionDetailsByDate />
        </Grid>
      </StyledGrid>
    </Box>
  );
}

export default HospitalizationDetails;
