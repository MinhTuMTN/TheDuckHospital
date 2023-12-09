import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DoctorItemInChooseDocterPage from "../../components/Customer/DoctorItemInChooseDocterPage";
import CustomLink from "../../components/General/CustomLink";
import { useNavigate } from "react-router-dom";
import { getDoctorsMedicalExaminations } from "../../services/customer/DoctorServices";
import { enqueueSnackbar } from "notistack";
import { getAllDepartments } from "../../services/customer/DepartmentServices";

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

const Header = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, #5ab2f7, #12cff3)`,
  color: "white",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  paddingY: "12rem !important",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "825px",
}));
const Body = styled(Box)(({ theme }) => ({
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "35px",
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

const Filter = styled(Stack)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "20px",
}));
const ListDocter = styled(Stack)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "20px",
  height: "500px",
  overflow: "auto",
  paddingTop: "5px",
  paddingBottom: "20px",
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
function ChooseDoctorPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const breakcrumbs = [
    <CustomLink to="/" key={1}>
      <CustomTextBreakcrumb>Trang chủ</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomTextBreakcrumb key={2}>Chọn bác sĩ</CustomTextBreakcrumb>,
  ];
  const theme = useTheme();
  const [selectedDegree, setSelectedDegree] = React.useState("ALL");

  const [deparmments, setDeparmments] = React.useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = React.useState("ALL");
  const handleGetAllDepartment = useCallback(async () => {
    const response = await getAllDepartments();
    if (!response.success) {
      enqueueSnackbar("Đã xảy ra lỗi khi lấy danh sách chuyên khoa", {
        variant: "error",
      });
    } else {
      setDeparmments(response.data.data);
    }
  }, []);
  useEffect(() => {
    handleGetAllDepartment();
  }, [handleGetAllDepartment]);
  const [fullName, setFullName] = React.useState("");
  const [fullNameSearch, setFullNameSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const [doctors, setDoctors] = React.useState([]);
  const handleGetDoctorExaminations = useCallback(async () => {
    const response = await getDoctorsMedicalExaminations(
      fullName,
      page,
      selectedDepartmentId === "ALL" ? null : selectedDepartmentId,
      selectedDegree === "ALL" ? null : selectedDegree
    );
    if (!response.success) {
      enqueueSnackbar("Đã xảy ra lỗi khi lấy danh sách bác sĩ", {
        variant: "error",
      });
    } else {
      setDoctors(response.data.data.items);
      setPage(response.data.data.page);
      setTotalPages(response.data.data.totalPages);
    }
  }, [fullName, page, selectedDepartmentId, selectedDegree]);
  useEffect(() => {
    handleGetDoctorExaminations();
  }, [handleGetDoctorExaminations]);
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 3,
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
          display: "flex",
          mt: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            paddingLeft: "0px",
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
              navigate("/choose-patient-profiles");
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
          md={12}
          sx={{
            width: "825px",
            borderRadius: "8px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("md")]: {
              width: 600, // Set width for medium screens
            },
            [theme.breakpoints.down("sm")]: {
              width: 470, // Set width for small screens
            },
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
            <TextField
              size="large"
              variant="outlined"
              placeholder="Tìm nhanh qua tên bác sĩ"
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
              value={fullNameSearch}
              onChange={(e) => {
                setFullNameSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setFullName(fullNameSearch);
                  setPage(1);
                }
              }}
              autoComplete="off"
              sx={{
                width: "100%",
                "& .MuiInputBase-input": {
                  paddingX: "20px",
                  paddingY: "24px",
                },
              }}
            />
            <Filter direction={"row"} spacing={1.5}>
              <FormControl
                sx={{
                  width: "150px",
                  background: "linear-gradient(to right, #4facfe, #00f2fe)",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <CustomSelect
                  value={selectedDegree}
                  onChange={(e) => {
                    setSelectedDegree(e.target.value);
                    setPage(1);
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
                  <CustomMenuItem value={"ALL"}>Học hàm/ Học vị</CustomMenuItem>
                  <CustomMenuItem value={"BS"}>BS</CustomMenuItem>
                  <CustomMenuItem value={"ThS"}>ThS</CustomMenuItem>
                  <CustomMenuItem value={"TS"}>TS</CustomMenuItem>
                  <CustomMenuItem value={"PGS"}>PGS</CustomMenuItem>
                  <CustomMenuItem value={"GS"}>GS</CustomMenuItem>
                </CustomSelect>
              </FormControl>
              <FormControl
                sx={{
                  width: "fit-content",
                  background: "linear-gradient(to right, #4facfe, #00f2fe)",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <CustomSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedDepartmentId}
                  onChange={(e) => {
                    setSelectedDepartmentId(e.target.value);
                    setPage(1);
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
              {doctors.map((doctor) => (
                <DoctorItemInChooseDocterPage
                  key={doctor.doctorId}
                  doctor={doctor}
                />
              ))}
            </ListDocter>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Pagination
                sx={{
                  marginTop: 2,
                }}
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
              />
            </Box>
          </Body>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChooseDoctorPage;
