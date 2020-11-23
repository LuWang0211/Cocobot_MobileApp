import React, { Fragment } from "react";
import { Platform, StyleSheet, Text, View } from 'react-native';
import { color } from "../../constant";
import AppHeader from "../AppHeader/AppHeader";
import LeftHeader from "../AppHeader/LeftHeader";
import SOSButton from "../HeaderComponents/SOSButton";
import SVGIcon from "../SVGIcon/SVGIcon";
import medal from '../../assets/icons/medal';

const ProgressHeader = (props) => {
    const headerStyle = {
        backgroundColor: color.chatPurple,
        height: Platform.OS === 'ios' ? 80 : 80,
        zIndex: 999,
        borderBottomWidth: 0,
    }

    return (
        <Fragment>
            <AppHeader
                leftComponent={() => <LeftHeader navigation={props.navigation} />}
                rightComponent={<SOSButton onPress={() => { }} />}
                headerStyle={headerStyle}
            />
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <SVGIcon
                        src={medal}
                        width={90}
                        height={74}
                    />
                    <View style={styles.textWrapper}>
                        <Text style={styles.text1}>You are on a</Text>
                        <Text style={styles.text2}>5 days streak!</Text>
                        <Text style={styles.text1}>Good job completing all of your solutions everyday!</Text>
                    </View>
                </View>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.chatPurple,
        justifyContent: 'center',
        paddingHorizontal: 29,
        paddingTop: 31,
        paddingBottom: 16,
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textWrapper: {
        marginHorizontal: 29,
    },
    text1: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 24,
        color: color.bodyTextGrey,
        marginRight: 29,
    },
    text2: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 21,
        color: color.brandPurple,
    },
})

export default ProgressHeader;
