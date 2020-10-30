import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppHeader from "../components/AppHeader/AppHeader";
import { tabsHeader } from "../assets/styles";
import LeftHeader from "../components/AppHeader/LeftHeader";
import SOSButton from "../components/HeaderComponents/SOSButton";


export const ProgressScreen = (props) => {
  return (   
      <View style={ styles.container}>
          <AppHeader
            leftComponent={() => <LeftHeader/>}
            rightComponent={<SOSButton/>}
            headerStyle={{...tabsHeader, position: "absolute", right: 0, left: 0}}
          />
          <Text style = {styles.text}> ProgressScreen </Text> 
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
})