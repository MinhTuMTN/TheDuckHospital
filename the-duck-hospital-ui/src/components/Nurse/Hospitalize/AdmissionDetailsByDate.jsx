import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import MedicalInAdmissionDatails from "./MedicalInAdmissionDatails";
import VitalSignsComponent from "./VitalSignsComponent";

const ViewStyle = styled(Grid)(({ theme }) => ({
  padding: "16px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
}));

const LayoutStyle = styled(Stack)(({ theme }) => ({
  padding: "16px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
}));

function AdmissionDetailsByDate() {
  const [date, setDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [info, setInfo] = useState({
    bloodPressure: 100,
    heartRate: 140,
    temperature: 37.5,
    symtoms: "",
    diseaseProgress: "",
  });
  const infoDebounce = useDebounce(info, 1000);
  const [saving, setSaving] = useState(false);
  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setSaving(true);
    console.log(infoDebounce);

    const timeoutId = setTimeout(() => {
      setSaving(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [infoDebounce]);
  return (
    <Box>
      <ViewStyle container>
        <Grid item xs={12} md={6}>
          <Stack direction="column">
            <Stack
              direction={"row"}
              style={{
                alignItems: "center",
              }}
            >
              <PersonIcon
                style={{
                  marginRight: "4px",
                  fontSize: "20px",
                }}
              />
              <Typography fontSize={"18px"} fontWeight={600}>
                Hồ sơ bệnh án:{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 500,
                    letterSpacing: 1,
                    marginLeft: "4px",
                  }}
                >
                  Ân Mạnh Hùng
                </span>
              </Typography>
            </Stack>
            <Typography variant="body1" fontSize={"10px"} marginLeft={"24px"}>
              {saving
                ? "Đang lưu..."
                : "Cập nhật lần cuối lúc: 18h00 - 23/04/2023 (BS. Nguyễn Thị Hồng)"}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display={"flex"}
          marginTop={isDownMd ? "8px" : "0"}
          justifyContent={isDownMd ? "start" : "end"}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              sx={{ width: isDownMd ? "100%" : "auto" }}
              inputFormat="DD/MM/YYYY"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <Box>{params.inputProps.value}</Box>}
            />
          </LocalizationProvider>
        </Grid>
      </ViewStyle>
      <Grid container>
        <Grid item xs={12} md={3.5} minHeight={"100px"}>
          <VitalSignsComponent
            heartRate={info.heartRate}
            bloodPressure={info.bloodPressure}
            temperature={info.temperature}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8.25}
          marginLeft={isDownLg ? 0 : 2.2}
          maxHeight={"100%"}
        >
          <LayoutStyle
            direction={"column"}
            style={{
              height: "330px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                paddingBottom: "8px",
                borderBottom: "1px solid #eaeaea",
                position: "sticky",
              }}
            >
              <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
                Kết quả xét nghiệm và chuẩn đoán hình ảnh (3)
              </Typography>
            </Box>
            <Stack
              direction={"column"}
              marginTop={"8px"}
              width={"100%"}
              style={{
                overflow: "auto",
                paddingBottom: "20px",
              }}
            >
              <MedicalInAdmissionDatails ketQua={"Bình thường"} />
              <MedicalInAdmissionDatails ketQua={""} />
              <MedicalInAdmissionDatails ketQua={""} />
            </Stack>
          </LayoutStyle>
        </Grid>
      </Grid>
      <LayoutStyle direction={"column"}>
        <Box
          sx={{
            width: "100%",
            paddingBottom: "8px",
            borderBottom: "1px solid #eaeaea",
          }}
        >
          <Typography variant="h6" fontWeight={600} fontSize={"18px"}>
            Triệu chứng và diễn biến bệnh
          </Typography>
        </Box>
        <Stack direction={"column"} marginTop={"10px"} width={"100%"}>
          <TextField
            fullWidth
            label="Triệu chứng"
            value={info.symtoms}
            onChange={(e) => {
              setInfo({ ...info, symtoms: e.target.value });
            }}
            multiline
            rows={2}
            placeholder="Nhập triệu chứng của bệnh nhân"
          />
          <TextField
            fullWidth
            label="Diễn biến bệnh phòng"
            multiline
            rows={4}
            placeholder="Nhập diễn biến bệnh của bệnh nhân"
            style={{ marginTop: "16px" }}
          />
        </Stack>
      </LayoutStyle>
    </Box>
  );
}

export default AdmissionDetailsByDate;
