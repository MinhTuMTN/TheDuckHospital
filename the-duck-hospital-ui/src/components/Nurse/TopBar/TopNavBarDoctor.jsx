import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useAuth } from "../../../auth/AuthProvider";
import CardMediaImage from "./CardMediaImage";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

function TopNavBarDoctor(props) {
  const { onDrawerClick, roomName, departmentName } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { role } = useAuth();

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
            xs: "100vw",
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
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          {!lgUp && (
            <IconButton onClick={() => onDrawerClick(true)}>
              <SvgIcon fontSize="small">
                <MenuIcon />
              </SvgIcon>
            </IconButton>
          )}
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <CardMediaImage />
            {role === "Doctor" || role === "HeadDoctor" ? (
              <Typography
                variant={"body1"}
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Phòng {roomName} - {departmentName}
              </Typography>
            ) : (
              <Typography
                variant={"body1"}
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Phòng xét nghiệm
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default TopNavBarDoctor;
