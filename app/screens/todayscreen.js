import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
// import { NavigationContext } from "../context";
// import firebase from 'firebase';
import GHeader from '../components/GHeader';
import SVGIcon from '../components/SVGIcon/SVGIcon';
import { redBgAuth, blueBgAuth } from '../assets/icons/authBgIcons';
import { color } from '../assets/constant';

export const TodayScreen = (props) => {
  return (
        <View style={styles.container}>
            <GHeader/>
            <View style={styles.redBg}>
                <SVGIcon height={100} width={165} src={redBgAuth}/>
            </View>
            <View style={styles.blueBg}>
                <SVGIcon height={198} width={171} src={blueBgAuth}/>
            </View>
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.text}>Hi Lisa!</Text>
        </View>
        </View>
  );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 36,
        alignItems: "center",
        color: color.brandPurple,
    },
    redBg: {
        position: 'absolute',
        transform: [
            {
                translateX: 250
            },
        ]
    },
    blueBg: {
        transform: [
            {
                translateY: 350
            },
            {
                translateX: -50
            }
        ]
    },
});
