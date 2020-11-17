import React, { useMemo, useState, useCallback, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
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
import { SessionContext } from "../../../context";
import RNPickerSelect from 'react-native-picker-select';
import AppHeader from "../../../components/AppHeader/AppHeader";
import SVGIcon from '../../../components/SVGIcon/SVGIcon';
import cocobotIcon from '../../../assets/icons/cocobot-icon';
import { color } from '../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        channelId: notificationChannelId,
        id: id,
        title,
        message,
        date,
        when,
        invokeApp: false,
        smallIcon: "../../../assets/coco.png",
        color: "lightgray",
        tag: notificationAction1,
        repeatType: freq.type === "once" ? null : freq.type,
        repeatTime: freq.time,
        actions: ["Start Now", "Remind Later", "Skip This Session"], // (Android only) See the doc for notification actions to know more
    });

    console.log('setItem', when.getTime().toString());

    AsyncStorage.setItem('scheduledTime', when.getTime().toString());

    crossAppNotification.emit(EventsNames.NotificationScheduled);
};

const handlerCancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
};

export const Notification = (props) => {
    const {session, dispatch} = useContext(SessionContext);
    
    useEffect(() => {
      PushNotification.configure({
        onNotification: (notification) => {

        },
        onAction: (notification) => {
          const { title, message } = notification;
        //   console.log(notification)
          switch (notification.action) {
            case "Start Now":
              PushNotification.invokeApp(notification);
              if (!session.inSession) {
                console.log("yes")
                dispatch({ type: "inSession" });
              }
              props.navigation.navigate("Home", { screen: "Chat" });
              break;
            case "Skip This Session":
              PushNotification.cancelLocalNotifications({id: 2});
              PushNotification.cancelLocalNotifications({id: 3});
            default:
              return;
          }
        },
        popInitialNotification: true,
        requestPermissions: Platform.OS === 'ios',
      })
    }, []);

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
        handlerScheduleNotification('Reminder', "Hi Lisa, it's almost time for today's meditation. Click me when you are ready.", new Date(d - 10 * 60 * 1000), 1, freq);
        handlerScheduleNotification('Reminder', "Hi Lisa, it's time for today's meditation. Click me when you are ready.", date, 2, freq);
        handlerScheduleNotification('Reminder', "Hi Lisa, it's past time for today's meditation. Click me when you are ready.", new Date(d + 30 * 60 * 1000), 3, freq);
        setShowNotificationConfirm(true);
    }, [date, freq]);

    const [showNotificationConfirm, setShowNotificationConfirm] = useState(false);

    return (
        <View style={styles.container}>
            <HeaderComponent />
            <ScrollView>
                <View style={styles.body}>
                    <Text style={styles.Title}>Notification</Text>
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
                            <Text style={styles.buttonTitle}>{`Tap to set notification at ${dateDisplayString}`}</Text>
                        </View>
                    </TouchableOpacity>}
                    <View>
                        <Modal isVisible={showNotificationConfirm}  onBackdropPress={() => setShowNotificationConfirm(false)}>
                            <View style={styles.content}>
                                <Text style={styles.contentTitle}>{`You have scheduled a notification at ${dateDisplayString}`}</Text>
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
        height: Platform.OS === 'ios' ? 80 : 80,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: 'rgba(199, 199, 199, 0.75)',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 1,
        elevation: 5,
        zIndex: 999,
    },
});
