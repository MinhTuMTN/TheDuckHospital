import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { getLabRooms } from "../../services/doctor/MedicalTestServices";
import { useSnackbar } from "notistack";

LabTechnicalRoomModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onChange: PropTypes.func,
};

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  borderRadius: 4,
  padding: 16,
  minWidth: 650,
}));

function LabTechnicalRoomModal(props) {
  const { onClose, open, onChange } = props;
  const [roomType, setRoomType] = React.useState("LABORATORY_ROOM_NORMAL");
  const [labRooms, setLabRooms] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const handleGetLabRooms = async () => {
      setLoading(true);
      const response = await getLabRooms(roomType);
      setLoading(false);
      if (response.success) {
        setLabRooms(response.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra khi lấy danh sách phòng xét nghiệm", {
          variant: "error",
        });
      }
    };

    handleGetLabRooms();
  }, [roomType, enqueueSnackbar]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Typography variant="h5" fontWeight={"500"} fontSize={"24px"}>
          Đổi phòng xét nghiệm
        </Typography>
        <Typography>
          Chọn phòng xét nghiệm mà nhân viên xét nghiệm đang thực hiện
        </Typography>

        <Stack columnGap={2} direction={"row"} mt={1}>
          <Button
            onClick={() => setRoomType("LABORATORY_ROOM_NORMAL")}
            color={"newPrimary"}
            variant={
              roomType === "LABORATORY_ROOM_NORMAL" ? "contained" : "text"
            }
            sx={{
              color: roomType === "LABORATORY_ROOM_NORMAL" ? "#ffffff" : "",
            }}
          >
            Phòng khám
          </Button>
          <Button
            onClick={() => setRoomType("LABORATORY_ROOM_ADMISSION")}
            color={"newPrimary"}
            variant={
              roomType === "LABORATORY_ROOM_ADMISSION" ? "contained" : "text"
            }
            sx={{
              color: roomType === "LABORATORY_ROOM_ADMISSION" ? "#ffffff" : "",
            }}
          >
            Nội trú
          </Button>
        </Stack>

        <Box
          sx={{
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          {loading ? (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              mt={4}
              spacing={1}
              width={"100%"}
            >
              <CircularProgress color="newPrimary" />
              <Typography>Đang tải danh sách phòng xét nghiệm</Typography>
            </Stack>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên phòng</TableCell>
                  <TableCell>Dịch vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {labRooms?.map((room, index) => (
                  <TableRow
                    onClick={() => {
                      onChange(room);
                      onClose();
                    }}
                    sx={{
                      cursor: "pointer",
                    }}
                    key={`room-${index}`}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{room.roomName}</TableCell>
                    <TableCell>{room.serviceName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </StyledBox>
    </Modal>
  );
}

export default LabTechnicalRoomModal;
