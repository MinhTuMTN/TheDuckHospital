export const getScheduleSession = (scheduleSession) => {
  switch (scheduleSession) {
    case "MORNING":
      return "Sáng";
    case "AFTERNOON":
      return "Trưa";
    case "EVENING":
      return "Tối";
    case "NIGHT":
      return "Khuya";
    default:
      return "";
  }
};
