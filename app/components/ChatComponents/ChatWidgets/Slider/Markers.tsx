import React, { useCallback } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import SVGIcon from '../../../SVGIcon/SVGIcon';
import { labelIcon } from "assets/icons/chatSliderIcons";

const { Value, lessOrEq, add, round, divide } = Animated;

interface MarkerProps {
  x: Animated.Value<number>;
  translationX: Animated.Value<number>;
  offset: Animated.Value<number>;
  velocityX: Animated.Value<number>;
  state: Animated.Value<number>;
  count: number;
  size: number;
}

export default ({ count, x, state, size, velocityX, translationX, offset }: MarkerProps) => {
  const snapPoints = new Array(count).fill(0).map((e, i) => i * size);
  const index = add(round(divide(x, size)), 1);

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state !== State.BEGAN) {
      state.setValue(nativeEvent.state);
    }
  }

  const handleGesture = (evt, i) => {
    let { nativeEvent } = evt;
    if (i * size + nativeEvent.translationX >= 0 && i * size + nativeEvent.translationX <= (count - 1) * size) {
      translationX.setValue(nativeEvent.translationX);
      velocityX.setValue(nativeEvent.velocityX);
      offset.setValue(i * size);
      x.setValue(i * size + nativeEvent.translationX);
    }
  }

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {new Array(count).fill(0).map((e, i) => {
        return (
          <PanGestureHandler key={i} onGestureEvent={(evt) => handleGesture(evt, i)} onHandlerStateChange={handleStateChange}>
            <View style={{
              height: "100%",
              width: (i === 0 || i === count - 1) ? 15 + size / 2 : size,
            }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  translationX.setValue(0);
                  offset.setValue(i * size);
                  velocityX.setValue(0);
                }}>
                <View style={{
                  height: "100%",
                  width: "100%",
                  paddingLeft: i === 0 ? 10 : 0,
                  paddingRight: i === count - 1 ? 10: 0,
                  alignItems: i === 0 ? "flex-start" : i === count - 1 ? "flex-end" : "center",
                  justifyContent: "center"
                }}>
                  <SVGIcon height="8" width="8" src={labelIcon} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </PanGestureHandler>
        );
      })}
    </View>
  );
};
