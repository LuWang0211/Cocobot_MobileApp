import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProgressCard from '../../../../components/ProgressComponents/ProgressCard'
import { color } from '../../../../constant'

export default function FocusOverview() {
    return (
        <ProgressCard title='Focus Overview' style={styles.container}>
            <View style={styles.texts}>
                <Text style={styles.title}>Short-term Goals:</Text>
                <Text style={styles.text}>1. Take some time to myself</Text>
                <Text style={styles.text}>2. Stay hydrated daily</Text>
            </View>
            <View style={styles.texts}>
                <Text style={styles.title}>Solutions:</Text>
                <Text style={styles.text}>1. Take a 30 minute walk everyday</Text>
                <Text style={styles.text}>2. Drink/refill from water bottle</Text>
            </View>
        </ProgressCard>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    texts: {
        marginTop: 7,
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 21,
        color: color.brandPurple,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        lineHeight: 18,
        color: color.bodyTextGrey,
    },
})