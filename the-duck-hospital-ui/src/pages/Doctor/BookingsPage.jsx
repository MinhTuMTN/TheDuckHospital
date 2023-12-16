import { useTheme } from "@emotion/react";
import {
  Badge,
  Box,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import ReceivePatients from "../../components/Doctor/ReceivePatients";
import styled from "@emotion/styled";
function createData(patientId, patientName, birth, gender, province) {
  return { patientId, patientName, birth, gender, province };
}

const listPatient = [
  createData("BN12345678", "Nguyễn Ánh Tuyết", "1/1/2002", "Nữ", "Hà Nội"),
  createData(
    "BN12342418",
    "Trần Minh Tuấn",
    "20/11/1992",
    "Nam",
    "Tp Hồ Chí Minh"
  ),
  createData(
    "BN09875678",
    "Tạ Thông Minh",
    "22/8/2002",
    "Nam",
    "Tỉnh Đồng Nai"
  ),
  createData(
    "BN14344669",
    "Dư Nguyễn Sanh Sanh",
    "10/2/2004",
    "Nữ",
    "Tỉnh Bình Dương"
  ),
  createData(
    "BN14344669",
    "Dư Nguyễn Sanh Sanh",
    "10/2/2004",
    "Nữ",
    "Tỉnh Bình Dương"
  ),
];
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -12,
    top: -1,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

function BookingsPage(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      sx={{
        py: 3,
        px: isFullScreen ? 4 : 3,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Grid item xs={12} mb={2}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: ["18px", "24px"],
              color: theme.palette.text.main,
            }}
            fontWeight="700"
          >
            Danh sách bệnh nhân
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: "12px",
          }}
          spacing={"2px"}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab
                  sx={{
                    "& .MuiTab-wrapper": {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    paddingLeft: "25px",
                    paddingRight: "35px",
                  }}
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Tiếp nhận
                      <StyledBadge badgeContent={4} color="error" />
                    </div>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{
                    "& .MuiTab-wrapper": {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    paddingLeft: "25px",
                    paddingRight: "35px",
                  }}
                  label={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Đang khám
                      <StyledBadge badgeContent={4} color="info" />
                    </div>
                  }
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <ReceivePatients status={0} listPatients={listPatient} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ReceivePatients status={1} listPatients={listPatient} />
            </CustomTabPanel>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default BookingsPage;
