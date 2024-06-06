import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Typography,
  styled,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appColors } from "../../../utils/appColorsUtils";

const Layout = styled(Grid)(({ theme }) => ({
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 15,
  paddingBottom: 25,
  flex: 1,
  backgroundColor: appColors.backgroundColorMain,
  height: "100%",
  [theme.breakpoints.up("lg")]: {},
}));

function NurseScheduleManagementPage() {
  const navigate = useNavigate();
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href=">"
      onClick={() => navigate("/")}
      style={{
        cursor: "pointer",
        fontWeight: "500",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Trang chủ
    </Link>,
    <Typography
      key="2"
      color={"#5a5a5a"}
      style={{
        fontWeight: "560",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Danh sách ca trực
    </Typography>,
  ];

  var weekOfYearPlugin = require("dayjs/plugin/isoWeek");
  // var weekOfYearPlugin = require("dayjs/plugin/weekOfYear");
  dayjs.extend(weekOfYearPlugin);

  const [weekOfYear, setWeekOfYear] = useState(dayjs().startOf("isoWeek"));
  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: appColors.backgroundColorMain,
        display: "flex",
      }}
    >
      <Layout container>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={600} letterSpacing={1}>
            Danh sách ca trực
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          xs={12}
          marginTop={3}
          style={{
            borderRadius: 10,
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h6" fontWeight={600} letterSpacing={1}>
            Tuần {weekOfYear.isoWeek()} năm{" "}
            {weekOfYear.endOf("isoWeek").get("year")} -{" "}
            {weekOfYear.format("DD/MM/YYYY HH:mm:ss")}
          </Typography>
        </Grid>
      </Layout>
      {/* <button onClick={() => setWeekOfYear(weekOfYear.add(-1, "week"))}>
        Previous week
      </button>
      <p>{`Tuần ${weekOfYear.isoWeek()} năm ${weekOfYear
        .endOf("isoWeek")
        .get("year")} - ${weekOfYear.format("DD/MM/YYYY HH:mm:ss")}`}</p>
      <button onClick={() => setWeekOfYear(weekOfYear.add(1, "week"))}>
        Next week
      </button> */}
    </Box>
  );
}

export default NurseScheduleManagementPage;
