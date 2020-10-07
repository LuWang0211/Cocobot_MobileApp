import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from '../../assets/constant';
import PropTypes from 'prop-types';
import SVGIcon from '../SVGIcon/SVGIcon';

const propTypes = {
    onPress: PropTypes.func,
    displayText: PropTypes.string,
    clickableText: PropTypes.string,
    style: ViewPropTypes.style,
    suffix: PropTypes.any,
    suffixWidth: PropTypes.number,
    suffixHeight: PropTypes.number,
    suffixColor: PropTypes.string,
}

const defaultProps = {
    onPress: () => { },
    displayText: null,
    clickableText: null,
    style: null,
    suffix: null,
    suffixWidth: 16,
    suffixHeight: 16,
    suffixColor: null,
}

function TouchableText(props) {
    return (
        <View style={[styles.container, { ...props.style }]}>
            {
                !props.displayText
                    ?
                    null
                    :
                    <Text style={[styles.text, { marginRight: 4 }]}>{props.displayText}</Text>
            }
            <TouchableOpacity
                onPress={props.onPress}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.text, { ...props.clickableTextStyle }]}>{props.clickableText}</Text>
                    {
                        !props.suffix
                            ?
                            null
                            :
                            <View style={{ marginLeft: 2, }}>
                                <SVGIcon height={props.suffixHeight} width={props.suffixWidth} src={props.suffix} color={props.suffixColor} />
                            </View>
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: color.secondGrey,
        fontFamily: 'Poppins-Medium'
    },
    clickableText: {
        color: color.secondGrey,
        fontFamily: 'Poppins-Medium'
    },
});

TouchableText.propTypes = propTypes;
TouchableText.defaultProps = defaultProps;

export default TouchableText;