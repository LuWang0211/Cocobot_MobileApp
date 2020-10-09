import React from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  options: string[];
  onPress: (data: string) => void;
}

const QuickReply = ({ options, onPress }: Props) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: 'white',
      bottom: 0,
    },
    scrollContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 10,
      paddingTop: 8,
    },
    button: {
      backgroundColor: '#E9ECFF',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: '#3E41A8',
      padding: 3,
      paddingLeft: 10,
      paddingRight: 10,
      marginRight: 10,
      overflow: 'scroll'
    }
  });

  const renderButtons = () => {
    return options.map((data) => {
      return (
        <TouchableOpacity key={data} style={styles.button} onPress={() => onPress(data)}>
          <Text>{data}</Text>
        </TouchableOpacity>
      );
    })
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={true}
        horizontal={true}>
        {renderButtons()}
      </ScrollView>
    </View>
  );
}

export default QuickReply;
