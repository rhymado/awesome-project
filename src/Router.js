import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import App from './screens/App';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator>
    <Stack.Screen name="App" component={App} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

export default Router;
