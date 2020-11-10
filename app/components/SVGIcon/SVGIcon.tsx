import React from "react";
import { SvgXml } from "react-native-svg";

interface Props {
  src: string;
  width?: string;
  height?: string;
  color?: string;
}

const SVGIcon = ({ width, height, color, src }: Props) => {
  return <SvgXml xml={src} width={width} height={height} stroke={color} />
}

export default SVGIcon;
