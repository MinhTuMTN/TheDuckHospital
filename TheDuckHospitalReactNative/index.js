import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {AppNotification} from './src/utils/appNotification';
import notifee, {EventType} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  AppNotification.displayNotification(remoteMessage);
});
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('Background user pressed on notification');
  }
});
AppRegistry.registerComponent(appName, () => App);
