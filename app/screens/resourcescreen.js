import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import AppHeader from "../components/AppHeader/AppHeader";
import { tabsHeader } from "../assets/styles";
import LeftHeader from "../components/AppHeader/LeftHeader";
import SOSButton from "../components/HeaderComponents/SOSButton";
import SVGIcon from '../components/SVGIcon/SVGIcon';
import ResourcesContainer from "../components/ResourcesComponent/ResourcesContainer";
import ResourceListCard from '../components/ResourcesComponent/ResourceListCard';
import { IMAGE_SOURCE } from '../constant';
import searchIcon from '../assets/icons/search-icon';
import pickerIcon from '../assets/icons/picker-icon';
import { useNavigation } from "@react-navigation/native";


export const ResourceScreen = (props) =>  {

  const [sortBy, setSortBy] = useState("name");
  const navigation = useNavigation();

  const data = {
    Resources: [
      {
        id: 0,
        title: "Want to Stay Hydrated? Drink Before You’re Thirsty",
        category: "SymptomManagement",
        about: ["ANXIOUS"],
        image: "https://images.unsplash.com/photo-1584444262846-e2716db1294b",
        favored: false,
      },
      {
        id: 1,
        title: "Caregiver Stress and Burnout",
        category: "SymptomManagement",
        about: "TIRED",
        image: "https://images.unsplash.com/photo-1584444262846-e2716db1294b",
        favored: false,
      },
      {
        id: 2,
        title: "Want to Stay Hydrated? Drink Before You’re Thirsty",
        category: "SymptomManagement",
        about: "health",
        image: "https://images.unsplash.com/photo-1584444262846-e2716db1294b",
        favored: false,
      },
    ],
  };

  const renderResources = () => {
    return data.Resources.map((resource) => {
        return (
        <ResourceListCard 
          key={resource.id}
          text={resource.title}
          src="coco testing"
          label={[
            {
              category: resource.category,
              text: resource.about,
            },
            ]}
          resourceImage={resource.image}
          />

        );
    });
  }

  return (
    <View style={styles.container}>
      <AppHeader
        leftComponent={() => <LeftHeader/>}
        rightComponent={<SOSButton/>}
        headerStyle={{...tabsHeader, position: "absolute", right: 0, left: 0}}
      />
      <View style={styles.searchBar}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.textStyle}>SORT BY:</Text>
          <View style={styles.pickerContainerStyle}>
            <RNPickerSelect
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
              Icon={() => <View style={{top: 5, right: 5}}><SVGIcon height="14" width="14" src={pickerIcon} /></View>}
              placeholder={{}}
              style={{
                inputIOS: {
                  top: 2,
                  fontSize: 12,
                  fontFamily: "Poppins-Regular",
                  color: "rgba(0, 0, 0, 0.65)"
                },
                inputAndroid: {
                  top: 1,
                  fontSize: 12,
                  fontFamily: "Poppins-Regular",
                  color: "rgba(0, 0, 0, 0.65)"
                },
              }}
              useNativeAndroidPickerStyle={false}
              items={[
                { label: 'Name', value: 'name' },
                { label: 'Newest', value: 'newest' },
              ]}
          />
          </View>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        {renderResources()}
      </ScrollView>
  </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%'
  },
  searchBar: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#D8DEFF",
    paddingTop: 80,
    paddingBottom: 10,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textStyle: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#686868",
    textTransform: "uppercase"
  },
  pickerContainerStyle: {
    borderWidth: 1,
    paddingLeft: 5,
    width: 90,
    height: 24,
    marginLeft: 8,
    borderRadius: 4,
    borderColor: "#D9D9D9"
  },
})
