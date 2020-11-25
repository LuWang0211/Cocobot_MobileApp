import React, { useState, useCallback, useEffect, useReducer, useRef, useContext } from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppHeader from "../components/AppHeader/AppHeader";
import { GiftedChat, Bubble, Send, InputToolbar, MessageText, Composer, IMessage, Message, SystemMessage } from 'react-native-gifted-chat';
import { Reminder, ChatRating, ResourceImage, SkipSession, ResourceImage2 } from '../components/ChatComponents/ChatWidgets/ChatWidgets';
import SVGIcon from '../components/SVGIcon/SVGIcon';
import cocobotIcon from '../assets/icons/cocobot-icon';
import { crossAppNotification, EventsNames } from "../config";
import Modal from 'react-native-modal';
import ChatQuickReplies from "../components/ChatComponents/QuickReply/QuicReplyRadio";
import BackButton from "../components/HeaderComponents/BackButton";
import SendButton from '../components/ChatComponents/SendButton';
import { WorkflowRunner, GreetingNode } from "./chatWorkflow/workflow";
import { SessionContext } from "../context";
import { color } from '../assets/constant';
import Icon from "react-native-vector-icons/Entypo";
import * as Animatable from 'react-native-animatable';

export const ChatScreen = (props) => {
    const navigation = useNavigation();

    const {session, dispatch} = useContext(SessionContext);

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);


    const [chatMsgId, setChatMsgId] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modelContent, setModelContent] = useState(<View/>);


    const tellScheduleMessage = useCallback((mesageText) => {
      const message = {
        _id: chatMsgId,
        text: mesageText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'User',
          // avatar: 'https://placeimg.com/140/140/any',
          // avatar: '../assets/coco.png',
        },
      }

      setChatMsgId(chatMsgId + 1);

      onSend([message]);
    }, [chatMsgId, setChatMsgId])

    const [quickReplySelections, setQuickReplySelections] = useState({});

    const onQuickReply = useCallback((selection) => {
      const {msgId, selection: selected} = workflowRunner.current.onQuickReply(selection);

      console.log('onQuickReply chat screen', msgId, selected);

      setQuickReplySelections({
        ...quickReplySelections,
        [msgId]: selected
      });
    }, [quickReplySelections, setQuickReplySelections, messages, setMessages]);


    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    const onModelCloseCallback = useRef();

    const showModelAbility = useCallback((content, title, onClose) => {
      console.log('showModelAbility', title);
      setModelContent(content);
      setModalTitle(title);
      setShowModal(true);
      onModelCloseCallback.current = onClose;
    }, []);

    const workflowRunner = useRef(new WorkflowRunner(new GreetingNode(), onSend,
      navigation.navigate, showModelAbility));

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

      if (!!onModelCloseCallback.current) {
        onModelCloseCallback.current();
      }
    }, [setShowModal]);


    const onRenderQuickReplies = useCallback((props) => {
      const messgeId = props.currentMessage._id;
      const selection = quickReplySelections[messgeId];
      const fadeIn = {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      };
      return (
        <Animatable.View animation={fadeIn} duration={200}>
          <ChatQuickReplies {...props} selection={selection} />
        </Animatable.View>
        );
    }, [quickReplySelections]);

    const renderBubble = (props) => {
      let stretchBubbleStyle = {};
      let shadowStyle = {};
      const fadeIn = {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      };

      // console.log('renderBubble', props.currentMessage);
      if (props.currentMessage.type !== 'text' && props.currentMessage.stretch) {
        stretchBubbleStyle = {
          alignSelf: 'stretch',
          marginRight: 10,
          marginLeft: 5,
          borderColor: '#F5F5F5',
          borderWidth: props.currentMessage.type === 'tutorial' ? 0 : 2,
          padding: 0
        }
      } else if (props.currentMessage.type === 'tutorial' || props.currentMessage.type === 'chatResource') {
        shadowStyle = {
          shadowColor: 'rgba(199, 199, 199, 0.75)',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 1,
          elevation: 5,
          zIndex: 5000,
        }
      }
      // Bubble Defaul Props when quick reply
      if (props.currentMessage.type == 'QuickReply') {
        return (
          <Animatable.View animation={fadeIn} duration={150}>
            <Bubble {...props} />
          </Animatable.View>
          );
      }
      // show resource image
      if (props.currentMessage.type == 'ShowResource') {
        const playerdata = props.currentMessage.data;
        console.log('ShowResource', playerdata)

        return (
            <ResourceImage
              key={playerdata.id}
              name={playerdata.name}
              label={[
              {
                  category: playerdata.category,
                  abouttext: playerdata.about,
              },
              ]}
              resourceImage={playerdata.image}
              type={playerdata.type}
              author={playerdata.author}
              audiouri={playerdata.audiouri}
              backgroundImage={playerdata.pictureuri}
          />
        );
      }

      // show resource image
      if (props.currentMessage.type == 'ShowResource2') {
        const playerdata = props.currentMessage.data;
        console.log('ShowResource2', playerdata)

        return (
            <ResourceImage2
              key={playerdata.id}
              name={playerdata.name}
              label={[
              {
                  category: playerdata.category,
                  abouttext: playerdata.about,
              },
              ]}
              resourceImage={playerdata.image}
              type={playerdata.type}
              author={playerdata.author}
              audiouri={playerdata.audiouri}
              backgroundImage={playerdata.pictureuri}
          />
        );
      }

      // show rating
      if (props.currentMessage.type == 'ShowRating') {
        return (
          <ChatRating />
        );
      }

      // skip session
      if (props.currentMessage.type == 'SkipSession') {
        return (
          <Animatable.View animation={fadeIn} duration={150}>
            <SkipSession text={props.currentMessage.text} />
          </Animatable.View>
        );
      }

      // end chating session
      if (props.currentMessage.type == 'EndSession') {
        return (
          <Animatable.View animation={fadeIn} duration={150}>
            <View>
              <Text style={styles.smalltext}> Chatting Session Ended </Text>
            </View>
          </Animatable.View>
        );
      }
      return (
        <Animatable.View animation={fadeIn} duration={150}>
          <Bubble
          {...props}
          wrapperStyle={{
            left: {
              ...styles.wrapperStyle,
              width: props.currentMessage.fullWidth? "84%" :null,
              backgroundColor: props.currentMessage.background ? props.currentMessage.background : '#EDEDED',
              marginLeft: 5,
              padding: props.currentMessage.type === 'chatResource' ? 0 : 5,
              ...stretchBubbleStyle,
              ...shadowStyle
            },
            right: {
              ...styles.wrapperStyle,
              overflow: 'hidden',
              backgroundColor: props.currentMessage.type === 'userSelection' ? 'transparent' : '#E9ECFF',
            }
          }}
          textStyle={{
            left: styles.messageTextStyle,
            right: styles.messageTextStyle,
          }}
          />
        </Animatable.View>
      )
    };

    const renderMessageText = (props) => {
      console.log("renderMessageText");
      const {
        currentMessage,
      } = props;
      const {
        text: currText,
        type: messageType,
      } = currentMessage;
      switch(messageType) {
        case 'text':
          return <MessageText { ...props } />;
        default:
          return (
            <View>
              <MessageText { ...props }/>
            </View>
          );
      }
    };

    const renderSend = (props) => {
      return (
        <Send {...props}>
          <View style={{ paddingRight: 10, paddingBottom: 5 }}>
            <SendButton />
          </View>
        </Send>
      );
    };

    const renderInputToolbar = (props) => {
      return (
         <InputToolbar {...props} containerStyle={styles.inputToolbarStyle} />
      )
    };

    const renderSystemMessage = (props) => {

    }

    useEffect(() => {
      // subscribe to random message request
      const subscription = crossAppNotification.addListener(EventsNames.NotificationScheduled, (eventData) => {
        console.log('NotificationScheduled captured', eventData);

        // tellScheduleMessage(`You have a notification scheduled at ${eventData.scheduledTime}`);
      });

      return () => {
        subscription.remove();
      };
    }, [tellScheduleMessage]);

    return (
      <>
      <HeaderComponent/>
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
          renderSystemMessage={(props) => <SystemMessage
            {...props}
            containerStyle={{ paddingBottom: 5 }}
            wrapperStyle={{ width: "60%" }}
            textStyle={{ textAlign: "center" }}/>}
          renderBubble={renderBubble} // input text styles
          renderMessageText={renderMessageText}
          renderAvatar={null}
          renderQuickReplies={onRenderQuickReplies}
          renderTime={() => {}}
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          lightboxProps={{ springConfig: { tension: 90000, friction: 90000 } }}
          textInputStyle={styles.textInputStyle}
          alwaysShowSend={true}
        />
      </View>
      <View>
          <Modal isVisible={showModal} style={{
            padding: 0,
          }} >
            <View style={styles.modalContent}>
              <View style={styles.modalContentTitle}>
                <Text style={styles.modalTitle}>{modalTitle}</Text>
                <Icon name={"cross"} size={32} style={{
                  marginRight: 25
                }} onPress={onModalClose} />
              </View>
              <View style={styles.modelContentBody}>
                {modelContent}
              </View>
            </View>
          </Modal>
      </View>
      </>
    )
}

/**

 {
  <View style={{
    backgroundColor: 'yellow',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    display:'flex',
    flexGrow: 1
  }} >
    <Image
      source={{ uri: "https://media.giphy.com/media/cKoHrJDJq0RSof5PIV/giphy.gif" }}
      style={{ width: 100, height: 100, backgroundColor: 'red' }}
    />

  </View>
}
 */

export const HeaderComponent = () => {
  const navigation = useNavigation();

  return <AppHeader
      leftComponent={<BackButton onPress={() => navigation.navigate("Today")} />}
      centerComponent={<SVGIcon height="40" width="40" src={cocobotIcon} />}
      headerStyle={styles.header}
    />
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 80 : 110,
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
    marginBottom: 5,
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
  smalltext: {
    padding: 15,
    left: 110,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: "lightgray"
  },
  modalTitle: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    lineHeight: 59,
    color: color.bodyTextGrey,
    textAlign: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContentTitle: {
    flexShrink: 1,
    width: '100%',
    height: 59,
    padding: 0,
    flexDirection: 'row',
    backgroundColor: color.chatBubbleGrey,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modelContentBody: {
    flexGrow: 1,
    padding: 22,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
