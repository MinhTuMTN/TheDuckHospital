import styled from "@emotion/styled";
import { ClearOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Container = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2rem 0",
}));

function PaymentFailedPage(props) {
  return (
    <Container>
      <Grid
        container
        spacing={1}
        component={Paper}
        width={{
          xs: "90%",
          sm: "80%",
          md: "50%",
        }}
        marginLeft={0}
        p={{
          xs: 1,
          sm: 2,
          md: 5,
        }}
      >
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <Typography
            component={"span"}
            sx={{
              backgroundColor: "#e03636",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              height: "4rem",
              width: "4rem",
            }}
          >
            <ClearOutlined sx={{ fontSize: 50 }} />
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <Typography
            color={"delete.main"}
            fontSize={{
              xs: 20,
              md: 24,
            }}
            fontWeight={"bold"}
          >
            Thanh toán không thành công !
          </Typography>
        </Grid>

        <Grid item xs={12} textAlign={"center"}>
          <Typography
            color={"template.darker"}
            fontSize={16}
            fontWeight={500}
            textAlign={"center"}
          >
            Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.
            Liên hệ với chúng tôi qua số điện thoại 1900 1000 để được hỗ trợ.
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          mt={{
            xs: 2,
            md: 3,
          }}
          justifyContent={"center"}
          mb={1}
        >
          <Button
            color="normal1"
            variant="contained"
            sx={{ color: "#fff", fontWeight: 600 }}
          >
            Quay lại trang chủ
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentFailedPage;
