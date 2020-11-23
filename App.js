import React, {Component, useReducer} from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen }  from './app/loginscreen';

import { HomeScreen } from './app/homestack';
// import { SettingsStack } from './app/screens/settingscreens/settingstack';
import { Notification } from './app/screens/settingscreens/settings/Notification';
import { ContentScreen } from './app/screens/contentscreen';
import { navigationRef } from "./app/config"
import { SessionContext } from "./app/context";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const sessionReducer = (state, action) => {
  switch (action.type) {
    case "inSession":
      return { inSession: true, reset: false };
    case "reset":
      return { ...state, reset: true };
    case "endSession":
      return { inSession: false, reset: false};
    default:
      return false;
  }
}

export const Stack = createStackNavigator();

export function App() {
  const [session, dispatch] = useReducer(sessionReducer, { inSession: false, reset: false });
  
  return (
    <SessionContext.Provider value={{ session: session, dispatch: dispatch }}>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name={"Home"} component={HomeScreen} />
          {/* <Stack.Screen name="Settings" component={SettingsStack} /> */}
          <Stack.Screen name="notification" component={Notification} />
          <Stack.Screen name="ContentDetails" component={ContentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionContext.Provider>
  );
}
