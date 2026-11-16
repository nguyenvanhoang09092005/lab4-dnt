export type AnswerCategory = "positive" | "neutral" | "negative";
export interface Answer {
  id: number;
  text: string;
  category: AnswerCategory;
}
export const categoryLabels: Record<AnswerCategory, string> = {
  positive: "Tích cực",
  neutral: "Trung lập",
  negative: "Tiêu cực",
};
export const categoryColors: Record<AnswerCategory, string> = {
  positive: "#90E2C4",
  neutral: "#D6BCFF",
  negative: "#FFADB9",
};
export const answers: readonly Answer[] = [
  { id: 1, text: "Có, hãy thử nhé.", category: "positive" },
  { id: 2, text: "Một bất ngờ đang chờ bạn.", category: "positive" },
  { id: 3, text: "Mình có linh cảm tốt!", category: "positive" },
  { id: 4, text: "Câu trả lời là có.", category: "positive" },
  { id: 5, text: "Một khả năng rất thú vị.", category: "positive" },
  { id: 6, text: "Mọi dấu hiệu đều nói có.", category: "positive" },
  { id: 7, text: "Bạn đang đi đúng hướng.", category: "positive" },
  { id: 8, text: "Cơ hội đang ở phía bạn.", category: "positive" },
  { id: 9, text: "Hãy tin vào chính mình.", category: "positive" },
  { id: 10, text: "Một khởi đầu tốt đẹp.", category: "positive" },
  { id: 11, text: "Hãy hỏi lại sau một chút.", category: "neutral" },
  { id: 12, text: "Có lẽ bạn đã biết đáp án.", category: "neutral" },
  { id: 13, text: "Hãy suy nghĩ thêm nhé.", category: "neutral" },
  { id: 14, text: "Đừng vội quyết định.", category: "neutral" },
  { id: 15, text: "Tương lai còn đang mở.", category: "neutral" },
  { id: 16, text: "Cần thêm một chút kiên nhẫn.", category: "neutral" },
  { id: 17, text: "Chưa phải lúc này.", category: "negative" },
  { id: 18, text: "Có lẽ là không.", category: "negative" },
  { id: 19, text: "Đừng đặt kỳ vọng quá cao.", category: "negative" },
  { id: 20, text: "Nên thử một hướng khác.", category: "negative" },
  { id: 21, text: "Dấu hiệu chưa thuận lợi.", category: "negative" },
  { id: 22, text: "Câu trả lời nghiêng về không.", category: "negative" },
  { id: 23, text: "Hãy tạm gác điều này lại.", category: "negative" },
  { id: 24, text: "Bạn xứng đáng với lựa chọn khác.", category: "negative" },
];
export function drawAnswer(random: () => number = Math.random): Answer {
  return answers[
    Math.min(
      answers.length - 1,
      Math.max(0, Math.floor(random() * answers.length)),
    )
  ];
}
