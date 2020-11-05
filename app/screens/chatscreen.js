import React, { useState, useCallback, useEffect, useReducer, useRef } from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat, Bubble, Send, InputToolbar, MessageText, Composer, IMessage } from 'react-native-gifted-chat';
import SVGIcon from '../components/SVGIcon/SVGIcon';
import cocobotIcon from '../assets/icons/cocobot-icon';
import { crossAppNotification, EventsNames } from "../config";
import Modal from 'react-native-modal';
import { color as colorConstants} from '../assets/constant';
import ChatQuickReplies from "../components/ChatComponents/QuickReply/QuicReplyRadio";
import BackButton from "../components/HeaderComponents/BackButton";
import SendButton from '../components/ChatComponents/SendButton';
import { WorkflowRunner, GreetingNode } from "./chatWorkflow/workflow";

const textInputReducer = (state, action) => {
  switch (action.type) {
    case "showQuickReply":
      return { ...state, showInput: false, options: action.options }
    case "hideQuickReply":
      return { ...state, showInput: true, option: [] }
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
    data: 'Hi, Lisa, how do you want to start the session?',
    control: 'unstarted'
  },
  {
    type: 'ask',
    data: [{label: 'Unguided'}, {label: 'Guided'}],
    selection: undefined,
    control: 'unstarted'
  },
  {
    type: 'tell',
    data: 'Sounds good! Let’s get started!',
    control: 'unstarted'
  },
  {
    type: 'tell',
    data: 'How are you feeling right now?',
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
  {
    type: 'surprise',
    data: {
      title: 'Congratulations!',
      content: 'You’ve just finishied your first meditation for this week.',
      gifs: [
        'https://media.giphy.com/media/cKoHrJDJq0RSof5PIV/giphy.gif',
        'https://media.giphy.com/media/Y0nfCLTb1T5C4XvE54/giphy.gif'
      ]
    },
    control: 'unstarted'
  },  
];

function generateDogsAndCats (size) {
  const dd = ["🐈", "🐕", "🐎", "🐼"];

  let out = "";

  for (let i = 0; i < size; i++) {
    const a = dd[Math.floor(Math.random() * dd.length)];
    out += a;
  }

  return out;
}

function processSurpriseStep(step, setStep, moveNextStep, tellMessage, setShowModal, setModelContent) {
  const { data, control} = step;

  if (control == 'unstarted') {
    const {title, content, gifs} = data;

    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const modelContent = 
      (<View style={styles.modalContent}>
        <Image 
            source={{uri: gif}}  
            style={{width: 100, height: 100 }} 
        />
        <Text style={styles.modalContentTitle}>{title}</Text>
        <Text style={styles.modalContentBody}>{content}</Text>
        <Text style={styles.modalContentBody}>{generateDogsAndCats(10)}</Text>
      </View>);

    setModelContent(modelContent);
    setShowModal(true);

    setStep({
      ...step,
      control: 'shown'
    });
  }
}

function jumpStep(step, setStep, allSteps, moveNextStep, tellMessage, askMessage, setShowModal, setModelContent, navigation) {
  const { data, control} = step;

  if (control == 'unstarted') {
    const methodStep = allSteps[1];

    if (methodStep.selection == 'Guided') {
      tellMessage(data);
      setStep({
        ...step,
        control: 'guidedStep'
      });
    } else if (methodStep.selection == 'Unguided') {
      setStep({
        ...step,
        control: 'unguidedStep'
      });
    }
    
  } else if (control == 'guidedStep') {
    setTimeout(() => {
      setStep({
        ...step,
        control: 'waiting'
      });

      const subscription = crossAppNotification.addListener(EventsNames.ResourcePlayDone, () => {
        console.log('ResourcePlayDone captured');

        setStep({
          ...step,
          control: 'done'
        });
        
        subscription.remove();
      });

      navigation.navigate('ContentDetails');
    }, 1000);
  } else if (control == 'unguidedStep') {
    tellMessage('Now waiting for 5 minutes. You can do meditation by following your own resource');

    setStep({
      ...step,
      control: 'unguidedStep2'
    });
    
  } else if (control == 'unguidedStep2') {
    setTimeout(() => {
      setStep({
        ...step,
        control: 'unguidedPopup'
      });
    }, 5000);
  } else if (control == 'unguidedPopup') {
    const modelContent = 
      (<View style={styles.modalContent}>
        <Text style={styles.modalContentTitle}>{'unguided program is completed!'}</Text>
        {/* <Text style={styles.modalContentBody}>{generateDogsAndCats(10)}</Text> */}
      </View>);

      const subscription = crossAppNotification.addListener(EventsNames.ModalClose, () => {
        console.log('ModalClose captured');

        setStep({
          ...step,
          control: 'done'
        });
        
        subscription.remove();
      });

    setModelContent(modelContent);
    setShowModal(true);

  } else if ( control === 'done') {
    moveNextStep();
  }
}


export const ChatScreen = (props) => {
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [state, dispatch] = useReducer(textInputReducer, initialState);
    const [user, setUser] = useState(null);

    const [stepId, setStepId] = useState(0);
    const [allSteps, setAllSteps] = useState([]);

    const [step, setStep] = useState(chatPlan[stepId]);
    const [chatMsgId, setChatMsgId] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [modelContent, setModelContent] = useState(<View/>);
    const [moveNextStepWaiting, setMoveNextStepWaiting] = useState(false);
    

    const moveNextStep = useCallback(() => {
      if (!!moveNextStepWaiting) {
        return;
      }

      setMoveNextStepWaiting(true);
      setAllSteps(allSteps.concat(step));

      setTimeout(() => {
        setStepId(stepId + 1);
        setStep(chatPlan[stepId + 1]);
        setMoveNextStepWaiting(false);
      }, 1000);
      
    }, [step, setStep, stepId, setStepId, moveNextStepWaiting, setMoveNextStepWaiting]);

    

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

    const askMessage = useCallback((options, selection) => {
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
          values: options.map(opt => {
            let label = '';
            if (typeof opt == 'string') {
              label = opt;
            } else {
              label = opt.label;
            }
            return {
              title: label,
              value: label
            }
        })
        },
        data: {
          selection
        }
      };

      setChatMsgId(chatMsgId + 1);

      onSend([message]);
    }, [chatMsgId, setChatMsgId]);


    const tellSceduleMessage = useCallback((mesageText) => {
      const message = {
        _id: chatMsgId,
        text: mesageText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
          avatar: '../assets/coco.png',
        },
      }

      setChatMsgId(chatMsgId + 1);

      onSend([message]);
    }, [chatMsgId, setChatMsgId])


    useEffect(() => {
      return;
      if (stepId >= chatPlan.length) {
        return;
      }

      if (moveNextStepWaiting) {
        return;
      }

      const { type, data, selection, control} = step;

      if (type == 'tell') {
        tellMessage(data);
        moveNextStep();
      } 
      
      if (type == 'ask') {
        if (control == 'unstarted') {
          askMessage(data, selection);

          setStep({
            ...step,
            control: 'getInput'
          })
        } else if (control == 'done') {
          moveNextStep();
        }        
      } 
      
      if (type == 'jump') {
        jumpStep(step, setStep, allSteps, moveNextStep, tellMessage, askMessage, setShowModal, setModelContent, navigation);
      }

      if (type == 'surprise') {
        processSurpriseStep(step, setStep, moveNextStep, tellMessage, setShowModal, setModelContent)
      }

    }, [step, setStep, stepId, setStepId, moveNextStep, tellMessage]);

    const [quickReplySelections, setQuickReplySelections] = useState({});

    const onQuickReply = useCallback((selection) => {
      const {msgId, selection: selected} = workflowRunner.current.onQuickReply(selection);
     
      console.log('onQuickReply chat screen', msgId, selected);

      setQuickReplySelections({
        ...quickReplySelections,
        [msgId]: selected
      });
    }, [quickReplySelections, setQuickReplySelections, messages, setMessages]);

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

    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);


    const workflowRunner = useRef(new WorkflowRunner(new GreetingNode(), onSend));

    const [stepCounter, setStepCounter] = useState();

    useEffect(() => {
      const runner = workflowRunner.current;

      (async () => {
        const stepId = await runner.run();

        console.log(stepId);

        setStepCounter(stepId);
      })();

    }, [stepCounter, setStepCounter]);


    const onModalClose = useCallback(() => {
      setShowModal(false);
      crossAppNotification.emit(EventsNames.ModalClose);
    }, [setShowModal]);


    const onRenderQuickReplies = useCallback((props) => {
      const messgeId = props.currentMessage._id;      
      const selection = quickReplySelections[messgeId];
      return <ChatQuickReplies {...props} selection={selection} /> ;
    }, [quickReplySelections]);


    const renderSend = (props) => {
      return (
        <Send {...props}>
          <View style={{ paddingRight: 10, paddingBottom: 10 }}>
            <SendButton />
          </View>
        </Send>
      );
    };

    useEffect(() => {
      // subscribe to random message request
      const subscription = crossAppNotification.addListener(EventsNames.NotificationScheduled, (eventData) => {
        console.log('NotificationScheduled captured', eventData);

        tellSceduleMessage(`You have a notification scheduled at ${eventData.scheduledTime}`);
      });

      return () => {
        subscription.remove();
      };
    }, [tellSceduleMessage]);

    return (
      <>
      {<HeaderComponent/>}
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <GiftedChat
          alignTop
          messages={messages}
          onInputTextChanged={text => dispatch({ type: "setTextInput", textInput: text })}
          onSend={messages => onSend(messages)}
          onQuickReply={onQuickReply}
          user={{
            _id: 1,
          }}
          renderQuickReplies={onRenderQuickReplies}
          renderTime={() => {}}

          renderSend={renderSend}
          lightboxProps={{ springConfig: { tension: 90000, friction: 90000 } }}
          textInputStyle={styles.textInputStyle}
          alwaysShowSend={true}
        />
      </View>
      <View>
          <Modal isVisible={showModal}  onBackdropPress={onModalClose}>
            {modelContent}
          </Modal>
      </View>
      </>
    )
}

export const HeaderComponent = () => {
  const navigation = useNavigation();

  return <View style={styles.header}>
      <View style={{position: 'absolute', left: 0}}>
        <BackButton onPress={() => navigation.navigate("Today")} />
      </View>
      <SVGIcon height="40" width="40" src={cocobotIcon} />
  </View>
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    // height: Platform.OS === 'ios' ? 80 : 110,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'rgba(199, 199, 199, 0.75)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    elevation: 5,
    zIndex: 999,
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContentTitle: {
    fontSize: 26,
    lineHeight: 39,
    marginBottom: 12,
    color: colorConstants.brandPurple
  },
  modalContentBody: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
    color: 'black'
  },
})