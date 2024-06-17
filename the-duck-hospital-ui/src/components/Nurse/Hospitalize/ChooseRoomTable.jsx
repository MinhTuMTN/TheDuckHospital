import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import CustomLine from "../../General/CustomLine";
import HeaderModal from "../../General/HeaderModal";
import dayjs from "dayjs";

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

const cellStyle = {
  padding: "8px 12px",
};

const headCellStyle = {
  ...cellStyle,
  backgroundColor: "#f1f5fa",
};

const BodyModal = styled(Stack)({
  padding: "8px 14px",
  paddingBottom: "16px",
  width: "100%",
});

function ChooseRoomTable(props) {
  const { rooms, admissionRecords } = props;
  const [selectedRoom, setSelectedRoom] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const hanldeOpen = (room) => {
    setOpen(true);
    setSelectedRoom(room);
  };
  const handleCLose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 650 }} padding="none">
          <TableHead style={headCellStyle}>
            <TableRow>
              {[
                "Mã phòng",
                "Số phòng",
                "Vị trí phòng",
                "Tổng số giường",
                "Đã sử dụng",
                "Còn trống",
                "Tiếp nhận",
              ].map((text, index) => (
                <TableCell
                  key={index}
                  align={index === 6 ? "center" : index > 2 ? "right" : "left"}
                  style={{ ...cellStyle, width: index === 0 ? "10%" : "auto" }}
                >
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => {
              const emptyBed = room.capacity - room.beingUsed;
              return (
                <TableRow
                  key={room.roomId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    style={cellStyle}
                  >
                    {room.roomId}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ ...cellStyle, letterSpacing: "1px" }}
                  >
                    {room.roomName}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ ...cellStyle, letterSpacing: "0.5px" }}
                  >
                    {room.roomDescription}
                  </TableCell>
                  <TableCell align="right" style={cellStyle}>
                    {room.capacity}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ ...cellStyle, letterSpacing: "1px" }}
                  >
                    {room.beingUsed}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ ...cellStyle, letterSpacing: "1px" }}
                  >
                    {emptyBed}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ ...cellStyle, letterSpacing: "1px" }}
                  >
                    <IconButton onClick={() => hanldeOpen(room)}>
                      <NavigateNextIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleCLose}>
        <Box sx={style} component={Stack} direction={"column"}>
          <HeaderModal title={"Tiếp nhận hồ sơ"} handleOnClose={handleCLose} />
          <BodyModal direction={"column"}>
            <Typography
              variant="body1"
              style={{
                color: "#042cbd",
                fontSize: "14px",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              Bạn có chắc chắn muốn tiếp nhận hồ sơ này không?
            </Typography>
            <CustomLine
              lable="Bệnh nhân"
              value={admissionRecords.patientName}
              valueLetterSpacing={"0px"}
              marginTop={1}
            />
            <CustomLine
              lable="Phòng tiếp nhận"
              value={selectedRoom.roomName}
              valueLetterSpacing={"0px"}
              marginTop={1}
            />
            <CustomLine
              lable="Ngày tiếp nhận"
              value={dayjs().format("DD/MM/YYYY")}
              valueLetterSpacing={"0px"}
              marginTop={1}
            />
            <Stack width={"100%"} justifyContent={"flex-end"} direction={"row"}>
              <Button
                variant="text"
                style={{
                  textTransform: "none",
                  color: "#0080c0",
                }}
              >
                Tiếp nhận
              </Button>
            </Stack>
          </BodyModal>
        </Box>
      </Modal>
    </>
  );
}

export default ChooseRoomTable;
