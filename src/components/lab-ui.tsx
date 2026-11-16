import { useState, type PropsWithChildren, type ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import lab from "@/constants/lab.json";
export function useLabTheme() {
  return {
    dark: true,
    background: "#100C1C",
    surface: "#21182F",
    soft: "#362746",
    text: "#F6F0FF",
    muted: "#BCACCF",
    border: "#483557",
    accent: "#CBB0F4",
    solid: "#8660C6",
    danger: "#FFADB9",
    success: "#90E2C4",
  };
}
export function LabScreen({
  children,
  title = lab.name,
  subtitle = lab.tagline,
  wide = false,
  background,
}: PropsWithChildren<{
  title?: string;
  subtitle?: string;
  wide?: boolean;
  background?: ReactNode;
}>) {
  const t = useLabTheme(),
    insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: t.background,
        backgroundImage: "linear-gradient(135deg, #241335, #0B1024)",
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {background}
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        contentContainerStyle={[
          ui.page,
          {
            paddingTop: Math.max(insets.top, 24),
            paddingLeft: Math.max(insets.left, 16),
            paddingRight: Math.max(insets.right, 16),
            paddingBottom: 28,
          },
        ]}
      >
        <View style={[ui.content, wide && { maxWidth: 1080 }]}>
          <View style={ui.brandRow}>
            <View style={[ui.labBadge, { backgroundColor: t.soft }]}>
              <Text style={[ui.eyebrow, { color: t.accent }]}>
                LAB {String(lab.number).padStart(2, "0")}
              </Text>
            </View>
            <Text style={[ui.caption, { color: t.muted }]}>
              A LITTLE COSMIC CURIOSITY
            </Text>
          </View>
          <Text
            accessibilityRole="header"
            style={[ui.title, { color: t.text }]}
          >
            {title}
          </Text>
          <Text style={[ui.subtitle, { color: t.muted }]}>{subtitle}</Text>
          <View style={ui.stack}>{children}</View>
          <Text style={[ui.footer, { color: t.muted }]}>
            {lab.name} · Chạm để khám phá
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export function Card({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const t = useLabTheme();
  return (
    <View
      style={[
        ui.card,
        { backgroundColor: t.surface, borderColor: t.border },
        style,
      ]}
    >
      {children}
    </View>
  );
}
export function Action({
  label,
  onPress,
  secondary = false,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
}) {
  const t = useLabTheme();
  const [hovered, setHovered] = useState(false);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={({ pressed }) => [
        ui.action,
        {
          backgroundColor: secondary ? t.soft : t.solid,
          opacity: disabled ? 0.45 : pressed ? 0.78 : hovered ? 0.88 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          borderWidth: 1,
          borderColor: secondary ? t.border : t.solid,
        },
      ]}
    >
      <Text style={[ui.actionText, { color: secondary ? t.text : "#FFFFFF" }]}>
        {label}
      </Text>
    </Pressable>
  );
}
export function Label({ children }: PropsWithChildren) {
  const t = useLabTheme();
  return <Text style={[ui.label, { color: t.muted }]}>{children}</Text>;
}
export function Notice({
  children,
  error = false,
}: PropsWithChildren<{ error?: boolean }>) {
  const t = useLabTheme();
  return (
    <Text
      accessibilityRole={error ? "alert" : undefined}
      accessibilityLiveRegion="polite"
      style={[ui.notice, { color: error ? t.danger : t.muted }]}
    >
      {children}
    </Text>
  );
}
export function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  const t = useLabTheme();
  return (
    <View style={ui.metric}>
      <Text style={[ui.metricValue, { color: t.accent }]}>{value}</Text>
      <Text style={[ui.caption, { color: t.muted }]}>{label}</Text>
    </View>
  );
}
export const ui = StyleSheet.create({
  page: { flexGrow: 1, alignItems: "center" },
  content: { width: "100%", maxWidth: 640 },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 26,
  },
  labBadge: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 12 },
  eyebrow: { fontSize: 11, letterSpacing: 1.5, fontWeight: "800" },
  caption: {
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -1.2,
    flexShrink: 1,
  },
  subtitle: { fontSize: 15, lineHeight: 23, marginTop: 8, marginBottom: 28 },
  stack: { gap: 18 },
  card: { borderRadius: 26, borderWidth: 1, padding: 22, gap: 16 },
  action: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  label: { fontSize: 11, lineHeight: 17, fontWeight: "700", letterSpacing: 1 },
  notice: { fontSize: 14, lineHeight: 22 },
  row: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  center: { alignItems: "center" },
  heading: { fontSize: 23, lineHeight: 31, fontWeight: "700" },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 17,
  },
  metric: {
    flex: 1,
    minWidth: 72,
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  footer: { fontSize: 11, textAlign: "center", marginTop: 30, lineHeight: 18 },
});
