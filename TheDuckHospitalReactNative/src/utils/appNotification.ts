import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {confirmReceivedReminder} from '../services/medicineReminderServices';

export class AppNotification {
  static subscribe: null | ((data: any) => void) = null;

  static subscribeToNotification(callback: (data: any) => void) {
    this.subscribe = callback;
  }

  static unsubscribeToNotification() {
    this.subscribe = null;
  }

  static async requestPermission() {
    await notifee.requestPermission();
    await notifee.createChannel({
      id: 'general',
      name: 'General Channel',
      importance: AndroidImportance.HIGH,
      sound: 'notifications',
    });
    await notifee.createChannel({
      id: 'booking',
      name: 'Booking Channel',
      importance: AndroidImportance.HIGH,
      sound: 'notifications',
    });
    await notifee.createChannel({
      id: 'chat',
      name: 'Chat Channel',
      importance: AndroidImportance.HIGH,
      sound: 'notifications',
    });
    await notifee.createChannel({
      id: 'reminder',
      name: 'Medicine Reminder Channel',
      importance: AndroidImportance.HIGH,
      sound: 'notifications',
    });

    const status = await messaging().requestPermission();
    if (
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      const fcmToken = await messaging().getToken();
      console.log('fcmToken', fcmToken);

      return fcmToken;
    }

    return null;
  }

  static async displayNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) {
    if (!remoteMessage.data) {
      console.log('remoteMessage', remoteMessage);
      return;
    }

    if (this.subscribe !== null && remoteMessage.data?.channelId === 'chat') {
      this.subscribe(remoteMessage);
      return;
    }

    if (remoteMessage.data?.channelId === 'reminder') {
      const notificationId: string = remoteMessage.data
        ?.notificationId as string;
      const comfirmId: string = remoteMessage.data?.confirmId as string;
      console.log('notificationId', notificationId);
      console.log('comfirmId', comfirmId);

      if (notificationId && comfirmId) {
        await confirmReceivedReminder(notificationId, comfirmId);
      }
    }

    notifee.displayNotification({
      id: remoteMessage.messageId,
      title: (remoteMessage.data?.title as string) || 'Default Title',
      data: {
        notificationId: remoteMessage.data?.notificationId || '',
      },
      body: (remoteMessage.data?.body as string) || 'Default Body',
      android: {
        channelId: (remoteMessage.data?.channelId as string) || 'general',
        pressAction: {
          id: 'payment',
          launchActivity: 'default',
        },
        sound: 'notifications',
        importance: AndroidImportance.HIGH,
        style: {
          type: AndroidStyle.BIGTEXT,
          text: remoteMessage.data?.body as string,
        },
      },
    });
  }
}
