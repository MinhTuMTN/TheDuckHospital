import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingCute from "../../components/General/LoadingCute";
import ChooseDoctorForCounter from "../../components/Nurse/ChooseDoctorForCounter";
import SearchNotFound from "../../components/Nurse/SearchNotFound";
import { getAllDepartments } from "../../services/customer/DepartmentServices";
import { getDoctorSchedules } from "../../services/nurse/DoctorScheduleServices";

const Header = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, #5ab2f7, #12cff3)`,
  color: "white",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  paddingY: "10rem !important",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "825px",
}));

const Body = styled(Box)(({ theme }) => ({
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "30px",
  paddingBottom: "20px",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  width: "825px",
  [theme.breakpoints.down("md")]: {
    paddingTop: "15px", // Set value for small screens
    paddingBottom: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
}));
const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: "14px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: "100%",
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  textAlign: "left",
  fontSize: "14px",
  color: "white",
  "& .MuiOutlinedInput-input": {
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

const Filter = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const ListDocter = styled(Stack)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "20px",
  height: "450px",
  overflow: "auto",
  paddingTop: "5px",
  paddingBottom: "20px",
}));

function ChooseDocterAndTime(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [deparmments, setDeparmments] = React.useState([]);
  const navigate = useNavigate();
  const [selectedDepartmentId, setSelectedDepartmentId] = React.useState("ALL");
  const handleDepartmentChange = async () => {
    const respone = await getAllDepartments();
    if (!respone.success) {
      enqueueSnackbar("Đã xảy ra lỗi khi lấy danh sách chuyên khoa", {
        variant: "error",
      });
    } else {
      setDeparmments(respone.data.data);
    }
  };

  useEffect(() => {
    handleDepartmentChange();
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);
  const [doctorSchedules, setDoctorSchedules] = React.useState([]);
  const handleGetDoctorSchedules = useCallback(async () => {
    if (!selectedDepartmentId || selectedDepartmentId === "ALL") return;

    setIsLoading(true);
    const response = await getDoctorSchedules(selectedDepartmentId);
    if (response.success) {
      setDoctorSchedules(response.data.data);
    } else
      enqueueSnackbar("Đã xảy ra lỗi khi lấy danh sách bác sĩ", {
        variant: "error",
      });
    setIsLoading(false);
  }, [selectedDepartmentId]);

  useEffect(() => {
    handleGetDoctorSchedules();
  }, [handleGetDoctorSchedules]);

  const patientProfile = useLocation().state?.patientProfile;

  useEffect(() => {
    console.log(patientProfile);
    if (!patientProfile) {
      enqueueSnackbar("Vui lòng chọn bệnh nhân", {
        variant: "error",
      });
      navigate("/nurse-counter");
    }
  }, [patientProfile, navigate]);

  return (
    <Stack
      direction="column"
      sx={{
        py: 3,
        px: isFullScreen ? 5 : 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        variant="text"
        sx={{
          alignItems: "center",
          width: "fit-content",
          textTransform: "none",
          cursor: "pointer",
          transition: "all 0.2s ease-in",
          color: "#474747",
          fontWeight: "400",
          ":hover": {
            boxShadow: "9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;",
            transform: "translateY(-2px)",
            "& .icon": {
              transform: "translateX(-5px)",
            },
          },
        }}
        onClick={() => navigate(-1)}
      >
        <KeyboardBackspaceIcon
          className="icon"
          sx={{
            marginRight: "5px",
            fontSize: "18px",
            color: "#474747",
            transition: "all 0.4s ease-in",
          }}
        />
        Quay lại
      </Button>
      <Grid
        container
        spacing={{
          xs: 1,
          md: 1,
        }}
        sx={{
          display: "flex",
          mt: {
            xs: 4,
            md: 1,
          },
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          marginLeft: "-8px",
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Header component={Paper} elevation={3}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                color: "white",
                textAlign: "center",
                paddingY: 1.2,
              }}
            >
              Vui lòng chọn Bác sĩ
            </Typography>
          </Header>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            width: "825px",
            borderRadius: "8px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "0px !important",
            [theme.breakpoints.down("md")]: {
              width: 600, // Set width for medium screens
            },
            [theme.breakpoints.down("sm")]: {
              width: 470, // Set width for small screens
            },
          }}
        >
          <Body component={Paper} elevation={3}>
            <Filter>
              <FormControl
                sx={{
                  width: "250px",
                  background: "linear-gradient(to right, #4facfe, #00f2fe)",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <CustomSelect
                  value={selectedDepartmentId}
                  onChange={(e) => {
                    setSelectedDepartmentId(e.target.value);
                  }}
                  sx={{
                    textAlign: "left",
                    fontSize: "14px",
                    color: "white",
                    "& .MuiOutlinedInput-input": {
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    },
                  }}
                >
                  <CustomMenuItem value={"ALL"}>Chuyên khoa</CustomMenuItem>
                  {deparmments.map((department) => (
                    <CustomMenuItem
                      key={department.departmentId}
                      value={department.departmentId}
                    >
                      {department.departmentName}
                    </CustomMenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            </Filter>
            <ListDocter spacing={1.5}>
              {isLoading && <LoadingCute />}
              {!isLoading &&
                doctorSchedules.map((doctorSchedule) => (
                  <ChooseDoctorForCounter
                    key={doctorSchedule.doctorScheduleId}
                    doctorSchedule={doctorSchedule}
                  />
                ))}

              {!isLoading && doctorSchedules.length === 0 && <SearchNotFound />}
            </ListDocter>
          </Body>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ChooseDocterAndTime;
