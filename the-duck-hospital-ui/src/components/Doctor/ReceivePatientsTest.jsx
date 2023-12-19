import styled from "@emotion/styled";
import { Search } from "@mui/icons-material";
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
import React, { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getMedicalTestByMedicalServiceAndState } from "../../services/doctor/MedicalTestServices";

ReceivePatientsTest.propTypes = {
  status: PropTypes.string,
  listPatients: PropTypes.array,
  setMedicalTestIds: PropTypes.func,
};

ReceivePatientsTest.defaultProps = {
  setMedicalTestIds: () => { },
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
  const { status, refresh, serviceId, setMedicalTestIds } = props;
  const [searchString, setSearchString] = React.useState("");
  const [patientName, setPatientName] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(1);
  const [patients, setPatients] = React.useState([]);
  const navigate = useNavigate();

  // const acceptPatient = async (medicalTestId) => {
  //   const response = await acceptMedicalTest(medicalTestId);
  //   if (response.success) {
  //     enqueueSnackbar("Tiếp nhận bệnh nhân thành công", {
  //       variant: "success",
  //     });
  //     handleGetCounterMedicalTest();
  //   } else {
  //     enqueueSnackbar("Tiếp nhận bệnh nhân thất bại", {
  //       variant: "error",
  //     });
  //   }
  // };

  useEffect(() => {
    const handleGetPatients = async () => {
      const response = await getMedicalTestByMedicalServiceAndState({
        serviceId: serviceId,
        state: status,
        page: page,
        searchString: patientName
      });

      if (response.success) {
        const data = response.data.data;
        setPatients(data.items);
        setTotalPage(data.totalPages);
        setPage(data.page);
        if (status === "WAITING") {
          const medicalTestIds = data.items.slice(0, 5).map(test => test.medicalTestId);
          setMedicalTestIds(medicalTestIds);
        }
      }
    };
    handleGetPatients();
  }, [serviceId, status, page, patientName, refresh, setMedicalTestIds]);

  const handleSearchButtonClick = () => {
    setPatientName(searchString);
  };

  return (
    <Grid item xs={12}>
      <Stack spacing={2}>
        <SearchTextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm theo tên khách hàng"
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
                <Button
                  variant="text"
                  color="info"
                  onClick={handleSearchButtonClick}
                >
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
                    navigate(
                      `/doctor/medical-test-record/${row.medicalTestId}`
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
                        size="small"
                        sx={{
                          color: "#5387c7",
                          backgroundColor: "rgba(50, 128, 200, 0.1)",
                          border: "rgba(83,199,151,.1)",
                          padding: "10px",
                          boxShadow: "0 3px 5px 0 rgba(83,199,151,.3)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 90, 215, 0.577)",
                            color: "#ffffff",
                          },
                        }}
                        // onClick={() => acceptPatient(row.medicalTestId)}
                      >
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: "15px",
                          }}
                        />
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
