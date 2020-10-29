import React, { Component } from 'react';
import {StyleSheet, View, Text, Button, ImageBackground, RefreshControlComponent} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ChatScreen } from './chatscreen';


export const ResourceScreen = (props) => {
  return (   
      <View style={ styles.container}>
          <Text style = {styles.text}> ResourceScreen </Text> 
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  text: {
    color: "white",
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