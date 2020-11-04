import React from 'react'
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { color } from '../../constant';
import { more } from '../../assets/icons/progress-icons';
import SVGIcon from '../SVGIcon/SVGIcon';

export default function ProgressCard(props) {
    return (
        <View style={[styles.container, { ...props.style }]}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
            <View style={styles.more}>
                <TouchableOpacity
                    style={{ padding: 16 }}
                    onPress={() => { }}
                >
                    <SVGIcon
                        src={more}
                        width={16}
                        height={16}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.white,
        paddingHorizontal: 19,
        paddingVertical: 24,
        borderRadius: 20,
        marginHorizontal: 16,
    },
    title: {
        fontFamily: 'Poppins-Medium',
        color: color.bodyTextGrey,
        fontSize: 16,
        lineHeight: 24,
    },
    more: {
        position: 'absolute',
        right: 0,
        marginTop: 8,
        marginRight: 2,
    },
})

ProgressCard.propTypes = {
    title: PropTypes.string,
    style: ViewPropTypes.style,
}

ProgressCard.defaultProps = {
    title: 'Title',
    style: null,
}
