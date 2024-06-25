import {
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { appColors } from "../../../utils/appColorsUtils";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getGender } from "../../../utils/genderUtils";
import { getAge } from "../../../utils/getAgeUtils";

const Layout = styled(Grid)(({ theme }) => ({
  padding: theme.spacing("16px"),
  marginTop: theme.spacing(3),
  backgroundColor: appColors.white,
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  display: "flex",
  boxShadow: "none",
  justifyContent: "space-between",
  alignItems: "center",
}));
const CssTextField = styled(TextField)({
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#0027c3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#001c9ae0",
      boderWidth: "1px",
    },
  },
});
const cellStyle = {
  padding: "8px 12px",
};

const headCellStyle = {
  ...cellStyle,
  backgroundColor: "#f1f5fa",
};

const rows = [
  {
    patientCode: "BN97E92D23",
    patientName: "Nguyễn Thị Vân Yên",
    patientGender: "FEMALE",
    province: "Hà Nội",
    patientDateOfBirth: "1996/07/12",
    admissionDate: "15/12/2021",
  },
  {
    patientCode: "BN92R92D53",
    patientName: "Nguyễn Trung Nghĩa",
    patientGender: "MALE",
    province: "Bà Rịa - Vũng Tàu",
    patientDateOfBirth: "1973/10/08",
    admissionDate: "19/12/2021",
  },
  {
    patientCode: "BN21R92W39",
    patientName: "Huỳnh Hoàng Việt",
    patientGender: "MALE",
    province: "Tp.Hồ Chí Minh",
    patientDateOfBirth: "1973/06/20",
    admissionDate: "10/12/2021",
  },
];
function ChoosePatient() {
  const [patientName, setPatientName] = React.useState("");
  const handleChange = (event) => {
    setPatientName(event.target.value);
  };
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
      color={"inherit"}
      style={{
        fontWeight: "500",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Nội trú
    </Typography>,
    <Typography
      key="3"
      color={"inherit"}
      style={{
        fontWeight: "500",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Danh sách phòng
    </Typography>,
    <Typography
      key="4"
      color={"#5a5a5a"}
      style={{
        fontWeight: "560",
        fontSize: "14px",
        letterSpacing: "0.5px",
      }}
    >
      Phòng A202
    </Typography>,
  ];

  const handleChoose = () => {
    navigate("patient-hospitalization-details");
  };
  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: appColors.backgroundColorMain,
      }}
    >
      <Box flex={1} display={"flex"}>
        <LayoutComponent container>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight={600} letterSpacing={1}>
              Phòng A202
            </Typography>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} marginTop={3}>
            <CssTextField
              autoComplete="off"
              variant="outlined"
              placeholder="Tìm kiếm theo tên bệnh nhân"
              value={patientName}
              onChange={handleChange}
              size="medium"
              style={{
                width: "50%",
                backgroundColor: "#ffffff",
                marginRight: "12px",
                borderRadius: "12px",
              }}
              InputProps={{
                color: appColors.primaryColor,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "12px",
                  paddingLeft: "14px",
                },
              }}
              inputProps={{
                style: {
                  padding: "20px 8px 20px 0px",
                  borderColor: "transparent",
                },
              }}
            />
          </Grid>
          <Layout item xs={12}>
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} padding="none">
                <TableHead style={headCellStyle}>
                  <TableRow>
                    {[
                      "Mã bệnh nhân",
                      "Tên bệnh nhân",
                      "Tuổi",
                      "Giới tính",
                      "Tỉnh/Thành phố",
                      "Ngày nhập viện",
                      "",
                    ].map((text, index) => (
                      <TableCell
                        key={index}
                        align={
                          index === 6 ? "center" : index < 2 ? "left" : "right"
                        }
                        style={{
                          ...cellStyle,
                          width:
                            index === 0 ? "14%" : index === 6 ? "7%" : "auto",
                        }}
                      >
                        {text}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={row.patientCode}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align="left"
                        style={{ ...cellStyle, letterSpacing: "0.5px" }}
                      >
                        {row.patientCode}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ ...cellStyle, letterSpacing: "1px" }}
                      >
                        {row.patientName}
                      </TableCell>

                      <TableCell
                        align="right"
                        style={{ ...cellStyle, letterSpacing: "1px" }}
                      >
                        {getAge(row.patientDateOfBirth)}
                      </TableCell>
                      <TableCell align="right" style={cellStyle}>
                        {getGender(row.patientGender)}
                      </TableCell>
                      <TableCell align="right" style={cellStyle}>
                        {row.province}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ ...cellStyle, letterSpacing: "1px" }}
                      >
                        {row.admissionDate}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ ...cellStyle, letterSpacing: "1px" }}
                      >
                        <IconButton onClick={() => handleChoose()}>
                          <NavigateNextIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Layout>
        </LayoutComponent>
      </Box>
    </Box>
  );
}

export default ChoosePatient;
