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
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

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
  label: Label[];
  resourceImage: string;
  imageURI: string;
}

interface Reminder {
  times: string[];
  repeat: string[];
  start: string;
}

interface Label {
  category: string;
  text: string;
}

interface ResourceImage {
  imageURI: string;
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

export const ChatRating = () => {
  const [rating, setRating] = useState(0);
  const [disable, setDisable] = useState(false);
  return (
    <View>
      <AirbnbRating
        defaultRating={rating}
        isDisabled={disable}
        showRating={false}
        selectedColor="#3E41A8"
        onFinishRating={(value) => {
            setRating(value);
            setDisable(true);
          }
        }
        />
    </View>
  )
}

export const ResourceImage = (props: ResourceImage) => {
  const { imageURI } = props;
  console.log("uri", props);
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {navigation.navigate("ContentDetails",{data: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/01_Breathing_Meditation.mp3"})}}>
      <Icon name ='play' size={30}/>
      <Image
        style={styles.tinyLogo} 
        source={{uri: "https://reactnative.dev/img/tiny_logo.png"}}/>
      <Text> testing </Text>
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
});