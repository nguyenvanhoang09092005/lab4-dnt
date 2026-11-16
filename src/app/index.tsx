import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Card, LabScreen } from "@/components/lab-ui";
import { Magic8Ball } from "@/components/magic/Magic8Ball";
import { QuestionInput } from "@/components/magic/QuestionInput";
import { PredictionControls } from "@/components/magic/PredictionControls";
import { HistoryPanel } from "@/components/magic/HistoryPanel";
import { categoryColors, categoryLabels } from "@/data/answers";
import { usePredictions } from "@/hooks/use-predictions";

export default function MagicScreen() {
  const { state, ask, edit, reset, clearHistory } = usePredictions();
  const { width } = useWindowDimensions();
  const thinking = state.phase === "thinking";
  return (
    <LabScreen
      wide
      title="Magic 8 Ball"
      subtitle="Một câu hỏi. Vô vàn khả năng. Lắng nghe điều vũ trụ muốn nói."
    >
      <View
        style={[styles.columns, width < 850 && { flexDirection: "column" }]}
      >
        <Card style={{ flex: 1.45, padding: width < 450 ? 16 : 26 }}>
          <View style={styles.status}>
            <View
              style={[
                styles.dot,
                { backgroundColor: thinking ? "#E7BEFF" : "#90E2C4" },
              ]}
            />
            <Text style={styles.statusText}>
              {thinking ? "ĐANG KẾT NỐI VỚI VŨ TRỤ" : "VŨ TRỤ ĐANG LẮNG NGHE"}
            </Text>
          </View>
          <Magic8Ball
            answer={state.answer}
            thinking={thinking}
            onPress={() => ask()}
          />
          <Text
            accessibilityLiveRegion="polite"
            style={[
              styles.hint,
              state.answer && { color: categoryColors[state.answer.category] },
            ]}
          >
            {thinking
              ? "Một chút kiên nhẫn, câu trả lời đang đến…"
              : state.answer
                ? categoryLabels[state.answer.category] +
                  " · Một khả năng dành cho bạn"
                : "Nghĩ về một điều. Đặt câu hỏi. Chạm quả cầu."}
          </Text>
          <QuestionInput
            question={state.question}
            error={state.error}
            thinking={thinking}
            onChange={edit}
            onSubmit={() => ask()}
            onClear={() => edit("")}
          />
          <PredictionControls
            canRepeat={!!state.activeQuestion}
            thinking={thinking}
            onRepeat={() => ask(state.activeQuestion)}
            onReset={reset}
          />
        </Card>
        <View style={{ flex: 1, minWidth: 0 }}>
          <HistoryPanel
            history={state.history}
            count={state.count}
            thinking={thinking}
            onClear={clearHistory}
            onRepeat={ask}
          />
        </View>
      </View>
      <Text style={styles.footnote}>
        ✦ Một chút ngẫu nhiên cho ngày thêm vui. Bạn là người quyết định câu
        chuyện của mình.
      </Text>
    </LabScreen>
  );
}
const styles = StyleSheet.create({
  columns: { flexDirection: "row", gap: 22, alignItems: "stretch" },
  status: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: { width: 5, height: 5, borderRadius: 3 },
  statusText: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#C4B2DE",
    fontWeight: "600",
    flexShrink: 1,
  },
  hint: {
    color: "#BCAACF",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 19,
    minHeight: 20,
  },
  footnote: {
    color: "#AC9BBF",
    fontSize: 12,
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
