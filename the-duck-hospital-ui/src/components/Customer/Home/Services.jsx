import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

function Services(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const navigate = useNavigate();
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
        <Grid item xs={12} md={4} sx={{ paddingX: "15px" }}>
          <Box
            className="col-md-4"
            sx={{
              padding: "30px",
              width: "100%",
              height: "100%", // Chiều cao của Box là 100%
              ":hover": {
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <img
                height="40px"
                width="43px"
                src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702187406/icon1.png_kmzx5m.webp"
                alt="icon-hospital"
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Dịch vụ khẩn cấp
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                marginTop: "16px",
                textAlign: "justify",
              }}
            >
              Chúng tôi có một đội ngũ y tế chuyên nghiệp luôn sẵn sàng phục vụ
              bạn những lúc khẩn cấp.
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
              Gọi ngay: 1900 1008
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ paddingX: "15px" }}>
          <Box
            className="col-md-4"
            sx={{
              padding: "30px",
              width: "100%",
              height: "100%", // Chiều cao của Box là 100%
              ":hover": {
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <img
                height="40px"
                width="40px"
                src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702187406/icon2.png_gl7ogl.webp"
                alt="icon-hospital"
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Đặt khám trực tuyến
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                marginTop: "16px",
                textAlign: "justify",
              }}
            >
              The Duck Hospital cung cấp dịch vụ đặt khám nhanh chóng, tiết kiệm
              thời gian và an toàn.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                marginTop: "8px",
                textAlign: "justify",
                alignItems: "center",
                ":hover": {
                  color: "#179ecf",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/choose-patient-profiles")}
            >
              Đặt khám ngay{" "}
              <ArrowForwardIosIcon
                sx={{ fontSize: "14px", paddingTop: "4px" }}
              />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ paddingX: "15px" }}>
          <Box
            className="col-md-4"
            sx={{
              padding: "30px",
              width: "100%",
              height: "100%", // Chiều cao của Box là 100%
              ":hover": {
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <img
                height="40px"
                width="40px"
                src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702187406/icon3.png_cvlzau.webp"
                alt="icon-hospital"
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                Hỗ trợ phục vụ 24/7
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                marginTop: "16px",
                textAlign: "justify",
              }}
            >
              Chúng tôi luôn sẵn sàng giúp đỡ bạn bất cứ khi nào bạn cần. Hãy
              liên hệ với chúng tôi ngay nhé.
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
              Liên hệ với chúng tôi
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Services;
