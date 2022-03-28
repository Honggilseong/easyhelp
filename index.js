/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'moment/locale/ko';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);
// AAAA5zd1H8g:APA91bFEuJIJ4fRiQv0xmVkQYhYKnsAfVnUgJnvSi5bAXLoIm2YAyoFLrLes0kHYnOPoDvvZnasgNss1Kp-XkDPOkDZlUYny2YWXVMbm5dvrrN0uZOr4Bjwq5XMcpI148BpN8sr1A5uO