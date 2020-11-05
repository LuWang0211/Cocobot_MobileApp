import React from 'react'
import { StyleSheet, View } from 'react-native'
import ProgressHeader from '../../components/ProgressComponents/ProgressHeader'
import { color } from '../../constant'
import ProgressTab from './Sections/ProgressTab'

export default function Progress(props) {
    return (
        <>
            <ProgressHeader navigation={props.navigation} />
            <View style={styles.container}>
                <ProgressTab />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.chatBubbleGrey,
    }
})