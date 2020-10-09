import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import SettingsButton from '../../../components/SettingsComponents/SettingsButton';
import { color } from '../../../constant';
import chevronRightIcon from '../../../../assets/icons/chevron-right-icon';
import userIcon from '../../../../assets/icons/user-icon';
import userPlusIcon from '../../../../assets/icons/user-plus-icon';
import bellIcon from '../../../../assets/icons/bell-icon';
import moonIcon from '../../../../assets/icons/moon-icon';
import { renderSuffixIcon } from '../../../functions/SettingsFunction';
import { MySwitch } from '../../../components/Switch/MySwitch';

function AccountSettings(props) {
    const [isDarkMode, switchDarkMode] = useState(true);

    function renderDarkModeSwitch() {
        return (
            <MySwitch
                isOn={isDarkMode}
                onToggle={state => switchDarkMode(state)}
            />
        );
    }

    return (
        <View>
            <Text style={styles.title}>Account Settings</Text>
            <SettingsButton
                title='Personal Information'
                prefix={userIcon}
                suffix={renderSuffixIcon(chevronRightIcon)}
                style={{ marginBottom: 16 }}
                onPress={() => props.navigation.navigate('personal-info')}
            />
            <SettingsButton
                title='Notification'
                prefix={bellIcon}
                suffix={renderSuffixIcon(chevronRightIcon)}
                style={{ marginBottom: 16 }}
                onPress={() => props.navigation.navigate('notification')}
            />
            <SettingsButton
                title='Dark Mode'
                prefix={moonIcon}
                suffix={renderDarkModeSwitch()}
                disabled={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: 24,
        marginBottom: 20,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        color: color.settingsTitleColor,
    }
})

export default AccountSettings;