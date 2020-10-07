import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

const ResourcesContainer = (props) => {
  return (
    <React.Fragment>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTextStyle}>{props.title}</Text>
        <Text style={{ fontFamily: "Poppins-Medium", color: "#3E41A8" }}>See All</Text>
      </View>
      <View>
        <ScrollView
          contentContainerStyle={styles.cardContainer}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          horizontal={true}>
          {props.children}
        </ScrollView>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#D8DEFF",
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleTextStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
    color: "#6D6A6A"
  },
  cardContainer: {
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default ResourcesContainer;
