import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingItem from "../../components/Customer/BookingItemPage/BookingItem";
import CustomLink from "../../components/General/CustomLink";
import { getBookingById } from "../../services/customer/BookingServices";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DialogForm from "../../components/General/DialogForm";
import MuiTextFeild from "../../components/General/MuiTextFeild";
import FormatDate from "../../components/General/FormatDate";
import { addRating } from "../../services/admin/RatingServices";
import dayjs from "dayjs";

const labelRatings = {
  1: "Rất tệ",
  2: "Tệ",
  3: "Bình thường",
  4: "Tốt",
  5: "Rất tốt",
};

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
  const [rated, setRated] = React.useState(false);
  const [openRatingModal, setOpenRatingModal] = React.useState(false);
  const [ratingButtonClicked, setRatingButtonClicked] = React.useState(false);
  const [rating, setRating] = React.useState({ ratingPoint: 1, review: "" });
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
  }, [medicalBillId, rated]);

  const handleAddRating = async () => {
    if (rating?.review.trim() === "" || rating?.ratingPoint === 0) {
      enqueueSnackbar("Vui lòng đánh giá bác sĩ này", {
        variant: "error",
      });
      return;
    }
    const data = {
      rating: rating.ratingPoint,
      review: rating.review,
      bookingId: medicalBill.bookingId,
      patientCode: medicalBill.patientCode,
    };
    const response = await addRating(data);

    if (response.success) {
      enqueueSnackbar("Đánh giá thành công!", {
        variant: "success",
      });
      setOpenRatingModal(false);
      setRated(!rated);
    } else {
      enqueueSnackbar("Đánh giá thất bại!", {
        variant: "error",
      });
    }
  };

  const breakcrumbs = [
    <CustomLink to={"/"} key={1}>
      <CustomTextBreakcrumb>Trang chủ</CustomTextBreakcrumb>
    </CustomLink>,
    <CustomTextBreakcrumb key={2}>
      Thông tin phiếu khám bệnh
    </CustomTextBreakcrumb>,
  ];
  return (
    <>
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
        {medicalBill?.status && (
          <Stack alignItems={"center"}>
            <Box
              style={{
                backgroundColor: "#b4dbec",
                padding: "15px",
                width: "60%",
                borderRadius: "10px",
              }}
            >
              <Grid container alignItems={"center"}>
                <Grid item xs={12} md={10}>
                  <Typography variant="h6" fontWeight={"600"}>
                    Phiên khám đã hoàn tất
                  </Typography>
                  <Typography>
                    Để nâng cao chất lượng dịch vụ, bạn vui lòng thực hiện đánh
                    giá phiên khám bệnh này trong{" "}
                    <span style={{ fontWeight: "600", fontStyle: "italic" }}>
                      7 ngày
                    </span>{" "}
                    kể từ ngày khám.
                  </Typography>
                  <Typography fontStyle={"italic"}>
                    TheDuckHospital xin chân thành cảm ơn.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <ThumbUpOutlinedIcon
                    style={{ fontSize: "88px", color: "#606372" }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="contained"
              disabled={
                !dayjs().isBefore(dayjs(medicalBill?.date).add(7, "day")) &&
                !medicalBill?.rating?.rated
              }
              sx={{
                color: "white",
                backgroundColor: "#2E6AE1",
                fontSize: "14px",
                textTransform: "none",
                justifyContent: "center",
                marginTop: "10px",
                width: "30%",
                ":hover": {
                  backgroundColor: "#6b93dc",
                },
              }}
              onClick={() => {
                setOpenRatingModal(true);
              }}
            >
              <Typography
                sx={{
                  marginRight: "10px",
                }}
              >
                {medicalBill?.rating?.rated
                  ? `Xem lại đánh giá`
                  : !dayjs().isBefore(dayjs(medicalBill?.date).add(7, "day"))
                  ? `Đã hết hạn để đánh giá`
                  : `Đánh giá phiên khám`}
              </Typography>
            </Button>
          </Stack>
        )}
        <BookingItem medicalBill={medicalBill} />
      </Box>
      <DialogForm
        cancelText={medicalBill?.rating?.rated ? "Đóng" : "Hủy"}
        okText={medicalBill?.rating?.rated ? "" : "Đánh giá"}
        onCancel={() => {
          setOpenRatingModal(false);
          setRating({
            ratingPoint: 0,
            review: "",
          });
          setRatingButtonClicked(false);
        }}
        onOk={handleAddRating}
        open={openRatingModal}
        title={"Đánh giá phiên khám"}
        onClose={() => {
          setOpenRatingModal(false);
          setRating({
            ratingPoint: 0,
            review: "",
          });
          setRatingButtonClicked(false);
        }}
      >
        <Stack width={"30rem"} mt={3} spacing={4}>
          <Stack
            direction={"row"}
            spacing={2}
            style={{ borderBottom: "1px solid", paddingBottom: "10px" }}
          >
            <img
              src={
                medicalBill?.doctorAvatar
                  ? medicalBill.doctorAvatar
                  : "https://www.shareicon.net/data/512x512/2016/08/18/813844_people_512x512.png"
              }
              alt="doctor-avatar"
              style={{
                width: 100,
                height: 100,
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
            <Stack>
              <Typography
                fontSize={"20px"}
                fontWeight={"600"}
              >{`${medicalBill?.doctorDegree}. ${medicalBill?.doctorName}`}</Typography>
              <Grid container>
                <Grid item xs={12} md={8}>
                  <Typography>Chuyên khoa:</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography style={{ fontWeight: "600" }}>
                    {medicalBill?.departmentName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={8}>
                  <Typography>Ngày khám: </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography style={{ fontWeight: "600" }}>
                    <FormatDate dateTime={medicalBill?.date} />
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Stack>

          <Grid container alignItems={"center"}>
            <Grid item xs={12} md={5}>
              <Typography style={{ wordWrap: "break-word", fontSize: "18px" }}>
                Chất lượng phiên khám
              </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  value={
                    medicalBill?.rating?.rated
                      ? medicalBill?.rating?.rating
                      : rating?.ratingPoint
                  }
                  readOnly={medicalBill?.rating?.rated}
                  precision={1}
                  size="large"
                  onChange={(e, newValue) => {
                    setRating((prev) => ({
                      ...prev,
                      ratingPoint: newValue,
                    }));
                  }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography fontSize={"20px"} fontWeight={"600"}>
                    {
                      labelRatings[
                        medicalBill?.rating?.rated
                          ? medicalBill?.rating?.rating
                          : rating?.ratingPoint
                      ]
                    }
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <MuiTextFeild
            label="Đánh giá"
            placeholder={"Hãy chia sẻ nhận xét về bác sĩ này bạn nhé!"}
            value={
              medicalBill?.rating?.rated
                ? medicalBill?.rating?.review
                : rating?.review
            }
            disabled={medicalBill?.rating?.rated}
            autoComplete="off"
            multiline
            rows={3}
            onChange={(e) => {
              setRating((prev) => ({
                ...prev,
                review: e.target.value,
              }));
            }}
            required
            error={rating?.review?.trim() === "" && ratingButtonClicked}
            helperText={
              rating?.review?.trim() === "" &&
              ratingButtonClicked &&
              "Vui lòng nhập đánh giá của bạn"
            }
          />
        </Stack>
      </DialogForm>
    </>
  );
}

export default BookingItemPage;
