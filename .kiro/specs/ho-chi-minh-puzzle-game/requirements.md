# Requirements Document

## Introduction

Trò chơi giáo dục về Tư tưởng Hồ Chí Minh với chủ đề "Đảng Cộng sản Việt Nam và Nhà nước của nhân dân, do nhân dân, vì nhân dân". Trò chơi bao gồm 3 màn chơi: trắc nghiệm, điền từ, và ghép hình. Người chơi phải hoàn thành 9 câu hỏi ở mỗi màn để thu thập 18 mảnh ghép, sau đó ghép các mảnh này vào ảnh hoàn chỉnh. Mỗi lần chơi sẽ chọn ngẫu nhiên câu hỏi từ 100 câu có sẵn.

## Glossary

- **Game System**: Hệ thống trò chơi quản lý luồng chơi, điểm số và trạng thái
- **Question Pool**: Bộ 100 câu hỏi được lưu trong file questions.json
- **Puzzle Piece**: Mảnh ghép hình được mở khóa sau khi trả lời đúng câu hỏi
- **Stage**: Màn chơi (Stage 1: Trắc nghiệm, Stage 2: Điền từ, Stage 3: Ghép hình)
- **User**: Người chơi tương tác với trò chơi
- **Revolutionary Theme**: Giao diện thiết kế theo phong cách lịch sử cách mạng với màu đỏ chủ đạo
- **Timer**: Đồng hồ đếm thời gian chơi game
- **Leaderboard**: Bảng xếp hạng lưu trữ kết quả của người chơi

## Requirements

### Requirement 1

**User Story:** Là người chơi, tôi muốn bắt đầu trò chơi với màn trắc nghiệm, để có thể kiểm tra kiến thức của mình về tư tưởng Hồ Chí Minh

#### Acceptance Criteria

1. WHEN User khởi động trò chơi, THE Game System SHALL hiển thị màn hình chào mừng với tiêu đề chủ đề và nút bắt đầu
2. WHEN User nhấn nút bắt đầu, THE Game System SHALL chọn ngẫu nhiên 9 câu hỏi trắc nghiệm từ Question Pool
3. THE Game System SHALL hiển thị câu hỏi trắc nghiệm với 4 đáp án A, B, C, D
4. WHEN User chọn một đáp án, THE Game System SHALL kiểm tra tính đúng sai và hiển thị phản hồi ngay lập tức
5. IF User trả lời đúng, THEN THE Game System SHALL mở khóa một Puzzle Piece và chuyển sang câu hỏi tiếp theo

### Requirement 2

**User Story:** Là người chơi, tôi muốn hoàn thành màn điền từ sau khi vượt qua màn trắc nghiệm, để tiếp tục thu thập mảnh ghép

#### Acceptance Criteria

1. WHEN User hoàn thành 9 câu hỏi trắc nghiệm, THE Game System SHALL tự động chuyển sang Stage 2
2. THE Game System SHALL chọn ngẫu nhiên 9 câu hỏi điền từ từ Question Pool (không trùng với câu đã dùng)
3. THE Game System SHALL hiển thị câu hỏi với ô input để User nhập đáp án
4. WHEN User nhập đáp án và xác nhận, THE Game System SHALL so sánh đáp án (không phân biệt hoa thường, bỏ qua khoảng trắng thừa)
5. IF User trả lời đúng, THEN THE Game System SHALL mở khóa một Puzzle Piece và chuyển sang câu hỏi tiếp theo

### Requirement 3

**User Story:** Là người chơi, tôi muốn ghép 18 mảnh ghép đã thu thập được vào ảnh hoàn chỉnh, để hoàn thành trò chơi

#### Acceptance Criteria

