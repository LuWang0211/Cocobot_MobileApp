import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/homescreen';
import SettingsStack from './screens/settingscreens/settingstack';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
