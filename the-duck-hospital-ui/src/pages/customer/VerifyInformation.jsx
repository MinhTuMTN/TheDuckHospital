import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomLink from "../../components/General/CustomLink";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifyInformationItem from "../../components/Customer/FindProfile/VerifyInformationItem";
import {
  addPatientProfile,
  sendOTPPatientProfile,
} from "../../services/customer/PatientProfileServices";
import { enqueueSnackbar } from "notistack";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));
const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "6px 6px",
  },
}));

function VerifyInformation(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isSmDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const patientProfiles = useLocation().state?.patientProfiles;
  const [selectPatientProfileId, setSelectPatientProfileId] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState("");

  const breakcrumbs = [
    <CustomLink key={1} to="/">
      <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomTextBreakcrumb key={2}>Xác thực thông tin</CustomTextBreakcrumb>,
  ];
  const gradientStyle = {
    fontWeight: "600",
    fontSize: isLgUp ? "2.2rem" : "1.8rem",
    background: `linear-gradient(45deg, #00a0ff, #00d0ff)`,
    WebkitBackgroundClip: "text",
    color: "transparent",
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    const response = await sendOTPPatientProfile(selectPatientProfileId, phone);
    setIsLoading(false);

    if (response.success) {
      enqueueSnackbar("Mã OTP đã được gửi", {
        variant: "success",
      });
      setSendOTP(true);
    } else {
      enqueueSnackbar("Số điện thoại không chính xác", {
        variant: "error",
      });
    }
  };
  const handleAddPatientProfile = async () => {
    setIsLoading(true);
    const response = await addPatientProfile(selectPatientProfileId, otp);
    setIsLoading(false);

    if (response.success) {
      navigate("/user");
    } else {
      enqueueSnackbar(
        "Mã xác thực không hợp lệ. Vui lòng kiểm tra và thử lại",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          paddingX: isLgUp ? 22 : 2,
          py: 4,
          backgroundColor: "#E8F2F7",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breakcrumbs}
        </Breadcrumbs>

        <Grid
          container
          spacing={2}
          sx={{
            mt: 3,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              paddingRight: isMdUp ? "20px" : "0",
              textAlign: "left",
              justifyContent: "space-between",
            }}
          >
            <CustomButton
              variant="text"
              sx={{
                "&:hover": {
                  backgroundColor: "	#ffffff",
                },
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              <ArrowBackIcon
                sx={{
                  marginRight: "5px",
                }}
              />
              Quay lại
            </CustomButton>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              paddingLeft: "0px",
            }}
          >
            <Typography variant="h5" style={gradientStyle}>
              Hồ Sơ Bệnh Nhân
            </Typography>
          </Grid>
          <Grid
            container
            spacing={2}
            item
            xs={12}
            style={{
              paddingLeft: isSmDown ? "16px" : "0px",
              justifyContent: "center",
            }}
          >
            {patientProfiles?.map((profile) => (
              <Grid
                key={profile.patientProfileId}
                item
                xs={12}
                md={12}
                sx={{
                  margin: "auto",
                  borderRadius: "15px",
                  display: "flex",
                  justifyContent: "center",
                  transition: "transform 0.3s",
                  ":hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box
                  className="choose-profile-item"
                  component={Paper}
                  elevation={3}
                  sx={{
                    maxWidth: "sm",
                    borderRadius: "15px",
                    width: "100%",
                  }}
                  onClick={() => {
                    setSelectPatientProfileId(profile.patientProfileId);
                    setOpenDialog(true);
                  }}
                >
                  <VerifyInformationItem profile={profile} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      <React.Fragment>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Xác thực tài khoản</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nhập số điện thoại của bạn để xác thực tài khoản
            </DialogContentText>
            <CustomTextField
              autoFocus
              margin="dense"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
              placeholder="Số điện thoại"
              fullWidth
              variant="outlined"
            />

            {sendOTP && (
              <CustomTextField
                margin="dense"
                id="otp"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                autoComplete="off"
                placeholder="Mã OTP"
                fullWidth
                variant="outlined"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
                setPhone("");
                setSelectPatientProfileId("");
              }}
            >
              Huỷ
            </Button>
            <Button
              onClick={sendOTP ? handleAddPatientProfile : handleSendOTP}
              disabled={isLoading || phone.length !== 10}
            >
              {sendOTP ? "Xác nhận" : "Gửi mã OTP"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default VerifyInformation;
