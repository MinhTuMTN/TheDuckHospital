import { Language, Phone, Print } from "@mui/icons-material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import FormatCurrency from "../../General/FormatCurrency";
import { getDischargeInvoice } from "../../../services/nurse/HospitalizeServices";
import { HospitalizationContext } from "../../../pages/Nurse/Hospitalization/HospitalizationDetails";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
import { getAge } from "../../../utils/getAgeUtils";
import { getGender } from "../../../utils/genderUtils";

const ViewStyle = styled(Grid)(({ theme }) => ({
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
  fontSize: "13px",
  fontWeight: 500,
  color: "#303e67",
}));

const LableTypography = styled(Typography)(({ theme }) => ({
  marginRight: "4px",
  display: "flex",
  fontSize: "13px",
  fontWeight: 700,
  color: "#303e67",
}));

const TypographyCustom = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  color: "#1C252E",
}));

const cellStyle = {
  padding: "12px 16px",
};

const headCellStyle = {
  ...cellStyle,
  backgroundColor: "#f4f6f8",
};

const contacts = [
  {
    icon: (
      <Language
        style={{
          color: "#8997bd",
          fontSize: "20px",
        }}
      />
    ),
    width: "170px",
    value: [
      { name: "theduckhospitalgmailcom" },
      { name: "the-duck-hospital.web.app" },
    ],
  },
  {
    icon: (
      <Phone
        style={{
          color: "#8997bd",
          fontSize: "20px",
        }}
      />
    ),
    width: "130px",
    value: [{ name: "(+84) 123 456 789" }, { name: "(+84) 246 813 579" }],
  },

  {
    icon: (
      <PinDropIcon
        style={{
          color: "#8997bd",
          fontSize: "20px",
        }}
      />
    ),
    width: "220px",
    value: [
      { name: "1, Võ Văn Ngân, phường Linh Chiểu, tp Thủ Đức, tp Hồ Chí Minh" },
    ],
  },
];

