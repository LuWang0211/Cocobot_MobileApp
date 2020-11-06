import React from "react";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import SVGIcon from '../SVGIcon/SVGIcon'

interface Props {
  disabled?: boolean;
  src: string;
  width?: string;
  height?: string;
  color?: string;
  onPress(): any;
  styles?: object;
}

const SVGIconButton = ({ width, height, color, src, styles, onPress, disabled }: Props) => {
  return (
    <TouchableOpacity style={styles}
      disabled={disabled}
      onPress={onPress}>
      <SVGIcon width={width} height={height} src={src} color={color} />
    </TouchableOpacity>
  )
}

export default SVGIconButton;
