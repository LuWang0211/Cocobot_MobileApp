import React from 'react';
import { Avatar } from 'react-native-elements';
import { extractFirstLetter } from '../../functions/SettingsFunction';
import { StyleSheet } from 'react-native';
import { color } from '../../constant';

function MyAvatar(props) {
    return (
        <Avatar
            title={extractFirstLetter(props.name)}
            source={props.source}
            titleStyle={styles.avatarTitle}
            containerStyle={styles.avatar}
        />
    );
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: color.brandPurple,
        fontSize: 36,
        width: 32,
        height: 32,
        borderRadius: 100,
    },
    avatarTitle: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 30,
        color: color.white,
    },
})

export default MyAvatar;