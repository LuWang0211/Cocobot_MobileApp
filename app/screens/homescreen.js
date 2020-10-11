import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GHeader from '../components/GHeader';
import { TodayScreen } from './todayscreen';
import { ChatScreen } from './chatscreen';
import { ResourceScreen } from './resourcescreen';
import SVGIcon from '../components/SVGIcon/SVGIcon';
import { chatIcon, todayIcon, resourcesIcon } from '../assets/icons/tabBarIcons';
import { Login } from '../assets/context';

const Tab = createBottomTabNavigator();

export const HomeScreen = (props) => {

    return (
      <>
      {/* <GHeader
      /> */}
        <Tab.Navigator initialRouteName="Today" tabBarOptions={{activeTintColor: "#FF786A"}}>
          <Tab.Screen name="Today" component={TodayScreen} options={{
            tabBarIcon: (props) => {
              return <SVGIcon height="22" width="22" src={todayIcon} color={props.color} />
            },
          }} />
          <Tab.Screen name="Chat" component={ChatScreen} options={{
            tabBarIcon: (props) => {
              return <SVGIcon height="22" width="22" src={chatIcon} color={props.color} />
            },
            tabBarVisible: false,
          }} />
          <Tab.Screen name="Resources" component={ResourceScreen} options={{
            tabBarIcon: (props) => {
              return <SVGIcon height="22" width="22" src={resourcesIcon} color={props.color} />
            },
            tabBarVisible: false,
          }} />
        </Tab.Navigator>
      </>
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