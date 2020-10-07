import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  ReText,
  clamp,
  onGestureEvent,
  snapPoint,
  timing,
} from "react-native-redash";
import Animated, {
  cond,
  eq,
  floor,
  lessThan,
  modulo,
  set,
  call,
  useCode,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { Value, round, divide, concat, add } = Animated;

interface CursorProps {
  x: Animated.Value<number>;
  translationX: Animated.Value<number>;
  velocityX: Animated.Value<number>;
  offset: Animated.Value<number>;
  state: Animated.Value<number>;
  size: number;
  count: number;
}

export default ({ size, count, state, velocityX, x, offset, translationX }: CursorProps) => {
  const snapPoints = new Array(count).fill(0).map((e, i) => i * size);
  const index = round(divide(x, size));
  const gestureHandler = onGestureEvent({ state, translationX, velocityX });
  const value = add(offset, translationX);
  const translateX = clamp(
    cond(
      eq(state, State.END),
      set(
        offset,
        timing({
          from: value,
          to: snapPoint(value, velocityX, snapPoints),
        })
      ),
      value
    ),
    0,
    (count - 1) * size
  );
  useCode(() => set(x, translateX), [x, translateX]);

  useEffect(() => {
    translationX.setValue(0);
    offset.setValue(x);
    velocityX.setValue(0);
  }, [concat(x)])

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          top: -30 / 4,
          width: 30,
          height: 30,
          borderRadius: size,
          backgroundColor: "#3E41A8",
          elevation: 5,
          shadowColor: "white",
          shadowOffset: {
            width: -2,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateX: x }],
        }}
      >
        <ReText style={{ fontSize: 8, color: "white", textAlign: "center" }} text={concat(add(round(divide(x, size)), 1))} />
      </Animated.View>
    </PanGestureHandler>
  );
};
