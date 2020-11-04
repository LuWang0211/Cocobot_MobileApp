import React from 'react'
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { color } from '../../constant';

export default function LinearGraph() {
    const screenWidth = Dimensions.get("window").width;

    const data = {
        labels: ["S1", "S2", "S3", "S4", "S5", "S6"],
        datasets: [
            {
                data: [2.5, 5, 6, 7, 8, 5],
                color: (opacity = 1) => `rgba(255, 121, 110, ${opacity})`,
                strokeWidth: 2,
            },
            {
                data: [5.5, 2, 3.5, 4.8, 6, 8],
                color: (opacity = 1) => `rgba(149, 221, 237, ${opacity})`,
                strokeWidth: 2,
            }
        ],
    };

    return (
        <LineChart
            data={data}
            width={screenWidth - 100}
            height={100}
            withShadow={false}
            withVerticalLines={false}
            segments={2}
            fromZero={true}
            xLabelsOffset={8}
            yLabelsOffset={16}
            yAxisInterval={2}
            chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                color: (opacity = 1) => `rgba(55, 204, 237, ${opacity})`,
                labelColor: () => color.brandPurple,
                strokeWidth: 2,
                barPercentage: 0.5,
                useShadowColorFromDataset: false, // optional
                decimalPlaces: 0,
                propsForBackgroundLines: {
                    strokeDasharray: '',
                    strokeWidth: 2,
                },
                propsForLabels: {
                    fontSize: 12,
                    fontWeight: '500',
                }
            }}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 40,
                paddingBottom: 24,
            }}
        />
    )
}