import { useTheme } from "@emotion/react";
import { Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import DoctorTable from "../../../components/Doctor/HeadDoctor/CreateDoctorSchedule/DoctorTable";
import SearchDoctorList from "../../../components/Doctor/HeadDoctor/CreateDoctorSchedule/SearchDoctorList";
import { enqueueSnackbar } from "notistack";
import { getPaginationActiveDoctors } from "../../../services/doctor/headDoctor/ScheduleServices";
function CreateSchedulePage(props) {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handleGetPatients = useCallback(async () => {
    const response = await getPaginationActiveDoctors({
      search: search,
      page: page - 1,
      limit: limit,
    });
    if (response.success) {
      setDoctors(response.data.data.doctors);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [search, page, limit]);

  useEffect(() => {
    handleGetPatients();
  }, [handleGetPatients]);

  return (
    <Stack
      direction="column"
      sx={{
        py: 3,
        px: isFullScreen ? 5 : 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: "32px",
          color: "#474747",
        }}
        fontWeight="600"
      >
        Tạo ca trực mới
      </Typography>

      <Stack
        component={Paper}
        sx={{
          mt: 3,
          paddingBottom: 2,
          borderRadius: "10px",
          border: `1px solid #dadada`,
        }}
        spacing={"2px"}
      >
        <SearchDoctorList value={search} onChange={setSearch} />
        <DoctorTable
          count={totalItems ? totalItems : 0}
          items={doctors}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={limit}
        />
      </Stack>
    </Stack>
  );
}

export default CreateSchedulePage;
