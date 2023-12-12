import styled from "@emotion/styled";
import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const StyledQueueItemContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  borderBottom: "1px solid #e0e0e0",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "36px",
  fontWeight: "420",
  padding: "10px 0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "50vw",
}));

function QueueNumberItem(props) {
  return (
    <StyledQueueItemContainer container>
      <Grid item xs={2}>
        <StyledTypography
          variant="h6"
          textAlign={"center"}
          color={"template.main"}
          fontSize={"50px !important"}
        >
          999
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledTypography
          variant="body1"
          textAlign={"left"}
          color={"template.teal"}
        >
          Lê Hoàng Hiếu Nghĩa Đệ Nhất Thương Tâm Nhân - Đào Thị Long Lanh Kim
          Ánh Dương
        </StyledTypography>
      </Grid>
    </StyledQueueItemContainer>
  );
}

const FlexCenterGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

function QueueNumberPage(props) {
  const handle = useFullScreenHandle();
  const number = 5;
  return (
    <Grid
      container
      sx={{
        height: "calc(100vh - 64px)",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Typography>Số thứ tự hiện tại: 01</Typography>
          <Button variant="contained" color="primary">
            Tiếp theo
          </Button>
        </Stack>
        <Button onClick={handle.enter}>Toàn màn hình</Button>
      </Grid>
      <Grid item xs={12}>
        <FullScreen handle={handle}>
          <Grid
            container
            width={"100%"}
            sx={{
              backgroundColor: "#f4fbff",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <Grid container item flex={5} flexDirection={"row"}>
              <Grid
                item
                flex={6}
                borderRight={"4px solid #000"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: number === 5 ? "space-between" : "flex-start",
                  alignItems: "center",
                }}
              >
                <QueueNumberItem />
                <QueueNumberItem />
                <QueueNumberItem />
                <QueueNumberItem />
                <QueueNumberItem />
              </Grid>
              <FlexCenterGrid item flexDirection={"column"} flex={4}>
                <Typography variant="h6" fontSize={40}>
                  Số thứ tự hiện tại
                </Typography>
                <Typography color={"template.normal1"} fontSize={150}>
                  150
                </Typography>
              </FlexCenterGrid>
            </Grid>
            <Grid
              item
              flex={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderTop: "4px solid #000",
              }}
            >
              <Typography variant="h6" fontSize={50} color="template.normal2">
                THE DUCK HOSPITAL
              </Typography>
              <Typography variant="h6" fontSize={40} color="template.darker">
                Khoa ngoại
              </Typography>
              <Typography variant="h6" fontSize={40} color="template.darker">
                Phòng khám A1-101
              </Typography>
            </Grid>
          </Grid>
        </FullScreen>
      </Grid>
    </Grid>
  );
}

export default QueueNumberPage;
