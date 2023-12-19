import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import TransactionTable from "../../../components/Admin/TransactionManagement/TransactionTable";
import { getPaginationTransactions } from "../../../services/admin/TransactionServices";
import { enqueueSnackbar } from "notistack";
import TransactionFilter from "../../../components/Admin/TransactionManagement/TransactionFilter";


const statusOptions = [
  {
    value: "PENDING",
    name: "Chờ xử lý",
  },
  {
    value: "SUCCESS",
    name: "Thành công",
  },
  {
    value: "FAILED",
    name: "Thất bại",
  },
];

const paymentOptions = [
  {
    value: "VNPay",
    name: "Online",
  },
  {
    value: "CASH",
    name: "Tại quầy",
  },
];

function TransactionListPage(props) {
  const [filterButtonClicked, setFilterButtonClicked] = useState(true);
  const [pageChange, setPageChange] = useState(false);
  const [transactions, setTransactions] = useState([]);
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

  const [selectedPayment, setSelectedPayment] = useState([]);
  const handleChangePaymentFilter = (event) => {
    if (event.target.checked) {
      setSelectedPayment((prev) => [...prev, event.target.value]);
    } else {
      setSelectedPayment((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  const [selectedStatus, setSelectedStatus] = useState([]);
  const handleChangeStatusFilter = (event) => {
    if (event.target.checked) {
      setSelectedStatus((prev) => [...prev, event.target.value]);
    } else {
      setSelectedStatus((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    }
  };

  const handleGetTransactions = useCallback(async () => {
    if (!filterButtonClicked) return;
    const response = await getPaginationTransactions({
      page: pageChange ? page - 1 : 0,
      limit: limit,
      transactionPayment: selectedPayment,
      transactionStatus: selectedStatus,
    });
    if (response.success) {
      setTransactions(response.data.data.transactions);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    setFilterButtonClicked(false);
    setPageChange(false);
  }, [
    page,
    limit,
    selectedStatus,
    selectedPayment,
    filterButtonClicked,
    pageChange,
  ]);

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions]);

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
                Danh sách giao dịch
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
              <Stack direction="row" spacing={1}>
                <Box
                  py={2}
                  px={3}
                  width="90%"
                >
                  {selectedPayment.length === 0 &&
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
                    {selectedPayment.map((item, index) => (
                      <Chip
                        color="info"
                        label={
                          paymentOptions.find((i) => i.value === item)?.name
                        }
                        key={index}
                        onDelete={() =>
                          setSelectedPayment((prev) =>
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
                <Button
                  onClick={() => {
                    setFilterButtonClicked(true);
                  }}
                  sx={{
                    flexBasis: "15%",
                    width:"10%",
                  }}
                >
                  Áp dụng
                </Button>
              </Stack>
              <Stack
                direction={"row"}
                spacing={1}
                paddingLeft={2}
                paddingBottom={1}
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <TransactionFilter
                  label={"Thanh toán"}
                  options={paymentOptions}
                  selectedValues={selectedPayment}
                  onChange={handleChangePaymentFilter}
                />
                <TransactionFilter
                  label={"Trạng thái"}
                  options={statusOptions}
                  selectedValues={selectedStatus}
                  onChange={handleChangeStatusFilter}
                />
              </Stack>
              <TransactionTable
                count={totalItems ? totalItems : 0}
                items={transactions}
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

export default TransactionListPage;
