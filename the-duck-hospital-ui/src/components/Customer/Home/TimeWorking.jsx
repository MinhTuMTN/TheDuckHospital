import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import CountUpAnimation from "./CountUpAnimation";
import { getAllHomeStatistics } from "../../../services/common/StatisticsServices";

function TimeWorking(props) {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [statistics, setStatistics] = React.useState({});

  useEffect(() => {
    const getHomeStatistics = async () => {
      const response = await getAllHomeStatistics();
      if(response.success) {
        setStatistics(response.data.data);
      }
    };
    getHomeStatistics();
  }, []);
  
  return (
    <Box
      sx={{
        py: isLgUp ? "120px" : "20px",
        backgroundImage: `url("https://res.cloudinary.com/dsmvlvfy5/image/upload/v1702195115/counter-bg.jpg_sjo6d5.webp")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        zIndex: "-1000",
        width: "100%",
        height: "100%",
        "::after": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#000",
          opacity: 0.3,
        },
      }}
    >
      <Grid
        container
        justifyContent="space-around"
        width="100%"
        height={"20rem"}
        sx={{
          paddingX: isLgUp ? "190px" : "15px",
        }}
      >
        <Grid
          item
          xs={12}
          md={2.4}
          display={"flex"}
          flexDirection={"column"}
          sx={{
            height: {
              xs: "30%",
              md: "100%",
            },
            paddingX: "20px",
            paddingY: "50px",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 50px rgba(153, 153, 153, 0.1)",
            textAlign: "center",
            justifyContent: "center",
            zIndex: "100",
          }}
        >
          <CountUpAnimation value={10} />
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "400",
              marginTop: isLgUp ? "20px" : "0px",
            }}
          >
            Năm kinh nghiệm
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.4}
          display={"flex"}
          flexDirection={"column"}
          sx={{
            height: {
              xs: "30%",
              md: "100%",
            },
            paddingX: "20px",
            paddingY: "50px",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 50px rgba(153, 153, 153, 0.1)",
            textAlign: "center",
            justifyContent: "center",
            zIndex: "100",
          }}
        >
          <CountUpAnimation value={statistics?.totalDoctors} />
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "400",
              marginTop: isLgUp ? "20px" : "0px",
            }}
          >
            Bác sĩ chuyên môn
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.4}
          display={"flex"}
          flexDirection={"column"}
          sx={{
            height: {
              xs: "30%",
              md: "100%",
            },
            paddingX: "20px",
            paddingY: "50px",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 50px rgba(153, 153, 153, 0.1)",
            textAlign: "center",
            justifyContent: "center",
            zIndex: "100",
          }}
        >
          <CountUpAnimation value={statistics?.totalDepartments} />
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "400",
              marginTop: isLgUp ? "20px" : "0px",
            }}
          >
            Chuyên khoa
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TimeWorking;
