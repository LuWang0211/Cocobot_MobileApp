import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';
import { color } from '../../constant';
import { extractFirstLetter } from '../../functions/SettingsFunction';
import TouchableText from '../Button/TouchableText';
import chevronRightIcon from '../../../assets/icons/chevron-right-icon';

const propTypes = {
    name: PropTypes.string,
    symptom: PropTypes.string,
}

const defaultProps = {
    name: 'Name',
    symptom: 'Symptom'
}

function ChildCard(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardBody}>
                <Avatar
                    title={extractFirstLetter(props.name)}
                    containerStyle={styles.avatar}
                    titleStyle={styles.avatarTitle}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.symptom}>{props.symptom}</Text>
                </View>
            </View>
            <TouchableText
                clickableText='View'
                style={styles.viewBtn}
                clickableTextStyle={{ color: color.brandPurple, fontSize: 12 }}
                suffix={chevronRightIcon}
                suffixHeight={24}
                suffixWidth={24}
                onPress={() => props.navigation.navigate('child-info')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: color.white,
        borderRadius: 20,
        shadowColor: color.shadowColor,
        shadowOpacity: 0.75,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        paddingTop: 38,
    },
    cardBody: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginLeft: 20,
        backgroundColor: color.brandPurple,
        width: 60,
        height: 60,
        borderRadius: 100
    },
    avatarTitle: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 36,
        lineHeight: 54,
        color: color.white,
    },
    info: {
        justifyContent: 'center',
        marginLeft: 13
    },
    name: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 24,
        color: color.bodyTextGrey,
    },
    symptom: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 18,
        color: color.settingsTitleColor,
        width: 227,
    },
    viewBtn: {
        marginTop: 8,
        marginBottom: 12,
        justifyContent: 'flex-end',
        marginRight: 21,
    }
});

ChildCard.propTypes = propTypes;
ChildCard.defaultProps = defaultProps;

export default ChildCard;