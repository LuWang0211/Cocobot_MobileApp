import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { tool, userCheck } from '../../../../assets/icons/progress-icons'
import ProgressCard from '../../../../components/ProgressComponents/ProgressCard'
import SVGIcon from '../../../../components/SVGIcon/SVGIcon'
import { color } from '../../../../constant'

export default function PSTSteps() {
    return (
        <ProgressCard title='PST Steps' style={styles.container}>
            <Text style={styles.title}>This therapy phase focuses on:</Text>
            <View style={styles.stepsContainer}>
                <View style={styles.stepContainer}>
                    <View style={styles.stepIcon}>
                        <SVGIcon
                            src={tool}
                            width={31}
                            height={31}
                        />
                    </View>
                    <Text style={styles.stepNumber}>Step 4</Text>
                    <Text style={styles.stepInfo}>Implementing decisions and guidelines</Text>
                </View>
                <View style={styles.stepContainer}>
                    <View style={styles.stepIcon}>
                        <SVGIcon
                            src={userCheck}
                            width={31}
                            height={31}
                        />
                    </View>
                    <Text style={styles.stepNumber}>Step 5</Text>
                    <Text style={styles.stepInfo}>Evaluating and choosing a solution</Text>
                </View>
            </View>
        </ProgressCard>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 26,
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 21,
        color: color.bodyTextGrey,
        marginTop: 8,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stepContainer: {
        width: '45%',
        alignItems: 'center',
    },
    stepIcon: {
        marginBottom: 12,
        marginTop: 16,
    },
    stepNumber: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        lineHeight: 18,
        color: color.brandPurple,
    },
    stepInfo: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        lineHeight: 18,
        color: color.bodyTextGrey,
    }
})