1. WHEN User hoàn thành 18 câu hỏi (9 trắc nghiệm + 9 điền từ), THE Game System SHALL chuyển sang Stage 3
2. THE Game System SHALL hiển thị ảnh anh1.jpg được chia thành lưới 6x3 (18 ô)
3. THE Game System SHALL hiển thị 18 Puzzle Piece ở vị trí ngẫu nhiên bên ngoài khung ảnh
4. WHEN User kéo một Puzzle Piece vào đúng vị trí, THE Game System SHALL khóa mảnh ghép đó tại vị trí
5. WHEN User ghép đúng tất cả 18 mảnh, THE Game System SHALL hiển thị màn hình chiến thắng với hiệu ứng chúc mừng

### Requirement 4

**User Story:** Là người chơi, tôi muốn thấy tiến độ của mình trong suốt trò chơi, để biết mình đã hoàn thành bao nhiêu phần

#### Acceptance Criteria

1. THE Game System SHALL hiển thị thanh tiến độ cho biết số câu hỏi đã hoàn thành trên tổng số câu
2. THE Game System SHALL hiển thị số Puzzle Piece đã thu thập (x/18)
3. THE Game System SHALL hiển thị tên Stage hiện tại (Màn 1, Màn 2, Màn 3)
4. WHILE User đang chơi, THE Game System SHALL cập nhật tiến độ theo thời gian thực
5. THE Game System SHALL hiển thị số câu trả lời đúng và sai

### Requirement 5

**User Story:** Là người chơi, tôi muốn có cơ hội thử lại khi trả lời sai, để không bị mất mảnh ghép

#### Acceptance Criteria

1. IF User trả lời sai câu hỏi, THEN THE Game System SHALL hiển thị thông báo đáp án sai
2. THE Game System SHALL cho phép User thử lại câu hỏi đó tối đa 2 lần
3. IF User trả lời sai 2 lần, THEN THE Game System SHALL hiển thị đáp án đúng và chuyển sang câu tiếp theo
4. WHEN User trả lời sai, THE Game System SHALL không mở khóa Puzzle Piece cho câu đó
5. THE Game System SHALL ghi nhận câu hỏi bị bỏ qua để không ảnh hưởng đến Stage 3

### Requirement 6

**User Story:** Là người chơi, tôi muốn trải nghiệm giao diện đẹp mắt theo phong cách cách mạng, để cảm nhận được không khí lịch sử

#### Acceptance Criteria

