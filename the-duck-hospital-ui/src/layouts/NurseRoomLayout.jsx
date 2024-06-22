import styled from "@emotion/styled";
import React, { useContext, useEffect } from "react";
import TopNavBar from "../components/Nurse/TopBar/TopNavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { NurseContext } from "../auth/NurseProvider";
import { enqueueSnackbar } from "notistack";
import { Box } from "@mui/material";
import LeftNavbar from "../components/Nurse/LeftBar/LeftNavbar";
const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

function NurseLayout(props) {
  const [open, setOpen] = React.useState(false);
  const { roomId, roomName, doctorScheduleId, departmentName } =
    useContext(NurseContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!roomId || !roomName || !doctorScheduleId || !departmentName) {
      navigate("/", { replace: true });
      enqueueSnackbar("Vui lòng chọn phòng khám để tiếp tục", {
        variant: "error",
      });
    }
  }, [roomId, roomName, doctorScheduleId, departmentName, navigate]);
  return (
    <Box display={"flex"} flexDirection={"column"} minHeight={"100vh"}>
      <TopNavBar
        onDrawerClick={setOpen}
        roomName={roomName}
        departmentName={departmentName}
      />
      <LeftNavbar open={open} onOpenClose={setOpen} />
      <LayoutRoot>
        <Outlet />
      </LayoutRoot>
    </Box>
  );
}

export default NurseLayout;
