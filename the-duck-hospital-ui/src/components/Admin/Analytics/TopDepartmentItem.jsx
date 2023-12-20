import styled from "@emotion/styled";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useMemo } from "react";

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
function TopDepartmentItem(props) {
  const { department, index } = props;
  const maxWidth = useCustomMediaQuery();

  return (
    <Grid container spacing={0.5} alignItems={"center"}>
      <Grid item xs={7} container>
        <Stack direction="column" spacing={0.5}>
          <CustomText
            variant="body1"
            style={{
              fontWeight: "500",
            }}
          >
            {department.departmentName}
          </CustomText>
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
            {department.headDoctorName
              ? department.headDoctorName
              : "Chưa cập nhật"}
          </CustomText>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack direction="row" spacing={0.5}>
          <CustomText
            variant="body1"
            style={{
              fontWeight: "550",
              color: "#10b981",
            }}
          >
            {department.totalPatients}
          </CustomText>
          <CustomText
            style={{
              fontWeight: "400",
              color: "#667085",
            }}
          >
            bệnh nhân
          </CustomText>
        </Stack>
      </Grid>
      <Grid
        item
        xs={1}
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
  );
}

export default TopDepartmentItem;
