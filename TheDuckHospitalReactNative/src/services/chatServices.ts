import {get, post} from './AxiosInstance';

export const getMessages = async (
  sequenceNumber: number = -1,
  direction: 'next' | 'previous' = 'next',
) => {
  return get('/chat/messages', {
    sequenceNumber,
    direction,
  });
};

export const sendMessage = async (message: string) => {
  return post('/chat/send-message', {
    message,
  });
};
