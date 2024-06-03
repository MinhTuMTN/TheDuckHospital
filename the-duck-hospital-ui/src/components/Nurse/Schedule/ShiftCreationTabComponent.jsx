import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { getNusrseByType } from "../../../services/nurse/ScheduleServices";
import { appColors } from "../../../utils/appColorsUtils";
import { getNurseType } from "../../../utils/nurseTypeUtils";
import ShiftCreateModal from "./ShiftCreateModal";
import InpatientShiftCreateModal from "./InpatientShiftCreateModal";

function ShiftCreationTabComponent(props) {
  const { nurseType } = props;
  const [name, setName] = React.useState("");
  const debounceName = useDebounce(name, 700);
  const [openModal, setOpenModal] = React.useState(false);
  const [openInpatientModal, setOpenInpatientModal] = React.useState(false);
  const [nurses, setNurses] = React.useState([]);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [pagination, setPagination] = React.useState({
    page: 0,
    limit: 5,
    total: 0,
  });

  const handleChangePage = (event, value) => {
    setPagination((prev) => {
      return { ...prev, page: value };
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setPagination((prev) => {
      return { ...prev, limit: event.target.value, page: 0 };
    });
  };

  const handleGetNurses = useCallback(async () => {
    const response = await getNusrseByType(
      debounceName,
      nurseType,
      pagination.page,
      pagination.limit
    );
    if (response.success) {
      setPagination((prev) => {
        return { ...prev, total: response.data.data.totalItems };
      });
      setNurses(response.data.data.items);
    }
  }, [pagination.page, pagination.limit, debounceName, nurseType]);

  useEffect(() => {
    handleGetNurses();
  }, [handleGetNurses]);

  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
        sx={{
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Tìm theo tên"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setPagination((prev) => {
              return { ...prev, page: 0 };
            });
          }}
          size="medium"
          style={{
            width: "30%",
            backgroundColor: "#ffffff",
          }}
          InputProps={{
            color: appColors.primaryColor,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              borderRadius: "10px",
            },
          }}
          inputProps={{
            style: {
              padding: "22px 14px",
              borderRadius: "30px",
            },
          }}
        />

        {nurseType === "INPATIENT_NURSE" && (
          <Typography
            sx={{
              fontSize: "12px",
              color: "#8c8c8c",
              textAlign: "left",
            }}
          >
            Bác sĩ
          </Typography>
        )}
      </Stack>

      <TableContainer
        style={{
          marginTop: 30,
          borderTop: "1px solid #c8c8c8",
          borderBottom: "1px solid #c8c8c8",
        }}
        component={Box}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#ededed" }}>
            <TableRow
              style={{
                textTransform: "uppercase",
              }}
            >
              <TableCell width={"5%"} align="center">
                #
              </TableCell>
              <TableCell
                width={"25%"}
                align="left"
                style={{
                  paddingLeft: 20,
                }}
              >
                Họ và tên
              </TableCell>
              <TableCell align="left" width={"15%"}>
                Số điện thoại
              </TableCell>
              <TableCell align="left" width={"32%"}>
                Email
              </TableCell>
              <TableCell align="left" width={"13%"}>
                Trạng thái
              </TableCell>
              <TableCell align="left" width={"10%"}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nurses.map((row, index) => (
              <TableRow
                hover
                key={row.staffId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell width={"5%"} align="center">
                  {pagination.page * pagination.limit + index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Stack direction={"row"} alignItems={"center"}>
                    <Avatar
                      alt="Remy Sharp"
                      src={row.avatar}
                      sx={{ width: 50, height: 50, marginRight: 2 }}
                    />

                    <Stack
                      direction={"column"}
                      spacing={1}
                      alignItems={"flex-start"}
                    >
                      {row.fullName}
                      <Typography fontSize={"10px"} color={"#929292"}>
                        Điều dưỡng {getNurseType(row.nurseType)}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="left">{row.phoneNumber}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      width: "fit-content",
                      padding: "0px 12px",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#dcf6e8",
                      borderRadius: ".25rem",
                    }}
                  >
                    <Typography
                      fontSize={"13px"}
                      lineHeight={"24px"}
                      fontWeight={450}
                      color={"#28c76f"}
                    >
                      Đã xếp lịch
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => {
                      setSelectedNurse(row);
                      nurseType === "INPATIENT_NURSE"
                        ? setOpenInpatientModal(true)
                        : setOpenModal(true);
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 5, 10, 25]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.limit}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Dòng trên 1 trang"}
      />

      <ShiftCreateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        nurse={selectedNurse}
        nurseType={nurseType}
      />

      <InpatientShiftCreateModal
        open={openInpatientModal}
        onClose={() => setOpenInpatientModal(false)}
        nurse={selectedNurse}
        nurseType={nurseType}
      />
    </Box>
  );
}

export default ShiftCreationTabComponent;
