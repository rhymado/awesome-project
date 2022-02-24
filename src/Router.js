import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import Profile from './screens/Profile';
import PokemonList from './screens/Pokemon';
import PokemonDetail from './screens/Pokemon/Detail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Tab Nav (parent)
// 2. Stack Nav (child)

/**
 * 1. Home (Tab 1)
 * 2. Profile (Tab 2)
 * 3. Pokemon (Tab 3)
 *    3.1 List Pokemon (Stack 1)
 *    3.2 Detail Pokemon (Stack 2)
 */

const Pokemon = () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={PokemonList} />
    <Stack.Screen name="Detail" component={PokemonDetail} />
  </Stack.Navigator>
);

const Router = () => (
  <Tab.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Pokemon" component={Pokemon} />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarActiveTintColor: '#f96123',
        tabBarActiveBackgroundColor: '#eaeef5',
      }}
    />
  </Tab.Navigator>
);

export default Router;
