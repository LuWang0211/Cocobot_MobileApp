import React, { Component } from 'react';
import {StyleSheet, View, Text, Button, ImageBackground, RefreshControlComponent} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Video from 'react-native-video';
import Sound from 'react-native-sound';
import { ChatScreen } from './chatscreen';

export const ResourceScreen = (props) => {
  const image = { uri: "https://wonderfulengineering.com/wp-content/uploads/2014/07/free-android-mobile-phone-wallpaper-610x976.jpg" };
  
  playTrack = () => {
        this.sound = new Sound('https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav', null, (e) => {
          if (e) {
            console.log('error loading track:', e)
          } else {
            this.sound.play(this.playComplete)
          }
      })
    } 
  
  playComplete = (success) => {
    if(this.sound){
      if (success) {
        props.navigation.navigate('Chat');
        console.log('successfully finished playing');
      }else{
        console.log('playback failed due to audio decoding errors');
      }
    }
  } 

  pauseTrack = () => {
      this.sound.pause()
    }
  
    // medidation: https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/01_Breathing_Meditation.mp3
    // ding: 'https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav', null, (e) => {



  return (
      
      <View style={ styles.container }>
        <ImageBackground source={image} style={styles.image}>
          <Text style = {styles.text}>Resource Screen</Text> 
          <Button title="play me" onPress={this.playTrack} />
          <Button title="pause" onPress={this.pauseTrack} />
        </ImageBackground> 
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },


  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  btn: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
})