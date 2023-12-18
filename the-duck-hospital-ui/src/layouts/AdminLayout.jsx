import styled from "@emotion/styled";
import { Box } from "@mui/material";
// import { enqueueSnackbar } from "notistack";
import React, {
  Fragment,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import TopNavbar from "../components/Admin/TopNavbar";

const SIDE_NAV_WIDTH = 280;

const RootPageUser = styled(Box)(({ theme }) => ({
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

const DataContext = createContext();

function AdminLayout(props) {
  const [open, setOpen] = React.useState(false);
  const pathname = useLocation().pathname;
  const editedPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const [dataFetched, setDataFetched] = useState([]);
  const [statistic, setStatistic] = useState({});

  const fetchData = useCallback(async () => {
    let response;
    let isStatistic = false;

    switch (editedPath) {
      case "/admin/customer-management":
        break;
      case "/admin":
      case "/admin/analytics":
        isStatistic = true;

        break;
      default:
        break;
    }

    if (response?.success) {
      if (isStatistic) {
        setStatistic(response.data.data);
      } else {
        setDataFetched(response.data.data);
      }
    } else {
      if (typeof response !== "undefined") {
        // enqueueSnackbar("Đã có lỗi xảy ra!", { variant: "error" });
        console.log("Đã có lỗi xảy ra!");
      }
    }
  }, [editedPath]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider value={{ dataFetched, statistic }}>
      <Fragment>
        <TopNavbar onDrawerClick={setOpen} isAdmin />
        <AdminSidebar open={open} onOpenClose={setOpen} />
        <RootPageUser>
          <LayoutContainer>
            <Outlet />
          </LayoutContainer>
        </RootPageUser>
      </Fragment>
    </DataContext.Provider>
  );
}

export { DataContext };
export default AdminLayout;
