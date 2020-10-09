import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { color } from '../../constant';

function LoadingIndicator() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={color.secondGrey} />
        </View>
    );
}

export default LoadingIndicator;