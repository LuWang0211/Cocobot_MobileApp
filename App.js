import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen }  from './app/loginscreen';

import { AppNavigator } from './app/appnavigator';
import { SettingsStack } from './app/screens/settingscreens/settingstack';

const Stack = createStackNavigator();

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Navigator" component={AppNavigator} />
          <Stack.Screen name="Settings" component={SettingsStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
