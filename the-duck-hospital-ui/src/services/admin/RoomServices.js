import { del, get, post, put } from "../AxiosInstance";

export const getPaginationRooms = (params) => {
  return get("/admin/rooms/filter", params, { Authorization: "" });
};

export const getAllRooms = () => {
  return get("/admin/rooms", null, { Authorization: "" });
};

export const getRoomById = (roomId) => {
  return get(`/admin/rooms/${roomId}`, null, { Authorization: "" });
};

export const addRoom = (data) => {
  return post(`/admin/rooms`, data, { Authorization: "" });
};

export const updateRoom = (roomId, data) => {
  return put(`/admin/rooms/${roomId}`, data, { Authorization: "" });
};

export const deleteRoom = (roomId) => {
    return del(`/admin/rooms/${roomId}`, null, { Authorization: "" });
  };
  
  export const restoreRoom = (roomId) => {
    return put(`/admin/rooms/${roomId}/restore`, null, { Authorization: "" });
  };