export const getMedicineUnit = (unit) => {
  const data = {
    BOX: "Hộp",
    BOTTLE: "Chai",
    TUBE: "Tuýp",
    PIECE: "Viên",
    BAG: "Túi",
    PACKAGE: "Gói",
    OTHER: "Khác",
    CAPSULE: "Viên",
  };

  return data[unit];
};
