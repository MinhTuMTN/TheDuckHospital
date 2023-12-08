import styled from "@emotion/styled";
import { CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

const StyledFooter = styled(Grid)(({ theme }) => ({
  backgroundColor: "#f8fafd",
}));

function Footer(props) {
  return (
    <StyledFooter container>
      <Grid item md={2}>
        <CardMedia
          src="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701430503/THEDUCK__1_-removebg-preview_iag4sd.png"
          component="img"
          sx={{ width: "100%", height: "100%" }}
        />
      </Grid>
      <Grid item container md={3.5} spacing={0}>
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
      </Grid>
    </StyledFooter>
  );
}

export default Footer;
