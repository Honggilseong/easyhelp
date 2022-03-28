import 'react-native-gesture-handler';
import React, {useEffect, useContext} from 'react';
import AppProvider from './src/Navigator/AppProvider';
import GlobalProvider from './src/Context/GlobalProvider';
import SplashScreen from 'react-native-splash-screen';
import { createNotificationListeners, requestUserPermission } from './src/Utils/notificationService';
import codePush from 'react-native-code-push'
import messaging from '@react-native-firebase/messaging'
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME}
const App = () => {
  useEffect(() => {
    requestUserPermission();
    createNotificationListeners();
    SplashScreen.hide();
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
    // fcmNotification.registerAppWithFCM();
    // fcmNotification.register(onRegister, onNotification, onOpenNotification);
    // localNotification.configure(onOpenNotification);
  }, []);

  // const onRegister = token => {
  //   console.log('[App] Token', token);
  // };

  // const onOpenNotification = async notify => {
  //   console.log('onOpenNotification', notify);
  // };
  // Foreground Notification
  // const onNotification = notify => {
    // console.log('[App] onNotification', notify);
    // const options = {
    //   soundName: 'default',
    //   playSound: true,
    // };
    // localNotification.showNotification(
    //   notify.messageId,
    //   notify.notification.title,
    //   notify.notification.body,
    //   notify,
    //   options,
    // );
  // };
  return (
    <GlobalProvider>
      <AppProvider />
    </GlobalProvider>
  );
};

export default codePush(codePushOptions)(App);
