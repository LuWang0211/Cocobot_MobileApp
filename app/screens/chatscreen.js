import React, { useState, useCallback, useEffect, useReducer } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat, Bubble, Send, InputToolbar, MessageText, Composer, IMessage } from 'react-native-gifted-chat';
import { Header } from 'react-native-elements';
import SVGIcon from '../components/SVGIcon/SVGIcon';
import cocobotIcon from '../assets/icons/cocobot-icon';
import { crossAppNotification} from "../config";



const textInputReducer = (state, action) => {
  switch (action.type) {
    case "startTutorial":
      return { ...state, tutorial: true, showInput: false, options: action.options }
    case "endTutorial":
      return { ...state, tutorial: false, showInput: true, options: [] }
    case "showQuickReply":
      return { ...state, showInput: false, options: action.options }
    case "hideQuickReply":
      return { ...state, showInput: true, option: [] }
    case "openTooltip":
      return { ...state, showInput: true, tooltip: true, position: action.position, textInput: action.textInput, tooltipType: action.subType, stage: 0 };
    case "nextTooltip":
      return { ...state, position: action.position, textInput: action.textInput, stage: state.stage + 1 }
    case "closeTooltip":
      return { ...state, showInput: !state.tutorial, tooltip: false, textInput: ""};
    case "setTextInput":
      return { ...state, textInput: action.textInput };
    default:
      return state;
  }
}

const initialState = {
  tutorial: false,
  tooltip: false,
  position: 'footer',
  textInput: "",
  tooltipType: null,
  showInput: true,
  options: []
}


const chatPlan = [
  {
    type: 'tell',
    data: 'Hi, Lisa, how are you feeling right now?',
    control: 'unstarted'
  },
  {
    type: 'ask',
    data: ['Anxious', 'Relaxed', 'Sad', 'Great', 'Tired', 'Okay', 'Can’t sleep', 'Other'],
    selection: undefined,
    control: 'unstarted'
  },
  {
    type: 'tell',
    data: 'I see, let’s start today’s session and hopefully you will feel better afterwards!',
    control: 'unstarted'
  },
  {
    type: 'jump',
    data: 'Starting meditation in 1 sec...',
    control: 'unstarted'
  },
  {
    type: 'tell',
    data: 'How is today’s meditation?',
    control: 'unstarted'
  },
  {
    type: 'ask',
    data: ['I don’t like it', 'it’s ok, I like it!'],
    selection: undefined,
    control: 'unstarted'
  },
  {
    type: 'tell',
    data: 'How are you feeling now?',
    control: 'unstarted'
  },
  {
    type: 'ask',
    data: ['Better', 'Same', 'Worse'],
    selection: undefined,
    control: 'unstarted'
  },
  {
    type: 'tell',
    data: [
      'Got it. Your feedback will help me provide better suggestions in the future! :)',
      'You are doing a good job taking care of yourself. Keep up the momentum!'
    ],
    control: 'unstarted'
  },  
];


export const ChatScreen = (props) => {
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [state, dispatch] = useReducer(textInputReducer, initialState);
    const [user, setUser] = useState(null);

    const [stepId, setStepId] = useState(0);
    const [step, setStep] = useState(chatPlan[stepId]);
    const [chatMsgId, setChatMsgId] = useState(1);

    const moveNextStep = useCallback(() => {
      setStepId(stepId + 1);
      setStep(chatPlan[stepId + 1]);
    }, [step, setStep, stepId, setStepId]);


    const tellMessage = useCallback((mesageText) => {
      if (mesageText instanceof Array) {
        mesageText = mesageText[Math.floor(Math.random() * mesageText.length)];
      }

      const message = {
        _id: chatMsgId,
        text: mesageText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
          // avatar: '../assets/coco.png',
        },
      }

      setChatMsgId(chatMsgId + 1);

      onSend([message]);
    }, [chatMsgId, setChatMsgId]);

    const askMessage = useCallback((options) => {
      const message = {
        _id: chatMsgId,
        text: '',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: options.map(opt => ({
            title: opt,
            value: opt
          }))
        }
      }

      setChatMsgId(chatMsgId + 1);

      onSend([message]);
    }, [chatMsgId, setChatMsgId]);

    useEffect(() => {
      if (stepId >= chatPlan.length) {
        return;
      }

      const { type, data, selection, control} = step;

      if (type == 'tell') {
        tellMessage(data);
        moveNextStep();
      } 
      
      if (type == 'ask') {
        if (control == 'unstarted') {
          askMessage(data);

          setStep({
            ...step,
            control: 'getInput'
          })
        } else if (control == 'done') {
          moveNextStep();
        }        
      } 
      
      if (type == 'jump') {
        if (control == 'unstarted') {
          tellMessage(data);

          setStep({
            ...step,
            control: 'scheduled'
          });
          
        } else if (control == 'scheduled') {

          setTimeout(() => {

            setStep({
              ...step,
              control: 'waiting'
            });

            const subscription = crossAppNotification.addListener('ResourcePlayDone', () => {
              console.log('ResourcePlayDone captured');

              setStep({
                ...step,
                control: 'done'
              });
              
              subscription.remove();
            });

            navigation.navigate('Resources');
          }, 1000);
        } else if ( control === 'done') {
          moveNextStep();
        }
      }

    }, [step, setStep, stepId, setStepId]);


    const onQuickReply = useCallback((selection) => {
      if (step.type != 'ask') {
        return;
      }

      setStep({
        ...step,
        selection: selection[0].value,
        control: 'done'
      });
    }, [step, setStep]);

    const onSelect = (parent) => {
      const newMessage = {
        _id: parent._id,
        type: 'userSelection',
        text: parent.selectedText,
        parent: parent,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'user'
        }
      }
      setMessages(previousMessages => previousMessages.map((item) => {
        return item._id === parent._id ? newMessage : item;
      }));
    };

    const onReselect = (parent) => {
      setMessages(previousMessages => previousMessages.map((item) => {
        return item._id === parent._id ? parent : item;
      }));
    };
   

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
      <>
      {<HeaderComponent/>}
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>Chat Screen</Text>
        <GiftedChat
          messages={messages}
          onInputTextChanged={text => dispatch({ type: "setTextInput", textInput: text })}
          // renderInputToolbar={renderInputToolbar}
          // renderMessageText={renderMessageText}
          onSend={messages => onSend(messages)}
          onQuickReply={onQuickReply}
          user={{
            _id: 1,
          }}
        />
      </View>
      </>
    )
}

export const HeaderComponent = () => {
  return <View style={styles.header}>
      <SVGIcon height="30" width="30" src={cocobotIcon} />
  </View>
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  btn: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  wrapperStyle: {
    margin: 2,
    padding: 5,
    marginBottom: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  messageTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#454545'
  },
  textInputStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#3E41A8',
    paddingHorizontal: 15,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingTop: 8
      }
    }),
  },
  inputToolbarStyle: {
    zIndex: 1000,
    backgroundColor: '#F5F5F5',
    padding: 5,
  },
  modalTopStyle: {
    justifyContent: 'flex-start',
    bottom: undefined,
    top: 100
  },
  modalBottomStyle: {
    justifyContent: 'flex-end',
    bottom: 60,
    top: undefined
  },
})