1. THE Game System SHALL sử dụng màu đỏ (#DC143C, #8B0000) làm màu chủ đạo
2. THE Game System SHALL sử dụng màu vàng (#FFD700) cho các điểm nhấn quan trọng
3. THE Game System SHALL hiển thị họa tiết ngôi sao vàng và búa liềm ở header
4. THE Game System SHALL sử dụng font chữ rõ ràng, dễ đọc với kích thước phù hợp
5. THE Game System SHALL có hiệu ứng chuyển động mượt mà khi chuyển màn và tương tác

### Requirement 7

**User Story:** Là người chơi, tôi muốn nghe âm thanh phản hồi khi tương tác, để trải nghiệm game sinh động hơn

#### Acceptance Criteria

1. WHEN User trả lời đúng, THE Game System SHALL phát âm thanh thành công
2. WHEN User trả lời sai, THE Game System SHALL phát âm thanh thất bại
3. WHEN User hoàn thành một Stage, THE Game System SHALL phát âm thanh chúc mừng
4. WHEN User ghép đúng một Puzzle Piece, THE Game System SHALL phát âm thanh click
5. THE Game System SHALL có nút bật/tắt âm thanh

### Requirement 8

**User Story:** Là người chơi, tôi muốn chơi lại trò chơi với các câu hỏi khác, để tiếp tục học tập

#### Acceptance Criteria

1. WHEN User hoàn thành trò chơi, THE Game System SHALL hiển thị nút "Chơi lại"
2. WHEN User nhấn "Chơi lại", THE Game System SHALL reset toàn bộ tiến độ
3. THE Game System SHALL chọn ngẫu nhiên 18 câu hỏi mới từ Question Pool
4. THE Game System SHALL đảm bảo mỗi lần chơi có bộ câu hỏi khác nhau (nếu có thể)
5. THE Game System SHALL lưu lịch sử các câu hỏi đã sử dụng trong phiên chơi hiện tại

### Requirement 9

**User Story:** Là người chơi, tôi muốn trò chơi hoạt động mượt mà trên các thiết bị khác nhau, để có thể chơi mọi lúc mọi nơi

#### Acceptance Criteria

1. THE Game System SHALL hiển thị responsive trên màn hình desktop (≥1024px)
2. THE Game System SHALL hiển thị responsive trên màn hình tablet (768px-1023px)
3. THE Game System SHALL hiển thị responsive trên màn hình mobile (≤767px)
4. THE Game System SHALL tối ưu hóa tương tác kéo thả cho cả chuột và touch
5. THE Game System SHALL load nhanh với thời gian tải trang dưới 3 giây

### Requirement 10

**User Story:** Là người chơi, tôi muốn thấy hướng dẫn chơi trước khi bắt đầu, để hiểu rõ cách chơi

#### Acceptance Criteria

1. WHEN User lần đầu truy cập, THE Game System SHALL hiển thị modal hướng dẫn
2. THE Game System SHALL giải thích rõ ràng 3 Stage và cách thu thập Puzzle Piece
3. THE Game System SHALL có nút "Bỏ qua" để User có thể bắt đầu ngay
4. THE Game System SHALL có nút "Hướng dẫn" luôn hiển thị để User xem lại bất cứ lúc nào
5. THE Game System SHALL lưu trạng thái đã xem hướng dẫn vào localStorage

### Requirement 11

**User Story:** Là người chơi, tôi muốn thời gian hoàn thành của mình được ghi nhận, để so sánh với người chơi khác

#### Acceptance Criteria

1. WHEN User bắt đầu trò chơi, THE Game System SHALL khởi động đồng hồ đếm thời gian
2. THE Game System SHALL hiển thị thời gian đã chơi ở định dạng MM:SS
3. WHEN User hoàn thành trò chơi, THE Game System SHALL dừng đồng hồ và ghi nhận thời gian hoàn thành
4. THE Game System SHALL tạm dừng đồng hồ khi User xem hướng dẫn hoặc tạm dừng game
5. THE Game System SHALL hiển thị thời gian hoàn thành trên màn hình chiến thắng

### Requirement 12

**User Story:** Là người chơi, tôi muốn nhập tên và lưu kết quả của mình vào bảng xếp hạng, để thể hiện thành tích

#### Acceptance Criteria

1. WHEN User hoàn thành trò chơi, THE Game System SHALL yêu cầu User nhập tên (tối đa 20 ký tự)
2. THE Game System SHALL lưu tên User, thời gian hoàn thành và ngày chơi vào localStorage
3. THE Game System SHALL xác thực tên User không được để trống và không chứa ký tự đặc biệt
4. IF User không nhập tên, THEN THE Game System SHALL sử dụng tên mặc định "Người chơi"
5. THE Game System SHALL lưu tối đa 100 kết quả trong bảng xếp hạng

### Requirement 13

**User Story:** Là người chơi, tôi muốn xem bảng xếp hạng những người hoàn thành nhanh nhất, để biết mình đứng thứ mấy

#### Acceptance Criteria

1. THE Game System SHALL có nút "Bảng xếp hạng" trên màn hình chính
2. WHEN User nhấn "Bảng xếp hạng", THE Game System SHALL hiển thị modal với danh sách top 10 người chơi nhanh nhất
3. THE Game System SHALL sắp xếp bảng xếp hạng theo thời gian hoàn thành tăng dần
4. THE Game System SHALL hiển thị: thứ hạng, tên người chơi, thời gian hoàn thành, ngày chơi
5. THE Game System SHALL đánh dấu kết quả của User hiện tại (nếu có trong top 10)
