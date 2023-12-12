import styled from "@emotion/styled";
import React, { useContext, useEffect } from "react";
import TopNavBar from "../components/Nurse/TopNavBar";
import LeftNavbar from "../components/Nurse/LeftNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import { NurseContext } from "../auth/NurseProvider";
import { enqueueSnackbar } from "notistack";
const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});
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
    <>
      <TopNavBar
        onDrawerClick={setOpen}
        roomName={roomName}
        departmentName={departmentName}
      />
      <LeftNavbar open={open} onOpenClose={setOpen} />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default NurseLayout;
