import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import SVGIconButton from "../SVGIcon/SVGIconButton";
import heartIcon from "assets/icons/heart-icon";

interface Props {
  text: string;
  label: string;
  resourceImage: string;
}

const ResourceCard = ({ text, label, resourceImage }: Props) => {
  const labelBackground = {
    Symptoms: "#D4F2F9",
    SymptomManagement: "#D4F7DA",
    ChildCondition: "#D4F2F9",
    Other: "#FCE4EC"
  };

  const styles = StyleSheet.create({
    container: {
      marginRight: 20,
      width: 250,
      backgroundColor: "#FFF",
      overflow: "hidden",
      borderRadius: 20,
      shadowColor: 'rgba(199, 199, 199, 0.65)',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 1,
      padding: 0,
      elevation: 5,
      zIndex: 5000,
    },
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
      backgroundColor: "#D4F2F9",
      paddingLeft: 8,
      paddingRight: 8,
      marginRight: 5,
      textTransform: "uppercase"
    }
  });
  return (
      <View style={styles.container}>
        <TouchableOpacity>
          <ImageBackground source={{uri: resourceImage}} style={styles.imageStyle} />
          <Text style={styles.textStyle}>{text}</Text>
          <View style={styles.footer}>
            <View style={styles.labels}>
              {label.map(({ text, category }, key) => {
                return <Text style={{ ...styles.labelText, backgroundColor: labelBackground[category] }} key={key}>{text}</Text>
              })}
            </View>
            <SVGIconButton height="24" width="24" src={heartIcon} onPress={() => alert("toggle like")} />
          </View>
        </TouchableOpacity>
      </View>
  )
};

export default ResourceCard;
