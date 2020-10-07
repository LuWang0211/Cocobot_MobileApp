import React from "react";
import { View, Platform } from 'react-native';
import AppHeader from '../AppHeader/AppHeader';
import BackButton from '../HeaderComponents/BackButton';

interface Props {
  back(): any;
}

const PrivacyTermsHeader = ({ back }: Props) => {
  const headerStyle = {
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 80 : 110,
  }

  return (
    <AppHeader
      leftComponent={<BackButton onPress={back} />}
      headerStyle={headerStyle}
    />
  )
}

export default PrivacyTermsHeader;
