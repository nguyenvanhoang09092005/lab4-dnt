# Lab 4 — Magic 8 Ball

React + TypeScript trên Expo SDK 58, chạy độc lập trên web, Android và iOS.

## Chạy

```sh
npm ci
npm start -- --port 8084
```

Trên máy đã có node_modules chỉ cần lệnh npm start. Web: npm run web -- --port 8084.

## Sử dụng

Nhập câu hỏi và nhấn Enter, chạm quả cầu hoặc nút Hỏi quả cầu. Quả cầu rung, xoay, phát sáng trong 1,5 giây rồi hiện một trong 24 đáp án thuộc ba nhóm tích cực, trung lập, tiêu cực.

- **Clear** xóa ô nhập và đáp án hiện tại.
- **Shake Again** dự đoán lại câu hỏi hợp lệ vừa gửi.
- **Nhật ký vũ trụ** lưu câu hỏi, đáp án, nhóm và thời gian trong phiên đang mở; có thể hỏi lại.
- **Xóa lịch sử** xóa nhật ký, giữ tổng số lượt đã dự đoán.
- **Reset** hủy dự đoán đang chờ, xóa ô nhập, kết quả, lịch sử và bộ đếm.

Lịch sử là dữ liệu của phiên sử dụng, không giữ sau khi tải lại ứng dụng. Chặn câu hỏi rỗng và gửi trùng khi đang xử lý. Hỗ trợ giảm chuyển động theo thiết bị.

## Kiểm tra

```sh
npm run lint
npm run typecheck
npm test
npx expo export --platform all --output-dir .validation/export-upgrade
```

Chi tiết cấu trúc, danh sách tệp và kiểm thử: [UPGRADE.md](./UPGRADE.md). Ảnh kiểm tra ở .validation/upgrade-*.png.
Không chạy reset-project nếu muốn giữ bài Lab. Không import hoặc dùng chung thư viện với các Lab khác.
