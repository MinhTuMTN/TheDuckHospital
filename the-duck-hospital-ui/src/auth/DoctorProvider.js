import React, { createContext, useState } from "react";

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctorScheduleId, setDoctorScheduleId] = useState(
    localStorage.getItem("doctorScheduleId") || ""
  );

  const updateDoctorScheduleId = (newDoctorScheduleId) => {
    setDoctorScheduleId(newDoctorScheduleId);
    localStorage.setItem("doctorScheduleId", newDoctorScheduleId);
  };

  const value = {
    doctorScheduleId,
    updateDoctorScheduleId,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
