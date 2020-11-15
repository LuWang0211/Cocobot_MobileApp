import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import SVGIconButton from "../SVGIcon/SVGIconButton";
import { useNavigation } from "@react-navigation/native";

import { labelBackground } from '../../constant';

interface Props {
  key: number;
  name: string;
  label: Label[];  // <- string <- Label[] 
  resourceImage: string;
  type: string;
  author: string;
  audiouri: string;
  backgroundImage: string;
}

interface Label {
  category: [];
  abouttext: [];
}

export const ResourceListCard = (props: Props) => {
  const { name, label, resourceImage, type, author, audiouri, backgroundImage } = props;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.shadowStyle}
      onPress={() => {
        navigation.navigate("ContentDetails", {data: {
          type, name, author, audiouri, backgroundImage
        }});
      }}>
      <View style={styles.container}>
        <View style={{ width: "35%", backgroundColor: "transparent" }}>
          <ImageBackground source={{uri: resourceImage}} style={styles.imageStyle} />
        </View>
        <View style={{justifyContent: "space-between", flex: 1, padding: 15}}>
          <View style={styles.contentStyle}>
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.textStyle}>{name}</Text>
            <Text style={styles.srcTextStyle}>{author}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.labels}>
              {label.map(({ abouttext, category }, key) => {
                return <Text style={{ ...styles.labelText, backgroundColor: labelBackground[category] }} key={key}>{abouttext}</Text>
              })}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default ResourceListCard;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: 'rgba(199, 199, 199, 0.65)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    zIndex: 5000,
    elevation: 5,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
  container: {
    flexDirection: "row",
    height: 175,
    overflow: "hidden",
    borderRadius: 20,
    padding: 0,
  },
  imageStyle: {
    flex: 1,
    resizeMode: "cover",
    width: "100%"
  },
  contentStyle: {
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  textStyle: {
    paddingTop: 5,
    height: 60,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#454545'
  },
  srcTextStyle: {
    padding: 0,
    textTransform: "uppercase",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#737373"
  },
  footer: {
    paddingTop: 15,
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
    fontSize: 12,
    color: "#6D6A6A",
    borderRadius: 12,
    backgroundColor: "#D4F2F9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
    textTransform: "uppercase"
  }
});
