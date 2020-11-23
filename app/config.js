import React from 'react';
import { NativeEventEmitter } from "react-native"

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

export const notificationChannelId = "cocobot-notificaiton-channel";

export const notificationAction1 = 'secretInstruction';

export const navigationRef = React.createRef();


export const crossAppNotification = new NativeEventEmitter();


export const EventsNames = {
    NotificationScheduled: 'NotificationScheduled',
    ResourcePlayStarted: 'ResourcePlayStarted',
    ResourcePlayDone: 'ResourcePlayDone',
    RatingDone: 'RatingDone',
    SkipReasonDone: 'SkipReasonDone',
    TypingReasonDone: 'TypingReasonDone',
    ModalClose: 'ModalClose'
}


const firebaseConfig = {
    apiKey: 'AIzaSyAY0F2osDlc9j6P6FQeHRn3y5mOROtbhpg',
    // authDomain: 'your-auth-domain-b1234.firebaseapp.com',
    authDomain: 'cocobot-gix.firebaseapp.com',
    databaseURL: 'https://cocobot-gix.firebaseio.com',
    projectId: 'cocobot-gix',
    storageBucket: 'cocobot-gix.appspot.com',
    messagingSenderId: '901645805895',
    appId: '1:901645805895:android:6174bbf516f640c0960462',
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();