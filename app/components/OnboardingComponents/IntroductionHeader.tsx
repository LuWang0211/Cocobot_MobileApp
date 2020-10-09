import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import AppHeader from '../AppHeader/AppHeader';
import { OnboardingContext } from "../../context";
const { width, height } = Dimensions.get('screen');

const IntroductionHeader = () => {
  const navigation = useContext(OnboardingContext);
  const styles = StyleSheet.create({
    headerStyle: {
      height: "12%",
      backgroundColor: 'white',
      borderBottomWidth: 0
    },
    textStyle: {
      fontFamily: 'Poppins-Regular',
      color: "#737373",
      marginRight: 7
    }
  });

  return (
    <AppHeader
      rightComponent={
        <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
          <Text style={styles.textStyle}>
            Skip intro
          </Text>
        </TouchableOpacity>
      }
      headerStyle={styles.headerStyle}
    />
  )
}

export default IntroductionHeader;
