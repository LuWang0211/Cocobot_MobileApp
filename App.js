import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen }  from './app/loginscreen';

// import { AppNavigator } from './app/appnavigator';
import { HomeScreen } from './app/screens/homescreen';
// import { SettingsStack } from './app/screens/settingscreens/settingstack';
import { Notification } from './app/screens/settingscreens/settings/Notification';
import { navigationRef } from "./app/config"

export const Stack = createStackNavigator();

export class App extends Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Navigator" component={AppNavigator} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="Settings" component={SettingsStack} /> */}
          <Stack.Screen name="notification" component={Notification} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
