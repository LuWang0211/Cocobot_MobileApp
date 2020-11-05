import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SVGIcon from '../../../../components/SVGIcon/SVGIcon'
import { color } from '../../../../constant'
import { cycle, completion, therapy } from '../../../../assets/icons/progress-icons';
import ProgressCard from '../../../../components/ProgressComponents/ProgressCard';

export default function Achievements() {
    return (
        <ProgressCard title='Achievements' style={styles.container}>
            <View style={styles.stats}>
                <View style={styles.section}>
                    <View style={styles.icon}>
                        <SVGIcon
                            src={therapy}
                            width={24}
                            height={24}
                        />
                    </View>
                    <Text style={[styles.text1, { color: color.brandPurple }]}>126 m</Text>
                    <Text style={styles.text2}>of Therapy</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.icon}>
                        <SVGIcon
                            src={completion}
                            width={24}
                            height={24}
                        />
                    </View>
                    <Text style={[styles.text1, { color: color.sosRed }]}>16 Solution</Text>
                    <Text style={styles.text2}>Completions</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.icon}>
                        <SVGIcon
                            src={cycle}
                            width={24}
                            height={24}
                        />
                    </View>
                    <Text style={[styles.text1, { color: color.primaryBlue }]}>First</Text>
                    <Text style={styles.text2}>Therapy Cycle</Text>
                </View>
            </View>
        </ProgressCard>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 48,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section: {
        alignItems: 'center',
    },
    icon: {
        padding: 14,
    },
    text1: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        lineHeight: 30,
    },
    text2: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        lineHeight: 18,
        color: color.bodyTextGrey,
    }
})
