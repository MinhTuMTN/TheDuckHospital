import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingItem from "../../components/Customer/BookingItemPage/BookingItem";
import CustomLink from "../../components/General/CustomLink";
import { getBookingById } from "../../services/customer/BookingServices";

const CustomTextBreakcrumb = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.oldPrimaryDarker.main,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 15px",
  toUpperCase: "none",
  fontSize: "14px !important",
  textTransform: "none",
}));

function BookingItemPage(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const { medicalBillId } = useParams();
  const [medicalBill, setMedicalBill] = React.useState({});
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();
  React.useEffect(() => {
    const handleGetMedicalBill = async () => {
      const response = await getBookingById(medicalBillId);
      if (response.success) setMedicalBill(response.data.data);
      else
        enqueueSnackbar("Lỗi lấy dữ liệu phiếu khám bệnh", {
          variant: "error",
        });
    };
    handleGetMedicalBill();
  }, [medicalBillId]);

  const breakcrumbs = [
    <CustomLink to={"/"} key={1}>
      <CustomTextBreakcrumb>Trang chủ</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomTextBreakcrumb key={2}>
      Thông tin phiếu khám bệnh
    </CustomTextBreakcrumb>,
  ];
  return (
    <Box
      sx={{
        paddingX: isLgUp ? 22 : 2,
        py: 4,
        backgroundColor: "#E8F2F7",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breakcrumbs}
      </Breadcrumbs>

      <Grid
        item
        container
        xs={12}
        style={{
          paddingRight: isMdUp ? "20px" : "0",
          textAlign: "left",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Grid item xs={6}>
          <CustomButton
            variant="text"
            sx={{
              "&:hover": {
                backgroundColor: "	#ffffff",
              },
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon
              sx={{
                marginRight: "5px",
              }}
            />
            Quay lại
          </CustomButton>
        </Grid>
      </Grid>

      <BookingItem medicalBill={medicalBill} />
    </Box>
  );
}

export default BookingItemPage;
