import styled from "@emotion/styled";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Typography } from "@mui/material";
import React from "react";

const RatingBarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "1px",
}));

const BarOuter = styled("div")(({ theme }) => ({
  backgroundColor: "#ddd",
  width: "250px",
  height: "10px",
  margin: "0 10px",
  borderRadius: "5px",
  overflow: "hidden",
}));

const BarInner = styled("div")(({ width }) => ({
  backgroundColor: "#1a90ff",
  height: "100%",
  borderRadius: "5px",
  width: `${width}%`,
}));

const CustomText = styled(Typography)(({ theme }) => ({
  variant: "h6",
  fontSize: "14px",
  fontWeight: "400",
}));

function RatingBar(props) {
  const { title, count, maxCount } = props;
  const widthPercent = (count / maxCount) * 100;
  console.log(widthPercent);

  return (
    <RatingBarContainer>
      <CustomText>{title}</CustomText>
      <StarRoundedIcon style={{ color: "#1a90ff", fontSize: "20px" }} />
      <BarOuter>
        <BarInner width={widthPercent} />
      </BarOuter>
      <CustomText>{count}</CustomText>
    </RatingBarContainer>
  );
}

export default RatingBar;
