import CloseIcon from "@mui/icons-material/Close";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { appColors } from "../../../utils/appColorsUtils";
const LayoutStyle = styled(Stack)(({ theme }) => ({
  padding: "16px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
  position: "relative",
}));
const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const VitalSignsComponent = (props) => {
  const {
    heartRate,
    bloodPressure,
    temperature,
    onChange = () => {},
    isNotTodayOrYesterday,
    handleAlertNotTodayOrYesterday = () => {},
  } = props;
  const [changeInfo, setChangeInfo] = React.useState({
    heartRate: heartRate,
    bloodPressure: bloodPressure,
    temperature: temperature,
  });
  const [openModal, setOpenModal] = React.useState(false);
  const handleUpdateVitalSigns = () => {
    onChange(
      changeInfo.bloodPressure,
      changeInfo.heartRate,
      changeInfo.temperature
    );
    setOpenModal(false);
  };
  const handleCloseModal = () => {
    setChangeInfo({
      heartRate: heartRate,
      bloodPressure: bloodPressure,
      temperature: temperature,
    });
    setOpenModal(false);
  };

  useEffect(() => {
    setChangeInfo({
      heartRate: heartRate,
      bloodPressure: bloodPressure,
      temperature: temperature,
    });
  }, [heartRate, bloodPressure, temperature]);
  return (
    <LayoutStyle direction={"column"}>
      <Box
        sx={{
          width: "100%",
          paddingBottom: "8px",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
          Dấu hiệu sinh tồn
        </Typography>
      </Box>
      <Stack direction={"column"} marginTop={"10px"} width={"100%"}>
        <Stack marginBottom={"24px"}>
          <Stack direction={"row"} alignItems={"center"} marginBottom={"8px"}>
            <VaccinesIcon style={{ fontSize: "16px", color: "#DE3F44" }} />
            <Typography
              fontSize={"14px"}
              marginLeft={"5px"}
              fontWeight={600}
              color={"#6b7280"}
              letterSpacing={0.5}
            >
              Huyết áp
            </Typography>
          </Stack>
          <Typography fontSize={"20px"} fontWeight={500} color={"#272b41"}>
            {bloodPressure} mg/dl
          </Typography>
        </Stack>
        <Stack marginBottom={"24px"}>
          <Stack direction={"row"} alignItems={"center"} marginBottom={"8px"}>
            <FavoriteIcon style={{ fontSize: "16px", color: "#DE3F44" }} />
            <Typography
              fontSize={"14px"}
              marginLeft={"5px"}
              fontWeight={600}
              color={"#6b7280"}
              letterSpacing={0.5}
            >
              Nhịp tim
            </Typography>
          </Stack>
          <Typography fontSize={"20px"} fontWeight={500} color={"#272b41"}>
            {heartRate} Bpm
          </Typography>
        </Stack>
        <Stack marginBottom={"24px"}>
          <Stack direction={"row"} alignItems={"center"} marginBottom={"8px"}>
            <DeviceThermostatIcon
              style={{ fontSize: "16px", color: "#DE3F44" }}
            />
            <Typography
              fontSize={"14px"}
              marginLeft={"5px"}
              fontWeight={600}
              color={"#6b7280"}
              letterSpacing={0.5}
            >
              Nhiệt độ
            </Typography>
          </Stack>
          <Typography fontSize={"20px"} fontWeight={500} color={"#272b41"}>
            {temperature} °C
          </Typography>
        </Stack>
      </Stack>

      <Button
        onClick={() => {
          if (isNotTodayOrYesterday) {
            handleAlertNotTodayOrYesterday();
          } else {
            setOpenModal(true);
          }
        }}
        sx={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          padding: "8px 16px",
        }}
      >
        <Typography
          textTransform={"none"}
          fontSize={"14px"}
          fontWeight={600}
          color={appColors.blueBackground}
          letterSpacing={0.5}
        >
          Cập nhật
        </Typography>
      </Button>
      {openModal && (
        <Modal open={openModal} onClose={handleCloseModal} style={modalStyle}>
          <Stack
            direction={"column"}
            style={{
              backgroundColor: appColors.white,
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <Stack
              direction={"row"}
              padding={"8px 16px"}
              justifyContent={"space-between"}
              alignItems={"center"}
              style={{
                borderBottom: "1px solid #b7b7b7",
              }}
            >
              <Typography fontSize={"18px"} fontWeight={600}>
                Cập nhật dấu hiệu sinh tồn
              </Typography>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />{" "}
              </IconButton>
            </Stack>
            <Stack padding={"24px 16px 16px 16px"} direction={"column"}>
              <Box
                component="form"
                width={"100%"}
                noValidate
                autoComplete="off"
              >
                <TextField
                  value={changeInfo.heartRate}
                  onChange={(e) => {
                    setChangeInfo((prev) => ({
                      ...prev,
                      heartRate: e.target.value,
                    }));
                  }}
                  fullWidth
                  label="Nhịp tim"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VaccinesIcon style={{ fontSize: "18px" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">Bpm</InputAdornment>
                    ),
                    style: {
                      padding: "8px 12px",
                    },
                  }}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  value={changeInfo.bloodPressure}
                  onChange={(e) => {
                    setChangeInfo((prev) => ({
                      ...prev,
                      bloodPressure: e.target.value,
                    }));
                  }}
                  fullWidth
                  label="Huyết áp"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VaccinesIcon style={{ fontSize: "18px" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">mg/dl</InputAdornment>
                    ),
                    style: {
                      padding: "8px 12px",
                    },
                  }}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  value={changeInfo.temperature}
                  onChange={(e) => {
                    setChangeInfo((prev) => ({
                      ...prev,
                      temperature: e.target.value,
                    }));
                  }}
                  fullWidth
                  label="Nhiệt độ"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VaccinesIcon style={{ fontSize: "18px" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">°C</InputAdornment>
                    ),
                    style: {
                      padding: "8px 12px",
                    },
                  }}
                />
              </Box>
            </Stack>
            <Stack
              padding={"8px 16px 12px 16px"}
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Button
                onClick={handleCloseModal}
                style={{
                  padding: "8px 16px",
                  marginRight: "8px",
                }}
              >
                <Typography
                  textTransform={"none"}
                  fontSize={"14px"}
                  fontWeight={600}
                  color={appColors.blueBackground}
                  letterSpacing={0.5}
                >
                  Hủy
                </Typography>
              </Button>
              <Button
                style={{
                  padding: "8px 16px",
                  backgroundColor: appColors.blueBackground,
                }}
                onClick={handleUpdateVitalSigns}
              >
                <Typography
                  textTransform={"none"}
                  fontSize={"14px"}
                  fontWeight={600}
                  color={appColors.white}
                  letterSpacing={0.5}
                >
                  Cập nhật
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Modal>
      )}
    </LayoutStyle>
  );
};

VitalSignsComponent.prototype = {
  heartRate: PropTypes.number,
  bloodPressure: PropTypes.number,
  temperature: PropTypes.number,
};
export default VitalSignsComponent;
