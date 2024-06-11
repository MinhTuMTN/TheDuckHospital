import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Badge,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import ReceivePatientsTest from "../../components/Doctor/ReceivePatientsTest";
import LabTechnicalRoomModal from "../../components/Doctor/LabTechnicalRoomModal";
import {
  getNextQueue,
  getRoomCounter,
} from "../../services/doctor/MedicalTestServices";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    border: `2px soxd ${theme.palette.background.paper}`,
  },
}));

function MedicalTestPage(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [value, setValue] = React.useState(0);
  const [currentQueueNumber, setCurrentQueueNumber] = React.useState({
    current: 0,
    total: 0,
  });
  const [counter, setCounter] = React.useState({
    waiting: 0,
    processing: 0,
  });
  const [changeRoomModal, setChangeRoomModal] = React.useState(true);
  const [labRoom, setLabRoom] = React.useState(null);
  const handleCloseChangeRoomModal = useCallback(() => {
    setChangeRoomModal(false);
  }, []);
  const handleOpenChangeRoomModal = useCallback(() => {
    setChangeRoomModal(true);
  }, []);

  const handleNextQueueNumber = useCallback(async () => {
    if (!labRoom?.roomId) {
      enqueueSnackbar("Vui lòng chọn phòng xét nghiệm", { variant: "error" });
      return;
    }

    const response = await getNextQueue(labRoom?.roomId);
    if (response.success) {
      const { current, total } = response.data.data;
      setCurrentQueueNumber({ current, total });
    } else if (response.errorCode === 10050) {
      enqueueSnackbar("Không còn bệnh nhân nào để tiếp nhận", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, [labRoom?.roomId]);

  useEffect(() => {
    if (labRoom) {
      const { current, total } = labRoom;
      setCurrentQueueNumber({ current, total });
    }
  }, [labRoom]);

  useEffect(() => {
    const handleGetCounter = async () => {
      const response = await getRoomCounter(labRoom?.roomId);
      if (response.success) {
        const data = response.data.data;
        setCounter(data);
      }
    };

    handleGetCounter();
    const intervalId = setInterval(() => {
      handleGetCounter();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [labRoom?.roomId]);

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
        <Stack direction={"row"} alignItems={"center"}>
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
          <Stack width="100%" spacing={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={1}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: ["14px", "20px"],
                  color: theme.palette.text.main,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "end",
                }}
                flex={1}
                fontWeight="700"
              >
                Phòng {labRoom?.roomName} - {labRoom?.serviceName} - Số thứ tự:{" "}
                {currentQueueNumber.current}
              </Typography>
              <Stack direction={"row"} columnGap={1}>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={handleNextQueueNumber}
                >
                  Tiếp nhận
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={handleOpenChangeRoomModal}
                >
                  Đổi phòng
                </Button>
              </Stack>
            </Stack>
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
                      Đang xét nghiệm
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
                roomId={labRoom?.roomId}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ReceivePatientsTest
                status={"PROCESSING"}
                roomId={labRoom?.roomId}
              />
            </CustomTabPanel>
          </Box>
        </Stack>
      </Grid>

      <LabTechnicalRoomModal
        open={changeRoomModal}
        onClose={handleCloseChangeRoomModal}
        onChange={setLabRoom}
      />
    </Grid>
  );
}

export default MedicalTestPage;
