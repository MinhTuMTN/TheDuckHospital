import { Circle } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import HeaderModal from "../../General/HeaderModal";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { appColors } from "../../../utils/appColorsUtils";
import {
  getDayOfWeekString,
  getScheduleSession,
  getScheduleSessionColor,
} from "../../../utils/scheduleSessionUtils";
import { deteleListNurseSchedule } from "../../../services/nurse/NurseScheduleServices";

const TextDateStyled = styled(Typography)({
  fontWeight: 500,
  letterSpacing: 0.5,
  lineHeight: "1.57143rem",
  color: "black",
  fontSize: "0.875rem",
});

const CellStyled = styled(TableCell)({
  padding: "8px 14px",
  borderColor: "transparent",
  backgroundColor: "#F4F6F8",
});

const ShiftCellStyled = styled(TableCell)({
  padding: "8px 14px",
  borderColor: "transparent",
  textAlign: "left",
  color: "rgb(99, 115, 129)",
  width: "100%",
  letterSpacing: 0.5,
});

const CircleIcon = ({ color }) => <Circle sx={{ fontSize: "10px", color }} />;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

const BodyModal = styled(Stack)({
  padding: "8px 14px",
  paddingBottom: "16px",
  width: "100%",
});

const ManageNumberChoose = styled(Stack)({
  paddingBottom: "8px",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px dashed #a5a4a4",
});

const MainLayout = styled(Stack)({
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0px",
});

const InfoLine = styled(Stack)({
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
});

const ShiftRow = ({ shift, color, names, italic, nurseList, onRefresh }) => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const [open, setOpen] = React.useState(false);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const handleOpen = () => {
    setChecked(new Array(nurseList.length).fill(false));
    setOpen(true);
  };
  const handleClose = () => {
    setIsCheckedAll(false);
    setOpen(false);
  };

  useEffect(() => {
    const allChecked = checked.every((value) => value);
    setIsCheckedAll(allChecked);
  }, [checked]);

  const handleToggleAll = () => {
    const allChecked = checked.every((value) => value);
    setChecked(new Array(nurseList.length).fill(!allChecked));
    setIsCheckedAll(!allChecked);
  };

  const handleCheckboxChange = (index) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const handleDeleteSchedules = useCallback(async () => {
    const deleteList = [];
    checked.forEach((value, index) => {
      if (value) {
        deleteList.push(nurseList[index].nurseScheduleId);
      }
    });

    const respone = await deteleListNurseSchedule(deleteList);

    if (respone.success) {
      onRefresh();
      handleClose();
    }
  }, [checked, nurseList, onRefresh]);

  return (
    <>
      <TableRow hover>
        <ShiftCellStyled style={{ width: isLg ? "10%" : "15%" }}>
          {shift}:
        </ShiftCellStyled>
        <ShiftCellStyled sx={{ width: "0%", paddingRight: "0px" }}>
          <CircleIcon color={color} />
        </ShiftCellStyled>
        <ShiftCellStyled
          sx={{
            color: italic ? "#e8331b" : "rgb(2 81 167)",
            fontStyle: italic ? "italic" : "normal",
            letterSpacing: 1,
            fontWeight: 400,
          }}
        >
          <strong>{names}</strong>
        </ShiftCellStyled>
        <ShiftCellStyled
          sx={{
            width: "100px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="Xoá">
            <IconButton onClick={handleOpen}>
              <DeleteForeverIcon
                style={{
                  color: appColors.error,
                  fontSize: "20px",
                }}
              />
            </IconButton>
          </Tooltip>
        </ShiftCellStyled>
      </TableRow>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component={Stack} direction={"column"}>
          <HeaderModal title={"Xoá ca trực"} handleOnClose={handleClose} />
          <BodyModal direction={"column"}>
            <ManageNumberChoose direction={"row"}>
              <Typography
                variant="subtitle1"
                style={{
                  fontWeight: 400,
                  letterSpacing: 0.5,
                  lineHeight: "1.57143rem",
                  color: "black",
                  fontSize: "14px",
                }}
              >
                Ca trực đã chọn{" "}
                <strong>
                  (
                  {checked.reduce(
                    (total, current) => (total += current ? 1 : 0),
                    0
                  )}
                  )
                </strong>
              </Typography>
              <Button
                onClick={handleToggleAll}
                variant="text"
                endIcon={
                  isCheckedAll ? (
                    <RemoveCircleOutlineIcon />
                  ) : (
                    <CheckCircleOutlineIcon />
                  )
                }
                sx={{
                  textTransform: "none",
                  color: isCheckedAll ? appColors.doneText : appColors.error,
                  fontSize: "12.5px",
                  backgroundColor: isCheckedAll
                    ? appColors.doneBackground
                    : appColors.errorBackground,
                  padding: "2px 8px",
                  ".MuiButton-endIcon": {
                    marginLeft: "2px",
                  },
                  ".css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
                    fontSize: "16px",
                  },
                }}
              >
                {isCheckedAll ? "Bỏ chọn tất cả" : "Chọn tất cả"}
              </Button>
            </ManageNumberChoose>
            <MainLayout direction={"column"}>
              {nurseList.map((nurse, index) => (
                <InfoLine key={index} direction={"row"}>
                  <Typography
                    variant="subtitle1"
                    fontSize={"14px"}
                    fontWeight={"500"}
                  >
                    Người trực:
                    <strong
                      style={{
                        marginLeft: "5px",
                        color: appColors.blueText,
                      }}
                    >
                      {nurse.nurseName}
                    </strong>
                  </Typography>
                  <Checkbox
                    checked={checked[index]}
                    onChange={() => {
                      handleCheckboxChange(index);
                    }}
                  />
                </InfoLine>
              ))}
            </MainLayout>

            <Stack width={"100%"} justifyContent={"flex-end"} direction={"row"}>
              <button
                onClick={() => handleDeleteSchedules()}
                className="buttonDelete"
              >
                <span className="text">Xoá</span>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
            </Stack>
          </BodyModal>
        </Box>
      </Modal>
    </>
  );
};

