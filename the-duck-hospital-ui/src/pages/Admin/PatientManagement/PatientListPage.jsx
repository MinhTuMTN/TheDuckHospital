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
  const [isSearching, setIsSearching] = useState(false);
  const [patients, setPatients] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  const handleGetPatients = useCallback(async () => {
    const response = await getPaginationPatients({
      search: search.trim(),
      page: isSearching ? 0 : page - 1,
      limit: limit,
    });

    if (isSearching) {
      setIsSearching(false);
    }

    if (response.success) {
      setPatients(response.data.data.patients);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
  }, [search, page, limit, isSearching]);

  useEffect(() => {
    handleGetPatients();
  }, [handleGetPatients]);

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
                handleGetPatients={handleGetPatients}
                setIsSearching={setIsSearching}
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
