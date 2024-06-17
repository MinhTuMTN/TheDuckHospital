import { useTheme } from "@emotion/react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BedIcon from "@mui/icons-material/Bed";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SearchIcon from "@mui/icons-material/Search";
import TvIcon from "@mui/icons-material/Tv";
import {
  Box,
  Breadcrumbs,
  Button,
  CardMedia,
  Grid,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CustomDiv from "../../../components/General/CustomDiv";
import LayoutComponent from "../../../components/General/LayoutComponent";
import TextNurseChooseStyle from "../../../components/General/TextNurseChooseStyle";
import AdmissionRecordsInput from "../../../components/Nurse/Hospitalize/AdmissionRecordsInput";
import ChooseRoomTable from "../../../components/Nurse/Hospitalize/ChooseRoomTable";
import {
  getAdmissionRecords,
  getRoomStatistic,
  getTreatmentRooms,
} from "../../../services/nurse/HospitalizeServices";
import { appColors } from "../../../utils/appColorsUtils";

const iconStyle = {
  color: "#7081b9",
  marginRight: "4px",
  fontSize: "14px",
};

const CardStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "transparent",
  borderRadius: "8px",
  border: "1px solid #d6d6d7",
  display: "flex",
  boxShadow: "none",
  justifyContent: "space-between",
  alignItems: "center",
}));
const MainStyle = styled(Stack)(({ theme }) => ({
  padding: "22px",
  width: "100%",
  backgroundColor: appColors.white,
  borderRadius: "4px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
  display: "flex",
  justifyContent: "space-between",
}));

const CssTextField = styled(TextField)({
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#0027c3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#001c9ae0",
      boderWidth: "1px",
    },
  },
});

const ButtonStyled = styled(Button)(({ theme }) => ({
  textTransform: "none",
  width: "225px",
}));

