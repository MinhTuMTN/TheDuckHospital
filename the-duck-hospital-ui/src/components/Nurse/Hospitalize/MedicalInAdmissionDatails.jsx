import { DeleteOutlineOutlined, DownloadOutlined } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { appColors } from "../../../utils/appColorsUtils";
import PropTypes from "prop-types";
const MedicalAdmissionDatails = styled(Grid)({
  padding: "12px 0px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #a1a1a1",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  marginTop: "16px",
});
const CustomButton = styled(IconButton)({
  padding: "8px",
  ":hover": {
    backgroundColor: "#007bd3",
    color: appColors.white,
    scale: 1.1,
  },
});
function MedicalInAdmissionDatails(props) {
  const { ketQua } = props;
  const [isShow, setIsShow] = React.useState(ketQua === "" ? false : true);

  return (
    <MedicalAdmissionDatails container>
      <Grid
        item
        xs={3}
        md={2}
        sx={{
          borderRight: "1px solid #eaeaea",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          1
        </Typography>
      </Grid>
      <Grid item xs={9} md={10} container>
        <Grid item xs={12} md={9}>
          <Stack direction="column" width={"100%"} paddingX={3}>
            <Stack spacing={0.5} direction="row" alignItems={"center"}>
              <Typography
                style={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                Xét nghiệm máu
              </Typography>
              <Typography
                style={{
                  fontWeight: "normal",
                  fontSize: "9px",
                  letterSpacing: "-0.5px",

                  marginTop: "7px",
                }}
              >
                (12/12/2021 lúc 16:00)
              </Typography>
            </Stack>
            <Typography
              gutterBottom
              style={{
                color: "#8e8e8e",
                fontSize: "13px",
                fontWeight: 450,
              }}
            >
              Chỉ định: Xét nghiệm tiểu đường tuýt 2, huyết áp, đây là nội dung
              rất dài
            </Typography>
            {ketQua === "" ? (
              <Typography
                style={{
                  color: "#2751fa",
                  fontSize: "14px",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                Kết quả: Chờ cập nhật ...
              </Typography>
            ) : (
              <Typography
                style={{
                  color: "#00981c",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Kết quả: {ketQua}
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={3} justifyContent="flex-end" alignItems="center">
          <Stack
            direction="row"
            justifyContent={"end"}
            alignItems={"center"}
            width={"100%"}
            height={"100%"}
            paddingX={3}
          >
            <CustomButton disabled={isShow} size="small">
              <DeleteOutlineOutlined
                sx={{
                  fontSize: "20px",
                }}
              />
            </CustomButton>
            <CustomButton disabled={!isShow} size="small">
              <DownloadOutlined
                sx={{
                  fontSize: "20px",
                }}
              />
            </CustomButton>
          </Stack>
        </Grid>
      </Grid>
    </MedicalAdmissionDatails>
  );
}

MedicalAdmissionDatails.propTypes = {
  ketQua: PropTypes.string,
};

export default MedicalInAdmissionDatails;
