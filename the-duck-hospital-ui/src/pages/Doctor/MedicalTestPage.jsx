import { useTheme } from "@emotion/react";
import {
  Badge,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { acceptMedicalTest, getAllMedicalTests, getCounterMedicalTest, getCurrentQueueNumber } from "../../services/doctor/MedicalTestServices";
import ReceivePatientsTest from "../../components/Doctor/ReceivePatientsTest";
import { enqueueSnackbar } from "notistack";
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
          {children}
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

function MedicalTestPage(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [value, setValue] = React.useState(0);
  const [medicalTests, setMedicalTests] = React.useState([]);
  const [medicalTestIds, setMedicalTestIds] = React.useState([]);
  const [currentQueueNumber, setCurrentQueueNumber] = React.useState(0);
  const [serviceId, setServiceId] = React.useState("");
  const [counter, setCounter] = React.useState({
    waiting: 0,
    processing: 0,
  });
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    const handleGetMedicalTests = async () => {
      const response = await getAllMedicalTests();
      if (response.success) {
        setMedicalTests(response.data.data);
        if (response.data.data.length > 0) {
          setServiceId(response.data.data[0].serviceId);
        }
      }
    }
    handleGetMedicalTests();
  }, []);

  useEffect(() => {
    const handleGetCurrentQueueNumber = async () => {
      const response = await getCurrentQueueNumber({ serviceId });
      if (response.success) {
        setCurrentQueueNumber(response.data.data);
      }
    }
    handleGetCurrentQueueNumber();
  }, [serviceId, counter]);

  const acceptPatients = async () => {
    if (medicalTestIds.length === 0) {
      enqueueSnackbar("Không có bệnh nhân", {
        variant: "error",
      });
      return;
    }
    const response = await acceptMedicalTest({ medicalTestIds: medicalTestIds });
    if (response.success) {
      enqueueSnackbar("Tiếp nhận bệnh nhân thành công", {
        variant: "success",
      });
      handleGetCounterMedicalTest();
    } else {
      enqueueSnackbar("Tiếp nhận bệnh nhân thất bại", {
        variant: "error",
      });
    }
  };

  const handleGetCounterMedicalTest = useCallback(async () => {
    const response = await getCounterMedicalTest({ serviceId });
    if (response.success) {
      const data = response.data.data;
      if (
        data.waiting !== counter.waiting ||
        data.processing !== counter.processing
      ) {
        setRefresh(!refresh);
        setCounter(data);
      }
    }
  }, [counter, refresh, serviceId]);

  useEffect(() => {
    handleGetCounterMedicalTest();
    const intervalId = setInterval(() => {
      handleGetCounterMedicalTest();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [counter, refresh, serviceId, handleGetCounterMedicalTest]);

  useEffect(() => {
    setValue(0);
  }, [serviceId]);

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
          alignItems={"center"}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: ["18px", "24px"],
              color: theme.palette.text.main,
              width: "60%",
            }}
            fontWeight="700"
          >
            Danh sách bệnh nhân
          </Typography>
          <Stack width="40%" spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{
                  fontSize: ["14px", "20px"],
                  color: theme.palette.text.main,
                }}
                fontWeight="700"
              >
                Số tiếp theo: {currentQueueNumber > 0 ?
                  `${currentQueueNumber} - ${currentQueueNumber + 4}` : 0}
              </Typography>
              <Button
                variant="outlined"
                color="info"
                onClick={acceptPatients}
              >
                Tiếp nhận
              </Button>
            </Stack>
            <FormControl fullWidth size="small">
              <InputLabel>Dịch vụ</InputLabel>
              <Select
                value={serviceId}
                label="Dịch vụ"
                onChange={(e) => setServiceId(e.target.value)}
              >
                {medicalTests?.map((medicalTest, index) => (
                  <MenuItem
                    value={medicalTest.serviceId}
                    style={{ fontSize: "14px" }}
                    key={index}
                  >
                    {medicalTest.serviceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
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
              <Tabs value={value} onChange={(e, value) => setValue(value)}>
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
                      <StyledBadge
                        badgeContent={counter.waiting}
                        color="error"
                      />
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
                      <StyledBadge
                        badgeContent={counter.processing}
                        color="info"
                      />
                    </div>
                  }
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <ReceivePatientsTest
                status={"WAITING"}
                refresh={refresh}
                serviceId={serviceId}
                handleGetCounterMedicalTest={handleGetCounterMedicalTest}
                setMedicalTestIds={setMedicalTestIds}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ReceivePatientsTest
                status={"PROCESSING"}
                refresh={refresh}
                serviceId={serviceId}
              />
            </CustomTabPanel>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MedicalTestPage;
