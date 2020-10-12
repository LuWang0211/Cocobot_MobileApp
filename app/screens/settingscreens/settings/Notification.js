import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
// import { color } from '../../.././assets/constant';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import { notificationChannelId, notificationAction1 } from '../../../config';
import DateTimePicker from "../../../components/DateTimePicker";
import moment from 'moment';

const showNotification = (title, message) => {
    PushNotification.localNotification({
        channelId: notificationChannelId,
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        title,
        message,
        when: new Date().getTime() + 10000,
        actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    });
};

const handlerScheduleNotification = (title, message, date) => {
    if (date == undefined) {
        date = new Date(Date.now() + 10 * 1000);
    }

    PushNotification.localNotificationSchedule({
        channelId: notificationChannelId,
        title,
        message,
        date,
        tag: notificationAction1,
        actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
    });
};

const handlerCancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
};

export const Notification = (props) => {
    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 
    // const showDatePicker = () => {
    //   setDatePickerVisibility(true);
    // };
   
    // const hideDatePicker = () => {
    //   setDatePickerVisibility(false);
    // };
   
    // const handleConfirm = (date) => {
    //   console.warn("A date has been picked: ", date);
    //   hideDatePicker();
    // };


    const initialDate = useMemo(() => new Date(), [])

    const [isDateChanged, setIsDateChanged] = useState(false);

    const [date, setDate] = useState(initialDate);

    const onDateChange = useCallback((newDate) => {
        if (moment(newDate).isSame(initialDate)) {            
            return;
        }
        setIsDateChanged(true);
        setDate(newDate);
    }, [setDate]);

    const dateDisplayString = useMemo(() => {
        return moment(date).format('ll LT');
    }, [date]);

    const sendNotificationAtScheduledTime = useCallback(() => {
        handlerScheduleNotification('Coco', 'coco will be there in 5s', date);
    }, [date]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.body}>
                    <Text style={styles.Title}>Notification</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => showNotification('coco is here', 'Hi, Lisa, Are you ready for our meditation today?')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to get notification </Text>
                        </View>
                    </TouchableOpacity>
                    {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                    {/* <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    /> */}
                    <TouchableOpacity activeOpacity={0.6} onPress={() => handlerScheduleNotification('Coco', 'coco will be there in 5s')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to get notification after 5sec</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => handlerCancelNotification()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to cancel notification </Text>
                        </View>
                    </TouchableOpacity>
                    <DateTimePicker initialDate={initialDate} onDateChange={onDateChange} />
                    {!!isDateChanged && <TouchableOpacity activeOpacity={0.6} onPress={sendNotificationAtScheduledTime}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>{`Tap to get notification at ${dateDisplayString}`}</Text>
                        </View>
                    </TouchableOpacity>}
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
    dateGroupContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "stretch",
        justifyContent: "space-evenly"
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