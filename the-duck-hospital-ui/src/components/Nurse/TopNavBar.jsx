import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CardMedia,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function TopNavBar(props) {
  const { onDrawerClick, roomName, departmentName } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg")); // Sử dụng useMediaQuery để lấy ra giá trị của màn hình hiện tại

  return (
    <>
      <Box
        component={"header"}
        sx={{
          backdropFilter: "blur(6px)",
          boxShadow: "0 1px 4px 0 rgb(0 0 0 / 37%)",
          backgroundColor: "#fff",
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT, // Đặt chiều cao tối thiểu cho phần header
            px: 2, // Đặt padding theo chiều ngang cho phần header
          }}
        >
          {!lgUp && (
            <IconButton onClick={() => onDrawerClick(true)}>
              {" "}
              <SvgIcon fontSize="small">
                <MenuIcon />
              </SvgIcon>
            </IconButton>
          )}
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <CardMedia
              component={"img"}
              image={
                "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702293009/hospital-building_ue3udt.png"
              }
              sx={{
                height: "30px",
                width: "30px",
              }}
            />
            {roomName === "counter" ? (
              <Typography
                variant={"body1"}
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Quầy dịch vụ
              </Typography>
            ) : (
              <Typography
                variant={"body1"}
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Phòng {roomName} - Chuyên khoa{" "}
                <span style={{ color: "#17abfb", textTransform: "capitalize" }}>
                  {departmentName?.toLowerCase()?.replace("khoa", "").trim()}
                </span>
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default TopNavBar;
