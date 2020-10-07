import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import Header from '../../../components/AppHeader/Header';
import { color } from '../../../constant';
import { ScrollView } from 'react-native-gesture-handler';
import SettingsTitle from '../../../components/SettingsComponents/SettingsTitle';
import SettingsButton from '../../../components/SettingsComponents/SettingsButton';
import { MySwitch } from '../../../components/Switch/MySwitch';

function Notification(props) {
    const [emailEnabled, switchEmail] = useState(true);
    const [dailyTasksEnabled, switchDailyTasks] = useState(true);
    const [messagesEnabled, switchMessages] = useState(true);
    const [pushNotificationsEnabled, switchPushNotifications] = useState(true);

    function renderSuffixSwitch({ value: value, onValueChange: onValueChange }) {
        return (
            <MySwitch 
                isOn={value}
                onToggle={onValueChange}
                width={32}
                height={16}
            />
        );
    }
    return (
        <View style={styles.container}>
            <Header
                back={() => props.navigation.goBack()}
            />
            <ScrollView>
                <View style={styles.body}>
                    <SettingsTitle text='Notification' />
                    <View style={styles.reminders}>
                        <Text style={styles.remindersTitleText}>Reminders</Text>
                        <Text style={styles.remindersBodyText}>
                            Receive tasks reminders, messages from Cocobot and other reminders related to your activities on the Cocobot application
                        </Text>
                    </View>
                    <SettingsButton
                        title='Email'
                        suffix={renderSuffixSwitch({ value: emailEnabled, onValueChange: state => switchEmail(state) })}
                        disabled={true}
                        style={styles.button}
                    />
                    <SettingsButton
                        title='Daily Tasks'
                        suffix={renderSuffixSwitch({ value: dailyTasksEnabled, onValueChange: state => switchDailyTasks(state) })}
                        disabled={true}
                        suffixWidth={32}
                        suffixHeight={16}
                        style={styles.button}
                    />
                    <SettingsButton
                        title='Messages'
                        suffix={renderSuffixSwitch({ value: messagesEnabled, onValueChange: state => switchMessages(state) })}
                        disabled={true}
                        suffixWidth={32}
                        suffixHeight={16}
                        style={styles.button}
                    />
                    <SettingsButton
                        title='Push Notifications'
                        suffix={renderSuffixSwitch({ value: pushNotificationsEnabled, onValueChange: state => switchPushNotifications(state) })}
                        disabled={true}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    body: {
        paddingHorizontal: 16,
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
        color: color.black,
        marginBottom: 7
    },
    remindersBodyText: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        color: color.settingsTitleColor,
    },
    button: {
        marginBottom: 24,
    },
});

export default Notification;