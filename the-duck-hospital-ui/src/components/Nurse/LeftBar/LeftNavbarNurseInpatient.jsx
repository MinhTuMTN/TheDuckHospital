import {
  Box,
  Button,
  CardMedia,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  SwipeableDrawer,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthProvider";

import LogoutIcon from "@mui/icons-material/Logout";
import { useSnackbar } from "notistack";
import { getInpatientRooms } from "../../../services/nurse/HospitalizeServices";

const StyledLogo = styled(CardMedia)(({ theme }) => ({
  display: "flex",
  width: "220px",
  cover: "no-repeat",
  backgroundSize: "contain",
  height: theme.spacing(8),
  paddingX: "16px",
}));
const CustomListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  width: "100%",
  color: "#797575",
  fontSize: "13px",
  padding: `${theme.spacing(0.5)} 0 ${theme.spacing(0.5)} ${theme.spacing(5)}`,
  transition: "transform 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    backgroundColor: active === "true" ? "#333860da" : "#ebebeb6c",
    transform: "translateX(4px) scale(1.005) ",
  },
}));

function LeftNavbarNurseInpatient(props) {
  const { open, onOpenClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [rooms, setRooms] = useState([]);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const content = useMemo(() => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Box>
          <Tooltip title="Trang chủ">
            <Box
              sx={{
                paddingY: 1,
                display: "flex",
                width: "100%",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <StyledLogo image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png" />
            </Box>
          </Tooltip>
          <Box
            sx={{
              justifyContent: "flex-start",
              width: "100%",
              paddingX: 2,
              marginTop: 2,
            }}
          >
            <Typography
              sx={{
                textAlign: "left",
                textTransform: "none",
                fontWeight: "bold",
                color: "#466f92",
                fontSize: "14px",
              }}
            >
              Danh sách phòng
            </Typography>
          </Box>
          <List>
            {rooms.map((item, index) => (
              <Box
                key={`nav-bar-store-${index}`}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  navigate(
                    `/nurse-inpatient/${item.roomId}-${item.roomName}/patients`
                  );
                }}
              >
                <ListItem disablePadding key={item.section}>
                  <CustomListItemButton>
                    <ListItemText
                      disableTypography
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#5a5c61",
                      }}
                      primary={
                        item.roomName + " (" + item.beingUsed + " giường)"
                      }
                    />
                  </CustomListItemButton>
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>

        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            position: "sticky",
            borderTop: "1px solid #e0e0e0",
            paddingX: 2,
            paddingY: 2.5,
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#ff0d00d9",
              fontSize: "14px",
              textTransform: "none",
              justifyContent: "center",
              width: "100%",
              ":hover": {
                backgroundColor: "error.main",
              },
            }}
            onClick={() => {
              setToken(null);
              window.location.href = "/";
            }}
          >
            <Typography
              sx={{
                marginRight: "10px",
              }}
            >
              Đăng xuất
            </Typography>
            <LogoutIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </Button>
        </Stack>
      </Box>
    );
  }, [rooms, navigate, setToken]);

  useEffect(() => {
    const handleGetRooms = async () => {
      const response = await getInpatientRooms();
      if (response.success) {
        const rooms = response.data.data;
        rooms.sort((a, b) => a.roomName.localeCompare(b.roomName));
        setRooms(rooms);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra khi lấy danh sách phòng trực", {
          variant: "error",
        });
      }
    };

    handleGetRooms();
  }, [enqueueSnackbar]);

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        PaperProps={{
          sx: {
            backgroundColor: "#fff",

            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <SwipeableDrawer
      anchor="left"
      onClose={() => onOpenClose(false)}
      onOpen={() => onOpenClose(true)}
      open={open}
      PaperProps={{
        sx: {
          background: "#fff",
          color: "theme.palette.primary.main",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </SwipeableDrawer>
  );
}

export default LeftNavbarNurseInpatient;
