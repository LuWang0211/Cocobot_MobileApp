import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated from "react-native-reanimated";
import SVGIcon from '../../../SVGIcon/SVGIcon';
import { labelIcon } from "assets/icons/chatSliderIcons";

const { cond, lessOrEq, add, round, divide } = Animated;

interface LabelProps {
  x: Animated.Value<number>;
  translationX: Animated.Value<number>;
  offset: Animated.Value<number>;
  velocityX: Animated.Value<number>;
  count: number;
  size: number;
}

export default ({ count, x, size, velocityX, translationX, offset }: LabelProps) => {
  const index = add(round(divide(x, size)), 1);
  return (
    <View
      style={{
        paddingTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {new Array(count).fill(0).map((e, i) => {
        return (
          <View key={i}>
            <Animated.Text
              onPress={() => {
                translationX.setValue(0);
                offset.setValue(i * size);
                velocityX.setValue(0);
              }}
              style={{ width: 30, color: "#737373", textAlign: "center", fontSize: 10 }}>
              {i + 1}
            </Animated.Text>
          </View>
        );
      })}
    </View>
  );
};
