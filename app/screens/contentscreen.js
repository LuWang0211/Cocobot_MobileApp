import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, SafeAreaView, View, Text, Button, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Sound from 'react-native-sound';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';  //Media Controls to control Play/Pause/Seek and full screen

import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';
import { useTrackPlayerProgress, useTrackPlayerEvents } from 'react-native-track-player/lib/hooks';
import { Slider, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Slider from "react-native-slider";

import { useNavigation } from "@react-navigation/native";

import BackButton from "../components/HeaderComponents/BackButton";

import { crossAppNotification } from "../config";

const meditationResources = [
  {name:"Breathing Meditation", duration:"5 min", audiouri: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/01_Breathing_Meditation.mp3", pictureuri: "https://i.pinimg.com/originals/fd/8d/bf/fd8dbf3f0b8ceed5c2fbd37ab512d901.jpg"},
  // {name:"4-min Meditation", duration:"4 min", audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/LifeHappens5MinuteBreathing.mp3", pictureuri:"https://s1.1zoom.me/b6756/963/Stones_Closeup_Equilibrium_Balance_511958_640x960.jpg"},
 {name:"Ding Test", duration:"1 min", audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav", pictureuri:"https://images.ctfassets.net/v3n26e09qg2r/60rE9vaE6cMIIgiYuYSuoi/6a489ad7611102d432deaa5ba3a45f1a/SXSW_Meditating_Character_with_Headphones_1.png"}
]

let RandomIndex = Math.floor(Math.random() * meditationResources.length);
const meditation = meditationResources[RandomIndex];


const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    ],
  });
  await TrackPlayer.add({
    url: meditation.audiouri,
    type: 'default',
    name: meditation.name,
    pictureuri: meditation.pictureuri,
  });
  return true;
};


export const ContentScreen = (props) => {
  const navigation = useNavigation();

  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const {position, duration} = useTrackPlayerProgress(1000);

  useEffect(() => {
    const startPlayer = async () => {
       let isInit =  await trackPlayerInit();
       setIsTrackPlayerInit(isInit);
    }
    startPlayer();
  }, []);
 
   //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue( position / duration);
    }
  }, [position, duration]);
 
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });
 
  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      //setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      //setIsPlaying(false);
    }
  };

  const jumpForwardPressed =() => {
    console.log('playforward')
    let newPosition = position;
    // console.log(newPosition, duration);
    newPosition += 15;
    if (newPosition > duration) {
      newPosition = duration;
    }
    TrackPlayer.seekTo(newPosition);
  };

  const jumpBackwardPressed =() => {
    console.log('playback')
    let newPosition = position;
    newPosition -= 15;
    if (newPosition < 0) {
      newPosition = 0;
    }
    TrackPlayer.seekTo(newPosition);
  };

  const stepforwarddPressed =() => {
    console.log('stepforward')
    let newPosition = duration;
    TrackPlayer.seekTo(newPosition);
  };

  const stepBackwardPressed =() => {
    console.log('stepBackward')
    let newPosition = 0;
    TrackPlayer.seekTo(newPosition);
  };
 
  const slidingStarted = () => {
    setIsSeeking(true);
  };
 
  const slidingCompleted = async value => {
    await TrackPlayer.seekTo( value * duration);
    setSliderValue(value);
    setIsSeeking(false);
  };

  const convertMS = (value) => {
    const sec = parseInt(value, 10); // convert value to number if it's string

    let minutes = Math.floor(sec / 60); // get minutes
    let seconds = Math.floor(sec % 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+ seconds; // Return is MM : SS
  };

  return ( 
    <>  
      <View style={ styles.container}>
          <ImageBackground source={{uri: meditation.pictureuri}} style={styles.image}>

          {/* <View style={styles.header}>
            <View style={{position: 'absolute', left: 0}}>
              <BackButton onPress={() => navigation.navigate("Today")} />
            </View>
          </View> */}
            <View style={{alignItems: 'stretch', padding:15, }}>
              <Text style = {styles.text}> {meditation.name} </Text> 
              <Text style = {styles.smalltext}> {meditation.duration} </Text>
            </View>

            <View style={{flexDirection: "row"}}>
              <Icon raised name='step-backward' size={30} onPress={stepBackwardPressed} disabled={!isTrackPlayerInit} color='white' />

              <Icon raised name='rotate-left' size={30} onPress={jumpBackwardPressed} disabled={!isTrackPlayerInit} color='white' />
              <Badge value="15" containerStyle={{ backgroundColor:'transparent', top: 5, left: -25}}/>

              <Icon raised name={isPlaying ? 'pause' : 'play'} size={30} onPress={onButtonPressed} disabled={!isTrackPlayerInit} color='white' />

              <Icon raised name='rotate-right' size={30} onPress={jumpForwardPressed} disabled={!isTrackPlayerInit} color='white' text={15} />
              <Badge value="15" containerStyle={{top: 5, left: -25}}/>

              <Icon raised name='step-forward' size={30} onPress={stepforwarddPressed} disabled={!isTrackPlayerInit} color='white' />
            </View>

            <View style={{alignItems: 'stretch', padding:15, justifyContent:'space-around' }}>
              <Slider
                onValueChange={(value) => this.setState({ value })}
                minimumValue={0}
                maximumValue={1}
                value={sliderValue}
                onSlidingStart={slidingStarted}
                onSlidingComplete={slidingCompleted}
                thumbTintColor='white'
                minimumTrackTintColor="white"
                maximumTrackTintColor="lightgray"
              />
              <Text style={styles.smalltext}>{convertMS(position)}  {convertMS(duration-position)}</Text>
            </View>

            <Text style = {styles.smalltext}> { Math.floor(position,0) == Math.floor(duration,0) ? 'Exercise Session Has Ended ' : ''}</Text>

            <View style = { styles.btn }>
                <TouchableOpacity activeOpacity={0.6} style={styles.card} onPress={() => navigation.goBack()}>
                      <Text style={styles.cardboby}>Go back</Text>
              </TouchableOpacity> 
            </View>
          </ImageBackground>
      </View>
    </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },


  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
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
    marginBottom: 50,
    marginHorizontal: 100,
  },

  progressBar: {
    height: 150,
    paddingBottom: 90,
  },

  card: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderColor:"white",
    borderWidth: 2,
  },
  cardboby: {
      color: "white",
      fontSize: 15,
  },
})