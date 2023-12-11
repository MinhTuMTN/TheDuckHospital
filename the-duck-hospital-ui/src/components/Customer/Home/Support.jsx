import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";

function Support(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <Box
      sx={{
        paddingX: isLgUp ? "160px" : "15px",
        py: isLgUp ? "100px" : "80px",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ paddingX: "15px" }}>
          <Box
            className="col-md-4"
            sx={{
              padding: "30px",
              width: "100%",
              height: "100%", // Chiều cao của Box là 100%
              transition: "transform 0.3s ease-out", // Thêm transition để tạo hiệu ứng mượt mà
              ":hover": {
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                transform: "scale(1.001) translateY(-4px)", // Di chuyển lên trên 10px
              },
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <img
                height="80px"
                width="80px"
                src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702200839/customer-service_1_ithrzl.png"
                alt="icon-hospital"
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Dịch vụ đặt khám
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "8px",
                  textAlign: "justify",
                  ":hover": {
                    color: "#179ecf",
                    cursor: "pointer",
                  },
                }}
              >
                1900 1008
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ paddingX: "15px" }}>
          <Box
            className="col-md-4"
            sx={{
              padding: "30px",
              width: "100%",
              height: "100%", // Chiều cao của Box là 100%
              transition: "transform 0.3s ease-out", // Thêm transition để tạo hiệu ứng mượt mà

              ":hover": {
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                transform: "scale(1.001) translateY(-4px)", // Di chuyển lên trên 10px
              },
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <img
                height="80px"
                width="80px"
                src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702201304/md_5aff6081b74c8-removebg-preview_yeisxb.png"
                alt="icon-hospital"
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Hỗ trợ qua Facebook
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "8px",
                  textAlign: "justify",
                  ":hover": {
                    color: "#179ecf",
                    cursor: "pointer",
                  },
                }}
              >
                Bấm tại đây
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ paddingX: "15px" }}>
          <Box
            className="col-md-4"
            sx={{
              padding: "30px",
              width: "100%",
              height: "100%", // Chiều cao của Box là 100%
              transition: "transform 0.3s ease-out", // Thêm transition để tạo hiệu ứng mượt mà
              ":hover": {
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                transform: "scale(1.001) translateY(-4px)", // Di chuyển lên trên 10px
              },
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <img
                height="80px"
                width="95px"
                src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702201167/logo-zalo-02-removebg-preview_wvnztk.png"
                alt="icon-hospital"
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Hỗ trợ qua Zalo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "8px",
                  textAlign: "justify",
                  ":hover": {
                    color: "#179ecf",
                    cursor: "pointer",
                  },
                }}
              >
                Bấm vào đây
              </Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} sx={{ paddingX: "15px" }}>
          <Box
            className="col-md-4"
            sx={{
              padding: "30px",
              width: "100%",
              height: "100%", // Chiều cao của Box là 100%
              transition: "transform 0.3s ease-out", // Thêm transition để tạo hiệu ứng mượt mà

              ":hover": {
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                transform: "scale(1.001) translateY(-4px)", // Di chuyển lên trên 10px
              },
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <img
                height="80px"
                width="80px"
                src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702201420/1702200726733.089_fsnxlv.png"
                alt="icon-hospital"
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Chat qua Zalo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "8px",
                  textAlign: "justify",
                  ":hover": {
                    color: "#179ecf",
                    cursor: "pointer",
                  },
                }}
              >
                Quét mã trên
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Support;
