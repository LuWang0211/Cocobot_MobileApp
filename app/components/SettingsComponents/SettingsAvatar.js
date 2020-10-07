import React from 'react';
import { Avatar } from 'react-native-elements';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import { color } from '../../constant';
import { extractFirstLetter } from '../../functions/SettingsFunction';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    source: PropTypes.string,
    avatarStyle: ViewPropTypes.style,
    nameStyle: ViewPropTypes.style,
}

const defaultProps = {
    name: 'Name',
    source: null,
    avatarStyle: null,
    nameStyle: null,
}

function SettingsAvatar(props) {
    return (
        <View style={styles.containter}>
            <Avatar
                title={extractFirstLetter(props.name)}
                source={props.source}
                titleStyle={styles.avatarTitle}
                containerStyle={[styles.avatar, {...props.avatarStyle}]}
            />
            <Text style={[styles.name, {...props.nameStyle}]}>
                {props.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containter: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: color.settingsBorderColor,
        paddingBottom: 13,
    },
    avatar: {
        backgroundColor: color.brandPurple,
        fontSize: 36,
        width: 72,
        height: 72,
        borderRadius: 100
    },
    avatarTitle: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 36,
        lineHeight: 54,
        color: color.white,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 36,
        marginLeft: 25,
        fontFamily: 'Poppins-Medium',
        color: color.bodyTextGrey,
    },
});

SettingsAvatar.propTypes = propTypes;
SettingsAvatar.defaultProps = defaultProps;

export default SettingsAvatar;