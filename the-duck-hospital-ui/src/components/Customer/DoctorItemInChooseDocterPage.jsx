import { CardMedia, Stack, Typography } from "@mui/material";
import React from "react";
import FormatCurrency from "../General/FormatCurrency";

const days = [
  "",
  "Chủ nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

const getSchedule = (doctor) => {
  let schedule = "";
  doctor.doctorSchedules?.sort((a, b) => {
    if (a.dayOfWeek > b.dayOfWeek) return 1;
    if (a.dayOfWeek < b.dayOfWeek) return -1;
    else {
      if (a.scheduleSession === "MORNING") return -1;
      return 1;
    }
  });

  let previousSchedule = {
    dayOfWeek: 0,
    scheduleSession: "",
  };
  doctor.doctorSchedules?.forEach((item) => {
    if (
      item.scheduleSession === previousSchedule.scheduleSession &&
      item.dayOfWeek === previousSchedule.dayOfWeek
    )
      return;
    if (item.scheduleSession === "MORNING") {
      schedule += `Sáng ${days[item.dayOfWeek]}, `;
    } else {
      schedule += `Chiều ${days[item.dayOfWeek]}, `;
    }

    previousSchedule.dayOfWeek = item.dayOfWeek;
    previousSchedule.scheduleSession = item.scheduleSession;
  });
  return schedule;
};

function DoctorItemInChooseDocterPage(props) {
  const { doctor } = props;
  const schedule = getSchedule(doctor);
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
          {doctor.degree} {doctor.doctorName}
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
          Giới tính: {doctor.gender === "MALE" ? "Nam" : "Nữ"}
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
          Chuyên khoa: {doctor.department?.departmentName}
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
            textAlign: "left",
          }}
        >
          Lịch khám: {schedule.trim().slice(0, -1)}
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
          Phí khám: <FormatCurrency amount={doctor.price} />
        </Typography>
      </Stack>
    </Stack>
  );
}

export default DoctorItemInChooseDocterPage;
