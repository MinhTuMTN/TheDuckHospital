import notifee, {
  AndroidDefaults,
  AndroidImportance,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

export class AppNotification {
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

    notifee.displayNotification({
      id: remoteMessage.messageId,
      title: (remoteMessage.data?.title as string) || 'Default Title',
      data: {
        notificationId: remoteMessage.data?.notificationId,
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
      },
    });
  }
}
