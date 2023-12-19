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
import { useLocation } from "react-router-dom";
import { DoctorContext } from "../../auth/DoctorProvider";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function TopNavBarDoctor(props) {
  const { onDrawerClick } = props;
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { roomName, departmentName } = React.useContext(DoctorContext);

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
            lg: `calc(100vw - ${SIDE_NAV_WIDTH}px)`,
            sm: "100vw",
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

            <Typography
              variant={"body1"}
              style={{
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {location?.state?.label}
            </Typography>

            {!roomName || !departmentName ? (
              <Typography
                variant={"body1"}
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                {"Khám chữa bệnh"}
              </Typography>
            ) : (
              <Typography
                variant={"body1"}
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Phòng {roomName} - {departmentName}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default TopNavBarDoctor;
