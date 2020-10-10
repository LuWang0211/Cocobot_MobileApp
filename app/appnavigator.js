import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/homescreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
  );
}
