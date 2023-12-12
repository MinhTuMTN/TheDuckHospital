import React, { createContext, useState } from "react";

export const NurseContext = createContext();

export const NurseProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || "");
  const [doctorScheduleId, setDoctorScheduleId] = useState(
    localStorage.getItem("doctorScheduleId") || ""
  );
  const [roomName, setRoomName] = useState(
    localStorage.getItem("roomName") || ""
  );
  const [departmentName, setDepartmentName] = useState(
    localStorage.getItem("departmentName") || ""
  );

  const updateRoomId = (newRoomId) => {
    setRoomId(newRoomId);
    localStorage.setItem("roomId", newRoomId);
  };

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
    roomId,
    doctorScheduleId,
    roomName,
    departmentName,
    updateRoomId,
    updateDoctorScheduleId,
    updateRoomName,
    updateDepartmentName,
  };

  return (
    <NurseContext.Provider value={value}>{children}</NurseContext.Provider>
  );
};
