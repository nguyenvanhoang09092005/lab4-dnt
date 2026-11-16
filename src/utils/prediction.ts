import type { Answer } from "../data/answers";
export interface Prediction {
  id: number;
  question: string;
  answer: Answer;
  createdAt: number;
}
export interface PredictionState {
  phase: "idle" | "thinking" | "answered";
  question: string;
  error: string;
  activeQuestion: string;
  answer: Answer | null;
  history: Prediction[];
  count: number;
  requestId: number;
}
export const initialPrediction: PredictionState = {
  phase: "idle",
  question: "",
  error: "",
  activeQuestion: "",
  answer: null,
  history: [],
  count: 0,
  requestId: 0,
};
export type PredictionAction =
  | { type: "edit"; value: string }
  | { type: "ask"; question: string }
  | { type: "resolve"; requestId: number; answer: Answer; now: number }
  | { type: "clear-history" }
  | { type: "reset" };
export function predictionReducer(
  s: PredictionState,
  a: PredictionAction,
): PredictionState {
  if (a.type === "reset")
    return { ...initialPrediction, requestId: s.requestId + 1 };
  if (a.type === "clear-history") return { ...s, history: [] };
  if (a.type === "edit")
    return s.phase === "thinking"
      ? s
      : {
          ...s,
          question: a.value,
          answer: null,
          phase: "idle",
          error: "",
        };
  if (a.type === "ask") {
    if (s.phase === "thinking") return s;
    const question = a.question.trim().slice(0, 240);
    if (!question) return { ...s, error: "Hãy nhập một câu hỏi trước nhé." };
    return {
      ...s,
      question,
      activeQuestion: question,
      answer: null,
      error: "",
      phase: "thinking",
      requestId: s.requestId + 1,
    };
  }
  if (
    a.type === "resolve" &&
    s.phase === "thinking" &&
    a.requestId === s.requestId
  ) {
    const entry = {
      id: a.requestId,
      question: s.activeQuestion,
      answer: a.answer,
      createdAt: a.now,
    };
    return {
      ...s,
      phase: "answered",
      answer: a.answer,
      count: s.count + 1,
      history: [entry, ...s.history],
    };
  }
  return s;
}
