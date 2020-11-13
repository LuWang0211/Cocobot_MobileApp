import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { NotificationContext } from "../assets/context";
// import GHeader from '../components/GHeader';
import AppHeader from "../components/AppHeader/AppHeader";
import { tabsHeader } from "../assets/styles";
import LeftHeader from "../components/AppHeader/LeftHeader";
import SOSButton from "../components/HeaderComponents/SOSButton";
import SVGIcon from '../components/SVGIcon/SVGIcon';
import { redBgAuth, blueBgAuth } from '../assets/icons/authBgIcons';
import backgroundImg from "../assets/icons/today-background-img";
import { color, categories } from '../constant';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import cocobotIcon from '../assets/icons/cocobot-icon';
import talkIcon from "../assets/icons/chevron-right-icon";
import { createNavigatorFactory, useNavigation } from "@react-navigation/native";
import { SessionContext } from "../context";
import ResourcesContainer from "../components/ResourcesComponent/ResourcesContainer";
// import * as baobao from "../components/ResourcesComponent/ResourceCard";
import { ResourceCard }  from "../components/ResourcesComponent/ResourceCard";


export const TodayScreen = (props) => {
    const {session, dispatch} = useContext(SessionContext);
    const navigation = useNavigation();
    const [checked, setChecked] = useState(new Set());
    const data = {
        Resources: categories,
    };

    const renderResources = () => {
        console.log("Start to Play Resources");
        // const Lulu = baobao.ResourceCard;
        return data.Resources.map((resource) => {
            return (
            <ResourceCard
                key={resource.id}
                name={resource.name}
                label={[
                {
                    category: resource.category,
                    abouttext: resource.about,
                },
                ]}
                resourceImage={resource.image}
                type={resource.type}
                author={resource.author}
                audiouri={resource.audiouri}
                backgroundImage={resource.pictureuri}
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
            <SVGIcon width="250" height={Platform.OS === 'ios' ? "150" : "150"} src={backgroundImg} />
            <View>
                <Text style={styles.greetingTextStyle}>Hi, Lisa!</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6} style={styles.card} onPress={() => {
              if (!session.inSession) {
                dispatch({ type: "inSession" });
              }
              navigation.navigate("Chat");
            }}>
                <View style={{flexDirection: "row"}}>
                    {/* <SVGIcon height="45" width="45" src={cocobotIcon} /> */}
                    <View style={{ padding: 15 }}>
                        <SVGIcon width="45" height="45" src={cocobotIcon} />
                    </View>
                    <View style={{ flexDirection: "column", padding: 10 }}>
                        <Text style={styles.cardTitle}>You have a scheduled meditation on</Text>
                        <Text style={styles.cardhighlightText}>Tuesday, Oct 10</Text>
                        <Text style={styles.cardhighlightText}>8:00 AM</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                    <Text style={styles.cardboby}>Talk Now</Text>
                    <SVGIcon width="18" height="18" src={talkIcon} />
                </View>
            </TouchableOpacity>

            {/* <View style={styles.titleContainer}>
                <Text style={styles.titleTextStyle}>Resources</Text>
                <TouchableOpacity onPress={() => {
                navigation.navigate("Resources");
                }}>
                <Text style={{ fontFamily: "Poppins-Medium", color: "#3E41A8" }}>See All</Text>
                </TouchableOpacity>
            </View> */}

            <ResourcesContainer title="Resources">{renderResources()}</ResourcesContainer>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
      },
      cardhighlightText: {
        // fontFamily: "Poppins-Medium",
        fontSize: 14,
        color: "#FF796E"
    },
    greetingTextStyle: {
        fontFamily: "Poppins-Bold",
        paddingHorizontal: 25,
        fontSize: 30,
        paddingTop: Platform.OS === "ios" ? 10 : 0,
        color: "#3E41A8",
        marginBottom: 32,
    },
    text: {
        fontSize: 36,
        alignItems: "center",
        color: color.brandPurple,
        left: 20,
    },
    redBg: {
        position: 'absolute',
        transform: [
            {
                translateX: 250
            },
        ]
    },
    blueBg: {
        transform: [
            {
                translateY: 350
            },
            {
                translateX: -50
            }
        ]
    },
    card: {
        // flex: 3,
        // flexDirection: 'row',
        // padding: 60,
        // alignItems: "center",
        // backgroundColor: '#F1F3FE',
        // borderRadius: 20,
        // justifyContent: "space-between",
        // left: 16,
        // width:370,
        // alignItems: "center",
        backgroundColor: "#F1F3FE",
        padding: 15,
        marginHorizontal: 25,
        borderRadius: 20,
        shadowColor: "rgba(199, 199, 199, 0.75)",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        zIndex: 999,
        elevation: 3,
    },
    cardTitle: {
        color: '#454545',
        fontSize: 16,
        // right: 150,
        // alignItems: "center",
    },
    cardboby: {
        color: color.brandPurple,
        fontSize: 12,
    },
});
