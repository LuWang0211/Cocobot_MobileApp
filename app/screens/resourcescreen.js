import React, { Component } from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity, RefreshControlComponent} from 'react-native';
import AppHeader from "../components/AppHeader/AppHeader";
import { tabsHeader } from "../assets/styles";
import LeftHeader from "../components/AppHeader/LeftHeader";
import SOSButton from "../components/HeaderComponents/SOSButton";
import { color } from '../assets/constant';
import { useNavigation } from "@react-navigation/native";


export const ResourceScreen = (props) => {
  const navigation = useNavigation();
  return (   
      <View style={ styles.container}>
          <AppHeader
            leftComponent={() => <LeftHeader/>}
            rightComponent={<SOSButton/>}
            headerStyle={{...tabsHeader, position: "absolute", right: 0, left: 0}}
          />
          <Text style = {styles.text}> ResourceScreen </Text> 

            {/* testvideo */}
          <TouchableOpacity activeOpacity={0.6} style={styles.card} onPress={() => navigation.navigate("ContentDetails")}>
            <View>
                <Text style={styles.cardboby}>testvideo</Text>
            </View>
          </TouchableOpacity> 
          {/* testvideo */}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  text: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 200,
    marginBottom: 20,
  },
  smalltext: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginHorizontal: 100,
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
})