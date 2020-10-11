import React, { useState } from "react";
import { useMemoOne, useCallbackOne } from 'use-memo-one';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import SVGIcon from '../../SVGIcon/SVGIcon';
import SVGIconButton from '../../SVGIcon/SVGIconButton';
import ButtonGroup from './ButtonGroup';
import Slider from './Slider/Slider';
import { reselectIcon } from '../../../assets/icons/chatSelectIcons';
import { surveyHeaderImg } from '../../../assets/icons/chatComponentHeaderIcons';
import { checkBoxOff, checkBoxOn } from '../../../assets/icons/chatSelectIcons';
import { reminderHeaderImg } from '../../../assets/icons/chatComponentHeaderIcons';
import heartIcon from '../../../assets/icons/heart-filled-icon';
import { calendarIcon, clockIcon, repeatIcon } from '../../../assets/icons/chatReminderIcons';

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
  label: object[];
}

interface Reminder {
  times: string[];
  repeat: string[];
  start: string;
}

export const UserSelection = ({ text, parent, onReselect }: ChatWidgetsProps) => {
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#E9ECFF',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 7,
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    bolded: {
      fontWeight: '700'
    },
    reselectContainer: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    reselctTextStyle: {
      color: '#3E41A8',
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      fontStyle: 'italic'
    }
  });

  return (
    <React.Fragment>
      <View style={styles.containerStyle}>
        <Text><Text style={styles.bolded}>You selected: </Text>{text}</Text>
      </View>
      <TouchableOpacity style={styles.reselectContainer} onPress={() => onReselect(parent)}>
        <SVGIcon height="15" width="25" src={reselectIcon} />
        <Text style={styles.reselctTextStyle}>Change selection</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export const SymptomSurvey = ({ onSurvey }: ChatWidgetsProps) => {
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
      overflow: 'hidden'
    },
    headerTextStyle: {
      fontFamily: 'Poppins-Medium',
      color: '#454545',
      letterSpacing: 0,
      fontSize: 16
    },
    contentStyle: {
      alignItems: 'center',
      flex: 1,
      padding: 15,
      backgroundColor: 'white'
    },
    buttonStyle: {
      alignItems: 'center',
      borderRadius: 25,
      padding: 5,
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: '#3E41A8',
      width: '60%'
    },
    buttonTextStyle: {
      fontFamily: 'Poppins-Regular',
      color: 'white',
      fontSize: 14
    }
  });
  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}>Symptom Screening Survey</Text>
        <View style={{height: '100%'}}>
          <SVGIcon height="92" width="110" src={surveyHeaderImg} />
        </View>
      </View>
      <View style={styles.contentStyle}>
        <Text>Please complete the 5-minute symptom screening survey before you chat with CocoBot.</Text>
        <TouchableOpacity onPress={onSurvey} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Start the Survey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ChatChoice = ({ selected, choices, message, onCancel, onSubmit }: ChatWidgetsProps) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(selected);
  const styles = StyleSheet.create({
    containerStyle: {
      borderRadius: 20,
      overflow: 'hidden'
    },
    contentStyle: {
      flex: 1,
      paddingTop: 15
    },
    choice: {
      flexDirection: 'row',
      paddingRight: 25,
      paddingLeft: 25,
      paddingTop: 8,
      paddingBottom: 8,
    },
    choiceTextStyle: {
      fontFamily: 'Poppins-Regular',
      paddingLeft: 15,
      color: '#454545'
    }
  });
  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentStyle}>
        {choices.map((data, key) => {
          return (
            <View key={key}>
              {toggleCheckBox == key ?
                  <TouchableOpacity style={styles.choice}>
                    <SVGIcon height="20" width="20" src={checkBoxOn} />
                    <Text style={styles.choiceTextStyle}>{data}</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={()=>{setToggleCheckBox(key)}} style={styles.choice}>
                    <SVGIcon height="20" width="20" src={checkBoxOff} />
                    <Text style={styles.choiceTextStyle}>{data}</Text>
                  </TouchableOpacity>
              }
            </View>
          )
        })}
      </View>
      <ButtonGroup onCancel={onCancel} onSubmit={() => {
        if (toggleCheckBox !== null) {
          onSubmit({
            ...message,
            selectedText: choices[toggleCheckBox]
          });
        }
      }} />
    </View>
  );
};

export const ChatSlider = ({ count, selected, min, max, message, onCancel, onSubmit }: ChatWidgetsProps) => {
  const [contentWidth, measureWidth] = useState<number | null>(null);
  const [sliderSelection, updateSelection] = useState(selected);
  const styles = StyleSheet.create({
    containerStyle: {
      borderRadius: 20,
      overflow: 'hidden'
    },
    contentStyle: {
      margin: 15,
      marginBottom: 0,
      flex: 1,
      paddingTop: 15
    },
    textStyle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      textAlign: 'center',
      color: '#6D6A6A'
    }
  });

  const onUpdate = useCallbackOne((val = []) => {
    updateSelection(val);
  }, []);

  const slider = useMemoOne(
    () => contentWidth !== null ? <Slider totalWidth={contentWidth} count={count} value={sliderSelection} onUpdate={onUpdate} /> : null,
    [contentWidth]
  );

  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentStyle} onLayout={(e) => measureWidth(e.nativeEvent.layout.width)}>
        {slider}
        <Text style={styles.textStyle}>0 = {min}, 10 = {max}</Text>
      </View>
      <ButtonGroup onCancel={onCancel} onSubmit={() => {
        onSubmit({
          ...message,
          selected: sliderSelection,
          selectedText: sliderSelection
        });
      }} />
    </View>
  );
};

export const ChatResource = ({ text, label, resourceImage }: ChatWidgetsProps) => {
const labelBackground = {
  Symptoms: "#D4F2F9",
  SymptomManagement: "#D4F7DA",
  ChildCondition: "#D4F2F9",
  Other: "#FCE4EC"
};

  const styles = StyleSheet.create({
    imageStyle: {
      resizeMode: "cover",
      height: 80
    },
    textStyle: {
      fontFamily: 'Poppins-Medium',
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      fontSize: 14,
      color: '#454545'
    },
    footer: {
      padding: 15,
      justifyContent: "space-between",
      flexDirection: "row"
    },
    labels: {
      flexDirection: "row",
    },
    labelText: {
      fontFamily: 'Poppins-Regular',
      color: "#6D6A6A",
      borderRadius: 12,
      paddingLeft: 8,
      paddingRight: 8,
      marginRight: 5,
      textTransform: "uppercase"
    }
  });
  return (
    <TouchableOpacity>
      <ImageBackground source={{uri: resourceImage}} style={styles.imageStyle} />
      <Text style={styles.textStyle}>{text}</Text>
      <View style={styles.footer}>
        <View style={styles.labels}>
          {label.map(({ text, category }, key) => {
            return <Text style={{...styles.labelText, backgroundColor: labelBackground[category]}} key={key}>{text}</Text>
          })}
        </View>
        <SVGIconButton height="24" width="24" src={heartIcon} onPress={() => alert("toggle like")} />
      </View>
    </TouchableOpacity>
  )
};

export const Reminder = ({ text, reminder, onCancel, onSetReminder }: ChatWidgetsProps) => {
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
    }
  });

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
