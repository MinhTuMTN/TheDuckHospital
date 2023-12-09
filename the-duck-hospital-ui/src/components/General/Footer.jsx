import styled from "@emotion/styled";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

const StyledFooter = styled(Grid)(({ theme }) => ({
  backgroundColor: "#f8fafd",
}));

function Footer(props) {
  return (
    <StyledFooter container alignItems={"center"}>
      <Grid item xs={12} md={2} justifyContent={"center"} display={"flex"}>
        <Stack
          direction="column"
          spacing={0.5}
          width={{
            xs: "50%",
            sm: "30%",
            md: "70%",
          }}
        >
          <img
            src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701430503/THEDUCK__1_-removebg-preview_iag4sd.png"
            alt="img"
            width="100%"
          />
        </Stack>
      </Grid>
      <Grid
        xs={12}
        item
        container
        md={4}
        justifyContent={{
          xs: "center",
          md: "flex-start",
        }}
      >
        <Stack
          direction="column"
          spacing={0.5}
          alignItems={{
            xs: "center",
            md: "flex-start",
          }}
          display={"flex"}
        >
          <Typography
            variant="body1"
            color={"template.normal1"}
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
            }}
          >
            The Duck Hospital
          </Typography>
          <Typography variant="body2">
            Địa chỉ: 1 Võ Văn Ngân, Linh Chiểu, Tp.Thủ Đức, TP.HCM
          </Typography>
          <Typography variant="body2">
            Website: https://the-duck-hospital.web.app
          </Typography>
          <Typography variant="body2">
            Email: admin@theduckhospital.onmicrosoft.com
          </Typography>
          <Typography variant="body2">Điện thoại: 0987.654.321</Typography>
        </Stack>
      </Grid>

      <Grid
        item
        container
        md={2}
        display={{
          xs: "none",
          md: "flex",
        }}
        justifyContent={"center"}
      >
        <Stack direction="column" spacing={0.5}>
          <Typography variant="body2">Về chúng tôi</Typography>
          <Typography variant="body2">Giới thiệu</Typography>
          <Typography variant="body2">Tuyển dụng</Typography>
          <Typography variant="body2">Điều khoản sử dụng</Typography>
          <Typography variant="body2">Chính sách bảo mật</Typography>
        </Stack>
      </Grid>

      <Grid
        item
        container
        md={4}
        xs={12}
        marginTop={{
          xs: "1rem",
          md: "0",
        }}
        justifyContent={"center"}
      >
        <Stack
          width={{
            xs: "100%",
            md: "90%",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.485398611095!2d106.7693381748191!3d10.850637657820975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2sHCMC%20University%20of%20Technology%20and%20Education!5e0!3m2!1sen!2s!4v1702060117817!5m2!1sen!2s"
            width="100%"
            style={{
              border: "none",
            }}
            height="100%"
            title="Map"
            loading="lazy"
          ></iframe>
        </Stack>
      </Grid>

      <Grid
        item
        xs={12}
        marginTop={{
          xs: "1rem",
          md: "0",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            backgroundColor: "template.normal1",
            fontWeight: "bold",
            width: "100%",
            padding: "1rem 0",
            color: "#fff",
          }}
        >
          © 2023 The Duck Hospital. All rights reserved.
        </Typography>
      </Grid>
    </StyledFooter>
  );
}

export default Footer;
