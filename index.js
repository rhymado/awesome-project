import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, View, Text} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';

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
