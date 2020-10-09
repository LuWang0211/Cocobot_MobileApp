import React, { useState, useReducer, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './settings/SettingsScreen';
// import PersonalInformation from './Screens/PersonalInformation';
// import ChildInformation from './Screens/ChildInformation';
// import Notification from './Screens/Notification';
// import ChildrenInformation from './Screens/ChildrenInformation';
// import { _retrieveData } from '../../functions/AsyncFunction';
// import { SettingsContext } from '../../context';
// import Feedback from './Screens/Feedback';
// import PrivacyAndData from './Screens/PrivacyAndData';
// import TermsAndCondition from './Screens/TermsAndCondition';

const Stack = createStackNavigator();

function SettingsStack() {
    // const initialSettingsState = {
    //     isRefreshed: false,
    //     isLoading: false,
    // }

    // const settingsReducer = (prevState, action) => {
    //     switch (action.type) {
    //         case 'REFRESH':
    //             return {
    //                 ...prevState,
    //                 isRefreshed: action.isRefreshed,
    //                 isLoading: false,
    //             }
    //     }
    // }

    // const [settingsState, dispatch] = useReducer(settingsReducer, initialSettingsState);

    // const settingsContext = useMemo(() => ({
    //     refresh: (value) => {
    //         dispatch({
    //             type: 'REFRESH',
    //             isRefreshed: value,
    //         });
    //     },
    //     isRefreshed: settingsState.isRefreshed,
    //     isLoading: settingsState.isLoading,
    // }));

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='settings' component={SettingsScreen} />
            {/* <Stack.Screen name='temp' component={() => <View></View>} /> */}
            {/* <Stack.Screen name='notification' component={Notification} />
            <Stack.Screen name='feedback' component={Feedback} /> */}
        </Stack.Navigator>
    );
}

export default SettingsStack;