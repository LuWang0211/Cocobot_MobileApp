import React, {Component} from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen }  from './app/loginscreen';

import { HomeScreen } from './app/homestack';
// import { SettingsStack } from './app/screens/settingscreens/settingstack';
import { Notification } from './app/screens/settingscreens/settings/Notification';
import { navigationRef } from "./app/config"

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

export const Stack = createStackNavigator();

export class App extends Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name={"Home"} component={HomeScreen} />
          {/* <Stack.Screen name="Settings" component={SettingsStack} /> */}
          <Stack.Screen name="notification" component={Notification} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
