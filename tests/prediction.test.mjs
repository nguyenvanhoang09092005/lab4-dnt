import test from "node:test";
import assert from "node:assert/strict";
import { answers, drawAnswer } from "../src/data/answers.ts";
import {
  initialPrediction,
  predictionReducer,
} from "../src/utils/prediction.ts";

test("all 24 answers are unique, categorized and reachable by a uniform draw", () => {
  assert.ok(answers.length >= 20);
  assert.equal(new Set(answers.map((a) => a.id)).size, answers.length);
  assert.equal(new Set(answers.map((a) => a.text)).size, answers.length);
  assert.deepEqual(
    new Set(answers.map((a) => a.category)),
    new Set(["positive", "neutral", "negative"]),
  );
  for (let i = 0; i < answers.length; i++)
    assert.equal(
      drawAnswer(() => (i + 0.5) / answers.length).id,
      answers[i].id,
    );
  assert.equal(
    drawAnswer(() => 0),
    answers[0],
  );
  assert.equal(
    drawAnswer(() => 0.999999),
    answers.at(-1),
  );
});

test("rejects empty input; trims valid questions; ignores duplicate submissions and duplicate replies", () => {
  let s = predictionReducer(initialPrediction, {
    type: "ask",
    question: "   ",
  });
  assert.equal(s.phase, "idle");
  assert.ok(s.error);
  assert.equal(s.count, 0);
  s = predictionReducer(s, {
    type: "ask",
    question: "  Hôm nay có may mắn?  ",
  });
  assert.equal(s.activeQuestion, "Hôm nay có may mắn?");
  assert.equal(s.phase, "thinking");
  assert.equal(predictionReducer(s, { type: "ask", question: "Khác" }), s);
  assert.equal(predictionReducer(s, { type: "edit", value: "Khác" }), s);
  const action = {
    type: "resolve",
    requestId: s.requestId,
    answer: answers[0],
    now: 100,
  };
  s = predictionReducer(s, action);
  assert.equal(s.count, 1);
  assert.equal(s.history[0].question, "Hôm nay có may mắn?");
  assert.equal(predictionReducer(s, action), s);
});

test("repeat and history replay create correct entries; clearing history preserves total; reset invalidates pending work", () => {
  let s = initialPrediction;
  for (const question of ["Câu hỏi A?", "Câu hỏi B?", "Câu hỏi A?"]) {
    s = predictionReducer(s, { type: "ask", question });
    s = predictionReducer(s, {
      type: "resolve",
      requestId: s.requestId,
      answer: answers[s.count],
      now: s.count * 1000,
    });
  }
  assert.equal(s.count, 3);
  assert.deepEqual(
    s.history.map((e) => e.question),
    ["Câu hỏi A?", "Câu hỏi B?", "Câu hỏi A?"],
  );
  assert.equal(new Set(s.history.map((e) => e.id)).size, 3);
  s = predictionReducer(s, { type: "clear-history" });
  assert.equal(s.count, 3);
  assert.equal(s.history.length, 0);
  s = predictionReducer(s, { type: "edit", value: "" });
  assert.equal(s.question, "");
  assert.equal(s.answer, null);
  s = predictionReducer(s, { type: "ask", question: "Đang chờ?" });
  const oldId = s.requestId;
  s = predictionReducer(s, { type: "reset" });
  assert.equal(s.count, 0);
  assert.equal(s.question, "");
  assert.equal(s.history.length, 0);
  assert.equal(
    predictionReducer(s, {
      type: "resolve",
      requestId: oldId,
      answer: answers[0],
      now: 20000,
    }),
    s,
  );
  s = predictionReducer(s, { type: "ask", question: "Lượt mới?" });
  assert.equal(
    predictionReducer(s, {
      type: "resolve",
      requestId: oldId,
      answer: answers[1],
      now: 22000,
    }),
    s,
  );
});
