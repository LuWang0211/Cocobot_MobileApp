import React from "react";
import { Dimensions, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { useMemoOne } from 'use-memo-one';
import Animated, { call, useCode } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

import Cursor from "./Cursor";
import Labels from "./Labels";
// import Markers from "./Markers";
import Markers from "./Markers";

const { Value, max, add, round, divide } = Animated;

interface SliderProps {
  totalWidth: number;
  count: number;
  value: number;
  onUpdate: (val: number) => void;
}

export default ({ totalWidth, count, value, onUpdate }: SliderProps) => {
  const width = (totalWidth - 30) / (count - 1);
  const height = 15;
  const styles = StyleSheet.create({
    container: {
      width: totalWidth,
      height,
      borderRadius: height / 2,
      backgroundColor: "#737373",
    },
  });

  const { x, state, translationX, offset, velocityX, index } = useMemoOne(() => ({
    state: new Value(State.UNDETERMINED),
    x: new Value(width * (value - 1)),
    translationX: new Value(0),
    offset: new Value(width * (value - 1)),
    velocityX: new Value(0),
    index: add(round(divide(x, width)), 1)
  }), []);

  useCode(() => {
    return call([add(round(divide(x, width)), 1)], ([val]) => {
      onUpdate(val)
    })
  }, [add(round(divide(x, width)), 1), offset]);
  return (
    <View style={{ height: 50 }}>
      <View style={styles.container}>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#3E41A8",
            width: add(max(x, 0), height),
            height,
            borderRadius: height / 2,
          }} />
        <Markers size={width} {...{ x, state, translationX, velocityX, offset, count }} />
        <Cursor size={width} {...{ x, state, translationX, velocityX, offset, count }} />
      </View>
      <Labels size={width} {...{ x, translationX, velocityX, offset, count }} />
    </View>
  );
};
