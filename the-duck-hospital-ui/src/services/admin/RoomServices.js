import { del, get, post, put } from "../AxiosInstance";

export const getPaginationRooms = (params) => {
  return get("/admin/rooms/filtered", params);
};

export const getAllRooms = () => {
  return get("/admin/rooms");
};

export const getRoomById = (roomId) => {
  return get(`/admin/rooms/${roomId}`);
};

export const addRoom = (data) => {
  return post(`/admin/rooms`, data);
};

export const updateRoom = (roomId, data) => {
  return put(`/admin/rooms/${roomId}`, data);
};

export const deleteRoom = (roomId) => {
  return del(`/admin/rooms/${roomId}`);
};

export const restoreRoom = (roomId) => {
  return put(`/admin/rooms/${roomId}/restore`);
};