function ManageScheduleByWeeks(props) {
  const { listShift, weekOfYear, selectedShift, isSearch, onRefresh } = props;

  const shiftsData = useMemo(() => {
    const monday = weekOfYear;
    const result = [];
    for (let i = 0; i < 7; i++) {
      const date = monday.add(i, "day");
      const day = getDayOfWeekString(date.get("d"));
      const shifts = [];
      selectedShift.forEach((session) => {
        const shiftData = listShift.filter(
          (shift) =>
            dayjs(shift.date).format("YYYY/MM/DD") ===
              date.format("YYYY/MM/DD") && shift.scheduleSession === session
        );

        let names =
          isSearch === true
            ? "Không tìm thấy kết quả phù hợp"
            : "Chưa có lịch trực";

        let italic = true;
        let nurseList = [];
        if (shiftData && shiftData.length > 0) {
          names = shiftData.map((shift) => shift.nurseName).join(" - ");
          nurseList = shiftData.map((shift) => {
            return {
              nurseScheduleId: shift.nurseScheduleId,
              nurseName: shift.nurseName,
            };
          });
          italic = false;
        }

        shifts.push({
          shift: "Ca " + getScheduleSession(session),
          color: getScheduleSessionColor(session),
          names: names,
          italic: italic,
          nurseList: nurseList,
        });
      });

      result.push({
        day: day,
        date: `Ngày ${date.format("DD")} tháng ${date.format("MM")}`,
        shifts: shifts,
      });
    }

    return result;
  }, [listShift, weekOfYear, selectedShift, isSearch]);
  return (
    <>
      <TableContainer
        sx={{
          width: "100%",
          minHeight: "400px",
          borderTop: "1px solid #E0E0E0",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead sx={{ position: "absolute", left: "-100000px" }}>
            <TableRow>
              <TableCell>Thứ trực</TableCell>
              <TableCell hidden />
              <TableCell>Người trực</TableCell>
              <TableCell hidden />
            </TableRow>
          </TableHead>
          <TableBody>
            {shiftsData.map(({ day, date, shifts }) => (
              <React.Fragment key={day}>
                <TableRow>
                  <CellStyled colSpan={4}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ width: "100%" }}
                    >
                      <TextDateStyled>{day}</TextDateStyled>
                      <TextDateStyled>{date}</TextDateStyled>
                    </Stack>
                  </CellStyled>
                </TableRow>
                {shifts.map(({ shift, color, names, italic, nurseList }) => (
                  <ShiftRow
                    key={shift}
                    shift={shift}
                    color={color}
                    names={names}
                    italic={italic}
                    nurseList={nurseList}
                    onRefresh={onRefresh}
                  />
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default memo(ManageScheduleByWeeks);
