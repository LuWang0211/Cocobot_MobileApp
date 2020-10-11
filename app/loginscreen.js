import React from 'react';
import { View, StyleSheet, Dimensions, Button, Text } from 'react-native';
import SVGIcon from './components/SVGIcon/SVGIcon';
import { redBgAuth, purpleBgAuth } from './assets/icons/authBgIcons';
import { color } from './assets/constant';

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
                <Text style={styles.text}>Coco is Here</Text>
                <Button
                    style={styles.button}
                    title="Tap to Start"
                    // onPress={() => navigation.navigate('Navigator')}
                    onPress={() => navigation.navigate('Home')}
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
    text: {
        fontSize: 36,
        fontFamily: 'Poppins-Regular',
        alignItems: "center",
        color: color.brandPurple,
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
    button: {
        marginBottom: 15,
        padding: 16,
        backgroundColor: 'pink',
        borderRadius: 24,
        marginTop: 16,
    },
});