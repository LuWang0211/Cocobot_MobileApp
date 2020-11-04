import React from 'react'
import { StyleSheet } from 'react-native'
import { color } from '../../../constant'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StatsTab from './StatsTab/StatsTab';
import DetailsTab from './DetailsTab/DetailsTab';

const Tab = createMaterialTopTabNavigator();

export default function ProgressTab() {
    return (
        <Tab.Navigator tabBarOptions={{
            indicatorContainerStyle: styles.indicatorContainerStyle,
            activeTintColor: color.brandPurple,
            inactiveTintColor: color.secondGrey,
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle,
            style: styles.style,
        }}>
            <Tab.Screen name='Stats' component={StatsTab} />
            <Tab.Screen name='Details' component={DetailsTab} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    indicatorContainerStyle: {
        backgroundColor: color.chatPurple
    },
    indicatorStyle: {
        backgroundColor: color.brandPurple,
        width: 62,
        left: '17.75%',
        marginBottom: 12,
    },
    labelStyle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        lineHeight: 27,
        textAlign: 'center',
        textTransform: 'none',
    },
    style: {
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
    },
})