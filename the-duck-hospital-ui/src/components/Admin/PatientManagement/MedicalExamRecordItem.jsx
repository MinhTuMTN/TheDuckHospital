import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import BorderTextBox from "./BorderTextBox";
import dayjs from "dayjs";
import FormatCurrency from "../../General/FormatCurrency";

const scheduleSessions = [
  {
    value: "MORNING",
    label: "Buổi sáng"
  },
  {
    value: "AFTERNOON",
    label: "Buổi chiều"
  },
];


const medicineUnit = [
  {
    value: "TUBE",
    label: "Tuýp",
  },
  {
    value: "BOTTLE",
    label: "Chai",
  },
  {
    value: "BOX",
    label: "Hộp",
  },
  {
    value: "BAG",
    label: "Túi",
  },
  {
    value: "CAPSULE",
    label: "Viên",
  },
];

const MuiAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: theme.spacing(1.2),
  marginBottom: theme.spacing(1),
  border: "1.5px solid grey",
  "&.Mui-expanded": {
    border: `2px solid ${theme.palette.template.normal2}`,
    borderRadius: `${theme.spacing(1.5)} ${theme.spacing(1.5)} ${theme.spacing(1.2)} ${theme.spacing(1.2)}`,
  },
}));

const MuiAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: theme.spacing(1.2),
  "&.MuiAccordionSummary-root.Mui-expanded": {
    backgroundColor: theme.palette.template.normal2,
    borderRadius: `${theme.spacing(1.2)} ${theme.spacing(1.2)} 0 0`,
    color: "#fff",
  },
}));

const MuiAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
}));

