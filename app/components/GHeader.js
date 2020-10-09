import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GHeader() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{ padding: 16 }} onPress= {() => navigation.navigate('Settings')}>
            <View style={styles.button}>
                <Text  style={styles.buttonTitle}>Press Here to user settings</Text>
            </View>
        </TouchableOpacity>
    );
}

export default GHeader;

const styles = StyleSheet.create({
    button: {
        padding: 16,
        backgroundColor: 'purple',
        borderRadius: 24,
        marginTop: 16,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
    },
});