import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/AppHeader/Header';
import { color } from '../../../constant';

function Feedback(props) {
    return (
        <View style={styles.container}>
            <Header
                back={() => props.navigation.goBack()}
            />
            <Text>Feedback</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    }
});

export default Feedback;