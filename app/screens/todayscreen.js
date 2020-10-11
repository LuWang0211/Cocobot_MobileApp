import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
// import { NavigationContext } from "../context";
import GHeader from '../components/GHeader';
import SVGIcon from '../components/SVGIcon/SVGIcon';
import { redBgAuth, blueBgAuth } from '../assets/icons/authBgIcons';
import { color } from '../assets/constant';
// import { Card, ListItem } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import cocobotIcon from '../assets/icons/cocobot-icon';


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
        <View>
            <Text style={styles.text}>Hi Lisa!</Text>
        </View>
        
        <TouchableOpacity activeOpacity={0.6} style={styles.card}>
            <View style={{flex: 3, flexDirection: 'row'}}>
                <View style={{flex: 1}} >
                    <SVGIcon height="40" width="40" src={cocobotIcon} />
                </View>
                <View style={{flex: 2}} >
                    <Text style={styles.cardTitle}>You will learn meditation</Text>
                </View>
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
        marginBottom: 40,
        padding: 50,
        backgroundColor: "powderblue",
        borderRadius: 24,
        marginTop: 16,
    },
    cardTitle: {
        color: '#454545',
        fontSize: 16,
    },
});
