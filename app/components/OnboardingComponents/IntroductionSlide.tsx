import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import SVGIcon from '../SVGIcon/SVGIcon';
import { OnboardingContext } from "../../context";
import swipeIcon from 'assets/icons/swipe-icon';
import onboardIntroIcons from 'assets/icons/onboardIntroIcons';

const { width, height } = Dimensions.get('screen');

interface Props {
  header: string;
  text: string;
  icon: string;
  index: number;
}

const IntroductionSlide = ({ header, text, icon, index }: Props) => {
  const styles = StyleSheet.create({
    iconContainerStyle: {
      backgroundColor: "transparent",
    },
    titleStyle: {
      fontFamily: 'Poppins-Bold',
      fontSize: 32,
      color: "#3E41A8"
    },
    textStyle: {
      margin: 20,
      textAlign: "center",
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
      color: "#737373"
    },
    tooltip: {
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
      color: "#737373"
    },
    startButton: {
      position: "absolute",
      bottom: height * 0.1,
      backgroundColor: "#FF796E",
      borderRadius: 25,
      width: width / 3,
      padding: 7,
      justifyContent: "center",
      alignItems: "center"
    },
    buttonTextStyle: {
      color: "white",
      fontFamily: 'Poppins-Regular',
    }
  });

  const navigation = useContext(OnboardingContext);

  return (
    <React.Fragment>
      <View style={styles.iconContainerStyle}>
        <SVGIcon height={height * 0.4} width={width} src={onboardIntroIcons[index]} />
      </View>
      <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
        <Text style={styles.titleStyle}>{header}</Text>
        <Text style={styles.textStyle}>{text}</Text>
        {index === 0 ? <View style={{position: "absolute", bottom: height * 0.2, height: 50}}><SVGIcon height="250" width="320" src={swipeIcon} /></View> : null}
        {index === 3 ?
          <TouchableOpacity onPress={() => navigation.navigate("Privacy")} style={styles.startButton}>
            <Text style={styles.buttonTextStyle}>Let's start!</Text>
          </TouchableOpacity> : null}
      </View>
    </React.Fragment>
  )
}

export default IntroductionSlide;