function ChooseRoomForPatient() {
  const [admissionCode, setAdmissionCode] = React.useState("");
  const [showTableRooms, setShowTableRooms] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [admissionRecords, setAdmissionRecords] = React.useState([]);
  const [listRooms, setListRooms] = React.useState([]);
  const [statistic, setStatistic] = React.useState({
    totalRoom: 20,
    totalRoomStandard: "30/40",
    totalRoomVip: "20/30",
  });
  const [typeOfRoom, setTypeOfRoom] = React.useState("TREATMENT_ROOM_STANDARD");
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
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
      Nhập viện
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
      Tiếp nhận nhập viện
    </Typography>,
  ];

  const summaryDatas = useMemo(
    () => [
      {
        title: "Số phòng của khoa",
        value: statistic.totalRoom,
        unit: "Phòng",
        icon: <MeetingRoomIcon />,
        description: "Liên hệ bộ phận quản trị để mở thêm phòng",
        iconDescription: <AlternateEmailIcon style={iconStyle} />,
        fees: null,
      },
      {
        title: "Phòng thường",
        value: statistic.totalRoomStandard,
        unit: "Tổng Số Giường",
        icon: <BedIcon />,
        description: "Phí phòng trong 24h /",
        iconDescription: <LocalAtmIcon style={iconStyle} />,
        fees: "100.000đ",
      },
      {
        title: "Phòng dịch vụ",
        value: statistic.totalRoomVip,
        unit: "Tổng Số Giường",
        icon: <TvIcon />,
        description: "Phí phòng trong 24h /",
        iconDescription: <LocalAtmIcon style={iconStyle} />,
        fees: "550.000đ",
      },
    ],
    [statistic]
  );

  useEffect(() => {
    const getStatistic = async () => {
      const response = await getRoomStatistic();
      if (response.success) {
        const data = response.data.data;
        const result = {
          totalRoom: data.standard.totalRooms + data.vip.totalRooms,
          totalRoomStandard: `${data.standard.totalBedUsed}/${data.standard.totalBed}`,
          totalRoomVip: `${data.vip.totalBedUsed}/${data.vip.totalBed}`,
        };
        setStatistic(result);
      }
    };
    getStatistic();
  }, []);

  const handleGetAdmissionRecords = useCallback(async (admissionCode) => {
    const response = await getAdmissionRecords(admissionCode);
    if (response.success) {
      const result = response.data.data;
      setAdmissionRecords(result);
      setShowDetails(true);
      setShowTableRooms(result.paid);
    }
  }, []);

  const handleChange = (event) => {
    setAdmissionCode(event.target.value);

    if (event.target.value.length === 15) {
      handleGetAdmissionRecords(event.target.value);
    } else {
      setShowTableRooms(false);
      setShowDetails(false);
    }
  };

  useEffect(() => {
    const handleGetRooms = async () => {
      const response = await getTreatmentRooms(typeOfRoom);
      if (response.success) {
        setListRooms(response.data.data);
      }
    };
    handleGetRooms();
  }, [typeOfRoom]);

  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: appColors.backgroundColorMain,
      }}
    >
      <Box flex={1} display={"flex"}>
        <LayoutComponent container>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600} letterSpacing={1}>
              Nhập viện
            </Typography>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Grid>
          <Grid item spacing={2} container xs={12} marginTop={1}>
            {summaryDatas.map((data, index) => (
              <Grid key={`summaryDatas-${index}`} item xs={12} md={4}>
                <CardStyle direction={"row"}>
                  <Stack paddingX={1} direction={"column"}>
                    <Typography
                      fontSize={".8125rem"}
                      fontWeight={"500"}
                      color={"rgba(0,4,68,1)"}
                      marginBottom={"4px"}
                    >
                      {data.title}
                    </Typography>
                    <Typography
                      fontSize={"20px"}
                      fontWeight={"500"}
                      color={"#303e67"}
                      marginBottom={"6px"}
                    >
                      {data.value}{" "}
                      <span style={{ fontSize: "11px" }}>{data.unit}</span>
                    </Typography>
                    <Stack
                      direction={"row"}
                      alignItems={"center !important"}
                      justifyContent={"flex-start"}
                    >
                      {data.iconDescription}
                      <Typography
                        fontSize={"13px"}
                        fontWeight={"400"}
                        color={"#7081b9"}
                        lineHeight={0}
                      >
                        {data.description}{" "}
                        <span
                          style={{
                            color: "rgba(34,183,131,1)",
                            fontWeight: "450",
                          }}
                        >
                          {data.fees}
                        </span>
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box
                    sx={{
                      backgroundColor: "#e0e0e0",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {data.icon}
                  </Box>
                </CardStyle>
              </Grid>
            ))}
          </Grid>
          <Grid item container xs={12} marginTop={2}>
            <MainStyle direction={"row"}>
              <CssTextField
                autoComplete="off"
                variant="outlined"
                placeholder="Mã nhập viện"
                value={admissionCode}
                onChange={handleChange}
                size="medium"
                style={{
                  width: isLg ? "80%" : isDownSm ? "100%" : "70%",
                  backgroundColor: "#ffffff",
                  marginRight: "12px",
                }}
                InputProps={{
                  color: appColors.primaryColor,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  style: {
                    borderRadius: "4px",
                    paddingLeft: "10px",
                  },
                }}
                inputProps={{
                  style: {
                    padding: "20px 8px 20px 0px",
                    borderColor: "transparent",
                  },
                }}
              />
              <Button
                disabled={!showTableRooms}
                variant="outlined"
                onClick={() => {
                  setOpen(!open);
                }}
                style={{
                  width: isLg ? "20%" : isDownSm ? "100%" : "30%",
                  textTransform: "none",
                  fontWeight: 600,
                  letterSpacing: 1,
                  color: !showTableRooms ? "#b2bac2" : appColors.primary,
                  justifyContent: "space-between",
                  padding: "7px 20px",
                }}
                startIcon={
                  <DehazeIcon
                    style={{
                      fontSize: 18,
                    }}
                  />
                }
                endIcon={
                  <ExpandMoreIcon
                    style={{
                      fontSize: 18,
                    }}
                  />
                }
              >
                {typeOfRoom === "TREATMENT_ROOM_STANDARD"
                  ? "Phòng thường"
                  : "Phòng dịch vụ"}
              </Button>
              <Paper
                hidden={!open}
                style={{
                  position: "absolute",
                  top: 351,
                  right: 42,
                  boxShadow: "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px",
                  padding: 4,
                  marginLeft: -6,
                  opacity: 1,
                  transition:
                    "opacity 265ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 176ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
              >
                <CustomDiv />
                <Stack
                  direction={"column"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <ButtonStyled
                    onClick={() => {
                      setTypeOfRoom("TREATMENT_ROOM_STANDARD");
                      setOpen(false);
                    }}
                    startIcon={
                      <LooksOneIcon
                        style={{
                          color: appColors.black,
                        }}
                      />
                    }
                  >
                    <TextNurseChooseStyle>Phòng thường</TextNurseChooseStyle>
                  </ButtonStyled>
                  <ButtonStyled
                    onClick={() => {
                      setTypeOfRoom("TREATMENT_ROOM_VIP");
                      setOpen(false);
                    }}
                    startIcon={
                      <LooksTwoIcon
                        style={{
                          color: appColors.black,
                        }}
                      />
                    }
                  >
                    <TextNurseChooseStyle>Phòng dịch vụ</TextNurseChooseStyle>
                  </ButtonStyled>
                </Stack>
              </Paper>
            </MainStyle>
          </Grid>
          <Grid item container xs={12} marginTop={2}>
            {!showDetails ? (
              <MainStyle
                direction={"column"}
                justifyItems={"center"}
                alignItems={"center"}
              >
                <CardMedia
                  component="img"
                  image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1718420021/SearchNurse_Custom_adebg1.png"
                  alt="Paella dish"
                  sx={{ width: "300px", height: "300px", marginTop: "-25px" }}
                />
                <Typography
                  variant="body1"
                  letterSpacing={"2px"}
                  marginTop={"-20px"}
                >
                  Vui lòng nhập mã nhập viện để tiếp nhận bệnh nhân
                </Typography>
              </MainStyle>
            ) : (
              <>
                <MainStyle
                  direction={"column"}
                  alignItems={"start"}
                  justifyItems={"left"}
                >
                  {" "}
                  <Typography fontWeight={"500"} fontSize={"20px"}>
                    Thông tin tiếp nhận
                  </Typography>
                  <AdmissionRecordsInput admissionRecords={admissionRecords} />
                </MainStyle>
                {showTableRooms && (
                  <MainStyle
                    direction={"column"}
                    justifyItems={"center"}
                    marginTop={2}
                  >
                    <ChooseRoomTable
                      rooms={listRooms}
                      admissionRecords={admissionRecords}
                    />
                  </MainStyle>
                )}
              </>
            )}
          </Grid>
        </LayoutComponent>
      </Box>
    </Box>
  );
}

export default ChooseRoomForPatient;
