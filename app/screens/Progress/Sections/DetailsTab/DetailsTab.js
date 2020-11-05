import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { color } from '../../../../constant'
import CalendarView from './CalendarView'
import FocusOverview from './FocusOverview'
import PSTSteps from './PSTSteps'

export default function DetailsTab() {
    return (
        <ScrollView style={styles.container}>
            <CalendarView />
            <FocusOverview />
            <PSTSteps />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.chatBubbleGrey,
    },
})