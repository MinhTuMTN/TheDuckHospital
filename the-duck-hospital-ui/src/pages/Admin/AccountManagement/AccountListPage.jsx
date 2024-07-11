import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AccountTable from "../../../components/Admin/AccountManagement/AccountTable";
import { getPaginationAccounts } from "../../../services/admin/AccountServices";
import { enqueueSnackbar } from "notistack";
import AccountFilter from "../../../components/Admin/AccountManagement/AccountFilter";
import SearchAccountList from "../../../components/Admin/AccountManagement/SearchAccountList";

const statusOptions = [
  {
    value: false,
    name: "Còn hoạt động",
  },
  {
    value: true,
    name: "Ngưng hoạt động",
  },
];

const roleOptions = [
  {
    value: "PATIENT",
    name: "Bệnh nhân",
  },
  {
    value: "DOCTOR",
    name: "Bác sĩ",
  },
  {
    value: "NURSE",
    name: "Điều dưỡng",
  },
  {
    value: "CASHIER",
    name: "Thu ngân",
  },
  {
    value: "SUPPORT_AGENT",
    name: "Hỗ trợ viên",
  },
  {
    value: "LABORATORY_TECHNICIAN",
    name: "Bác sĩ xét nghiệm",
  },
];

function AccountListPage(props) {
  const [search, setSearch] = useState("");
  const [filterButtonClicked, setFilterButtonClicked] = useState(true);
  const [pageChange, setPageChange] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
    setPageChange(true);
    setFilterButtonClicked(true);
  };
  const handleRowsPerPageChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
    setFilterButtonClicked(true);
  };

  const [selectedRole, setSelectedRole] = useState([]);
  const handleChangeRoleFilter = (event) => {
    if (event.target.checked) {
      setSelectedRole((prev) => [...prev, event.target.value]);
    } else {
      setSelectedRole((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  const [selectedStatus, setSelectedStatus] = useState([]);
  const handleChangeStatusFilter = (event) => {
    if (event.target.checked) {
      setSelectedStatus((prev) => [...prev, event.target.value === "true"]);
    } else {
      setSelectedStatus((prev) =>
        prev.filter((item) => item !== (event.target.value === "true"))
      );
    }
  };

  const handleGetAccounts = useCallback(async () => {
    if (!filterButtonClicked) return;
    const response = await getPaginationAccounts({
      search: search.trim(),
      page: pageChange ? page - 1 : 0,
      limit: limit,
      accountRole: selectedRole,
      accountStatus: selectedStatus,
    });
    if (response.success) {
      setAccounts(response.data.data.accounts);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    setFilterButtonClicked(false);
    setPageChange(false);
  }, [
    search,
    page,
    limit,
    selectedStatus,
    selectedRole,
    filterButtonClicked,
    pageChange,
  ]);

  useEffect(() => {
    handleGetAccounts();
  }, [handleGetAccounts]);

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
                Danh sách tài khoản
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
              <SearchAccountList
                value={search}
                onChange={setSearch}
                onApply={() => {
                  setFilterButtonClicked(true);
                }}
              />
              <Box py={2} px={3}>
                {selectedRole.length === 0 &&
                  selectedStatus.length === 0 && (
                    <TextField
                      disabled
                      variant="standard"
                      fullWidth
                      size="medium"
                      InputProps={{
                        disableUnderline: true,
                        fontSize: "14px",
                      }}
                      placeholder="Không có bộ lọc nào được chọn"
                    />
                  )}
                <Stack direction="row" spacing={1}>
                  {selectedRole.map((item, index) => (
                    <Chip
                      color="info"
                      label={
                        roleOptions.find((i) => i.value === item)?.name
                      }
                      key={index}
                      onDelete={() =>
                        setSelectedRole((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}
                  {selectedStatus.map((item, index) => (
                    <Chip
                      color="warning"
                      label={statusOptions.find((i) => i.value === item)?.name}
                      key={index}
                      onDelete={() =>
                        setSelectedStatus((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}
                </Stack>
              </Box>
              <Stack
                direction={"row"}
                spacing={1}
                paddingLeft={2}
                paddingBottom={1}
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <AccountFilter
                  label={"Vai trò"}
                  options={roleOptions}
                  selectedValues={selectedRole}
                  onChange={handleChangeRoleFilter}
                />
                <AccountFilter
                  label={"Trạng thái"}
                  options={statusOptions}
                  selectedValues={selectedStatus}
                  onChange={handleChangeStatusFilter}
                />
              </Stack>
              <AccountTable
                count={totalItems ? totalItems : 0}
                items={accounts}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={limit}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default AccountListPage;
