import React, { Component } from 'react';
import {StyleSheet, View, Text, Button, ImageBackground, RefreshControlComponent} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import Video from 'react-native-video';
import Sound from 'react-native-sound';
import { ChatScreen } from './chatscreen';
import { crossAppNotification } from "../config";

let meditationResources = [
  {name:"Breathing Meditation", audiouri: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/01_Breathing_Meditation.mp3", pictureuri: "https://i.pinimg.com/originals/fd/8d/bf/fd8dbf3f0b8ceed5c2fbd37ab512d901.jpg"},
  {name:"5-min Meditation", audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/LifeHappens5MinuteBreathing.mp3", pictureuri:"https://s1.1zoom.me/b6756/963/Stones_Closeup_Equilibrium_Balance_511958_640x960.jpg"},
  {name:"Ding Test", audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav", pictureuri:"https://images.ctfassets.net/v3n26e09qg2r/60rE9vaE6cMIIgiYuYSuoi/6a489ad7611102d432deaa5ba3a45f1a/SXSW_Meditating_Character_with_Headphones_1.png"}
]
export const ResourceScreen = (props) => {
  let RandomIndex = Math.floor(Math.random() * meditationResources.length);
  const meditation = meditationResources[RandomIndex];
  
  // let newIndex = Math.floor(Math.random() * 3);
  changeState = () => {
    this.setState = ({index: newIndex});
    // return newIndex
  }
  
  playTrack = (audiouri) => {
        this.sound = new Sound(audiouri, null, (e) => {
          if (e) {
            console.log('error loading track:', e)
          } else {
            this.sound.setVolume(4);
            this.sound.play(this.playComplete);             
            // console.log(this.state.index, newIndex)
          }
      })
    } 
  
  playComplete = (success) => {
    if(this.sound){
      if (success) {
        props.navigation.navigate('Chat');
        crossAppNotification.emit('ResourcePlayDone');
        console.log('successfully finished playing');
      }else{
        console.log('playback failed due to audio decoding errors');
      }
    }
  } 

  pauseTrack = () => {
      this.sound.pause()
    }

  return (   
      <View style={ styles.container} onLoad={changeState, this.playTrack(meditation.audiouri) }>
        <ImageBackground source={{uri: meditation.pictureuri}} style={styles.image}>
          <Text style = {styles.text}> {meditation.name} </Text> 
          {/* <Button title="play me" onPress={this.playTrack(meditation.audiouri)} /> */}
          {/* <Button title="pause" onPress={this.pauseTrack} /> */}
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