import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TodayScreen } from './screens/todayscreen';
import { ChatScreen } from './screens/chatscreen';
import { ResourceScreen } from './screens/resourcescreen';
import { ProgressScreen } from './screens/progressscreen';
import { ContentScreen } from './screens/contentscreen';
import SVGIcon from './components/SVGIcon/SVGIcon';
import { chatIcon, todayIcon, resourcesIcon, progressIcon } from './assets/icons/tabBarIcons';

const TodayStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ResourceStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function TodayStackScreen() {
  return (
    <TodayStack.Navigator screenOptions={{ headerShown: false }}>
      <TodayStack.Screen name="Today" component={TodayScreen} />
      <TodayStack.Screen name="ContentDetails" component={ContentScreen} />
    </TodayStack.Navigator>
  );
}

function ChatStackScreen() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
      <ChatStack.Screen name="ContentDetails" component={ContentScreen} />
    </ChatStack.Navigator>
  );
}

function ResourceStackScreen() {
  return (
    <ResourceStack.Navigator screenOptions={{ headerShown: false }}>
      <ResourceStack.Screen name="Resources" component={ResourceScreen} />
      <ResourceStack.Screen name="ContentDetails" component={ContentScreen} />
    </ResourceStack.Navigator>
  );
}

export const HomeScreen = (props) => {
    const routeParams = props.route.params;

    const initialRoute = useMemo(() => {
      if (!!routeParams && routeParams.activateRoute != undefined) {
        return routeParams.activateRoute;
      }

      return "Today";

    }, [routeParams])

    return (
        <Tab.Navigator initialRouteName={initialRoute} tabBarOptions={{activeTintColor: "#FF786A"}} shifting={false}>
          <Tab.Screen name="Today" component={TodayStackScreen} options={{
            tabBarIcon: (props) => {
              return <SVGIcon height="22" width="22" src={todayIcon} color={props.color} />
            },
          }} />
          <Tab.Screen name="Chat" component={ChatStackScreen} options={{
            tabBarIcon: (props) => {
              return <SVGIcon height="22" width="22" src={chatIcon} color={props.color} />
            },
            tabBarVisible: false,
          }} />
          <Tab.Screen name="Resources" component={ResourceStackScreen} options={{
            tabBarIcon: (props) => {
              return <SVGIcon height="22" width="22" src={resourcesIcon} color={props.color} />
            },
            // tabBarVisible: false,
          }} />
          <Tab.Screen name="Progress" component={ProgressScreen} options={{
            tabBarIcon: (props) => {
              return <SVGIcon height="22" width="22" src={progressIcon} color={props.color} />
            },
            // tabBarVisible: false,
          }} />
        </Tab.Navigator>
    )
}
