import React, { forwardRef } from 'react';

import {
    View,
    StyleSheet,
    Text,
    ViewPropTypes
} from 'react-native';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
// import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons';
import PropTypes from 'prop-types';
import { color } from '../../assets/constant';

const propTypes = {
    onChangeText: PropTypes.func,
    onPressSuffix: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    prefix: PropTypes.string,
    value: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    placeholder: PropTypes.string,
    style: ViewPropTypes.style,
    placeholderTextColor: PropTypes.string,
    keyboardType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    suffixDisabled: PropTypes.bool,
    title: PropTypes.string,
    label: PropTypes.string,
    suffixTooltip: PropTypes.bool,
    suffixTooltipText: PropTypes.string,
    returnKeyType: PropTypes.oneOf(
        [
            'default',
            'go',
            'google',
            'join',
            'next',
            'route',
            'search',
            'send',
            'yahoo',
            'done',
            'emergency-call',
        ]
    ),
    value: PropTypes.string,
    onBlur: PropTypes.func,
    valid: PropTypes.bool,
    editable: PropTypes.bool,
    selectTextOnFocus: PropTypes.bool,
}

const defaultProps = {
    onChangeText: (text) => { },
    onPressSuffix: () => { },
    onSubmitEditing: () => { },
    onBlur: () => { },
    prefix: null,
    value: null,
    secureTextEntry: false,
    placeholder: null,
    style: null,
    placeholderTextColor: null,
    keyboardType: "default",
    autoCapitalize: "sentences",
    suffixDisabled: false,
    title: null,
    label: null,
    suffixTooltip: false,
    suffixTooltipText: null,
    returnKeyType: null,
    value: null,
    valid: false,
    editable: true,
    selectTextOnFocus: true,
}

const FilledTextInput = forwardRef((props, ref) => {
    return (
        <View style={[styles.container, { ...props.style }]}>
            {
                !props.title
                    ?
                    null
                    :
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            {props.title}
                        </Text>
                    </View>
            }
            <View style={styles.column}>
                {
                    !props.label
                        ?
                        null
                        :
                        <View style={styles.label}>
                            <Text style={styles.labelText}>
                                {props.label}
                            </Text>
                        </View>
                }
                <View style={styles.body}>
                    {
                        !props.prefix
                            ?
                            null
                            :
                            <Icon
                                style={styles.prefix}
                                name={props.prefix}
                            />
                    }
                    <TextInput
                        ref={ref}
                        style={styles.textInput}
                        placeholder={props.placeholder}
                        underlineColorAndroid="transparent"
                        autoCapitalize={props.autoCapitalize}
                        onChangeText={props.onChangeText}
                        placeholderTextColor={!props.placeholderTextColor ? color.secondGrey : props.placeholderTextColor}
                        secureTextEntry={props.secureTextEntry}
                        returnKeyType={props.returnKeyType}
                        onSubmitEditing={props.onSubmitEditing}
                        value={props.value}
                        onBlur={props.onBlur}
                        editable={props.editable}
                        selectTextOnFocus={props.selectTextOnFocus}
                    />
                    {
                        !props.suffix || props.valid
                            ?
                            null
                            :
                            <TouchableOpacity
                                onPress={props.onPressSuffix}
                                disabled={props.suffixDisabled}
                            >
                                <Icon
                                    style={styles.suffix}
                                    name={props.suffix}
                                    color={props.suffixColor}
                                />
                            </TouchableOpacity>
                    }
                    {
                        !props.valid
                            ?
                            null
                            :
                            <Icon
                                style={styles.suffix}
                                name='ios-checkmark-circle'
                                color={color.checkmarkGreen}
                            />
                    }
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 32,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: 25,
        marginVertical: 16,
    },
    column: {
        backgroundColor: color.chatBubbleGrey,
        borderRadius: 25,
    },
    label: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    labelText: {
        color: color.black,
        fontFamily: 'Poppins-Regular',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    prefix: {
        paddingVertical: 16,
        paddingStart: 16,
        alignItems: 'center',
        fontSize: 24,
        color: color.black,
    },
    suffix: {
        paddingHorizontal: 12,
        alignItems: 'center',
        fontSize: 24,
    },
    textInput: {
        flex: 1,
        height: 48,
        paddingHorizontal: 24,
        paddingVertical: 8,
        color: color.secondGrey,
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontStyle: 'normal',
        fontSize: 16,
    },
    title: {
        marginLeft: 16,
        marginBottom: 8,
    },
    titleText: {
        fontFamily: 'Poppins-Regular',
        fontStyle: 'normal',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: color.settingsTitleColor,
    }
});

FilledTextInput.propTypes = propTypes;
FilledTextInput.defaultProps = defaultProps;

export default FilledTextInput;