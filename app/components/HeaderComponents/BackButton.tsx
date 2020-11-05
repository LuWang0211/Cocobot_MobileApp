import React from "react";
import svg from '../../assets/icons/back-button-icon';
import SVGIconButton from '../SVGIcon/SVGIconButton';

interface Props {
  disabled: boolean;
  onPress(): any;
}

const BackButton = ({ disabled, onPress }: Props) => {
  return <SVGIconButton width="22" height="22" src={svg} disabled={disabled} onPress={onPress} styles={{padding: 15}} />
}

export default BackButton;
