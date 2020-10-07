import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, ViewPropTypes } from 'react-native';
import SVGIcon from '../SVGIcon/SVGIcon';
import { color } from '../../constant';
import PropTypes from 'prop-types';

const propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    prefix: PropTypes.any,
    prefixColor: PropTypes.string,
    suffix: PropTypes.any,
    suffixColor: PropTypes.string,
    style: ViewPropTypes.style,
    disabled: PropTypes.bool,
    prefixWidth: PropTypes.number,
    prefixHeight: PropTypes.number,
    suffixWidth: PropTypes.number,
    suffixHeight: PropTypes.number,
}

const defaultProps = {
    onPress: () => { },
    title: null,
    prefix: null,
    prefixColor: null,
    suffix: null,
    suffixColor: null,
    style: null,
    disabled: false,
    prefixWidth: 16,
    prefixHeight: 16,
    suffixWidth: 16,
    suffixHeight: 16,
}

function SettingsButton(props) {
    return (
        <View style={[styles.container, { flexDirection: 'row' }, { ...props.style }]}>
            <TouchableOpacity
                style={{ flexDirection: 'row' }}
                disabled={props.disabled}
                onPress={props.onPress}
            >
                <View style={[styles.body, !props.disabled ? { width: '100%' } : null]}>
                    <View style={styles.prefix}>
                        {
                            !props.prefix
                                ?
                                null
                                :
                                <View style={{ marginRight: 8 }}>
                                    <SVGIcon height={props.prefixHeight} width={props.prefixWidth} src={props.prefix} color={props.prefixColor} />
                                </View>
                        }
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                    {
                        props.disabled ? null : props.suffix
                    }
                </View>
            </TouchableOpacity>
            {
                !props.disabled ? null : <View style={{ justifyContent: 'center' }}>{props.suffix}</View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: color.settingsBorderColor,
        justifyContent: 'space-between'
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: 'Poppins-Regular',
        lineHeight: 21,
        color: color.black,
    },
    prefix: {
        flexDirection: "row",
        alignItems: 'center'
    }
});

SettingsButton.propTypes = propTypes;
SettingsButton.defaultProps = defaultProps;

export default SettingsButton;