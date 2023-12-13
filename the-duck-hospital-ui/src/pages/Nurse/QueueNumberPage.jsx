import styled from "@emotion/styled";
import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { NurseContext } from "../../auth/NurseProvider";
import {
  getQueueNumber,
  increaseQueueNumber,
} from "../../services/nurse/QueueNumberServices";
import { enqueueSnackbar } from "notistack";

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
  const { item } = props;
  return (
    <StyledQueueItemContainer container>
      <Grid item xs={2}>
        <StyledTypography
          variant="h6"
          textAlign={"center"}
          color={"template.main"}
          fontSize={"50px !important"}
        >
          {(item?.queueNumber < 10 ? "0" : "") + item?.queueNumber}
        </StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledTypography
          variant="body1"
          textAlign={"left"}
          color={"template.teal"}
        >
          {item?.fullName}
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
  const [data, setData] = useState([]);
  const { doctorScheduleId } = useContext(NurseContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleIncreseNumber = async () => {
    setIsLoading(true);
    const response = await increaseQueueNumber(doctorScheduleId);
    if (response.success) setData(response.data.data);
    else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    setIsLoading(false);
  };

  useEffect(() => {
    const handleGetQueueNumber = async () => {
      const response = await getQueueNumber(doctorScheduleId);
      if (response.success) setData(response.data.data);
      else enqueueSnackbar("Đã có lỗi xảy ra", { variant: "error" });
    };

    handleGetQueueNumber();
    const intervalId = setInterval(() => {
      handleGetQueueNumber();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [doctorScheduleId]);

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
          <Typography fontSize={30} fontWeight={500}>
            Số thứ tự hiện tại:{" "}
            {(data?.currentQueueNumber < 10 ? "0" : "") +
              data?.currentQueueNumber}
            <span
              style={{
                fontSize: 20,
                fontWeight: "normal",
              }}
            >{` (${
              data?.maxQueueNumber - data?.currentQueueNumber
            } người còn lại)`}</span>
          </Typography>
          <Button
            variant="contained"
            color="normal1"
            sx={{
              marginLeft: 5,
              color: "#fff",
            }}
            onClick={handleIncreseNumber}
            disabled={
              isLoading || data?.currentQueueNumber === data?.maxQueueNumber
            }
          >
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
                  justifyContent:
                    data?.queueBookingItems?.length === 5
                      ? "space-between"
                      : "flex-start",
                  alignItems: "center",
                }}
              >
                {data?.queueBookingItems?.map((item, index) => (
                  <QueueNumberItem key={`booking-item-${index}`} item={item} />
                ))}
              </Grid>
              <FlexCenterGrid item flexDirection={"column"} flex={4}>
                <Typography variant="h6" fontSize={40}>
                  Số thứ tự hiện tại
                </Typography>
                <Typography color={"template.normal1"} fontSize={150}>
                  {(data?.currentQueueNumber < 10 ? "0" : "") +
                    data?.currentQueueNumber}
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
                {data?.departmentName}
              </Typography>
              <Typography variant="h6" fontSize={40} color="template.darker">
                Phòng khám {data?.roomName}
              </Typography>
            </Grid>
          </Grid>
        </FullScreen>
      </Grid>
    </Grid>
  );
}

export default QueueNumberPage;
