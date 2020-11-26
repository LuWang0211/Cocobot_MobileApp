import React, { useState } from "react";
import { useMemoOne, useCallbackOne } from 'use-memo-one';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import SVGIcon from '../../SVGIcon/SVGIcon';
import SVGIconButton from '../../SVGIcon/SVGIconButton';
import ButtonGroup from './ButtonGroup';
import { reselectIcon } from '../../../assets/icons/chatSelectIcons';
import { surveyHeaderImg } from '../../../assets/icons/chatComponentHeaderIcons';
import { checkBoxOff, checkBoxOn } from '../../../assets/icons/chatSelectIcons';
import { reminderHeaderImg } from '../../../assets/icons/chatComponentHeaderIcons';
import heartIcon from '../../../assets/icons/heart-filled-icon';
import { calendarIcon, clockIcon, repeatIcon } from '../../../assets/icons/chatReminderIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { crossAppNotification, EventsNames } from "../../../config";
import { db } from './../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatWidgetsProps {
  text: string;
  parent: object;
  onReselect: (parent: object) => void;
  selected: number;
  choices: string[];
  message: object;
  onCancel: () => void;
  onSubmit: (parent: object) => void;
  reminder: Reminder;
  onSetReminder: () => any;
  min: string;
  max: string;
  count: number;
  onSurvey: () => void;
}

interface Reminder {
  times: string[];
  repeat: string[];
  start: string;
}

// Interface of ResoureceImage
interface ResourceImage {
  key: number;
  name: string;
  label: Label[];  // <- string <- Label[]
  resourceImage: string;
  type: string;
  author: string;
  audiouri: string;
  backgroundImage: string;
}

interface Label {
  category: [];
  abouttext: [];
}

export const Reminder = ({ text, reminder, onCancel, onSetReminder }: ChatWidgetsProps) => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{text}</Text>
        <View style={{height: '100%'}}>
          <SVGIcon height="92" width="110" src={reminderHeaderImg} />
        </View>
      </View>
      <View style={styles.contentStyle}>
        <View style={styles.rowStyle}>
          <SVGIcon height="20" width="20" src={calendarIcon} />
          <Text style={styles.rowTextStyle}>{reminder.start}</Text>
        </View>
        <View style={styles.rowStyle}>
          <SVGIcon height="20" width="20" src={clockIcon} />
          <Text style={styles.rowTextStyle}>{reminder.times.join(', ')}</Text>
        </View>
        <View style={styles.lastRowStyle}>
          <SVGIcon height="20" width="20" src={repeatIcon} />
          <Text style={styles.rowTextStyle}>{reminder.repeat}</Text>
        </View>
        <ButtonGroup onCancel={onCancel} onSubmit={onSetReminder} />
      </View>
    </View>
  );
};

export const ResourceImage = (props: ResourceImage) => {
  // console.log("Chat ResourceImage Props", props);
  const { name, label, resourceImage, type, author, audiouri, backgroundImage } = props;
  // console.log("uri", props);
  // const resourceRef = db.ref('LastRecommendedResource'); // get firebase.database().ref()
  // console.log("resourceRef", resourceRef);

  const navigation = useNavigation();

  const [Touchablestate, setTouchablestate] = useState(false);

  return (
    <View style={{flexDirection: "column"}} >
      <TouchableOpacity disabled={Touchablestate}
        onPress={() => {
          setTouchablestate(true);
          // resourceRef.update(props); // update data to firebase
          crossAppNotification.emit('ResourcePlayStarted'),
          navigation.navigate("ContentDetails", {data: {
            type, name, author, audiouri, backgroundImage
          }});
        }}
      >
        {/* <Text> testing </Text> */}
        <View>
          <Image style={styles.tinyLogo} source={{uri: resourceImage}}/>
          {/* <Image style={styles.tinyLogo} source={{uri: "https://picsum.photos/200/300"}}/>         */}
          <Icon name ='play' style={styles.playicon} size={30} />

        </View>
      </TouchableOpacity>
      <Text style={styles.resourceTitleText}>{props.name}</Text>
    </View>
  )
}

// export const ResourceImage2 = (props: ResourceImage) => {
//   // console.log("Chat ResourceImage Props", props);
//   const { name, label, resourceImage, type, author, audiouri, backgroundImage } = props;
//   // console.log("uri", props);
//   const resourceRef = db.ref('LastRecommendedResource'); // get firebase.database().ref()
//   // console.log("resourceRef", resourceRef);
//   return (
//       <View>
//         <Image style={styles.tinyLogo} source={{uri: resourceImage}}/>
//         {/* <Image style={styles.tinyLogo} source={{uri: "https://picsum.photos/200/300"}}/>  */}
//         <Text style={styles.playtext}> {name} </Text>

//       </View>
//   )
// }

export const ChatRating = () => {
  const [Rating, setRating] = useState(0);
  const [Disable, setDisable] = useState(false);
  return (
    <View style={styles.rating}>
            <AirbnbRating
              defaultRating={Rating}
              isDisabled={Disable}
              showRating={false}
              selectedColor="#3E41A8"
              size={25}
              onFinishRating={(value) => {
                  setRating(value);
                  setDisable(true);
                  // AsyncStorage.setItem('LastRatingScore', value.toString());
                  // console.log("rating", Rating);
                  // console.log("rating", value);
                  crossAppNotification.emit('RatingDone', value);
                }
              }
              />
    </View>
  )
}


export const SkipSession = ({ text }: ChatWidgetsProps) => {
  const [Touchablestate, setTouchablestate] = useState(false);
  return (
    <TouchableOpacity disabled={Touchablestate}
      onPress={() => {
        setTouchablestate(true);
        crossAppNotification.emit('SkipReasonDone');
      }}
    >
      <View style={{flexDirection: "row", justifyContent:'space-around', left: 20}}>
        <Icon name ='corner-up-right' style={styles.skipicon} size={20} />
        <Text style={styles.skiptext}>{text}</Text>
      </View>

    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingLeft: 15,
  },
  headerTextStyle: {
    fontFamily: 'Poppins-Medium',
    color: '#454545',
    letterSpacing: 0,
    fontSize: 16
  },
  contentStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
    paddingTop: 10,
    paddingLeft: 22,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#EDEDED'
  },
  lastRowStyle: {
    flexDirection: 'row',
    paddingRight: 30,
    paddingTop: 10,
    paddingLeft: 22,
  },
  rowTextStyle: {
    fontFamily: 'Poppins-Regular',
    paddingLeft: 20,
    color: '#454545'
  },
  tinyLogo: {
    width: 192,
    height: 108,
    borderRadius: 20,
  },
  playicon: {
    position: 'absolute',
    color: "white",
    left: 81,  // tinyLogo, width / 2
    bottom: 40, // tinyLogo, wiheightdth / 2
    // backgroundColor: 'red',
    // borderRadius: 100,
  },
  playtext: {
    position: 'absolute',
    color: "white",
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  resourceTitleText: {
    color: "#979797",
    textAlign: "center",
    fontSize: 12
  },
  rating: {
    alignItems: 'flex-start',
    left: 25,
  },
  skipicon: {
    color: "#3E41A8"
  },
  skiptext: {
    padding: 5,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'italic',
    fontSize: 13,
    color: "#3E41A8",
  },
});
