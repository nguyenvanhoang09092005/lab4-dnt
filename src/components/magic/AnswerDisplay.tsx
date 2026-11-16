import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { type Answer, categoryColors } from "@/data/answers";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
export function AnswerDisplay({
  answer,
  thinking,
}: {
  answer: Answer | null;
  thinking: boolean;
}) {
  const [opacity] = useState(() => new Animated.Value(1));
  const reduced = useReducedMotion();
  const compact = useWindowDimensions().width < 450;
  useEffect(() => {
    opacity.setValue(reduced ? 1 : 0);
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: reduced ? 0 : 500,
      useNativeDriver: Platform.OS !== "web",
    });
    animation.start();
    return () => animation.stop();
  }, [answer, thinking, opacity, reduced]);
  return (
    <View
      style={[styles.window, compact && { padding: 10, gap: 6 }]}
      accessibilityLiveRegion="polite"
    >
      {thinking ? (
        <>
          <ActivityIndicator color="#D7C1FF" size="large" />
          <Text style={[styles.thinking, compact && { fontSize: 10 }]}>
            Đang suy nghĩ…
          </Text>
        </>
      ) : (
        <Animated.View style={{ opacity, alignItems: "center" }}>
          {answer ? (
            <Text
              style={[
                styles.answer,
                compact && { fontSize: 14, lineHeight: 20 },
                { color: categoryColors[answer.category] },
              ]}
            >
              {answer.text}
            </Text>
          ) : (
            <>
              <Text
                style={[
                  styles.eight,
                  compact && { fontSize: 48, lineHeight: 56 },
                ]}
              >
                8
              </Text>
              <Text style={styles.small}>HỎI VŨ TRỤ</Text>
            </>
          )}
        </Animated.View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  window: {
    width: "58%",
    aspectRatio: 1,
    borderRadius: 120,
    backgroundColor: "#171329",
    borderWidth: 2,
    borderColor: "#8B72BE66",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 12,
    backgroundImage: "radial-gradient(circle at 50% 25%, #332257, #100F22)",
  },
  eight: { fontSize: 86, fontWeight: "800", lineHeight: 96, color: "#F1E8FF" },
  small: { color: "#AE9DC9", fontSize: 9, letterSpacing: 2, fontWeight: "700" },
  answer: {
    fontSize: 19,
    lineHeight: 27,
    textAlign: "center",
    fontWeight: "700",
  },
  thinking: { color: "#D7C1FF", fontSize: 12, textAlign: "center" },
});
