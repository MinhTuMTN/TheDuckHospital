import { CardMedia, Stack, Typography } from "@mui/material";
import React from "react";

function DoctorItemInChooseDocterPage(props) {
  return (
    <Stack
      spacing={0.5}
      sx={{
        borderRadius: "15px",
        border: "1px solid #E0E0E0",
        //shadow
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        marginRight: "2px !important",
        paddingTop: "14px",
        paddingBottom: "14px",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "99%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0px 0px 3px 1px #1da1f2",
          border: "1px solid #89d2ff",
        },
      }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701684643/doctor_jpgjbk.png"
          alt="doctor"
          sx={{
            width: "1.2rem",
            height: "1.2rem",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            fontWeight: "700!important",
            color: "#D21616",
          }}
        >
          Nguyễn Khánh Ngọc
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685316/gender_cyvrdi.png"
          alt="gender"
          sx={{
            width: "20px",
            height: "20px",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: "template.darker",
          }}
        >
          Giới tính:
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685343/stethoscope_ysrsda.png"
          alt="gender"
          sx={{
            width: "20px",
            height: "20px",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: "template.darker",
          }}
        >
          Chuyên khoa:
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685344/calendar_pranne.png"
          alt="gender"
          sx={{
            width: "20px",
            height: "20px",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: "template.darker",
          }}
        >
          Lịch khám:
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image="https://res.cloudinary.com/dsmvlvfy5/image/upload/v1701685345/fee_oy7e2x.png"
          alt="gender"
          sx={{
            width: "20px",
            height: "20px",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            color: "template.darker",
          }}
        >
          Phí khám: 150000 d
        </Typography>
      </Stack>
    </Stack>
  );
}

export default DoctorItemInChooseDocterPage;
