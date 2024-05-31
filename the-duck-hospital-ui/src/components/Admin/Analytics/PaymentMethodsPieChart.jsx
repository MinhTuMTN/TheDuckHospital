import styled from "@emotion/styled";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import React from "react";

const paperStyle = {
  marginTop: 2,
  borderRadius: "8px",
};

const BoxStyle = styled(Box)(({ theme }) => ({
  paddingLeft: "24px !important",
  paddingRight: "24px !important",
  paddingTop: "14px !important",
  paddingBottom: "14px !important",
}));

const BoxStyle2 = styled(Box)(({ theme }) => ({
  paddingLeft: "12px !important",
  paddingRight: "12px !important",
  paddingTop: "12px !important",
  paddingBottom: "8px !important",
  width: "100%",
}));

const TieuDe = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem !important",
  color: "  #101828",
  variant: "subtitle1",
  fontWeight: "700 !important",
  width: "100%",
}));

function PaymentMethodsPieChart(props) {
  const { pieChartData } = props;

  const TOTAL = pieChartData?.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Stack component={Paper} sx={paperStyle}>
      <BoxStyle
        component={Stack}
        direction={"row"}
        alignItems={"center"}
        spacing={0.7}
        sx={{
          borderBottom: "0.1rem solid #E0E0E0",
        }}
      >
        <img
          src={
            "https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701048808/pie-chart_y1a57k.png"
          }
          alt="top-product"
          style={{
            width: "30px",
            height: "30px",
            objectFit: "contain",
          }}
        />
        <TieuDe>Phương thức thanh toán</TieuDe>
      </BoxStyle>
      <BoxStyle2 className="Hello">
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          {pieChartData &&
            <PieChart
              colors={["#00bbff", "#00ff80", "#ff00a6"]}
              series={[
                {
                  data: pieChartData,
                  innerRadius: 50,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: { additionalRadius: -30, color: "gray" },
                  arcLabel: getArcLabel,
                },
              ]}
              width={500}
              height={250}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontSize: 20,
                  fontWeight: 600,
                },
              }}
            />}
        </Stack>
      </BoxStyle2>
    </Stack>
  );
}

export default PaymentMethodsPieChart;
