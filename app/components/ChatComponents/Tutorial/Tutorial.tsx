import React from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SVGIcon from '../../SVGIcon/SVGIcon';
import { IMAGE_SOURCE, HEADER_TEXT, CONTENT_TEXT, BUTTON_TEXT, BUTTON_FUNCTION } from './constants';

interface ModalProps {
  tooltipType: string;
  stage: number;
  onClose(): any;
  onPress: (btnFx: object) => void;
}

interface TaskProps {
  onPress: () => void;
  currentMessage: Message;
}

interface Message {
  text: string;
  subType: string;
}

export const TutorialModal = ({ tooltipType, stage, onClose, onPress }: ModalProps) => {
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 20,
      overflow: 'hidden'
    },
    headerStyle: {
      backgroundColor: '#F5F5F5',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      paddingLeft: 15,
    },
    headerTextStyle: {
      zIndex: 5,
      elevation: 5,
      fontFamily: 'Poppins-Medium',
      color: '#454545',
      fontSize: 16,
      marginRight: '-100%'
    },
    contentStyle: {
      alignItems: 'center',
      padding: 15,
      backgroundColor: 'white'
    },
    buttonStyle: {
      alignItems: 'center',
      borderRadius: 25,
      justifyContent: 'center',
      padding: 5,
      marginTop: 20,
      backgroundColor: '#3E41A8',
      paddingLeft: 30,
      paddingRight: 30
    },
    buttonTextStyle: {
      fontFamily: 'Poppins-Regular',
      color: 'white',
      fontSize: 13
    }
  });
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>{HEADER_TEXT[tooltipType]}</Text>
        <View style={{height: '100%'}}>
          <SVGIcon height='60' width="110" src={IMAGE_SOURCE[tooltipType]} />
        </View>
      </View>
      <View style={styles.contentStyle}>
        <Text>{CONTENT_TEXT[tooltipType][stage]}</Text>
        {BUTTON_TEXT[tooltipType][stage] !== null ?
          <TouchableOpacity onPress={() => {
            if (BUTTON_FUNCTION[tooltipType][stage] === null) {
              onClose();
            } else {
              onPress(BUTTON_FUNCTION[tooltipType][stage]);
            }
          }} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>{BUTTON_TEXT[tooltipType][stage]}</Text>
          </TouchableOpacity> : null}
      </View>
    </View>
  );
}

export const TutorialTask = ({ currentMessage, onPress }: TaskProps) => {
  const styles = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
      paddingLeft: 15,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden'
    },
    textStyle: {
      zIndex: 5,
      elevation: 5,
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
      color: '#454545',
      marginRight: '-100%'
    }
  });

  return (
    <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
      <Text style={styles.textStyle}>{currentMessage.text}</Text>
      <View style={{height: '100%'}}>
        <SVGIcon height="60" width="110" src={IMAGE_SOURCE[currentMessage.subType]} />
      </View>
    </TouchableOpacity>
  );
}
