import React from 'react';
import { View, StyleSheet } from 'react-native';
import SVGIcon from '../SVGIcon/SVGIcon';
import cocobotIcon from 'assets/icons/cocobot-icon';

const Logo = (props) => {
    return (
        <View style={[styles.container, { ...props.style }]}>
            <SVGIcon height='64' width='64' src={cocobotIcon} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingVertical: 16,
    },
})

export default Logo;