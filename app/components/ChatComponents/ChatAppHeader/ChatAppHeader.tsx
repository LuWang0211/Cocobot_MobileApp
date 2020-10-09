import React from "react";
import { View, Platfrom } from 'react-native';
import AppHeader from '../../AppHeader/AppHeader';
import SVGIcon from '../../SVGIcon/SVGIcon';
import SOSButton from '../../HeaderComponents/SOSButton';
import BackButton from '../../HeaderComponents/BackButton';
import cocobotIcon from 'assets/icons/cocobot-icon';

interface Props {
  disabled: boolean;
  back(): any;
  onSOS(): any;
}

const ChatAppHeader = ({ disabled, back, onSOS }: Props) => {
  const headerStyle = {
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 80 : 110,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: 'rgba(199, 199, 199, 0.75)',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 1,
    elevation: 5,
    zIndex: 999,
  }

  return (
    <AppHeader
      leftComponent={<BackButton disabled={disabled} onPress={back} />}
      centerComponent={<SVGIcon height="40" width="40" src={cocobotIcon} />}
      rightComponent={<SOSButton onPress={onSOS} />}
      headerStyle={headerStyle}
    />
  )
}

export default ChatAppHeader;
