import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';

const AppWithNavAndRedux = () => (
  <NavigationContainer>
    <Router />
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => AppWithNavAndRedux);