function AdmissionReceipt() {
  const [invoice, setInvoice] = useState({});
  const { generalInfo } = useContext(HospitalizationContext);
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: `${invoice?.paymentCode} - Biên lai viện phí - ${generalInfo?.patientName}`,
  });

  useEffect(() => {
    const handleGetInvoice = async () => {
      const response = await getDischargeInvoice(
        generalInfo?.hospitalAdmissionId
      );
      if (response.success) setInvoice(response.data.data);
      else
        enqueueSnackbar("Không thể lấy thông tin biên lai viện phí", {
          variant: "error",
        });
    };

    console.log(generalInfo?.hospitalAdmissionId);
    if (generalInfo?.hospitalAdmissionId) {
      handleGetInvoice();
    }
  }, [generalInfo?.hospitalAdmissionId]);
  return (
    <Box>
      <ViewStyle container>
        <Box
          sx={{
            padding: "24px 20px",
          }}
          item
          xs={12}
          container
          component={Grid}
          ref={ref}
        >
          <Grid
            item
            xs={12}
            container
            style={{
              paddingBottom: "8px",
              borderBottom: "1px solid #b6c2e4",
            }}
          >
            <Grid
              item
              xs={4}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"start"}
            >
              <CardMedia
                src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701511186/Medical-removebg-preview_v5hwdt.png"
                alt="logo"
                component="img"
                sx={{ width: "150px", objectFit: "contain", margin: "auto 0" }}
              />
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Stack direction={"row"} spacing={1}>
                {contacts.map((contact, index) => (
                  <Stack
                    style={{
                      borderLeft: "2px solid #b6c2e4",
                      height: "60px",
                      paddingLeft: "12px",
                      width: contact.width,
                      alignItems: "end",
                    }}
                    direction={"column"}
                  >
                    {contact.icon}
                    {contact.value.map((item, index) => (
                      <Typography
                        variant="subtitle1"
                        fontSize={"13px"}
                        style={{ color: "#8997bd" }}
                        textAlign={"end"}
                      >
                        {item.name}
                      </Typography>
                    ))}
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            justifyContent={"center"}
            style={{
              marginTop: "2px",
              paddingTop: "12px",
              borderTop: "1px solid #b6c2e4",
            }}
          >
            <Typography
              variant="subtitle1"
              textTransform={"capitalize"}
              fontWeight={600}
              letterSpacing={0.5}
              fontSize={"24px"}
              textAlign={"center"}
              color={"#565e74"}
            >
              Biên lai viện phí
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "100px",
                }}
              >
                Họ và tên:
              </LableTypography>
              <ValueTypography
                style={{
                  textTransform: "uppercase",
                }}
              >
                {generalInfo?.patientName}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "100px",
                }}
              >
                Ngày sinh:
              </LableTypography>
              <ValueTypography>
                {dayjs(generalInfo?.patientBirthDate).format("DD/MM/YYYY")}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} marginTop={1}>
            <Stack direction={"row"} justifyContent={"end"}>
              <LableTypography>Tuổi:</LableTypography>
              <ValueTypography>
                {getAge(generalInfo?.patientBirthDate)}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3} marginTop={1}>
            <Stack direction={"row"} justifyContent={"end"}>
              <LableTypography>Giới tính:</LableTypography>
              <ValueTypography>
                {getGender(generalInfo?.patientGender)}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "100px",
                }}
              >
                Địa chỉ:
              </LableTypography>
              <ValueTypography>
                {`${generalInfo?.streetName}, ${generalInfo?.wardName}, ${generalInfo?.districtName}, ${generalInfo?.provinceName}`}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} marginTop={1}>
            <Stack direction={"row"}>
              <LableTypography
                style={{
                  minWidth: "100px",
                }}
              >
                Ngày vào viện:
              </LableTypography>
              <ValueTypography>
                {dayjs(generalInfo?.admissionDate).format("DD/MM/YYYY")}
              </ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} marginTop={1}>
            <Stack direction={"row"} justifyContent={"end"}>
              <LableTypography
                style={{
                  minWidth: "80px",
                }}
              >
                Chuyên khoa:
              </LableTypography>
              <ValueTypography>{generalInfo?.departmentName}</ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3} marginTop={1}>
            <Stack direction={"row"} justifyContent={"end"}>
              <LableTypography
                style={{
                  minWidth: "100px",
                }}
              >
                Phòng nằm viện:
              </LableTypography>
              <ValueTypography>{generalInfo?.roomName}</ValueTypography>
            </Stack>
          </Grid>
          <Grid item xs={12} marginTop={3}>
            <TableContainer component={Box}>
              <Table sx={{ minWidth: 650 }} padding="none">
                <TableHead style={headCellStyle}>
                  <TableRow>
                    {[
                      "#",
                      "Chi tiết dịch vụ",
                      "Số lượng",
                      "Đơn giá",
                      "Thành tiền",
                    ].map((text, index) => (
                      <TableCell
                        key={`header-${index}`}
                        align={
                          index === 0 ? "center" : index > 1 ? "right" : "left"
                        }
                        style={{
                          ...cellStyle,
                          width:
                            index === 0
                              ? 40
                              : index === 1
                              ? 500
                              : index === 2
                              ? "100px"
                              : "110px",
                          color: "#637381",
                          fontSize: "14px",
                        }}
                      >
                        {text}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {invoice?.details?.map((service, index) => {
                    return (
                      <TableRow
                        key={`details-${index}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="left"
                          style={cellStyle}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell align="left" style={{ ...cellStyle }}>
                          {service.serviceName}
                        </TableCell>

                        <TableCell align="right" style={cellStyle}>
                          {service.quantity}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ ...cellStyle, color: "#1C252E" }}
                        >
                          <FormatCurrency
                            amount={service.unitPrice}
                            showCurrencySymbol={false}
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ ...cellStyle, color: "#1C252E" }}
                        >
                          <FormatCurrency
                            amount={service.total}
                            showCurrencySymbol={false}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      style={{
                        ...cellStyle,
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#000000",
                      }}
                    >
                      Tạm tính
                    </TableCell>
                    <TableCell
                      style={{
                        ...cellStyle,
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#000000",
                      }}
                    >
                      <FormatCurrency
                        amount={invoice?.provisionalFee}
                        showCurrencySymbol={false}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      style={{
                        ...cellStyle,
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#000000",
                      }}
                    >
                      Tiền tạm ứng
                    </TableCell>
                    <TableCell
                      style={{
                        ...cellStyle,
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#ff5630",
                      }}
                    >
                      -{" "}
                      <FormatCurrency
                        amount={invoice?.advanceFee}
                        showCurrencySymbol={false}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ backgroundColor: "#000000" }}>
                    <TableCell
                      colSpan={4}
                      style={{
                        ...cellStyle,
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      Thanh toán
                    </TableCell>
                    <TableCell
                      style={{
                        ...cellStyle,
                        textAlign: "right",
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      <FormatCurrency
                        amount={invoice?.totalFee}
                        showCurrencySymbol={false}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            xs={12}
            style={{
              marginTop: "16px",
              padding: "16px 8px 12px 8px",
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack direction={"column"} textAlign={"left"} flex={2}>
                <TypographyCustom
                  textTransform={"uppercase"}
                  fontWeight={600}
                  fontSize={"14px !important"}
                >
                  Thanh toán:
                </TypographyCustom>
                <TypographyCustom>
                  - Thanh toán để lấy phiếu xuất viện.
                </TypographyCustom>
                <TypographyCustom>
                  - Đem biên lai viện phí và giấy tạm ứng đến quầy thu ngân để
                  thực hiện thanh toán.
                </TypographyCustom>
                <TypographyCustom
                  fontWeight={600}
                  fontSize={"14px !important"}
                  marginTop={1}
                >
                  Mọi thắc mắc liên hệ:
                </TypographyCustom>
                <TypographyCustom>- Điều dưỡng tại phòng khám</TypographyCustom>
                <TypographyCustom>- theduckhotro@gmail.com</TypographyCustom>
              </Stack>
              <Stack
                direction={"column"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontSize={12}
                  fontWeight={500}
                  textAlign={"center"}
                  style={{
                    marginBottom: "4px",
                  }}
                >
                  Mã QR thanh toán
                </Typography>
                <QRCode value={invoice?.paymentCode || "ABC123"} size={64} />
                <Typography fontSize={12} fontWeight={500}>
                  {invoice?.paymentCode}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginTop: "24px",
              padding: "12px",
              borderTop: "1px solid #e9ecee",
              textAlign: "center",
            }}
          >
            <Typography fontSize={"12px"}>
              Cảm ơn bạn đã sử dụng dịch vụ của The Duck Hospital
            </Typography>
          </Grid>
        </Box>

        <Grid
          item
          xs={12}
          marginTop={2}
          padding={"8px 12px"}
          justifyContent={"flex-end"}
        >
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
        </Grid>
      </ViewStyle>
    </Box>
  );
}

export default AdmissionReceipt;
