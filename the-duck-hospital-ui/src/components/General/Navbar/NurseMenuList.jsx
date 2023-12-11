import { ClearOutlined, LocalHospitalOutlined } from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuList,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomMenuItem, CustomMenuItemLogOut } from "./PatientMenuList";
import DialogForm from "../DialogForm";
import styled from "@emotion/styled";
import { findRoom } from "../../../services/customer/RoomServices";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "11px 8px",
  },
}));

const RoomItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #e0e0e0",
}));

function RoomItem(props) {
  const { room } = props;
  return (
    <RoomItemContainer>
      <Typography flex={1}>{room.roomName}</Typography>
      <Typography flex={2}>{room.departmentName}</Typography>
      <Button variant="text" sx={{ textTransform: "unset" }}>
        Tiếp tục
      </Button>
    </RoomItemContainer>
  );
}

function NurseMenuList(props) {
  const { onClose, setToken } = props;
  const navigate = useNavigate();
  const [roomNameSearch, setRoomNameSearch] = React.useState("");
  const [rooms, setRooms] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const handleSearchRoom = async () => {
      if (roomNameSearch.trim() === "") return;

      const response = await findRoom(roomNameSearch);
      if (response.success) setRooms(response.data.data);
    };
    handleSearchRoom();
  }, [roomNameSearch]);
  return (
    <>
      <MenuList
        disablePadding
        dense
        sx={{
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <CustomMenuItem
          onClick={() => {
            navigate("/nurse/counter");
            onClose();
          }}
        >
          <CardMedia
            src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702289485/reception_dufvjx.png"
            component="img"
            sx={{
              width: "20px",
              height: "20px",
              marginRight: "8px",
            }}
          />
          Quầy dịch vụ
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            setOpen(true);
            // onClose();
          }}
        >
          <LocalHospitalOutlined
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Phòng khám
        </CustomMenuItem>

        <CustomMenuItemLogOut
          sx={{
            color: "red",
          }}
          onClick={(e) => {
            setToken(null);
            onClose();
            window.location.href = "/";
          }}
        >
          <LogoutOutlinedIcon
            fontSize="small"
            sx={{
              marginRight: "8px",
            }}
          />
          Đăng xuất
        </CustomMenuItemLogOut>
      </MenuList>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          onClose();
        }}
        maxWidth={5000}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "0px",
          }}
        >
          <Typography variant="h6">Tìm kiếm phòng khám</Typography>
          <IconButton
            sx={{ border: "1px solid #000", p: 0.3 }}
            onClick={() => {
              setOpen(false);
              onClose();
            }}
          >
            <ClearOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography minWidth={450}>
              Vui lòng nhập tên phòng khám để tiếp tục
            </Typography>
          </DialogContentText>
          <CustomTextField
            autoFocus
            fullWidth
            style={{ margin: "16px 0" }}
            variant="outlined"
            label="Tên phòng khám"
            size="small"
            value={roomNameSearch}
            onChange={(e) => setRoomNameSearch(e.target.value)}
          />
          <Box height={100} overflow={"hidden"}>
            {rooms.map((room) => (
              <RoomItem key={`room-${room.roomId}`} room={room} />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NurseMenuList;
