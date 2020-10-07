import { Header } from 'react-native-elements';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  leftComponent?: any;
  centerComponent?: any;
  rightComponent?: any;
  headerStyle?: object;
}

const AppHeader = ({ leftComponent, centerComponent, rightComponent, headerStyle }: Props) => {
  return (
    <Header
      leftComponent={leftComponent}
      centerComponent={centerComponent}
      rightComponent={rightComponent}
      containerStyle={headerStyle}
    />
  )
}

export default AppHeader;
