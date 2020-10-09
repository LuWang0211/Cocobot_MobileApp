import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsStack from './settingscreens/settingstack';
import GHeader from '../components/GHeader';
import Notification from './settingscreens/settings/Notification';
import { useNavigation } from '@react-navigation/native';

export const ChatScreen = (props) => {
    const navigation = useNavigation();

    return (
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chat Screen</Text>
          {/* <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
          /> */}
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  btn: {
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
})