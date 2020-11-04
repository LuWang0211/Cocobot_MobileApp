import React from 'react'
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit'
import { color } from '../../constant';

export default function BarGraph() {
    const screenWidth = Dimensions.get('window').width;

    const data = {
        labels: ["Drinking/Filling Water Bottle", "Taking a 30 Minute Walk"],
        datasets: [
            {
                data: [60, 88]
            }
        ]
    };

    return (
        <BarChart
            // style={graphStyle}
            data={data}
            width={screenWidth - 100}
            height={200}
            fromZero={true}
            chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                color: (opacity = 1) => `rgba(55, 204, 237, ${opacity})`,
                labelColor: () => color.brandPurple,
                strokeWidth: 2,
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
                decimalPlaces: 0,
                // propsForBackgroundLines: {
                //     strokeDasharray: '',
                //     strokeWidth: 2,
                // },
                // propsForLabels: {
                //     fontSize: 12,
                //     fontWeight: '500',
                // }
            }}
            verticalLabelRotation={30}
        />
    )
}
