import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SearchPatientList from "../../../components/Admin/PatientManagement/SearchPatientList";
import PatientTable from "../../../components/Admin/PatientManagement/PatientTable";
import { getPaginationPatients } from "../../../services/admin/PatientServices";
import { enqueueSnackbar } from "notistack";

function PatientListPage(props) {
  const [search, setSearch] = useState("");
  const [enterPressed, setEnterPressed] = useState(true);
  const [pageChange, setPageChange] = useState(false);
  const [patients, setPatients] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
    setPageChange(true);
    setEnterPressed(true);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
    setEnterPressed(true);
  };

  const handleGetPatients = useCallback(async (event) => {
    if (!enterPressed) return;
    const response = await getPaginationPatients({
      search: search.trim(),
      page: pageChange ? page - 1 : 0,
      limit: limit,
    });

    if (response.success) {
      setPatients(response.data.data.patients);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    setEnterPressed(false);
    setPageChange(false);
  }, [search, page, limit, enterPressed, pageChange]);

  useEffect(() => {
    handleGetPatients();
  }, [handleGetPatients]);

  const handleEnterKeyPressed = (event) => {
    if (event.key === "Enter" && event.target === document.activeElement) {
      setEnterPressed(true);
    }
  }

  return (
    <>
      <Box component={"main"} sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth={"lg"}>
          <Stack spacing={4}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                variant="h3"
                fontWeight={"680"}
                style={{
                  fontSize: "32px",
                }}
              >
                Danh sách bệnh nhân
              </Typography>
            </Stack>
            <Stack
              component={Paper}
              elevation={3}
              sx={{
                paddingBottom: 2,
                borderRadius: "10px",
              }}
              spacing={"2px"}
            >
              <SearchPatientList
                value={search}
                onChange={setSearch}
                handleEnterKeyPressed={handleEnterKeyPressed}
              />
              <PatientTable
                count={totalItems ? totalItems : 0}
                items={patients}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={limit}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
      {/* )} */}
    </>
  );
}

export default PatientListPage;
