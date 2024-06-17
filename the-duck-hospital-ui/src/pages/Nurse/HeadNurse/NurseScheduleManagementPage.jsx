import { useTheme } from "@emotion/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import {
  Box,
  Breadcrumbs,
  Button,
  Drawer,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageSchuduleByWeeks from "../../../components/Nurse/Schedule/ManageSchuduleByWeeks";
import RightFilterHeaderNurse from "../../../components/Nurse/Schedule/RightFilterHeaderNurse";
import { appColors } from "../../../utils/appColorsUtils";
import {
  getRoomSchedules,
  getShift,
} from "../../../services/nurse/ScheduleServices";
import LayoutComponent from "../../../components/General/LayoutComponent";
import TextNurseChooseStyle from "../../../components/General/TextNurseChooseStyle";
import CustomDiv from "../../../components/General/CustomDiv";

const ButtonStyled = styled(Button)(({ theme }) => ({
  textTransform: "none",
  width: "150px",
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  transform: "none",
  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",

  "& .MuiDrawer-paper": {
    width: 300,
    boxSizing: "border-box",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(20px)",
  },
}));

function NurseScheduleManagementPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const handleOpenFilter = (value) => () => {
    setOpenFilter(value);
    console.log(openFilter);
  };

  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
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
      color={"#5a5a5a"}
      style={{
        fontWeight: "560",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Danh sách ca trực
    </Typography>,
  ];

  var weekOfYearPlugin = require("dayjs/plugin/isoWeek");
  // var weekOfYearPlugin = require("dayjs/plugin/weekOfYear");
  dayjs.extend(weekOfYearPlugin);

  const [weekOfYear, setWeekOfYear] = useState(dayjs().startOf("isoWeek"));
  const [typeOfRoom, setTypeOfRoom] = useState("TREATMENT_ROOM");
  const [listRoom, setListRoom] = React.useState([]);
  const [listShift, setListShift] = React.useState([]);
  const [room, setRoom] = React.useState(null);
  const [name, setName] = React.useState("");
  const [selectedShift, setSelectedShift] = React.useState([
    "MORNING",
    "AFTERNOON",
    "EVENING",
    "NIGHT",
  ]);

  const handleGetListRoom = useCallback(async (typeOfRoom) => {
    const respone = await getRoomSchedules(typeOfRoom);
    if (respone.success) {
      return respone.data.data;
    }
  }, []);

  const handleGetShifts = useCallback(
    async (room, selectedShift, name, weekOfYear) => {
      const respone = await getShift(
        room?.roomId,
        selectedShift,
        name,
        weekOfYear.isoWeek(),
        weekOfYear.get("year")
      );
      if (respone.success) {
        setListShift(respone.data.data);
      }
    },
    []
  );

  useEffect(() => {
    const handleGetRooms = async () => {
      let result = null;
      if (typeOfRoom === "EXAMINATION_ROOM")
        result = await handleGetListRoom(typeOfRoom);
      else {
        const standardRoom = await handleGetListRoom("TREATMENT_ROOM_STANDARD");
        const vipRoom = await handleGetListRoom("TREATMENT_ROOM_VIP");
        result = standardRoom.concat(vipRoom);
      }

      if (result && result.length > 0) {
        setListRoom(result);
        setRoom(result[0]);
        handleGetShifts(
          result[0],
          ["MORNING", "AFTERNOON", "EVENING", "NIGHT"],
          "",
          dayjs().startOf("isoWeek")
        );
      }
    };

    handleGetRooms();
  }, [handleGetListRoom, typeOfRoom, handleGetShifts]);

  const handleSearch = useCallback(() => {
    setIsSearch(true);
    handleGetShifts(room, selectedShift, name, weekOfYear);
  }, [handleGetShifts, room, selectedShift, name, weekOfYear]);

  useEffect(() => {
    setName("");
    setIsSearch(false);
    // handleGetShifts(room, selectedShift, "", weekOfYear);
  }, [handleGetShifts, room, selectedShift, weekOfYear]);

  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: appColors.backgroundColorMain,
        display: "flex",
      }}
    >
      <LayoutComponent container>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={600} letterSpacing={1}>
            Danh sách ca trực
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          xs={12}
          marginTop={3}
          component={Paper}
          elevation={2}
          borderRadius={"8px"}
          backgroundColor={"rgb(255, 255, 255)"}
        >
          {/* Stack header */}
          <Stack
            direction={"row"}
            padding={"20px 16px 20px 20px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {/* Stack chọn loại phòng */}
            <Button
              variant="text"
              onClick={() => {
                setOpen(!open);
              }}
              style={{
                width: 160,
                textTransform: "none",
                fontWeight: 600,
                letterSpacing: 1,
                color: appColors.primary,
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
              {typeOfRoom === "EXAMINATION_ROOM"
                ? "Phòng khám"
                : "Phòng nội trú"}
            </Button>
            <Paper
              hidden={!open}
              style={{
                position: "absolute",
                top: 155,
                left: isLg ? 320 : 45,
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
                    setTypeOfRoom("TREATMENT_ROOM");
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
                  <TextNurseChooseStyle>Phòng nội trú</TextNurseChooseStyle>
                </ButtonStyled>
                <ButtonStyled
                  onClick={() => {
                    setTypeOfRoom("EXAMINATION_ROOM");
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
                  <TextNurseChooseStyle>Phòng khám</TextNurseChooseStyle>
                </ButtonStyled>
              </Stack>
            </Paper>

            {/* Stack điều chỉnh tuần */}
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                size="small"
                onClick={() => setWeekOfYear(weekOfYear.add(-1, "week"))}
              >
                <ArrowBackIosIcon fontSize="inherit" />
              </IconButton>
              <TextNurseChooseStyle
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                }}
              >{`Tuần ${weekOfYear.isoWeek()} - ${weekOfYear
                .endOf("isoWeek")
                .get("year")} `}</TextNurseChooseStyle>
              <IconButton
                size="small"
                onClick={() => setWeekOfYear(weekOfYear.add(1, "week"))}
              >
                <ArrowForwardIosIcon fontSize="inherit" />
              </IconButton>
            </Stack>

            {/* Stack bộ lọc */}
            <Stack direction={"row"} spacing={1}>
              <Button
                onClick={() => setWeekOfYear(dayjs().startOf("isoWeek"))}
                variant="contained"
                style={{
                  padding: "0px 10px",
                  minWidth: "64px",
                  lineHeight: "32px",
                  cursor: "pointer",
                  textTransform: "none",
                  borderRadius: 8,
                  color: "white",
                  backgroundColor: "rgb(255, 86, 48)",
                  fontSize: 13,
                }}
              >
                Tuần này
              </Button>
              <IconButton
                onClick={handleOpenFilter(true)}
                size="small"
                style={{
                  padding: "8px",
                }}
              >
                <FilterListIcon fontSize="small" />
              </IconButton>
              <DrawerStyled
                open={openFilter}
                onClose={handleOpenFilter(false)}
                anchor="right"
              >
                <RightFilterHeaderNurse
                  listRoom={listRoom}
                  room={room}
                  setRoom={setRoom}
                  selectedShift={selectedShift}
                  setSelectedShift={setSelectedShift}
                  name={name}
                  setName={setName}
                  onSearch={handleSearch}
                  onClose={handleOpenFilter(false)}
                />
              </DrawerStyled>
            </Stack>
          </Stack>
          <ManageSchuduleByWeeks
            isSearch={isSearch}
            listShift={listShift}
            weekOfYear={weekOfYear}
            selectedShift={selectedShift}
          />
        </Grid>
      </LayoutComponent>
    </Box>
  );
}

export default NurseScheduleManagementPage;
