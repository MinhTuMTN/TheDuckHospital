import {createOrUpdateRoomDataProps} from '../types';
import {del, get, post, put} from './AxiosInstance';

export const getPaginationRooms = async (
  search: string,
  limit: number,
  page: number,
) => {
  return get(`/admin/rooms/filtered`, {search, limit, page});
};

export const createRoom = async (data: createOrUpdateRoomDataProps) => {
  return post(`/admin/rooms`, data);
};

export const updateRoom = async (roomId:number, data: createOrUpdateRoomDataProps) => {
  return put(`/admin/rooms/${roomId}`, data);
};

export const deleteRoom = async (roomId: number) => {
  return del(`/admin/rooms/${roomId}`);
};

export const restoreRoom = async (roomId: number) => {
  return put(`/admin/rooms/${roomId}/restore`);
};
