import { appColors } from "./appColorsUtils";

export const getScheduleSession = (scheduleSession) => {
  switch (scheduleSession) {
    case "MORNING":
      return "Sáng";
    case "AFTERNOON":
      return "Chiều";
    case "EVENING":
      return "Tối";
    case "NIGHT":
      return "Khuya";
    default:
      return "";
  }
};

export const getScheduleSessionForMedicine = (scheduleSession) => {
  switch (scheduleSession) {
    case "MORNING":
      return "Sáng";
    case "AFTERNOON":
      return "Trưa";
    case "EVENING":
      return "Chiều";
    case "NIGHT":
      return "Tối";
    default:
      return "";
  }
};

export const getScheduleSessionColor = (scheduleSession) => {
  switch (scheduleSession) {
    case "MORNING":
      return appColors.error;
    case "AFTERNOON":
      return appColors.successText;
    case "EVENING":
      return "#003768";
    case "NIGHT":
      return "#ed128e";
    default:
      return "#000000";
  }
};

export const getDayOfWeekString = (dayOfWeek) => {
  switch (dayOfWeek) {
    case 0:
      return "Chủ nhật";
    case 1:
      return "Thứ hai";
    case 2:
      return "Thứ ba";
    case 3:
      return "Thứ tư";
    case 4:
      return "Thứ năm";
    case 5:
      return "Thứ sáu";
    case 6:
      return "Thứ bảy";
    default:
      return "";
  }
};
