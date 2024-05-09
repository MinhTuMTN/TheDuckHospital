import { addRatingProps } from '../types';
import {get, post} from './AxiosInstance';

export const addRating = async (data: addRatingProps) => {
  return post(`/rating`, data);
};
