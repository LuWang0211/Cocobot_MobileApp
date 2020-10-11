import React from 'react';
import { NativeEventEmitter } from "react-native"

export const notificationChannelId = "cocobot-notificaiton-channel";

export const notificationAction1 = 'secretInstruction';

export const navigationRef = React.createRef();


export const crossAppNotification = new NativeEventEmitter();