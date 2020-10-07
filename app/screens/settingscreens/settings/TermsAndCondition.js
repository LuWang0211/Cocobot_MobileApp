import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/AppHeader/Header';
import { color } from '../../../constant';

function TermsAndCondition(props) {
    return (
        <View style={styles.container}>
            <Header
                back={() => props.navigation.goBack()}
            />
            <Text>Terms and Condition</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    }
});

export default TermsAndCondition;