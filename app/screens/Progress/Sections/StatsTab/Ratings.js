import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { decrease, increase } from '../../../../assets/icons/progress-icons'
import LinearGraph from '../../../../components/ProgressComponents/LinearGraph'
import ProgressCard from '../../../../components/ProgressComponents/ProgressCard'
import SVGIcon from '../../../../components/SVGIcon/SVGIcon'
import { color } from '../../../../constant'

export default function Ratings() {
    return (
        <ProgressCard
            title='Ratings'
            style={styles.container}
        >
            <View style={styles.wrapper}>
                <View style={styles.texts}>
                    <View style={styles.textColumn}>
                        <Text style={[styles.title, { color: color.sosRed }]}>Tiredness</Text>
                        <View style={styles.statTextWrapper}>
                            <Text style={[styles.statText, { color: color.sosRed }]}>10%</Text>
                            <SVGIcon
                                src={decrease}
                                width={10}
                                height={12}
                            />
                        </View>
                        <Text style={styles.normalText}>compared to last check-In session</Text>
                    </View>
                    <View style={styles.textColumn}>
                        <Text style={[styles.title, { color: color.primaryBlue }]}>Mood</Text>
                        <View style={styles.statTextWrapper}>
                            <Text style={[styles.statText, { color: color.primaryBlue }]}>10%</Text>
                            <SVGIcon
                                src={increase}
                                width={10}
                                height={12}
                            />
                        </View>
                        <Text style={styles.normalText}>compared to last check-In session</Text>
                    </View>
                </View>
                <View style={styles.chart}>
                    <LinearGraph />
                </View>
            </View>
        </ProgressCard>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        paddingBottom: 8,
    },
    wrapper: {
        paddingHorizontal: 12,
        paddingTop: 24,
    },
    texts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textColumn: {
        width: '40%',
    },
    title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        lineHeight: 18,
    },
    statTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        lineHeight: 30,
        marginRight: 8,
    },
    normalText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        lineHeight: 18,
        color: color.bodyTextGrey,
    },
    chart: {
        marginTop: 16,
    }
})
