import styled from "@emotion/styled";
import { CloseOutlined, Search } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
} from "@mui/material";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import {
  accpectMedicalTest,
  getMedicalTestByRoom,
} from "../../services/doctor/MedicalTestServices";
import { appColors } from "../../utils/appColorsUtils";

ReceivePatientsTest.propTypes = {
  status: PropTypes.string,
  listPatients: PropTypes.array,
  setMedicalTestIds: PropTypes.func,
};

ReceivePatientsTest.defaultProps = {
  setMedicalTestIds: () => {},
};

const SearchTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F4F6F8",
    color: theme.palette.text.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "bold",
  },
}));

function ReceivePatientsTest(props) {
  const { status, roomId } = props;
  const [searchString, setSearchString] = React.useState("");
  const patientName = useDebounce(searchString, 500);
  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(1);
  const [patients, setPatients] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleGetPatients = useCallback(async () => {
    if (!roomId) return;
    const response = await getMedicalTestByRoom(
      roomId,
      patientName,
      status,
      page,
      5
    );

    if (response.success) {
      const data = response.data.data;
      setPatients(data.items);
      setTotalPage(data.totalPages);
      setPage(data.page);
    }
  }, [roomId, status, page, patientName]);

  const handleAcceptPatient = useCallback(
    async (medicalTestId, paid) => {
      if (!paid) {
        enqueueSnackbar("Bệnh nhân chưa thanh toán", { variant: "error" });
        return;
      }

      const response = await accpectMedicalTest(medicalTestId);
      if (response.success) {
        enqueueSnackbar("Đã tiếp nhận bệnh nhân", { variant: "success" });
        window.open(
          `${window.location.origin}/doctor/medical-test-record/${medicalTestId}`,
          "_blank"
        );
        handleGetPatients();
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra khi tiếp nhận bệnh nhân", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, handleGetPatients]
  );

  useEffect(() => {
    handleGetPatients();
    const intervalId = setInterval(() => {
      handleGetPatients();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [handleGetPatients]);

  return (
    <Grid item xs={12}>
      <Stack spacing={2}>
        <SearchTextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm theo tên khách hàng"
          autoComplete="off"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="text" color="info" onClick={handleGetPatients}>
                  Tìm kiếm
                </Button>
              </InputAdornment>
            ),
            sx: {
              fontSize: "16px",
              padding: "8px 12px 8px 12px",
            },
          }}
        />

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#c72929",
                }}
              >
                <StyledTableCell
                  align="center"
                  sx={{
                    width: "5%",
                  }}
                >
                  #
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{
                    width: "15%",
                  }}
                >
                  Mã bệnh nhân
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{
                    width: "25%",
                  }}
                >
                  Họ và tên
                </StyledTableCell>

                <StyledTableCell
                  align="right"
                  sx={{
                    width: "13%",
                  }}
                >
                  Ngày sinh
                </StyledTableCell>

                <StyledTableCell
                  align="right"
                  sx={{
                    width: "12%",
                  }}
                >
                  Giới tính
                </StyledTableCell>

                <StyledTableCell
                  align="right"
                  sx={{
                    width: "18%",
                  }}
                >
                  Ghi chú
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  sx={{
                    width: "22%",
                  }}
                >
                  Tuỳ Chọn
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: props.status === 0 ? "default" : "pointer",
                  }}
                  onClick={() => {
                    if (row.state === "WAITING") return;
                    window.open(
                      `${window.location.origin}/doctor/medical-test-record/${row.medicalTestId}`,
                      "_blank"
                    );
                  }}
                >
                  <TableCell align="center">{row.queueNumber}</TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {row.patientCode}
                  </TableCell>
                  <TableCell align="left">{row.patientName}</TableCell>
                  <TableCell align="right">
                    {dayjs(row.patientDateOfBirth).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    {row.patientGender === "MALE" ? "Nam" : "Nữ"}
                  </TableCell>
                  <TableCell align="right">{row.note}</TableCell>
                  <TableCell align="center">
                    {row.state === "WAITING" ? (
                      <IconButton
                        onClick={() => {
                          handleAcceptPatient(row.medicalTestId, row.paid);
                        }}
                        size="small"
                        sx={{
                          color: row.paid ? "#5387c7" : appColors.error,
                          backgroundColor: "rgba(50, 128, 200, 0.1)",
                          border: "rgba(83,199,151,.1)",
                          padding: "10px",
                          boxShadow: "0 3px 5px 0 rgba(83,199,151,.3)",
                          "&:hover": {
                            backgroundColor: row.paid
                              ? "rgba(0, 90, 215, 0.577)"
                              : "rgba(238, 73, 73, 0.577)",
                            color: "#ffffff",
                          },
                        }}
                      >
                        {row.paid ? (
                          <CheckCircleOutlineIcon
                            sx={{
                              fontSize: "15px",
                            }}
                          />
                        ) : (
                          <CloseOutlined
                            sx={{
                              fontSize: "15px",
                            }}
                          />
                        )}
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        sx={{
                          color: "#53c797",
                          backgroundColor: "rgba(83,199,151,.1)",
                          border: "rgba(83,199,151,.1)",
                          padding: "10px",
                          boxShadow: "0 3px 5px 0 rgba(83,199,151,.3)",
                          "&:hover": {
                            backgroundColor: "rgba(83,199,151,.1)",
                            color: "#4caf50",
                          },
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: "15px",
                          }}
                        />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
            count={totalPage}
            page={page + 1}
            onChange={(event, value) => setPage(value - 1)}
          />
        </TableContainer>
      </Stack>
    </Grid>
  );
}

export default ReceivePatientsTest;
