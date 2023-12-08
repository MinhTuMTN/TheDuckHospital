import styled from "@emotion/styled";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const Header = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, #5ab2f7, #12cff3)`,
  color: "white",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  paddingLeft: "30px",
  paddingRight: "30px",
  paddingTop: "8px",
  paddingBottom: "8px",
}));

const Body = styled(Grid)(({ theme }) => ({
  paddingLeft: "25px",
  paddingRight: "25px",
  paddingTop: "10px",
  paddingBottom: "20px",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  borderBottomLeftRadius: "8px !important",
  borderBottomRightRadius: "8px !important",
  width: "100%",
  rowGap: "0.5rem",
  [theme.breakpoints.down("md")]: {
    padding: "10px 16px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 14px",
  },
}));

const CustomTypographyValue = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  color: theme.palette.text.main,
}));

const CustomGrid = styled(Grid)(({ theme }) => ({
  textAlign: "left",
}));

function ConfirmBookingTable(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <Paper
      elevation={3}
      sx={{
        width: {
          xs: "100%",
          md: "85%",
        },
      }}
    >
      <Stack direction={"column"} sx={{ width: "100%", borderRadius: "8px" }}>
        <Header>
          <Typography
            variant="h6"
            color={"#fff"}
            style={{
              fontSize: isLgUp ? "20px" : "18px",
              fontWeight: "500",
            }}
          >
            Xác nhận thông tin đặt khám
          </Typography>
        </Header>
        {isLgUp ? (
          <>
            <Body container>
              <Grid
                xs={12}
                item
                container
                spacing={1}
                sx={{ borderBottom: "1px solid #000", paddingBottom: "8px" }}
              >
                <CustomGrid item xs={4}>
                  <CustomTypographyValue>Chuyên khoa</CustomTypographyValue>
                </CustomGrid>
                <CustomGrid item xs={3}>
                  <CustomTypographyValue>Bác sĩ</CustomTypographyValue>
                </CustomGrid>
                <CustomGrid item xs={2.5}>
                  <CustomTypographyValue>Thời gian khám</CustomTypographyValue>
                </CustomGrid>
                <CustomGrid item xs={1.75}>
                  <CustomTypographyValue>Tiền khám</CustomTypographyValue>
                </CustomGrid>
                <Grid item xs={0.75}>
                  <CustomTypographyValue
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  ></CustomTypographyValue>
                </Grid>
              </Grid>
              <Grid xs={12} item container spacing={1}>
                <CustomGrid item xs={4}>
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      color: "#003553",
                    }}
                  >
                    Khoa sản - Chuẩn đoán trước sinh
                  </Typography>
                </CustomGrid>
                <CustomGrid item xs={3}>
                  <Typography
                    sx={{
                      color: "#003553",
                    }}
                  >
                    Nguyễn Ngọc Tuyết Vi
                  </Typography>
                </CustomGrid>
                <CustomGrid
                  item
                  xs={2.5}
                  sx={{
                    color: "#003553",
                  }}
                >
                  <Typography>
                    Buổi sáng <br /> 11/12/2023
                  </Typography>
                </CustomGrid>
                <CustomGrid item xs={1.75}>
                  <Typography>150.000đ</Typography>
                </CustomGrid>
                <Grid item xs={0.75} p={0}>
                  <IconButton
                    sx={{
                      fontSize: "20px",
                      ":hover": {
                        backgroundColor: "#ec7e7e",
                        color: "#fff",
                      },
                    }}
                  >
                    <DeleteOutlinedIcon
                      style={{
                        fonsSize: "10px",
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Body>
          </>
        ) : (
          <>
            <Body container spacing={0.7}>
              <CustomGrid item md={2} xs={5} sm={3}>
                <Typography
                  sx={{
                    color: "#003553",
                  }}
                >
                  Chuyên khoa:
                </Typography>
              </CustomGrid>
              <CustomGrid item md={10} xs={7} sm={9}>
                <CustomTypographyValue>
                  XƯƠNG KHỚP CHỈNH HÌNH
                </CustomTypographyValue>
              </CustomGrid>
              <CustomGrid item md={2} xs={5} sm={3}>
                <Typography
                  sx={{
                    color: "#003553",
                  }}
                >
                  Bác sĩ:
                </Typography>
              </CustomGrid>
              <CustomGrid item md={10} xs={7} sm={9}>
                <CustomTypographyValue>
                  Nguyễn Ngọc Tuyết Vi
                </CustomTypographyValue>
              </CustomGrid>
              <CustomGrid item md={2} xs={5} sm={3}>
                <Typography
                  sx={{
                    color: "#003553",
                  }}
                >
                  Thời gian khám:
                </Typography>
              </CustomGrid>
              <CustomGrid item md={10} xs={7} sm={9}>
                <CustomTypographyValue>
                  Buổi sáng 11/12/2023
                </CustomTypographyValue>
              </CustomGrid>
              <CustomGrid item md={2} xs={5} sm={3}>
                <Typography
                  sx={{
                    color: "#003553",
                  }}
                >
                  Tiền khám:
                </Typography>
              </CustomGrid>
              <CustomGrid item md={10} xs={7} sm={9}>
                <CustomTypographyValue>150.000 đ</CustomTypographyValue>
              </CustomGrid>
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: "right",
                  borderBottomLeftRadius: "8px !important",
                  borderBottomRightRadius: "8px !important",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "#fde4e4",
                    borderRadius: "8px",
                    color: "#fc5064",
                    textTransform: "none",
                    alignItems: "center",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "#fddfdf",
                    },
                  }}
                >
                  <DeleteOutlinedIcon
                    style={{
                      fontSize: "14px !important",
                      marginRight: "5px",
                      color: "#fc5064",
                    }}
                  />
                  Xoá
                </Button>
              </Grid>
            </Body>
          </>
        )}
      </Stack>
    </Paper>
  );
}

export default ConfirmBookingTable;
