import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicationIcon from "@mui/icons-material/Medication";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";

const createTableLine = (booking) => {
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
      value: booking.departmentName,
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
      value: booking.doctor,
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
      value: booking.date,
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
      value: booking.scheduleType,
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
      value: booking.fee,
    },
  ];

  return tableLine;
};

export default createTableLine;
