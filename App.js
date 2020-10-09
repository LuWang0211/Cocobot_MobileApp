import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen }  from './app/loginscreen';

import { AppNavigator } from './app/appnavigator';
import { ChatScreen } from './app/screens/chatscreen';
// import { HomeScreen } from './app/screens/homescreen';

// function AppNavigator() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Navigator Screen</Text>
//     </View>
//   );
// }

const Stack = createStackNavigator();

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Navigator" component={AppNavigator} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
