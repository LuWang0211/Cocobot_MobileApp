import React from "react";
import { Platform } from 'react-native';
import AppHeader from "./AppHeader";
import BackButton from "../HeaderComponents/BackButton";
import SOSButton from "../HeaderComponents/SOSButton";

const Header = (props) => {
  const headerStyle = {
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 80 : 110,
    zIndex: 999,
    borderBottomWidth: 0,
  }

  return (
    <AppHeader
      leftComponent={<BackButton disabled={props.disabled} onPress={props.back} />}
      rightComponent={
        !props.onSOS ? null : <SOSButton onPress={props.onSOS} />
      }
      headerStyle={headerStyle}
    />
  )
}

export default Header;
