import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { type Answer, categoryColors } from "@/data/answers";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { AnswerDisplay } from "./AnswerDisplay";
export function Magic8Ball({
  answer,
  thinking,
  onPress,
}: {
  answer: Answer | null;
  thinking: boolean;
  onPress: () => void;
}) {
  const [movement] = useState(() => new Animated.Value(0));
  const reduced = useReducedMotion();
  const glow = answer ? categoryColors[answer.category] : "#AB85FF";
  useEffect(() => {
    movement.setValue(0);
    if (!thinking || reduced) return;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(movement, {
          toValue: 1,
          duration: 90,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(movement, {
          toValue: -1,
          duration: 180,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(movement, {
          toValue: 0,
          duration: 90,
          useNativeDriver: Platform.OS !== "web",
        }),
      ]),
    );
    animation.start();
    return () => {
      animation.stop();
      movement.setValue(0);
    };
  }, [thinking, movement, reduced]);
  return (
    <View style={styles.stage}>
      <View
        pointerEvents="none"
        style={[
          styles.halo,
          {
            borderColor: glow + "26",
            backgroundImage:
              "radial-gradient(circle, " + glow + "22, transparent 68%)",
          },
        ]}
      />
      <View pointerEvents="none" style={styles.orbit} />
      <Animated.View
        style={[
          styles.holder,
          {
            transform: [
              {
                translateX: movement.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-8, 8],
                }),
              },
              {
                rotate: movement.interpolate({
                  inputRange: [-1, 1],
                  outputRange: ["-7deg", "7deg"],
                }),
              },
            ],
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Chạm quả cầu để nhận câu trả lời"
          accessibilityState={{ disabled: thinking, busy: thinking }}
          disabled={thinking}
          onPress={onPress}
          style={({ pressed }) => [
            styles.ball,
            {
              borderColor: glow + "55",
              opacity: pressed ? 0.85 : 1,
              boxShadow:
                "0 12px 75px " + glow + "30, inset 0 -24px 45px #000000BB",
            },
          ]}
        >
          <View pointerEvents="none" style={styles.reflection} />
          <AnswerDisplay answer={answer} thinking={thinking} />
        </Pressable>
      </Animated.View>
      <View pointerEvents="none" style={styles.shadow} />
    </View>
  );
}
const styles = StyleSheet.create({
  stage: {
    width: "100%",
    maxWidth: 410,
    aspectRatio: 1.12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  halo: {
    position: "absolute",
    width: "96%",
    aspectRatio: 1,
    borderRadius: 250,
    borderWidth: 1,
  },
  orbit: {
    position: "absolute",
    width: "83%",
    aspectRatio: 1,
    borderRadius: 250,
    borderWidth: 1,
    borderColor: "#B799E71A",
  },
  holder: { width: "75%", aspectRatio: 1 },
  ball: {
    flex: 1,
    borderRadius: 200,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#141322",
    backgroundImage:
      "radial-gradient(circle at 30% 20%, #666075, #252333 30%, #080811 72%)",
  },
  reflection: {
    position: "absolute",
    top: "9%",
    left: "16%",
    width: "36%",
    height: "13%",
    borderRadius: 90,
    backgroundImage: "linear-gradient(140deg, #FFFFFF24, transparent)",
    transform: [{ rotate: "-30deg" }],
  },
  shadow: {
    position: "absolute",
    bottom: 4,
    width: "58%",
    height: 18,
    borderRadius: 100,
    backgroundImage: "radial-gradient(ellipse, #00000099, transparent 70%)",
  },
});
