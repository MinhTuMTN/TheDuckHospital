import {get} from './AxiosInstance';

export const getMessages = async (
  sequenceNumber: number = -1,
  direction: 'next' | 'previous' = 'next',
) => {
  return get('/chat/messages', {
    sequenceNumber,
    direction,
  });
};
