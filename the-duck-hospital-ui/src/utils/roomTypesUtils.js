export const getRoomType = (type) => {
  switch (type) {
    case "EXAMINATION_ROOM":
      return "Phòng khám";
    case "TREATMENT_ROOM_STANDARD":
      return "Phòng điều trị tiêu chuẩn";
    case "TREATMENT_ROOM_VIP":
      return "Phòng điều trị VIP";
    case "LABORATORY_ROOM_NORMAL":
      return "Phòng xét nghiệm thường";
    case "LABORATORY_ROOM_ADMISSION":
      return "Phòng xét nghiệm nội trú";
    case "MEETING_ROOM":
      return "Phòng họp";
    default:
      return "Không xác định";
  }
};
