import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import GHeader from '../components/GHeader';
import SVGIcon from '../components/SVGIcon/SVGIcon';
import { redBgAuth, blueBgAuth } from '../assets/icons/authBgIcons';
import { color } from '../assets/constant';
// import { Card, ListItem } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import cocobotIcon from '../assets/icons/cocobot-icon';
import { createNavigatorFactory, useNavigation } from "@react-navigation/native";


export const TodayScreen = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <GHeader/>
            <View style={styles.redBg}>
                <SVGIcon height={100} width={165} src={redBgAuth}/>
            </View>
            <View style={styles.blueBg}>
                <SVGIcon height={198} width={171} src={blueBgAuth}/>
            </View>
            <View>
                <Text style={styles.text}>Hi Lisa!</Text>
            </View>
            
            <TouchableOpacity activeOpacity={0.6} style={styles.card} onPress={() => navigation.navigate("Chat")}>
                <View>
                    <SVGIcon height="45" width="45" src={cocobotIcon} />
                </View>
                <View>
                    <Text style={styles.cardTitle}>You will learn meditation</Text>
                    <Text style={styles.cardboby}>Talk Now</Text>
                </View>
            </TouchableOpacity> 
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'        
      },
    text: {
        fontSize: 36,
        alignItems: "center",
        color: color.brandPurple,
        left: 20,
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
    card: {
        flex: 3,
        flexDirection: 'row',
        padding: 60,
        alignItems: "center",
        backgroundColor: '#F1F3FE',
        borderRadius: 20,
        justifyContent: "space-between",
        left: 16,
        width:370,
        // alignItems: "center",

    },
    cardTitle: {
        color: '#454545',
        height: 54,
        fontSize: 16,
        right: 150,
        alignItems: "center",
    },
    cardboby: {
        color: color.brandPurple,
        fontSize: 12,
    },
});
