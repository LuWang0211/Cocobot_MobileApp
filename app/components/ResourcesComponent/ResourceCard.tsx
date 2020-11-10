import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import SVGIconButton from "../SVGIcon/SVGIconButton";
// import { NavigationContext } from "../../context";
import { useNavigation } from "@react-navigation/native";
import heartIcon from "../../assets/icons/heart-icon";
import { labelBackground } from "../../constant";

interface Props {
  text: string;
  label: [];  // <- string <- Label[] 
  resourceImage: string;
  id: string;
}

// interface Label {
//   category: string;
//   text: string;
// }

const ResourceCard = ({ id, text, label, resourceImage }: Props) => {
  // const navigation = useContext(NavigationContext);
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      marginRight: 20,
      width: 250,
      backgroundColor: "#FFF",
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
      alignItems: "center",
    },
    labelText: {
      overflow: "hidden",
      fontFamily: 'Poppins-Regular',
      color: "#6D6A6A",
      fontSize: 12,
      borderRadius: 12,
      backgroundColor: "#D4F2F9",
      paddingHorizontal: 8,
      paddingVertical: 2,
      marginRight: 5,
      textTransform: "uppercase"
    }
  });
  return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ borderRadius: 20, overflow: "hidden" }}
          onPress={() => {
            navigation.navigate("ContentDetails");
          }}>
          <ImageBackground source={{uri: resourceImage}} style={styles.imageStyle} />
          <Text style={styles.textStyle}>{text}</Text>
          <View style={styles.footer}>
            <View style={styles.labels}>
              { 
                label.map(({ text, category }, key) => {
                  return <Text style={{ ...styles.labelText, backgroundColor: labelBackground[category] }} key={key}>{text}</Text>
                })
              }
            </View>
            {/* <SVGIconButton height="24" width="24" src={heartIcon} onPress={() => alert("toggle like")} /> */}
          </View>
        </TouchableOpacity>
      </View>
  )
};

export default ResourceCard;
