import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { color } from '../assets/constant';

function GHeader(props) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress= {() => navigation.navigate('notification')}>
            <Avatar 
                title="L"
                size="large"
                titleStyle={styles.avatarTitle}
                containerStyle={styles.avatar}
            />
        </TouchableOpacity>

    );
}

export default GHeader;

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: color.brandPurple,
        fontSize: 20,
        width: 40,
        height: 40,
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
});