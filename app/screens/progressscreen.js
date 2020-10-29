import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const ProgressScreen = (props) => {
  return (   
      <View style={ styles.container}>
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