import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// import CustomButton from '../../../components/Button/CustomButton';
// import firebase from 'firebase';
// import { AuthContext, SettingsContext } from '../../../context';
// import { color } from '../../../constant';
// import Header from '../../../components/AppHeader/Header';
// import SettingsAvatar from '../../../components/SettingsComponents/SettingsAvatar';

// import AccountSettings from './AccountSettings';
// import Support from '../../../components/SettingsComponents/Support';
// import Legal from '../../../components/SettingsComponents/Legal';
import { ScrollView } from 'react-native-gesture-handler';

function SettingsScreen(props) {
    // const { signOut } = useContext(AuthContext);
    // const user = firebase.auth().currentUser;
    // const { isRefreshed, refresh } = useContext(SettingsContext);

    // function logout() {
    //     firebase.auth()
    //         .signOut()
    //         .then(() => {
    //             signOut();
    //             props.navigation.navigate('Login');
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    // if (!user) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color={color.secondGrey} />
    //         </View>
    //     );
    // }

    // if (isRefreshed) {
    //     refresh(false);
    // }

    return (
        <View style={styles.container}>
            <Text>SettingsScreen</Text>
            {/* <Header
                back={() => props.navigation.goBack()}
            /> */}
            <ScrollView>
                <View style={styles.body}>
                    <Text>SettingsScreen body</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: color.white,
    },
    body: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
    },
})

export default SettingsScreen;