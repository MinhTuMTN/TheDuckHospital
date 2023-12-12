import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SearchTransactionList from "../../../components/Admin/TransactionManagement/SearchTransactionList";
import TransactionTable from "../../../components/Admin/TransactionManagement/TransactionTable";
import { getPaginationTransactions } from "../../../services/admin/TransactionServices";
import { enqueueSnackbar } from "notistack";

// const transactions = [
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 100,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Chờ xử lý",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Thành công",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Thất bại",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Thành công",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Chờ xử lý",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Chờ xử lý",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Thành công",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Thành công",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Thành công",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Thành công",
//   },
//   {
//     fullName: "Nguyễn Quốc Patient",
//     amount: 10000000,
//     paymentMethod: "NCB",
//     createAt: "27/01/2002",
//     status: "Thành công",
//   },
// ]

function TransactionListPage(props) {
  const [search, setSearch] = useState("");
  // const [buttonClicked, setButtonClicked] = useState(true);
  const [transactions, setTransactions] = useState([]);
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

  const handleGetTransactions = useCallback(async () => {
    // if (!buttonClicked) return;
    const response = await getPaginationTransactions({
      page: page - 1,
      limit: limit,
    });
    if (response.success) {
      setTransactions(response.data.data.transactions);
      setTotalItems(response.data.data.total);
      setPage(response.data.data.page + 1);
      setLimit(response.data.data.limit);
    } else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    // setButtonClicked(false);
}, [page, limit]);

  // useEffect(() => {
  //   setButtonClicked(true);
  // }, [page, limit]);

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
              <SearchTransactionList
                value={search}
                onChange={setSearch}
              // onApply={() => {
              //   setButtonClicked(true);
              // }}
              />
              {/* <Box py={2} px={3}>
                  {selectedCategory.length === 0 &&
                    selectedQuantity.length === 0 &&
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
                  {selectedCategory.map((item, index) => (
                    <Chip
                      color="primary"
                      label={
                        catalogs.find((c) => c.catalogId === item)?.catalogName
                      }
                      key={index}
                      onDelete={() =>
                        setSelectedCategory((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}

                  {selectedStatus.map((item, index) => (
                    <Chip
                      color="secondary"
                      label={statusOptions.find((i) => i.value === item)?.name}
                      key={index}
                      onDelete={() =>
                        setSelectedStatus((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}

                  {selectedQuantity.map((item, index) => (
                    <Chip
                      color="warning"
                      label={
                        quantityOptions.find((i) => i.value === item)?.name
                      }
                      key={index}
                      onDelete={() =>
                        setSelectedQuantity((prev) =>
                          prev.filter((i) => i !== item)
                        )
                      }
                    />
                  ))}
                </Box> */}
              {/* <Stack
                  direction={"row"}
                  spacing={1}
                  paddingLeft={2}
                  paddingBottom={1}
                  sx={{
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <ProductFilter
                    label={"Danh mục"}
                    options={catalogs}
                    selectedValues={selectedCategory}
                    onChange={handleChangeCategoryFilter}
                  />
                  <ProductFilter
                    label={"Trạng thái"}
                    options={statusOptions}
                    selectedValues={selectedStatus}
                    onChange={handleChangeStatusFilter}
                  />
                  <ProductFilter
                    label={"Số lượng"}
                    options={quantityOptions}
                    selectedValues={selectedQuantity}
                    onChange={handleChangeQuantityFilter}
                  />
                </Stack> */}
              {/* <ProductsTableBasis
                  count={dataFetched.length}
                  items={dataFetched}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                /> */}
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
