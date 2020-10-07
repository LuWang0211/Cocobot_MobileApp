import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsStack from './settingscreens/settingstack';


export const ChatScreen = (props) => {

    return (
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chat Screen</Text>
          <Button
          title="Settings"
          onPress={() => props.navigation.navigate('Settings')}
          />
        <Text>Chat Screen</Text>
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