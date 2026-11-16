import { useEffect, useReducer } from "react";
import { Keyboard } from "react-native";
import { drawAnswer } from "@/data/answers";
import { initialPrediction, predictionReducer } from "@/utils/prediction";

export function usePredictions() {
  const [state, dispatch] = useReducer(predictionReducer, initialPrediction);
  useEffect(() => {
    if (state.phase !== "thinking") return;
    const timer = setTimeout(
      () =>
        dispatch({
          type: "resolve",
          requestId: state.requestId,
          answer: drawAnswer(),
          now: Date.now(),
        }),
      1500,
    );
    return () => clearTimeout(timer);
  }, [state.phase, state.requestId]);
  const ask = (question = state.question) => {
    if (question.trim()) Keyboard.dismiss();
    dispatch({ type: "ask", question });
  };
  return {
    state,
    ask,
    edit: (value: string) => dispatch({ type: "edit", value }),
    reset: () => dispatch({ type: "reset" }),
    clearHistory: () => dispatch({ type: "clear-history" }),
  };
}
