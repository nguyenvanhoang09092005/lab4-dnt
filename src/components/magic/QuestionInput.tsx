import { StyleSheet, Text, TextInput, View } from "react-native";
import { Action } from "@/components/lab-ui";
export function QuestionInput({
  question,
  error,
  thinking,
  onChange,
  onSubmit,
  onClear,
}: {
  question: string;
  error: string;
  thinking: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}) {
  return (
    <View style={styles.form}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>ĐIỀU BẠN ĐANG TÒ MÒ</Text>
        <Text style={styles.count}>{question.length}/240</Text>
      </View>
      <TextInput
        accessibilityLabel="Câu hỏi của bạn"
        value={question}
        onChangeText={onChange}
        editable={!thinking}
        placeholder="Liệu điều mình mong chờ sẽ thành hiện thực?"
        placeholderTextColor="#9D91B3"
        maxLength={240}
        returnKeyType="go"
        onSubmitEditing={onSubmit}
        style={[styles.input, error ? { borderColor: "#FFADB9" } : undefined]}
      />
      {error ? (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      ) : null}
      <View style={styles.actions}>
        <View style={{ flex: 1 }}>
          <Action
            label={thinking ? "Đang tìm lời hồi đáp…" : "✧  Hỏi quả cầu"}
            disabled={thinking}
            onPress={onSubmit}
          />
        </View>
        <Action
          label="Clear"
          secondary
          disabled={thinking || !question}
          onPress={onClear}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: { gap: 12, width: "100%" },
  labelRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  label: {
    fontSize: 10,
    letterSpacing: 1.8,
    fontWeight: "700",
    color: "#CBBBE4",
  },
  count: { fontSize: 11, color: "#A89ABF" },
  input: {
    borderWidth: 1,
    borderColor: "#554366",
    borderRadius: 16,
    backgroundColor: "#171225",
    minHeight: 58,
    padding: 16,
    fontSize: 15,
    color: "#F6F0FF",
  },
  actions: { flexDirection: "row", gap: 10 },
  error: { color: "#FFADB9", fontSize: 13 },
});
