import React from "react";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onPress(): any;
}

const SOSButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>SOS</ Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 80,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#FF786A",
    borderRadius: 25,
  },
  text: {
    color: "#FF786A",
  }
});

export default SOSButton;
