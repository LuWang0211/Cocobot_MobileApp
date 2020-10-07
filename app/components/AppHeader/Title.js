import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { color } from '../../assets/constant';

function Title(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        marginBottom: 32,
        marginHorizontal: 32,
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        fontStyle: 'normal',
        lineHeight: 48,
        color: color.bodyTextGrey
    },
})

export default Title;