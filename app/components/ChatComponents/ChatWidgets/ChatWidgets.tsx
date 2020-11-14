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
  const navigation = useNavigation();

  const [Touchablestate, setTouchablestate] = useState(false);

  return (
    <TouchableOpacity disabled={Touchablestate}
      onPress={() => {
        setTouchablestate(true);
        crossAppNotification.emit('ResourcePlayStarted'),
        navigation.navigate("ContentDetails", {data: {
          type, name, author, audiouri, backgroundImage
        }});
      }}
    >
      {/* <Text> testing </Text> */}
      <View>
        <Image style={styles.tinyLogo} source={{uri: resourceImage}}/>
        <Icon name ='play' style={styles.playicon} size={30} />

      </View>
    </TouchableOpacity>
  )
}

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
            setDisable(false);
            // console.log("rating", Rating);
            // console.log("rating", value);
            crossAppNotification.emit('RatingDone', value);
          }
        }
        />
        <Text style={styles.ratingtext}> Please rate the exercise to help coco learn your preferences! </Text>
    </View>
  )
}


export const SkipSession = () => {
  const [Touchablestate, setTouchablestate] = useState(false);
  return (
    <TouchableOpacity disabled={Touchablestate}
      onPress={() => {
        setTouchablestate(true);
      }}
    >
      <View style={{flexDirection: "row", justifyContent:'space-around', left: 20}}>
        <Icon name ='corner-up-right' style={styles.skipicon} size={20} />
        <Text style={styles.skiptext}> Skip this step </Text>
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
  rating: {
    alignItems: 'flex-start',
    left: 25,
  },
  ratingtext: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: "lightgray"
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