function MedicalExamRecordItem(props) {
  const { item, panel, expanded, handleChange } = props;
  const theme = createTheme();
  // const [doctorDepartment, setDoctorDepartment] = useState("");

  // useEffect(() => {
  //   const words = item.departmentName.split(" ");
  //   const name = words.slice(1).join(" ");
  //   setDoctorDepartment(name.charAt(0).toUpperCase() + name.slice(1));
  // }, [item]);

  return (
    <MuiAccordion
      expanded={expanded === panel}
      onChange={handleChange(panel)}
      sx={{
        '&:before': {
          display: 'none',
        },
        '&:last-child': {
          borderRadius: theme.spacing(1.2)
        },
        '&:first-of-type': {
          borderRadius: theme.spacing(1.2)
        },
      }}
    >
      <MuiAccordionSummary>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "18px"
              }}
            >
              Bác sĩ: {item.doctor?.fullName}
            </Typography>
            <Stack direction="row">
              <Typography
                style={{
                  fontSize: "16px",
                  textDecoration: "underline"
                }}
              >
                Ngày khám
              </Typography>
              <Stack direction="row" spacing={0.5}>
                <Typography
                  style={{ fontSize: "16px", }}
                >
                  {`: ${scheduleSessions.find(session =>
                    session.value === item.doctorSchedule?.scheduleSession)?.label}`}
                </Typography>
                <Typography
                  style={{ fontSize: "16px", }}
                >
                  {"- Thứ " + item.doctorSchedule?.dayOfWeek + " (" +
                    dayjs(item.doctorSchedule?.date).format("DD/MM/YYYY") + ")"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            {
              item.state === "DONE" ? "Hoàn thành" :
                item.state === "PROCESSING" ? "Đang khám" : "Đang chờ"
            }
          </Typography>
        </Stack>
      </MuiAccordionSummary>
      <MuiAccordionDetails>
        <Stack direction={"column"} spacing={5} sx={{ margin: 2 }}>
          <Stack direction="row" spacing={3.5}>
            <BorderTextBox width="60%" label="Thông tin bác sĩ">
              <Stack direction="row" spacing={2}>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "20%"
                  }}
                >
                  Bác sĩ:
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "80%"
                  }}
                >
                  {item.doctor?.fullName}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "20%"
                  }}
                >
                  Chuyên khoa:
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "80%"
                  }}
                >
                  {item.departmentName}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "20%"
                  }}
                >
                  Số điện thoại:
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "80%"
                  }}
                >
                  {item.doctor?.phoneNumber}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "20%"
                  }}
                >
                  Email:
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "80%"
                  }}
                >
                  {item.doctorEmail}
                </Typography>
              </Stack>
            </BorderTextBox>

            <BorderTextBox width="40%" label="Thông tin khám">
              <Stack direction="row" spacing={2}>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "30%"
                  }}
                >
                  Phòng:
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "70%"
                  }}
                >
                  {item.roomName}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "30%"
                  }}
                >
                  Khoa:
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "70%"
                  }}
                >
                  {item.departmentName}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "30%"
                  }}
                >
                  Triệu chứng:
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "70%"
                  }}
                >
                  {item.symptom ? item.symptom : "Đang cập nhật"}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "30%"
                  }}
                  color="peach.main"
                >
                  Chuẩn đoán:
                </Typography>
                <Typography
                  style={{ fontSize: "16px", width: "70%" }}
                  color="peach.main"
                >
                  {item.diagnosis ? item.diagnosis : "Đang cập nhật"}
                </Typography>
              </Stack>
            </BorderTextBox>
          </Stack>
          {item.prescription !== null && item.prescription.length > 0 &&
            <BorderTextBox label="Toa thuốc">
              <Stack
                direction="row"
                spacing={2}
                style={{
                  borderBottom: "1px solid #dadada"
                }}
              >
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    width: "50%",
                  }}
                >
                  Thuốc
                </Typography>
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    width: "10%",
                    textAlign: "center"
                  }}
                >
                  Số lượng
                </Typography>
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    width: "20%",
                    textAlign: "right"
                  }}
                >
                  Đơn giá
                </Typography>
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "17px",
                    width: "20%",
                    textAlign: "right"
                  }}
                >
                  Tổng tiền
                </Typography>
              </Stack>
              {item.prescription?.map((item, index) => (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    mt: 1
                  }}
                  key={index}
                >
                  <Typography
                    style={{
                      fontSize: "16px",
                      width: "50%"
                    }}
                  >
                    {item.medicine.medicineName}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "16px",
                      width: "10%",
                      textAlign: "center"
                    }}
                  >
                    {`x${item.quantity}` +
                      ` ${medicineUnit.find(unit => unit.value === item.medicine.unit) ?
                        medicineUnit.find(unit => unit.value === item.medicine.unit).label : ""}`}
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "16px",
                      width: "20%",
                      textAlign: "right"
                    }}
                  >
                    <FormatCurrency amount={item.medicine.price} />
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "16px",
                      width: "20%",
                      textAlign: "right"
                    }}
                  >
                    <FormatCurrency amount={item.medicine.price * item.quantity} />
                  </Typography>
                </Stack>))}
              {/* <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 0.5
                }}
              >
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "50%"
                  }}
                >
                  Sensa cools
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "10%",
                    textAlign: "center"
                  }}
                >
                  x12
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "20%",
                    textAlign: "right"
                  }}
                >
                  2.300 VNĐ
                </Typography>
                <Typography
                  style={{
                    fontSize: "16px",
                    width: "20%",
                    textAlign: "right"
                  }}
                >
                  46.000 VNĐ
                </Typography>
              </Stack> */}
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  mt: 1,
                  borderTop: "1px solid #dadada"
                }}
              >
                <Typography
                  color="normal1.main"
                  style={{
                    fontWeight: 800,
                    fontSize: "17px",
                    width: "65%",
                    marginTop: 3,
                  }}
                >
                  Tổng tiền đơn thuốc
                </Typography>
                <Typography
                  color="normal1.main"
                  style={{
                    fontWeight: 800,
                    fontSize: "17px",
                    width: "35%",
                    textAlign: "right",
                    marginTop: 3,
                  }}
                >
                  <FormatCurrency amount={item.price} />
                </Typography>
              </Stack>
            </BorderTextBox>}
        </Stack>
      </MuiAccordionDetails>
    </MuiAccordion>
  );
}

export default MedicalExamRecordItem;
