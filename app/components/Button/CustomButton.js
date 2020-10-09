import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
    Text,
    StyleSheet,
    ViewPropTypes,
    View
} from 'react-native';

import { color } from '../../assets/constant';
import PropTypes from 'prop-types';

const propTypes = {
    theme: PropTypes.oneOf([
        'light',
        'primary',
    ]),
    buttonStyle: PropTypes.oneOf([
        'wrap',
        'match',
    ]),
    onPress: PropTypes.func,
    title: PropTypes.string,
    style: ViewPropTypes.style,
    disabled: PropTypes.bool,
}

const defaultProps = {
    theme: 'primary',
    buttonStyle: 'wrap',
    onPress: () => { },
    title: null,
    style: null,
    disabled: false,
}

const CustomButton = (props) => {
    const buttonStyle = () => {
        if (props.buttonStyle === 'wrap') {
            return styles.wrapContainer;
        }
        return null;
    }

    const theme = () => {
        if (props.theme === 'light') {
            return {
                button: styles.lightButton,
                text: styles.lightText,
            };
        }

        if (props.disabled) {
            return {
                button: styles.disabledButton,
                text: styles.disabledText,
            }
        }

        return {
            button: styles.primaryButton,
            text: styles.primaryText,
        };
    }

    return (
        <View style={buttonStyle()}>
            <TouchableOpacity
                style={[theme().button, { ...props.style }]}
                onPress={props.onPress}
                disabled={props.disabled}
            >
                <Text style={theme().text}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    primaryButton: {
        backgroundColor: color.brandPurple,
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryText: {
        color: color.white,
        fontFamily: 'Poppins-Regular',
    },
    lightButton: {
        borderColor: color.brandPurple,
        borderWidth: 1,
        backgroundColor: color.white,
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lightText: {
        color: color.brandPurple,
        fontFamily: 'Poppins-Regular',
    },
    disabledButton: {
        backgroundColor: color.bckgrdPurple,
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledText: {
        color: color.black,
        fontFamily: 'Poppins-Regular',
    },
    wrapContainer: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

CustomButton.propTypes = propTypes;
CustomButton.defaultProps = defaultProps;

export default CustomButton;