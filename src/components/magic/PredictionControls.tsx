import { View } from "react-native";
import { Action } from "@/components/lab-ui";
export function PredictionControls({
  canRepeat,
  thinking,
  onRepeat,
  onReset,
}: {
  canRepeat: boolean;
  thinking: boolean;
  onRepeat: () => void;
  onReset: () => void;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View style={{ flex: 1 }}>
        <Action
          label="↻  Shake Again"
          secondary
          disabled={!canRepeat || thinking}
          onPress={onRepeat}
        />
      </View>
      <Action label="Reset" secondary onPress={onReset} />
    </View>
  );
}
