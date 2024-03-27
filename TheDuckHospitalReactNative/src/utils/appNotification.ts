import notifee, {
  AndroidDefaults,
  AndroidImportance,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

export class AppNotification {
  static async requestPermission() {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'general',
      name: 'General Channel',
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
    }
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
        link: 'theduck://app/payment/1',
      },
      body: (remoteMessage.data?.body as string) || 'Default Body',
      android: {
        channelId: 'general',
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
