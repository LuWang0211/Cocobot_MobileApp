/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import { notificationChannelId, notificationAction1, navigationRef } from "./app/config";
import TrackPlayer from 'react-native-track-player';
import { clearAllNotifications } from "./app/util";

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      clearAllNotifications();
      if (notification.tag === notificationAction1) {
        // navigationRef.current?.navigate("Settings", {});
        navigationRef.current?.navigate("Home", {activateRoute: "Chat"});
      }
      /* else if (notification.data === notificationAction2) {
        lastReceivedNotifictionInstruction = notificationAction2;
      } */

      // process the notification
      // (required) Called when a remote is received or opened, or local notification is opened
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: (notification) => {
      const { title, message } = notification;
      console.log(notification.action)
      switch (notification.action) {
        case "Start":
          clearAllNotifications()
          PushNotification.invokeApp(notification);
          navigationRef.current?.navigate("Home", { screen: "Chat" });
          break;
        case "Skip":
          clearAllNotifications();
        default:
          return;
      }
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },

    // // IOS ONLY (optional): default: all - Permissions to register.
    // permissions: {
    //   alert: true,
    //   badge: true,
    //   sound: true,
    // },

    popInitialNotification: true,
    requestPermissions: Platform.OS === "ios",
  });

PushNotification.createChannel(
  {
    channelId: notificationChannelId, // (required)
    channelName: "cocobot-notificaiton-channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


AppRegistry.registerComponent(appName, () => App);

//add this line to register the TrackPlayer
TrackPlayer.registerPlaybackService(() => require('./service.js'));
