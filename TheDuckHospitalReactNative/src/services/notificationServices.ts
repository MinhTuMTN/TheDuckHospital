import {del, get} from './AxiosInstance';

export enum NotificationState {
  RECEIVED = 'RECEIVED',
  SEEN = 'SEEN',
  DELETED = 'DELETED',
  NOT_RECEIVED = 'NOT_RECEIVED',
}
export const updateNotificationState = async (
  notificationId: string,
  state: NotificationState,
) => {
  return get('/notifications/update-state', {
    notificationId,
    state,
  });
};

export const getNotifications = async () => {
  return get('/notifications');
};

export const deleteNotification = async (notificationId: string) => {
  return del(`/notifications/${notificationId}`);
};
