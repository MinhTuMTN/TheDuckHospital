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
import React from "react";
import DoctorItemInChooseDocterPage from "../../components/Customer/DoctorItemInChooseDocterPage";
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

  const breakcrumbs = [
    <CustomTextBreakcrumb key={1}>Trang chủ</CustomTextBreakcrumb>,
    <CustomTextBreakcrumb key={2}>Chọn bác sĩ</CustomTextBreakcrumb>,
  ];
  const theme = useTheme();
  const [degree, setDegree] = React.useState("0");
  const handleChangeDegree = (event) => {
    setDegree(event.target.value);
  };

  const [deparmment, setDeparmment] = React.useState("0");
  const handleChangeDeparmment = (event) => {
    setDeparmment(event.target.value);
  };
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
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={degree}
                  onChange={handleChangeDegree}
                  sx={{
                    textAlign: "left",
                    color: "white",
                    fontSize: "14px",
                    "& .MuiOutlinedInput-input": {
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    },
                  }}
                >
                  <CustomMenuItem value={0} disabled>
                    Học hàm/ Học vị
                  </CustomMenuItem>
                  <CustomMenuItem value={1}>BS CKI</CustomMenuItem>
                  <CustomMenuItem value={2}>BS CKII</CustomMenuItem>
                  <CustomMenuItem value={3}>BS</CustomMenuItem>
                </Select>
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
                  value={deparmment}
                  onChange={handleChangeDeparmment}
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
                  <CustomMenuItem value={0} disabled>
                    Chuyên khoa
                  </CustomMenuItem>
                  <CustomMenuItem value={1}>Phổi</CustomMenuItem>
                  <CustomMenuItem value={2}>Tai mũi họng</CustomMenuItem>
                  <CustomMenuItem value={3}>
                    Chấn thương chỉnh hình
                  </CustomMenuItem>
                  <CustomMenuItem value={4}>
                    Thận nhân tạo - Lọc màng bụng
                  </CustomMenuItem>
                </CustomSelect>
              </FormControl>
            </Filter>
            <ListDocter spacing={1.5}>
              <DoctorItemInChooseDocterPage />
              <DoctorItemInChooseDocterPage />
              <DoctorItemInChooseDocterPage />
              <DoctorItemInChooseDocterPage />
              <DoctorItemInChooseDocterPage />
              <DoctorItemInChooseDocterPage />
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
              />
            </Box>
          </Body>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChooseDoctorPage;
