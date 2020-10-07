import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import SettingsButton from './SettingsButton';
import { color } from '../../constant';
import databaseIcon from '../../../assets/icons/database-icon';
import clipboardIcon from '../../../assets/icons/clipboard-icon';
import chevronRightIcon from '../../../assets/icons/chevron-right-icon';
import { renderSuffixIcon } from '../../functions/SettingsFunction';

function Legal(props) {
    return (
        <View>
            <Text style={styles.title}>Legal</Text>
            <SettingsButton
                title='Privacy and Data'
                prefix={databaseIcon}
                suffix={renderSuffixIcon(chevronRightIcon)}
                style={{ marginBottom: 16 }}
                onPress={() => props.navigation.navigate('privacy-and-data')}
            />
            <SettingsButton
                title='Terms and Condition'
                prefix={clipboardIcon}
                suffix={renderSuffixIcon(chevronRightIcon)}
                style={{ marginBottom: 16 }}
                onPress={() => props.navigation.navigate('terms-and-condition')}
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

export default Legal;