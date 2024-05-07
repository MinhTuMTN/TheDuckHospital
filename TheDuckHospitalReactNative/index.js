import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  NotificationState,
  updateNotificationState,
} from './src/services/notificationServices';
import { AppNotification } from './src/utils/appNotification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  AppNotification.displayNotification(remoteMessage);
  const notificationId = remoteMessage.data?.notificationId;
  if (notificationId && remoteMessage.data?.channelId !== 'reminder') {
    const response = await updateNotificationState(
      notificationId,
      NotificationState.RECEIVED,
    );
    console.log(response);
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  // console.log('Background event received');
  // if (type === EventType.PRESS) {
  //   console.log('Background user pressed on notification');
  // } else if (type === EventType.DISMISSED) {t
  //   console.log('Background user dismissed notificaion');
  // } else if (type === EventType.DELIVERED) {
  //   console.log('Background notification delivered');
  // }
});
AppRegistry.registerComponent(appName, () => App);
