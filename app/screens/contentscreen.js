import React, { useState, useRef, useEffect, useContext } from 'react';
import {StyleSheet, Dimensions, SafeAreaView, View, Text, Button, ImageBackground, Animated, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Sound from 'react-native-sound';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';  //Media Controls to control Play/Pause/Seek and full screen

import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING, STATE_STOPPED } from 'react-native-track-player';
import { useTrackPlayerProgress, useTrackPlayerEvents } from 'react-native-track-player/lib/hooks';
import { Slider, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
// import Slider from "react-native-slider";
import { useNavigation } from "@react-navigation/native";

import { crossAppNotification, ResourcePlayDone } from "../config";

// const meditationResources = [
//   //{type:"Meditation", name:"Breathing Meditation", author: "?author", duration:"5 min", audiouri: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/01_Breathing_Meditation.mp3", pictureuri: "https://i.pinimg.com/originals/fd/8d/bf/fd8dbf3f0b8ceed5c2fbd37ab512d901.jpg"},
//   //{type:"Meditation", name:"4-min Meditation", author: "?author", duration:"4 min", audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/LifeHappens5MinuteBreathing.mp3", pictureuri:"https://s1.1zoom.me/b6756/963/Stones_Closeup_Equilibrium_Balance_511958_640x960.jpg"},
//   {type:"Testing", name:"Ding Test",author: "?author",  duration:"1 min", audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav", pictureuri:"https://images.ctfassets.net/v3n26e09qg2r/60rE9vaE6cMIIgiYuYSuoi/6a489ad7611102d432deaa5ba3a45f1a/SXSW_Meditating_Character_with_Headphones_1.png"}
//   // {type:"Testing", name:"Youtube", author: "?author", duration:"5 min", audiouri: "https://www.youtube-nocookie.com/embed/47xfSnzp6j4?controls=0", pictureuri: "https://i.pinimg.com/originals/fd/8d/bf/fd8dbf3f0b8ceed5c2fbd37ab512d901.jpg"},

// ]

// let RandomIndex = Math.floor(Math.random() * meditationResources.length);
// const meditation = meditationResources[RandomIndex];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Initialize the Track Player
const trackPlayerInit = async (data) => {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    stopWithApp: true,
    // An array of media controls capabilities
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_JUMP_FORWARD,
      TrackPlayer.CAPABILITY_JUMP_BACKWARD,
    ],
  });
  await TrackPlayer.add({
    url: data.audiouri,
    title: data.name,
    artist: data.author,
    artwork: data.image,
  });
  return true;
};


