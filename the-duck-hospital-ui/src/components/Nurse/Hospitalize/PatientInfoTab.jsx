import NewReleasesIcon from "@mui/icons-material/NewReleases";
import {
  Box,
  CardMedia,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { appColors } from "../../../utils/appColorsUtils";
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

function PatientInfoTab(props) {
  const { selectedTab, setSelectedTab, data } = props;
  return (
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
                    selectedTab === index ? "white" : "rgba(84, 84, 84, 0.8)",
                  backgroundColor:
                    selectedTab === index ? "#0e82fd" : "inherit",
                  "&:hover": {
                    backgroundColor:
                      selectedTab === index ? "#0e82fd" : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedTab === index ? appColors.white : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                    color: selectedTab === index ? appColors.white : "inherit",
                  }}
                />
              </ListItemButton>
            ))}
          </FireNav>
        </Stack>
      </Stack>
    </Grid>
  );
}

export default PatientInfoTab;
