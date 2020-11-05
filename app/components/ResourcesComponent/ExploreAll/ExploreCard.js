import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
// import { NavigationContext } from "../../../context";
import SVGIcon from '../../SVGIcon/SVGIcon';

const ExploreCard = (props) => {
  // const navigation = useContext(NavigationContext);
  return (
    <TouchableOpacity
      style={{ ...styles.cardShadowStyle, backgroundColor: props.color }}
      onPress={() => {
        // navigation.navigate("ResourceList", {
        //   category: props.category
        // });
      }}>
      <View style={styles.exploreCard}>
        <Text style={styles.cardTextStyle}>{props.category}</Text>
        <View style={{ position: "absolute", right: 5, bottom: -5 }}>
          <SVGIcon width="70" height="70" src={props.svg} color={props.stroke}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardShadowStyle: {
    shadowColor: 'rgba(199, 199, 199, 0.65)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    elevation: 3,
    borderRadius: 15,
    zIndex: 5000,
    marginVertical: 8,
  },
  exploreCard: {
    height: Platform.OS === 'ios' ? 70 : 80,
    width: (Dimensions.get('window').width - 50) * 0.5 - 8,
    overflow: "hidden"
  },
  cardTextStyle: {
    position: "absolute",
    width: "90%",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    bottom: 5,
    left: 10,
    color: "#454545",
    zIndex: 999
  }
});

export default ExploreCard;
