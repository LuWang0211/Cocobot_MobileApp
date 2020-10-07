import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface Props {
  onCancel(): void;
  onSubmit(): void;
}

const ButtonGroup = ({ onCancel, onSubmit }: Props) => {
  const styles = StyleSheet.create({
    buttonsContainer: {
      padding: 15,
      paddingTop: 0,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    leftButtonStyle: {
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#3E41A8',
      padding: 5,
      justifyContent: 'center',
      marginTop: 20,
      width: '35%'
    },
    rightButtonStyle: {
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: '#3E41A8',
      padding: 5,
      justifyContent: 'center',
      marginTop: 20,
      width: '35%'
    },
    leftButtonTextStyle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: '#3E41A8',
    },
    rightButtonTextStyle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: 'white'
    }
  });

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={onCancel} style={styles.leftButtonStyle}>
        <Text style={styles.leftButtonTextStyle}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSubmit} style={styles.rightButtonStyle}>
        <Text style={styles.rightButtonTextStyle}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
};

export default ButtonGroup;
