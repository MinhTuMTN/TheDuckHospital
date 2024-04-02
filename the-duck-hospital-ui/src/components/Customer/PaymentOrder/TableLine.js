import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicationIcon from "@mui/icons-material/Medication";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import dayjs from "dayjs";
import { getTimeSlotById } from "../../../utils/timeSlotUtils";

const createTableLine = (schedule) => {
  const tableLine = [
    {
      icon: (
        <MedicationIcon
          sx={{
            color: "#b1b1b1",
            fontSize: "18px",
          }}
        />
      ),
      label: "Chuyên khoa:",
      value: schedule.doctor?.department?.departmentName,
    },
    {
      icon: (
        <PersonIcon
          sx={{
            color: "#b1b1b1",
            fontSize: "18px",
          }}
        />
      ),
      label: "Bác sĩ:",
      value: `${schedule?.doctor?.degree} ${schedule?.doctor?.doctorName}`,
    },

    {
      icon: (
        <CalendarMonthIcon
          sx={{
            color: "#b1b1b1",
            fontSize: "18px",
          }}
        />
      ),
      label: "Thời gian khám:",
      value: dayjs(schedule?.schedule?.date).format("DD/MM/YYYY"),
    },
    {
      icon: (
        <AccessTimeFilledIcon
          sx={{
            color: "#b1b1b1",
            fontSize: "18px",
          }}
        />
      ),
      label: "Buổi:",
      value: `${
        schedule?.schedule?.scheduleType === "MORNING" ? "Sáng" : "Chiều"
      } ${getTimeSlotById(schedule?.timeSlot?.timeId)}`,
    },
    {
      icon: (
        <PaidIcon
          sx={{
            color: "#b1b1b1",
            fontSize: "18px",
          }}
        />
      ),
      label: "Tiền khám:",
      value: schedule?.doctor?.price,
    },
  ];

  return tableLine;
};

export default createTableLine;
