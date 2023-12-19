import React, { createContext, useState } from "react";

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctorScheduleId, setDoctorScheduleId] = useState(
    localStorage.getItem("doctorScheduleId") || ""
  );

  const [roomName, setRoomName] = useState(
    localStorage.getItem("roomName") || ""
  );

  const [departmentName, setDepartmentName] = useState(
    localStorage.getItem("departmentName") || ""
  );

  const updateDoctorScheduleId = (newDoctorScheduleId) => {
    setDoctorScheduleId(newDoctorScheduleId);
    localStorage.setItem("doctorScheduleId", newDoctorScheduleId);
  };

  const updateRoomName = (newRoomName) => {
    setRoomName(newRoomName);
    localStorage.setItem("roomName", newRoomName);
  };

  const updateDepartmentName = (newDepartmentName) => {
    setDepartmentName(newDepartmentName);
    localStorage.setItem("departmentName", newDepartmentName);
  };

  const value = {
    doctorScheduleId,
    updateDoctorScheduleId,
    roomName,
    updateRoomName,
    departmentName,
    updateDepartmentName,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
