import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export const SettingsScreen = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>SettingsScreen temp</Text>
                <Button
                title="Tap to Notification"
                onPress={() => navigation.navigate('notification')}
                />
            </View>
            <ScrollView>
                <View style={styles.body}>
                    <Text>SettingsScreen body</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: color.white,
    },
    body: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
    },
})