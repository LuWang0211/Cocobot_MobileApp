import React from "react";
import { View } from 'react-native';
import svg from '../../assets/icons/send-icon';
import SVGIcon from '../SVGIcon/SVGIcon';
import { crossAppNotification, EventsNames } from "../../config";
import { TouchableOpacity } from "react-native-gesture-handler";

const SendButton = () => {
  return (
    <TouchableOpacity style={{
      backgroundColor: "#3E41A8",
      width: 40,
      height: 40,
      paddingVertical: 10,
      borderRadius: 50,
      marginBottom: -7,
      marginLeft: 5,
      marginRight: -4
    }}
      onPress={() => {
        crossAppNotification.emit('TypingReasonDone');
      }}
      >
      <SVGIcon
        width="40"
        height="20"
        src={svg} 
/>
    </TouchableOpacity>
  )
}

export default SendButton;
