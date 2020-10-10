import React from 'react';
import { View, StyleSheet, Dimensions, Button, Text } from 'react-native';
import SVGIcon from './components/SVGIcon/SVGIcon';
import { redBgAuth, purpleBgAuth } from './assets/icons/authBgIcons';

export const LoginScreen = (props) => {
    const { navigation } = props;
    return (    
        <View style={styles.container}>
            <View style={styles.redBg}>
                <SVGIcon
                    height={322}
                    width={345}
                    src={redBgAuth}
                />
            </View>
            <View style={styles.purpleBg}>
                <SVGIcon
                    height={176}
                    width={165}
                    src={purpleBgAuth}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Login Screen</Text>
                <Button
                title="Tap to Start"
                onPress={() => navigation.navigate('Navigator')}
                />
            </View>
        </View>
    );
}

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginBottom: 16,
    },
    errorText: {
        fontSize: 12,
        marginHorizontal: 32,
        fontFamily: 'Poppins-Regular'
    },
    footer: {
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    redBg: {
        position: 'absolute',
        transform: [
            {
                translateX: 80
            }
        ]
    },
    purpleBg: {
        transform: [
            {
                translateY: 115
            },
            {
                translateX: 30
            }
        ]
    },
    buttonContainerStyle: {
        position: "absolute",
        top: height * 0.8,
        left: 0,
        right: 0,
        alignItems: "center"
    },
    backButton: {
        position: 'absolute',
        marginTop: 48,
        marginLeft: 24
    }
});