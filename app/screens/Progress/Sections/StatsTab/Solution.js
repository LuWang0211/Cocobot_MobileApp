import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BarGraph from '../../../../components/ProgressComponents/BarGraph'
import ProgressCard from '../../../../components/ProgressComponents/ProgressCard'
import { color } from '../../../../constant'

export default function Solution() {
    return (
        <ProgressCard
            title='Solution Completion Rates'
            style={styles.container}
        >
            <View style={styles.text}>
                <Text style={styles.text1}>
                    “Taking a 30 minute walk”
                </Text>
                <Text style={styles.text2}>
                    has the highest completion rate. On average, you completed this solution nine out of ten days.
                </Text>
            </View>
            <View style={styles.chart}>
                <BarGraph />
            </View>
        </ProgressCard>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginBottom: 48,
    },
    text: {
        marginTop: 17,
        marginLeft: 4,
    },
    text1: {
        fontFamily: 'Poppins-Medium',
        color: color.brandPurple,
        fontSize: 14,
        lineHeight: 21,
    },
    text2: {
        fontFamily: 'Poppins-Regular',
        color: color.bodyTextGrey,
        fontSize: 12,
        lineHeight: 18,
    },
    chart: {
        marginTop: 25,
    }
})