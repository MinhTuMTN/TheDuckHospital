import { Print, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const ViewStyle = styled(Grid)(({ theme }) => ({
  padding: "18px 16px",
  marginTop: "16px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
  alignItems: "center",
}));

const ButtonCustom = styled(Button)(({ theme }) => ({
  textTransform: "none",
  padding: "4px 10px",
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
}));

const LableTypography = styled(Typography)(({ theme }) => ({
  marginRight: "4px",
  display: "flex",
  fontSize: "14px",
  fontWeight: 500,
}));

function HospitalDischarge() {
  const [note, setNote] = useState("");
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const cursorPosition = event.target.selectionStart;
      const newText =
        note.slice(0, cursorPosition) + "\n- " + note.slice(cursorPosition);
      setNote(newText);
      // Đặt lại vị trí con trỏ sau khi thêm dấu gạch ngang
      setTimeout(() => {
        event.target.selectionStart = event.target.selectionEnd =
          cursorPosition + 3;
      }, 0);
    }
  };
  const handleOnChangeNote = (event) => {
    setNote(event.target.value);
  };
  const handleOnFocus = () => {
    if (note.trim() === "") setNote("- ");
  };
  return (
    <Box>
      <ViewStyle container>
        <Box item xs={12} container component={Grid} ref={ref}>
          <Grid item xs={12} justifyContent={"center"}>
            <Typography
              variant="subtitle1"
              textTransform={"capitalize"}
              fontWeight={600}
              letterSpacing={0.5}
              fontSize={"24px"}
              textAlign={"center"}
            >
              Phiếu xuất viện
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "120px",
                }}
              >
                Họ và tên:
              </LableTypography>
              <ValueTypography
                style={{
                  textTransform: "uppercase",
                }}
              >
                Tạ Thị Hồng Nhung
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "120px",
                }}
              >
                Ngày sinh:
              </LableTypography>
              <ValueTypography>01/01/2000</ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} marginTop={1}>
            <Stack direction={"row"} justifyContent={"end"}>
              <LableTypography>Tuổi:</LableTypography>
              <ValueTypography>24</ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={2} marginTop={1}>
            <Stack direction={"row"} justifyContent={"end"}>
              <LableTypography>Giới tính:</LableTypography>
              <ValueTypography>Nữ</ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "120px",
                }}
              >
                Địa chỉ:
              </LableTypography>
              <ValueTypography>
                123, Đường Điện Biên Phủ, Quận 1, Thành phố Hồ Chí Minh
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "120px",
                }}
              >
                Ngày vào viện:
              </LableTypography>
              <ValueTypography>23/04/2023</ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "100px",
                }}
              >
                Phòng nằm viện:
              </LableTypography>
              <ValueTypography>A203</ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Stack direction={"column"}>
              <LableTypography
                style={{
                  marginBottom: "4px",
                }}
              >
                Chuẩn đoán cuối:
              </LableTypography>
              <TextField fullWidth multiline rows={5} />
            </Stack>
          </Grid>
          <Grid item xs={12} marginTop={1.5}>
            <Stack direction={"column"}>
              <LableTypography
                style={{
                  marginBottom: "4px",
                }}
              >
                Phương pháp điều trị:
              </LableTypography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Nhập phương pháp điều trị"
              />
            </Stack>
          </Grid>

          <Grid item xs={12} marginTop={1.5}>
            <Stack direction={"column"}>
              <LableTypography
                style={{
                  marginBottom: "4px",
                }}
              >
                Ghi chú:
              </LableTypography>
              <TextField
                value={note}
                onChange={handleOnChangeNote}
                onKeyDown={handleKeyDown}
                onFocus={handleOnFocus}
                placeholder="Nhập ghi chú"
                fullWidth
                multiline
                rows={3}
              />
            </Stack>
          </Grid>
        </Box>
        <Grid item xs={12} marginTop={2}>
          <Stack direction={"row"} justifyContent={"end"} spacing={1}>
            <ButtonCustom
              variant="text"
              style={{
                color: "#000092",
              }}
              endIcon={<Print />}
              onClick={handlePrint}
            >
              In
            </ButtonCustom>
            <ButtonCustom
              variant="text"
              style={{
                color: "#1b9200",
              }}
              endIcon={<Save />}
            >
              Lưu
            </ButtonCustom>
          </Stack>
        </Grid>
      </ViewStyle>
    </Box>
  );
}

export default HospitalDischarge;