export const ContentScreen = ({ route, navigation }) => {
  // const navigation = useNavigation();

  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const {position, duration} = useTrackPlayerProgress(500);

  // const testingdata =  props.navigation.getParam('data', 'nothing sent')
  const { data } = route.params;
  
  // console.log("ResourcePlayContext here", data);
  // console.log("isTrackPlayerInit 1", isTrackPlayerInit);
  // console.log("STATE_PLAYING, STATE_STOPPED", STATE_PLAYING, STATE_STOPPED); // STATE_PLAYING == 3, STATE_STOPPED == 1

  useEffect(() => {
    const startPlayer = async () => {
       let isInit =  await trackPlayerInit(data);
       setIsTrackPlayerInit(isInit);
      //  await TrackPlayer.add({
      //   url: data.audiouri,
      //   title: data.name,
      //   artist: data.author,
      //   artwork: data.image,
      // });
    }
    startPlayer();
  }, []);
 
   //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue( position / duration);
      setIsTrackPlayerInit(false);
    }
  }, [position, duration]);
 
  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
    console.log("event", event.state);
    if (event.state === STATE_PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });
 
  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      // setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      // setIsPlaying(false);
    }
  };

  const jumpForwardPressed =() => {
    // console.log('playforward')
    let newPosition = position;
    // console.log(newPosition, duration);
    newPosition += 15;
    if (newPosition > duration) {
      newPosition = duration;
    }
    TrackPlayer.seekTo(newPosition);
  };

  const jumpBackwardPressed =() => {
    // console.log('playback')
    let newPosition = position;
    newPosition -= 15;
    if (newPosition < 0) {
      newPosition = 0;
    }
    TrackPlayer.seekTo(newPosition);
  };

  const stepforwarddPressed =() => {
    // console.log('stepforward')
    let newPosition = duration;
    TrackPlayer.seekTo(newPosition);
  };

  const stepBackwardPressed =() => {
    // console.log('stepBackward')
    let newPosition = 0;
    TrackPlayer.seekTo(newPosition);
  };

  const slidingStarted = () => {
    setIsSeeking(true);
  };
 
  const slidingCompleted = async value => {
    console.log("value", value);
    await TrackPlayer.seekTo( value * duration);
    setSliderValue(value);
    setIsSeeking(false);
    
    console.log('successfully finished playing');
  };

  const resumePressed =() => {
    console.log('resumePressed')
    let newPosition = 0;
    TrackPlayer.seekTo(newPosition);
    TrackPlayer.play();
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
        <ImageBackground source={{uri: data.backgroundImage}} style={styles.image} blurRadius={1}>
          <View style={styles.overlay} >

            <View style={styles.header}>
              <View style={{position: 'absolute', left: 20}}>
                <Icon raised name='chevron-left' size={32} onPress={() => {crossAppNotification.emit('ResourcePlayDone'); navigation.goBack(); TrackPlayer.stop();}} style={{color:'white'}}/>
              </View>
              <Text style = {styles.title}> {data.type} </Text>
            </View>

            <View style={{alignItems: 'stretch'}}>
              <Text style = {styles.text}> {data.name} </Text> 
              <Text style = {styles.smalltext}> by {data.author} </Text>
            </View>

            <View style={{flexDirection: "row", justifyContent:'space-around', marginTop: 120, marginHorizontal: 50, padding:15}}>
              {Math.floor(position,0) == Math.floor(duration,0) && Math.floor(position,0) !== 0  ? 
                <Icon raised name='rotate-ccw' size={35} onPress={resumePressed} disabled={!isTrackPlayerInit} color='white' />
              :
                <>
                {/* <Icon raised name='skip-back' size={30} onPress={stepBackwardPressed} disabled={!isTrackPlayerInit} color='white' /> */}
                <TouchableOpacity onPress={jumpBackwardPressed} >
                  <Icon raised name='rotate-ccw' size={30} disabled={!isTrackPlayerInit} style={{color:'white'}} />
                  <Text style={{ color: "white", fontSize: 11, textAlign: "center", position: 'absolute',top: 7, right: 9 }}>15</Text>
                </TouchableOpacity>

                <Icon raised name={isPlaying ? 'pause' : 'play'} size={35} onPress={onButtonPressed} disabled={!isTrackPlayerInit} style={{color:'white'}} />

                <TouchableOpacity onPress={jumpForwardPressed} >
                  <Icon raised name='rotate-cw' size={30} disabled={!isTrackPlayerInit} style={{color:'white'}}/>
                  <Text style={{ color: "white", fontSize: 11, textAlign: "center", position: 'absolute',top: 7, right: 9 }}>15</Text>
                </TouchableOpacity>

                {/* <Icon raised name='skip-forward' size={30} onPress={stepforwarddPressed} disabled={!isTrackPlayerInit} color='white' /> */}
                </>
              }
            </View>

            <View style={{alignItems: 'stretch', padding: 15}}>
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
              <View style={{flexDirection: "row", justifyContent:'space-between'} }>
                <Text style = {styles.smalltext}>{convertMS(position)}</Text>
                <Text style = {styles.smalltext} >{convertMS(duration-position)}</Text>
              </View>
              
            </View>

            {/* <Text style = {styles.smalltext}> { Math.floor(position,0) == Math.floor(duration,0) && Math.floor(position,0) !== 0 ? 'Session ended ' : ''}</Text> */}

            <View style = { styles.btn }>
              { Math.floor(position,0) == Math.floor(duration,0) && Math.floor(position,0) !== 0  ? 
                <>
                <Text style = {{...styles.smalltext, marginBottom: 15 }}> Session ended </Text>
                <TouchableOpacity 
                  activeOpacity={0.6}
                  style={styles.card}
                  onPress={() => {
                    crossAppNotification.emit('ResourcePlayDone');
                    navigation.goBack()
                  }}
                >
                  <Text style={styles.btntext}>Go gack</Text>
                </TouchableOpacity> 
                </>
              : 
                <TouchableOpacity style = {{...styles.btn, color: "transprants"}}>
                  {/* <Text style={styles.btntext}>haha</Text> */}
                </TouchableOpacity> }
            </View>

          </View>
        </ImageBackground>
      </View>
    </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
  },
  image: {
    flex: 4,
    resizeMode: "cover",
    justifyContent: "center",
    
  },
  overlay: {
    flex: 4,
    backgroundColor:'rgba(0,0,0,0.25)',
    top: 0,
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
  },
  header: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: 80,
    marginBottom: 20,
  },
  smalltext: {
    color: "white",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  btn: {
    justifyContent: 'flex-end',
    marginBottom: 120,
    marginHorizontal: 100,
    // backgroundColor:"pink",
  },
  card: {
    padding: 5,
    alignItems: 'center',
    borderRadius: 20,
    borderColor:"white",
    borderWidth: 2,
  },
  btntext: {
      color: "white",
      fontSize: 15,
  },
})