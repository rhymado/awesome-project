import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, View, Text} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import PushNotification from 'react-native-push-notification';
import {sendLocalNotification} from './src/utils/notification';

PushNotification.configure({
  // get TOKEN
  onRegister: token => {
    console.log('TOKEN:', token);
  },
  // error handling
  onRegistrationError: error => {
    console.log(error.message, error);
  },
  onNotification: notification => {
    console.log('NOTIFICATION:', notification);
    sendLocalNotification({
      title: notification.title,
      message: notification.message,
    });
    // switch (notification.action) {
    //   case 'Dismiss':
    //     console.log('Dismiss');
    //     return;
    //   case 'Yes':
    //     console.log('Yes');
    //     return;
    //   default:
    //     return;
    // }
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: '123',
    channelName: 'primary-notification',
  },
  created => console.log(`create channel returned "${created}"`),
);

const AppWithNavAndRedux = () => (
  <Provider store={store}>
    <PersistGate
      loading={
        <View>
          <Text>Fetching</Text>
        </View>
      }
      persistor={persistor}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithNavAndRedux);
