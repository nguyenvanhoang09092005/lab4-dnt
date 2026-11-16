# Nâng cấp Lab4 — Magic 8 Ball

## Trước và sau

Giữ React/TypeScript, Expo Router, màn Hướng dẫn, thành phần LabScreen/Card/Action và thao tác nhập câu hỏi, Enter, chạm quả cầu, chọn đáp án ngẫu nhiên. Giữ đủ 10 đáp án gốc, bổ sung thành 24 đáp án phân nhóm.

Bổ sung trạng thái chờ 1,5 giây, rung/xoay nhẹ, gradient và chiều sâu quả cầu, ánh sáng theo nhóm đáp án, fade khi có kết quả, phản hồi hover/active, hỗ trợ giảm chuyển động, bố cục hai cột trên desktop và một cột trên mobile. Nội dung đáp án tự điều chỉnh cho màn hình hẹp.

Có lịch sử hỏi/đáp và thời gian, hỏi lại từ lịch sử, Clear, Shake Again, Reset, xóa lịch sử và bộ đếm. Reset hủy callback cũ; nút và reducer cùng chặn dự đoán trùng trong lúc chờ. Không thêm phụ thuộc.

## Tổ chức

- data/answers.ts chứa dữ liệu có kiểu, nhãn, màu theo nhóm và phép chọn ngẫu nhiên đều.
- utils/prediction.ts là reducer thuần cho toàn bộ trạng thái.
- hooks/use-predictions.ts quản lý timer, dọn timer và đóng bàn phím.
- components/magic tách quả cầu, đáp án, nhập câu hỏi, lịch sử và điều khiển.
- Lịch sử tồn tại trong phiên mở ứng dụng. Clear không xóa lịch sử; xóa lịch sử không đặt lại tổng; Reset đặt lại toàn bộ.

## Tệp tạo hoặc sửa

- `src/data/answers.ts`
- `src/utils/prediction.ts`
- `src/hooks/use-predictions.ts`
- `src/hooks/use-reduced-motion.ts`
- `src/components/magic/AnswerDisplay.tsx`
- `src/components/magic/Magic8Ball.tsx`
- `src/components/magic/QuestionInput.tsx`
- `src/components/magic/PredictionControls.tsx`
- `src/components/magic/HistoryPanel.tsx`
- `src/app/index.tsx`
- `src/app/explore.tsx`
- `src/app/_layout.tsx`
- `src/components/lab-ui.tsx`
- `src/components/lab-navigation.tsx`
- `src/global.css`
- `src/constants/lab.json`
- `app.json`
- `package.json`
- `tests/prediction.test.mjs`
- `README.md`
- `UPGRADE.md`

Các script, ảnh và log kiểm tra nằm riêng trong .validation, ngoài mã ứng dụng.

## Xác minh

- npm run lint, npm run typecheck, npm test.
- Test dữ liệu 24 đáp án, đủ ba nhóm, mọi đáp án đều có thể được chọn.
- Test câu hỏi rỗng, trim, gửi trùng, trả lời trùng, hỏi liên tiếp, hỏi lại, xóa lịch sử, Clear, Reset và callback cũ.
- Chrome kiểm tra Enter, chạm quả cầu, loading, kết quả, lịch sử, hỏi lại, các nút và Reset trong lúc đang chờ.
- Kiểm tra 320×568, 768×1024, 1440×1000, 844×390; ảnh upgrade-mobile/tablet/desktop/landscape.png.
- Xuất bundle Android/iOS/web; chưa chạy bản cài trên thiết bị thật.
