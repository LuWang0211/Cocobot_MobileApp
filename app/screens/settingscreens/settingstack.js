import React, { useState, useReducer, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from './settings/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Notification } from './settings/Notification';
// import ChildrenInformation from './Screens/ChildrenInformation';
// import { _retrieveData } from '../../functions/AsyncFunction';
// import { SettingsContext } from '../../context';
// import Feedback from './Screens/Feedback';
// import PrivacyAndData from './Screens/PrivacyAndData';
// import TermsAndCondition from './Screens/TermsAndCondition';

const Stack = createStackNavigator();

export const SettingsStack = () => {
    return (
        // <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="settingpage">
                <Stack.Screen name='settingpage' component={SettingsScreen} />
                <Stack.Screen name='notification' component={Notification} />
            </Stack.Navigator>
        // </NavigationContainer>
    );
}
