import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { color } from '../../../../constant'
import Achievements from './Achievements'
import Ratings from './Ratings'
import Solution from './Solution'

export default function StatsTab() {
    return (
        <ScrollView style={styles.container}>
            <Achievements />
            <Ratings />
            <Solution />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.chatBubbleGrey,
    },
})