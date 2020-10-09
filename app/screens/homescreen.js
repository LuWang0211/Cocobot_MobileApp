import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatScreen } from './chatscreen';
import { ResourceScreen } from './resourcescreen';

const Tab = createBottomTabNavigator();

export const HomeScreen = () => {

    return (
      <Tab.Navigator>
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Resource" component={ResourceScreen} />
      </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  btn: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
})