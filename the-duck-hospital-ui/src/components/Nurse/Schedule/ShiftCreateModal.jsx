import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  CardMedia,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  createShiftSchedule,
  deleteSchedule,
  getRoomSchedules,
  getShiftByRoom,
} from "../../../services/nurse/ScheduleServices";
import { appColors } from "../../../utils/appColorsUtils";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  flex: 1,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    //expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    expandIcon={<ArrowForwardIosSharpIcon />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

// PropsType
ShiftCreateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  nurse: PropTypes.object,
};

const shifts = [
  {
    id: "MORNING",
    name: "Ca sáng:",
  },
  {
    id: "AFTERNOON",
    name: "Ca chiều:",
  },
];

function ShiftCreateModal(props) {
  const { open, onClose, nurse } = props;
  const [roomId, setRoomId] = React.useState("");
  const [roomSchedules, setRoomSchedules] = React.useState([{}]);
  const [shiftByDay, setShiftByDay] = React.useState([{}]);
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setRoomId(event.target.value);
  };
  const [expanded, setExpanded] = React.useState(false);
  const handleChangePanel = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const panels = useMemo(
    () => [
      {
        name: "panel-monday",
        icon: <Filter2Icon />,
      },
      {
        name: "panel-tuesday",
        icon: <Filter3Icon />,
      },
      {
        name: "panel-wednesday",
        icon: <Filter4Icon />,
      },
      {
        name: "panel-thursday",
        icon: <Filter5Icon />,
      },
      {
        name: "panel-friday",
        icon: <Filter6Icon />,
      },
    ],
    []
  );

  useEffect(() => {
    const handleGetRooms = async () => {
      const response = await getRoomSchedules("EXAMINATION_ROOM");
      if (response.success) {
        const rooms = response.data.data;
        setRoomSchedules(rooms);
        if (rooms.length > 0) {
          setRoomId(rooms[0].roomId);
        }
      }
    };
    handleGetRooms();
  }, []);

  const handleGetShiftByRoom = useCallback(async () => {
    if (roomId === "") {
      return;
    }

    const response = await getShiftByRoom(roomId);
    if (response.success) {
      setShiftByDay(response.data.data);
    }
  }, [roomId]);
  useEffect(() => {
    handleGetShiftByRoom();
  }, [handleGetShiftByRoom]);

  const handleDelete = useCallback(
    async (scheduleId) => {
      const responese = await deleteSchedule(scheduleId);
      if (responese.success) {
        handleGetShiftByRoom();
      }
    },
    [handleGetShiftByRoom]
  );

  const handleCreate = useCallback(
    async (dayOfWeek, session) => {
      const responese = await createShiftSchedule(
        roomId,
        nurse.staffId,
        dayOfWeek,
        session
      );
      if (responese.success) {
        handleGetShiftByRoom();
      } else {
        const roomName = responese.error.split("-")[1];
        enqueueSnackbar(`Điều dưỡng đã có lịch trực tại phòng ${roomName}`, {
          variant: "error",
        });
      }
    },
    [handleGetShiftByRoom, roomId, nurse, enqueueSnackbar]
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Stack direction={"row"} sx={style}>
        <CardMedia
          component="img"
          alt="Random Image"
          image={nurse?.avatar}
          sx={{ width: "40%", height: "auto" }}
        />
        <Stack
          direction={"column"}
          justifyContent={"flex-start"}
          width={"60%"}
          sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"space-between"}
            style={{
              borderBottom: "1px solid #c8c8c8",
              paddingBottom: 6,
              paddingLeft: 2,
            }}
          >
            <Typography variant="h5" fontWeight={500} letterSpacing={1}>
              Quản lý ca trực
            </Typography>
            <IconButton
              onClick={onClose}
              style={{
                padding: "0px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack paddingTop={3} spacing={3}>
            <TextField
              disabled
              value={nurse?.fullName}
              label="Điều dưỡng"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: {
                  padding: "26px 0px",
                },
              }}
            />

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Phòng trực
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  size="medium"
                  value={roomId}
                  label="Phòng trực"
                  onChange={handleChange}
                >
                  {roomSchedules.map((room) => (
                    <MenuItem key={`room-${room.roomId}`} value={room.roomId}>
                      Phòng {room.roomName} ({room.description})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              {panels.map((panel, index) => {
                const morningShift = shiftByDay.find(
                  (shift) =>
                    shift.scheduleSession === "MORNING" &&
                    index + 2 === shift.dayOfWeek
                );

                const afternoonShift = shiftByDay.find(
                  (shift) =>
                    shift.scheduleSession === "AFTERNOON" &&
                    index + 2 === shift.dayOfWeek
                );
                return (
                  <Accordion
                    key={panel.name}
                    expanded={expanded === panel.name}
                    onChange={handleChangePanel(panel.name)}
                  >
                    <AccordionSummary>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        {panel.icon}
                        <Typography>Thứ {index + 2}</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack direction={"column"} spacing={1}>
                        {shifts.map((shift) => {
                          const tempShift =
                            shift.id === "MORNING"
                              ? morningShift
                              : afternoonShift;
                          return (
                            <Stack
                              key={`${panel.name}-${shift.id}`}
                              direction={"row"}
                              alignItems={"center"}
                              justifyContent={"space-between"}
                            >
                              <Stack
                                direction={"row"}
                                spacing={1}
                                alignItems={"center"}
                              >
                                <Typography fontWeight={"500"} fontSize={15}>
                                  {shift.name}
                                </Typography>
                                <Typography
                                  fontStyle={"italic"}
                                  fontSize={14}
                                  color={
                                    tempShift
                                      ? appColors.primary
                                      : appColors.error
                                  }
                                >
                                  {tempShift
                                    ? tempShift.nurseName
                                    : "Chưa có lịch trực"}
                                </Typography>
                              </Stack>
                              {tempShift ? (
                                <IconButton
                                  onClick={() =>
                                    handleDelete(tempShift.nurseScheduleId)
                                  }
                                  size="small"
                                  style={{
                                    padding: "4px",
                                    backgroundColor: appColors.errorBackground,
                                  }}
                                >
                                  <DeleteOutlinedIcon
                                    style={{
                                      fontSize: "1.1rem",
                                      color: appColors.error,
                                    }}
                                  />
                                </IconButton>
                              ) : (
                                <IconButton
                                  onClick={() =>
                                    handleCreate(index + 2, shift.id)
                                  }
                                  size="small"
                                  style={{
                                    padding: "4px",
                                    backgroundColor: appColors.doneBackground,
                                  }}
                                >
                                  <AddIcon
                                    style={{
                                      fontSize: "1.1rem",
                                      color: appColors.doneText,
                                    }}
                                  />
                                </IconButton>
                              )}
                            </Stack>
                          );
                        })}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Stack>
          <Box
            width={"100%"}
            sx={{
              marginTop: 2,
            }}
          ></Box>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default ShiftCreateModal;
