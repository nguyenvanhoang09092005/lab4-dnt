import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Action, Card } from "@/components/lab-ui";
import { categoryColors, categoryLabels } from "@/data/answers";
import type { Prediction } from "@/utils/prediction";
export function HistoryPanel({
  history,
  count,
  thinking,
  onClear,
  onRepeat,
}: {
  history: Prediction[];
  count: number;
  thinking: boolean;
  onClear: () => void;
  onRepeat: (question: string) => void;
}) {
  return (
    <Card style={{ flex: 1, padding: 22 }}>
      <View style={styles.header}>
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={styles.eyebrow}>NHỮNG LỜI HỒI ĐÁP</Text>
          <Text accessibilityRole="header" style={styles.title}>
            Nhật ký vũ trụ
          </Text>
        </View>
        <Text style={styles.badge}>{count}</Text>
      </View>
      <Text style={styles.muted}>
        {count} lần dự đoán · {history.length} mục trong lịch sử
      </Text>
      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.star}>✧</Text>
          <Text style={styles.emptyTitle}>
            Mọi điều bắt đầu từ một câu hỏi.
          </Text>
          <Text style={[styles.muted, { textAlign: "center" }]}>
            Những câu hỏi và lời hồi đáp của bạn sẽ xuất hiện ở đây.
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{ maxHeight: 490 }}
          nestedScrollEnabled
          contentContainerStyle={{ gap: 14 }}
          keyboardShouldPersistTaps="handled"
        >
          {history.map((entry) => (
            <View key={entry.id} style={styles.entry}>
              <View style={styles.header}>
                <Text
                  style={[
                    styles.tag,
                    { color: categoryColors[entry.answer.category] },
                  ]}
                >
                  {categoryLabels[entry.answer.category]}
                </Text>
                <Text style={styles.time}>
                  {new Date(entry.createdAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
              <Text style={styles.question}>{entry.question}</Text>
              <Text
                style={[
                  styles.answer,
                  { color: categoryColors[entry.answer.category] },
                ]}
              >
                {entry.answer.text}
              </Text>
              <Action
                label="Hỏi lại câu này ↗"
                secondary
                disabled={thinking}
                onPress={() => onRepeat(entry.question)}
              />
            </View>
          ))}
        </ScrollView>
      )}
      <Action
        label="Xóa lịch sử"
        secondary
        disabled={history.length === 0}
        onPress={onClear}
      />
    </Card>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  eyebrow: {
    color: "#AB98C8",
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: "700",
  },
  title: { color: "#F6F0FF", fontSize: 22, fontWeight: "700" },
  badge: {
    color: "#DDC9FF",
    backgroundColor: "#44305C",
    minWidth: 40,
    textAlign: "center",
    padding: 11,
    borderRadius: 12,
    fontWeight: "700",
  },
  muted: { color: "#B5A7C9", fontSize: 13, lineHeight: 22 },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minHeight: 250,
    gap: 14,
    paddingVertical: 24,
  },
  star: { fontSize: 48, color: "#B18CE8" },
  emptyTitle: {
    color: "#EBE1FA",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 25,
  },
  entry: {
    backgroundColor: "#181326",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B2F50",
    padding: 16,
    gap: 10,
  },
  tag: { fontSize: 11, fontWeight: "700" },
  time: { fontSize: 11, color: "#AF9EC5" },
  question: { color: "#F4EDFF", fontSize: 14, lineHeight: 22 },
  answer: { fontSize: 14, lineHeight: 22 },
});
