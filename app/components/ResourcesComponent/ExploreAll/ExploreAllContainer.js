import React, { useContext } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import ExploreCard from "./ExploreCard";
import CONTENT from "./constants";

const ExploreAllContainer = (props) => {
  return (
    <React.Fragment>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTextStyle}>Explore All</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("ResourceList", {
            category: "All"
          });
        }}>
          <Text style={{ fontFamily: "Poppins-Medium", color: "#3E41A8" }}>See All</Text>
        </TouchableOpacity>
      </View>
      <View>
        {CONTENT.map((item, i) => {
          return (
            <View key={i} style={styles.exploreListContainer}>
              <Text style={styles.exploreTitleStyle}>{item.title}</Text>
              <View style={styles.exploreList}>
                {item.types.map((card, index) => {
                  return <ExploreCard key={index} color={item.color} category={card.category} svg={card.svg} />
                })}
              </View>
            </View>
          )
        })}
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
    paddingRight: 0,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20
  },
  exploreListContainer: {
    marginHorizontal: 25,
    marginVertical: 15,
  },
  exploreTitleStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    marginBottom: 5,
    color: "#454545"
  },
  exploreList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});

export default ExploreAllContainer;
