import React, { useCallback } from "react"
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { clockRunning } from "react-native-reanimated";
import {color} from "../../../assets/constant"

const ChatQuickReplies = (props) => {
    const {selection, color, currentMessage, onQuickReply} = props;

    const quickReplies = currentMessage.quickReplies;

    const handleSend = useCallback((reply) => () => {
        if (onQuickReply) {
            onQuickReply([
                {
                    ...reply,
                    messageId: currentMessage!._id,
                }
            ]);
        }
    }, [onQuickReply]);

    return <View style={styles.container}>
    {props.currentMessage.quickReplies!.values.map((reply) => {
        const selected = reply.value == selection;
        return (
        <TouchableOpacity
            onPress={handleSend(reply)}
            style={[
            styles.quickReply,
            { borderColor: '#3E41A8' },
                selected && styles.quickReplySelected
            ]}
            key={reply.value}
        >
            <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={[
                selected ? styles.textSelected: styles.text
            ]}
            >
            {reply.title}
            </Text>
        </TouchableOpacity>
      )
    })}
  </View>;
};


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: 250,
      borderWidth: 0,
      borderRadius: 20,
      backgroundColor: 'rgb(233,236,255)',
      padding: 15
    },
    quickReply: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      maxWidth: 200,
      paddingVertical: 7,
      paddingHorizontal: 12,
      height: 31,
      borderRadius: 15,
      margin: 3,
    //   color: color.brandPurple,
      fontWeight: "500"
    },
    quickReplySelected: {
        justifyContent: 'center',
        borderColor: color.brandPurple,
        backgroundColor: color.brandPurple
    },
    text: {
        color: color.brandPurple
    },
    textSelected: {
        color: 'white'
    }
  })

export default ChatQuickReplies;
