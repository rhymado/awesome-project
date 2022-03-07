import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, View, Text, Platform} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: notification => {
    // console.log('NOTIFICATION:', notification);
    switch (notification.action) {
      case 'Dismiss':
        console.log('Dismiss');
        return;
      case 'Yes':
        console.log('Yes');
        return;
      default:
        return;
    }
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
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
