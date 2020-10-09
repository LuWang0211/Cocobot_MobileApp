import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
// import { color } from '../../.././assets/constant';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';

const showNotification = (title, message) => {
    PushNotification.localNotification({
        title: title,
        message: message,
    });
};

const handlerScheduleNotification = (title, message) => {
    PushNotification.localNotificationSchedule({
        title: title,
        message: message,
        date: new Date(Date.now() + 5 * 1000),
    });
};

const handlerCancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
};

export const Notification = (props) => {

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.body}>
                    <Text style={styles.Title}>Notification</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => showNotification('hello', 'coco is here')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to get notification </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => handlerScheduleNotification('haha', 'coco will be there in 5s')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to get notification after 5sec</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => handlerCancelNotification()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to cancel notification </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: color.white,
    },
    body: {
        paddingHorizontal: 16,
    },
    Title: {
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    reminders: {
        marginVertical: 48,
    },
    remindersTitleText: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 21,
        // color: color.black,
        marginBottom: 7
    },
    remindersBodyText: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        // color: color.settingsTitleColor,
    },
    button: {
        marginBottom: 15,
        padding: 16,
        backgroundColor: 'pink',
        borderRadius: 24,
        marginTop: 16,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
    },
});