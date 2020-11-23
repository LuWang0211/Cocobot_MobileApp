import React, { Component } from 'react';
import {StyleSheet, View, Text, Button, ImageBackground, RefreshControlComponent, ScrollView} from 'react-native';
import AppHeader from "../components/AppHeader/AppHeader";
import { tabsHeader } from "../assets/styles";
import LeftHeader from "../components/AppHeader/LeftHeader";
import SOSButton from "../components/HeaderComponents/SOSButton";
import { color } from '../assets/constant';
import { useNavigation } from "@react-navigation/native";
import ResourcesContainer from "../components/ResourcesComponent/ResourcesContainer";
import ResourceCard from "../components/ResourcesComponent/ResourceCard";
import ExploreAllContainer from "../components/ResourcesComponent/ExploreAll/ExploreAllContainer";
import ExploreCard from "../components/ResourcesComponent/ExploreAll/ExploreCard";

const EMERGENCY_CARD = [
  {
    category: "Self Harm",
    backgroundColor: "#D4F2F9",
    color: "#C5E4EC"
  },
  {
    category: "Domestic Violence",
    backgroundColor: "#FCE4EC",
    color: "#FBC6C0"
  },
  {
    category: "Self Harm",
    backgroundColor: "#D4F2F9",
    color: "#C5E4EC"
  },
  {
    category: "COVID 19",
    backgroundColor: "#D4F7DA",
    color: "#C1EEC9"
  },
];

export const ResourceScreen = (props) => {
  return (
      <View style={{flex: 1}}>
          <AppHeader
            leftComponent={() => <LeftHeader/>}
            rightComponent={<SOSButton/>}
            headerStyle={{...tabsHeader}}
          />
          <ScrollView style={{flex: 1}}>
            <Text style={styles.HeaderStyle}>Resources</Text>
            <ResourcesContainer title="Favorites">
              <ResourceCard
                text="Want to Stay Hydrated? Drink Before You’re Thirsty"
                label={[{
                  category: "SymptomManagement",
                  text: "health"
                }]} resourceImage="https://images.unsplash.com/photo-1584444262846-e2716db1294b" />
              <ResourceCard
                text="Want to Stay Hydrated? Drink Before You’re Thirsty"
                label={[{
                  category: "SymptomManagement",
                  text: "health"
                }]} resourceImage="https://images.unsplash.com/photo-1584444262846-e2716db1294b" />
            </ResourcesContainer>
            <ResourcesContainer title="Suggested">
              <ResourceCard
                text="Want to Stay Hydrated? Drink Before You’re Thirsty"
                label={[{
                  category: "SymptomManagement",
                  text: "health"
                }]} resourceImage="https://images.unsplash.com/photo-1584444262846-e2716db1294b" />
              <ResourceCard
                text="Want to Stay Hydrated? Drink Before You’re Thirsty"
                label={[{
                  category: "SymptomManagement",
                  text: "health"
                }]} resourceImage="https://images.unsplash.com/photo-1584444262846-e2716db1294b" />
            </ResourcesContainer>
            <ExploreAllContainer>
            </ExploreAllContainer>
          </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  HeaderStyle: {
    fontFamily: 'Poppins-Bold',
    paddingLeft: 25,
    fontSize: 24,
    color: "#6D6A6A"
  },
  text: {
    fontSize: 30
  },
  contactContainer: {
    alignItems: "center",
    marginVertical: 30,
    paddingHorizontal: "15%",
  },
  contactButton: {
    flexDirection: "row",
    backgroundColor: "#F1F3FE",
    borderRadius: 20,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 8,
    padding: 5,
  },
  ButtonTextContainer: {
    flex: 1,
    alignItems: "center"
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
  },
  linkText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#FF786A",
    textDecorationLine: "underline"
  }
})
