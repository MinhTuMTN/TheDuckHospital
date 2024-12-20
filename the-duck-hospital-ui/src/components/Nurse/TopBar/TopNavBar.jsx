import MenuIcon from "@mui/icons-material/Menu";
import {
  Badge,
  Box,
  Button,
  CardMedia,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { usePopover } from "../../../hooks/use-popover";
import { ExpandMore } from "@mui/icons-material";
import { useAuth } from "../../../auth/AuthProvider";
import AccountPopover from "../../General/Navbar/AccountPopover";
import CardMediaImage from "./CardMediaImage";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
const CustomButton = styled(Box)`
  padding: 4px 18px !important;
  direction: ltr;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid #e0e0e0;
  border-radius: 0;
  &:hover {
    outline: none;
    cursor: pointer;
  }
`;
function TopNavBar(props) {
  const accountPopover = usePopover();
  const { onDrawerClick, roomName, departmentName } = props;
  const { fullName, avatar } = useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
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
          <Stack direction={"row"} alignItems={"center"} spacing={1} flex={1}>
            <CardMediaImage />
            {roomName === "counter" ||
            roomName === "nurse-schedule" ||
            roomName === "doctor-schedule" ? (
              <Typography
                sx={{
                  textAlign: "left",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "#466f92",
                  fontSize: "14px",
                }}
              >
                {roomName === "counter" ? "Quầy dịch vụ" : "Lịch làm việc"}
              </Typography>
            ) : (
              <Stack
                direction={smDown ? "column" : "row"}
                alignItems={"flex-start"}
              >
                <Typography
                  sx={{
                    textAlign: "left",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#466f92",
                    fontSize: "14px",
                  }}
                >
                  Phòng {roomName}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "left",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "#466f92",
                    fontSize: "14px",
                    marginLeft: { sm: 0, md: "4px" },
                  }}
                >
                  {smDown ? "" : " - "} Chuyên khoa{" "}
                  <span
                    style={{ color: "#17abfb", textTransform: "capitalize" }}
                  >
                    {departmentName?.toLowerCase()?.replace("khoa", "").trim()}
                  </span>
                </Typography>
              </Stack>
            )}
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <CustomButton
              component={Button}
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
            >
              <span style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  src={
                    avatar ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyyiip4CAXLbtJL5s2tQ4PdZgvr6NZJJ55rDT3kfPU-hNjoQMm_XqMVqlozf4XhyGMY_o&usqp=CAU"
                  }
                  sx={{
                    width: "40px",
                    height: "40px",
                    marginRight: 1,
                    borderRadius: "50%",
                    padding: "1px",
                    border: "1px solid #1d7ed8",
                    boxShadow: "0px 0px 1px 0px #41adff",
                  }}
                />
                <Badge
                  badgeContent=" "
                  variant="dot"
                  style={{
                    backgroundColor: "#0bb240",
                    borderRadius: "50%",
                    height: "12px",
                    width: "12px",
                    position: "absolute",
                    top: "30px",
                    right: "10px",
                    border: "2px solid #ffffff",
                  }}
                />
              </span>

              <Stack direction={"column"} alignItems={"flex-start"}>
                <Typography
                  variant={"body1"}
                  style={{
                    textTransform: "none",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {fullName}
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                  <Typography
                    variant={"body2"}
                    style={{
                      textTransform: "none",
                      fontSize: "10px",
                      color: "#8c8c8c",
                    }}
                  >
                    {roomName === "nurse-schedule" ? "Điều dưỡng" : "Bác sĩ"}
                  </Typography>
                  <ExpandMore
                    sx={{
                      fontSize: "14px",
                      color: "#8c8c8c",
                      marginTop: "-2px",
                    }}
                  />
                </Stack>
              </Stack>
            </CustomButton>
          </Stack>
          <AccountPopover
            anchorEl={accountPopover.anchorRef.current}
            open={accountPopover.open}
            onClose={accountPopover.handleClose}
            width={"225px"}
          />
        </Stack>
      </Box>
    </>
  );
}

export default TopNavBar;
