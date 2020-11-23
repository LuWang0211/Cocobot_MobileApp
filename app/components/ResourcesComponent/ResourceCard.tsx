import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
// import { NavigationContext } from "../../context";
import { useNavigation } from "@react-navigation/native";
import SVGIconButton from "../SVGIcon/SVGIconButton";
import heartIcon from "../../assets/icons/heart-icon";
import { labelBackground } from "../../constant";
import { ResourcePlayContext } from "../../context";

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

export const ResourceCard = (props: Props) => {
  // console.log("Resource Card Props", props);
  const { name, label, resourceImage, type, author, audiouri, backgroundImage } = props;

  const navigation = useNavigation();
  // console.log('Resource Card', props);
  return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ borderRadius: 20, overflow: "hidden" }}
          onPress={() => {
            navigation.navigate("ContentDetails", {data: {
              type, name, author, audiouri, backgroundImage
            }});
          }}>
          <ImageBackground source={{uri: resourceImage}} style={styles.imageStyle} />
          <Text style={styles.textStyle}>{name}</Text>
          <View style={styles.footer}>
            <View style={styles.labels}>
              { 
                label.map(({ abouttext, category }, key) => {
                  return <Text style={{ ...styles.labelText, backgroundColor: labelBackground[category] }} key={key}>{abouttext}</Text>
                })
              }
            </View>
            {/* <SVGIconButton height="24" width="24" src={heartIcon} onPress={() => alert("toggle like")} /> */}
          </View>
        </TouchableOpacity>
      </View>
  )
};

// export default 123345;

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
    height: 100
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
