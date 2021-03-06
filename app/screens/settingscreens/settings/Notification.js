import React, { useMemo, useState, useCallback, useEffect, useContext } from 'react';
import { AppState, View, StyleSheet, Text, Button } from 'react-native';
// import { color } from '../../.././assets/constant';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import { notificationChannelId, notificationAction1 } from '../../../config';
import DateTimePicker from "../../../components/DateTimePicker";
import moment from 'moment';
import { crossAppNotification, EventsNames } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import BackButton from "../../../components/HeaderComponents/BackButton";
// import { SessionContext } from "../../../context";
import RNPickerSelect from 'react-native-picker-select';
import AppHeader from "../../../components/AppHeader/AppHeader";
import SVGIcon from '../../../components/SVGIcon/SVGIcon';
import cocobotIcon from '../../../assets/icons/cocobot-icon';
import { color } from '../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatAMPM } from '../../../util';

// const showNotification = (title, message) => {
//     PushNotification.localNotification({
//         channelId: notificationChannelId,
//         largeIcon: cocobotIcon, // (optional) default: "ic_launcher". Use "" for no large icon.
//         title,
//         message,
//         when: new Date().getTime() + 10000,
//         actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
//     });
// };

const handlerScheduleNotification = (title, message, date, id, freq) => {
    if (date == undefined) {
      return;
        // date = new Date(Date.now() + 10 * 1000);
    }

    // const when = new Date().getTime() + 10000;
    const when = date;
    PushNotification.localNotificationSchedule({
        autoCancel: true,
        channelId: notificationChannelId,
        id: id,
        title,
        message,
        date,
        subText: formatAMPM(when),
        usesChronometer: true,
        showWhen: true,
        invokeApp: false,
        largeIcon:"coco",
        color: "lightgray",
        tag: notificationAction1,
        repeatType: freq.type === "once" ? null : freq.type,
        repeatTime: freq.time,
        actions: ["Start", "Snooze", "Skip"], // (Android only) See the doc for notification actions to know more
    });

    console.log('setItem', when.getTime().toString());

    AsyncStorage.setItem('scheduledTime', when.getTime().toString());

    crossAppNotification.emit(EventsNames.NotificationScheduled);
};

const handlerCancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
};

export const Notification = (props) => {
    // const {session, dispatch} = useContext(SessionContext);

    const navigation = useNavigation();

    const initialDate = useMemo(() => new Date(), [])

    const [isDateChanged, setIsDateChanged] = useState(false);

    const [date, setDate] = useState(initialDate);

    const [freq, setFreq] = useState({type: "once", time: null});

    const onDateChange = useCallback((newDate) => {
        // if (moment(newDate).isSame(initialDate) && !isDateChanged) {
        //     return;
        // }
        setIsDateChanged(true);
        setDate(newDate);
    }, [setDate]);

    const dateDisplayString = useMemo(() => {
        return moment(date).format('ll LT');
    }, [date]);

    const sendNotificationAtScheduledTime = useCallback(() => {
        let d = Date.parse(date);
        let wording_for_10mins_ahead = ["Hi Lisa, we are starting the 1st meditation for this week in 10 mins!", 
        "Hi Lisa, you have completed 1/7 practice scheduled! We will start the 2nd one in 10 mins!",
        "Hi Lisa, you have practiced meditation for 3 consecutive days! Start today’s session in 10-mins and win a 4-day streak！"
        ];
        let RandomIndex = Math.floor(Math.random() * wording_for_10mins_ahead.length );
        let wording = wording_for_10mins_ahead[RandomIndex];
        if (Date.now() )
        handlerScheduleNotification('Reminder', wording, new Date(d - 10 * 60 * 1000 + (d - Date.now() < 10 * 60 * 1000 ? 24 * 60 * 60 * 1000 : 0)), '1', freq);
        handlerScheduleNotification('Reminder', "Hi Lisa, are you ready for today’s meditation?", date, '2', freq);
        handlerScheduleNotification('Reminder', "Hi Lisa, are you ready for today’s meditation?", new Date(d + 30 * 60 * 1000), '3', freq);
        setShowNotificationConfirm(true);
    }, [date, freq]);

    const [showNotificationConfirm, setShowNotificationConfirm] = useState(false);

    return (
        <View style={styles.container}>
            <HeaderComponent />
            <ScrollView>
                <View style={styles.body}>
                    <Text style={styles.Title}>Set Reminder</Text>
                    {/* <TouchableOpacity activeOpacity={0.6} onPress={() => showNotification('coco is here', 'Hi, Lisa, Are you ready for our meditation today?')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to get notification </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => handlerScheduleNotification('Coco', 'coco will be there in 5s')}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to get notification after 5sec</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => handlerCancelNotification()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>Tap to cancel notification </Text>
                        </View>
                    </TouchableOpacity> */}
                    <DateTimePicker initialDate={initialDate} onDateChange={onDateChange} />
                    <RNPickerSelect
                      value={freq.type}
                      onValueChange={(value) => setFreq({type: value, time: null})}
                      placeholder={{}}
                      useNativeAndroidPickerStyle={false}
                      style={{
                        inputAndroid: {
                          fontSize: 25,
                          marginTop: 10,
                          paddingHorizontal: 25,
                          marginRight: 10,
                          paddingVertical: 8,
                          borderWidth: 2,
                          borderRadius: 15,
                          borderColor: color.brandPurple,
                          color: 'black',
                          paddingRight: 30,
                        }
                      }}
                      items={[
                          { label: 'Once', value: "once" },
                          { label: 'Daily', value: 'day' },
                          { label: 'Weekly', value: 'week' },
                      ]}
                    />
                    {!!isDateChanged && <TouchableOpacity activeOpacity={0.6} onPress={sendNotificationAtScheduledTime}>
                        <View style={styles.button}>
                            <Text style={styles.buttonTitle}>{`Tap to set reminder at ${dateDisplayString}`}</Text>
                        </View>
                    </TouchableOpacity>}
                    <View>
                        <Modal isVisible={showNotificationConfirm}  onBackdropPress={() => setShowNotificationConfirm(false)}>
                            <View style={styles.content}>
                                <Text style={styles.contentTitle}>{`You have scheduled a reminder at ${dateDisplayString}`}</Text>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export const HeaderComponent = () => {
    const navigation = useNavigation();

    return <AppHeader
        leftComponent={<BackButton onPress={() => navigation.navigate("Home")} />}
        centerComponent={<SVGIcon height="40" width="40" src={cocobotIcon} />}
        headerStyle={styles.header}
      />
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
        textAlign: "center",
        padding: 30,
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
        backgroundColor: color.brandPurple,
        borderRadius: 24,
        marginTop: 16,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: Platform.OS === 'ios' ? 80 : 110,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: 'rgba(199, 199, 199, 0.75)',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 1,
        elevation: 5,
        zIndex: 999,
    },
});
