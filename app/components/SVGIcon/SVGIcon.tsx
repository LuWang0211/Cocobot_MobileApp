import React from "react";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native";

interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

const SVGIcon = ({ width, height, color, src }: Props) => {
  return <SvgXml xml={src} width={width} height={height} stroke={color} />
}

export default SVGIcon;
