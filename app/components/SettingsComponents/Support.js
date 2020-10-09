import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import SettingsButton from './SettingsButton';
import { color } from '../../constant';
import chevronRightIcon from '../../../assets/icons/chevron-right-icon';
import helpCircleIcon from '../../../assets/icons/help-circle-icon';
import { renderSuffixIcon } from '../../functions/SettingsFunction';

function Support(props) {
    return (
        <View>
            <Text style={styles.title}>Support</Text>
            <SettingsButton
                title='Give Us Feedback'
                prefix={helpCircleIcon}
                suffix={renderSuffixIcon(chevronRightIcon)}
                style={{ marginBottom: 16 }}
                onPress={() => props.navigation.navigate('feedback')}
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

export default Support;