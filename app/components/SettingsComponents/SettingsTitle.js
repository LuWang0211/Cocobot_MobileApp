import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { color } from '../../constant';
import PropTypes from 'prop-types';

const propTypes = {
    text: PropTypes.string,
}

const defaultProps = {
    text: 'Title'
}

function SettingsTitle(props) {
    return (
        <Text style={styles.text}>
            {props.text}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins-Medium',
        fontStyle: 'normal',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 36,
        color: color.bodyTextGrey,
        paddingVertical: 24,
    }
});

SettingsTitle.propTypes = propTypes;
SettingsTitle.defaultProps = defaultProps;

export default SettingsTitle;