import styled from "@emotion/styled";
import {
  Box,
  Grid,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import DialogForm from "../../../General/DialogForm";
import { getReviews } from "../../../../services/admin/DoctorServices";
import { enqueueSnackbar } from "notistack";
import RatingBar from "./RatingBar";

const CustomText = styled(Typography)(({ theme }) => ({
  fontSize: "14px !important",
}));

function useCustomMediaQuery() {
  const isLargeScreen = useMediaQuery("(min-width: 850px)");
  const isMediumScreen = useMediaQuery("(min-width: 750px)");

  return useMemo(() => {
    if (isLargeScreen) {
      return "100px";
    } else if (isMediumScreen) {
      return "150px";
    } else {
      return "300px";
    }
  }, [isLargeScreen, isMediumScreen]);
}

function TopDoctorItem(props) {
  const { doctor, index } = props;
  const maxWidth = useCustomMediaQuery();
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getReview = useCallback(async () => {
    const response = await getReviews(doctor?.doctorId);
    if (response.success) {
      setReviews(response.data.data);
    } else {
      enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    }
  }, [doctor]);

  const handleReviewClicked = () => {
    if (doctor !== undefined && doctor.doctorId !== undefined) {
      getReview();
      setOpenDialogForm(true);
    }
  };
  return (
    <>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid item xs={12} md={6}>
          <Stack direction="column" spacing={0.5} alignItems={"center"}>
            <Stack direction="column" spacing={0.5} alignItems={"center"}>
              <img
                src={
                  doctor?.avatar !== null
                    ? doctor?.avatar
                    : "https://www.shareicon.net/data/512x512/2016/08/18/813844_people_512x512.png"
                }
                alt="doctor-avatar"
                style={{
                  width: 75,
                  height: 75,
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
              <CustomText
                variant="body1"
                style={{
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {`${doctor.degree}. ${doctor.doctorName} ${
                  doctor.isHeadDoctor ? "(Trưởng khoa)" : ""
                }`}
              </CustomText>
            </Stack>
            <CustomText
              variant="body1"
              style={{
                color: "#667085",
                fontWeight: "400",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: maxWidth,
              }}
            >
              {`${doctor.totalPatients} lượt khám`}
            </CustomText>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={12} md={9}>
              {/* <Stack direction="row" spacing={0.5}> */}
              {/* <CustomText
            variant="body1"
            style={{
              fontWeight: "550",
              color: "#10b981",
            }}
          >
            {doctor.totalPatients}
          </CustomText>
          <CustomText
            style={{
              fontWeight: "400",
              color: "#667085",
            }}
          >
            lượt khám
          </CustomText> */}
              <Rating value={doctor.rating} readOnly />
              <CustomText
                variant="body1"
                style={{
                  fontWeight: "400",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: maxWidth,
                }}
                sx={{
                  color: "#667085",
                  textDecoration: "underline",
                  fontStyle: "italic",
                  ":hover": {
                    color: "#1da1f2",
                    cursor: "pointer",
                  },
                }}
                onClick={handleReviewClicked}
              >
                {`${doctor.totalRatings} lượt đánh giá`}
              </CustomText>
              {/* </Stack> */}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "4px 8px",
                  borderRadius: "12px",
                  border: "1px solid #E0E0E0",
                  backgroundColor: "#E0E0E0",
                  width: "fit-content",
                  textAlign: "center",
                }}
              >
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#101828",
                    width: "fit-content",
                  }}
                >
                  #{index + 1}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DialogForm
        cancelText={"Đóng"}
        onCancel={() => {
          setOpenDialogForm(false);
        }}
        open={openDialogForm}
        title={"Đánh giá của bệnh nhân"}
        onClose={() => {
          setOpenDialogForm(false);
        }}
      >
        <Stack width={"30rem"} mt={3} spacing={1}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Stack justifyContent="center" alignItems="center">
                <Typography
                  style={{
                    fontSize: "68px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {reviews?.ratingPoint}
                </Typography>

                <Rating
                  readOnly
                  defaultValue={reviews?.ratingPoint}
                  size="12px"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#1a90ff",
                    },
                  }}
                />
                <Typography
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    textAlign: "center",
                  }}
                >
                  {`${reviews?.totalRatings} lượt đánh giá`}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Stack spacing={1}>
                {reviews &&
                  reviews?.ratingStatistics &&
                  Object.entries(reviews?.ratingStatistics)
                    ?.sort((a, b) => b[0] - a[0])
                    .map(([ratingPoint, count]) => (
                      <RatingBar
                        title={ratingPoint}
                        count={count}
                        maxCount={reviews?.totalRatings}
                      />
                    ))}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </DialogForm>
    </>
  );
}

export default TopDoctorItem;
