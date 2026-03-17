export interface CQSection {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  vietNamTitle: string;
  vietNamPoints: string[];
  indiaTitle: string;
  indiaPoints: string[];
  takeaway: string;
}

export const cqHero = {
  badge: "CQ",
  title: "Vì sao Việt Nam phải dùng bạo lực cách mạng, còn Ấn Độ có thể đi theo con đường bất bạo động?",
  lead:
    "Ngày 19/12/1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi Toàn quốc kháng chiến. Từ câu hỏi vận dụng trong tài liệu, trang này lý giải sự khác nhau giữa con đường giải phóng dân tộc của Việt Nam và Ấn Độ bằng một mạch lập luận rõ ràng, dễ đối chiếu.",
  question:
    "Tại sao Ấn Độ đấu tranh không dùng bạo lực mà vẫn giành được độc lập, nhưng Việt Nam lại buộc phải dùng bạo lực để bảo vệ nền độc lập vừa giành được?",
  image: "/image/image40.png",
};

export const cqSections: CQSection[] = [
  {
    id: "01",
    title: "Sự khác biệt về bản chất của kẻ thù",
    image: "/image/image41.png",
    imageAlt: "Tư liệu minh họa sự khác biệt giữa thực dân Pháp tại Việt Nam và đế quốc Anh tại Ấn Độ",
    vietNamTitle: "Thực dân Pháp tại Việt Nam",
    vietNamPoints: [
      "Sau Chiến tranh thế giới thứ hai, Pháp quyết tâm tái chiếm Đông Dương bằng quân sự để khôi phục vị thế cường quốc.",
      "Pháp không chấp nhận trao độc lập thực sự cho Việt Nam.",
      "Họ sẵn sàng dùng vũ lực và đàn áp để duy trì chế độ thuộc địa.",
    ],
    indiaTitle: "Đế quốc Anh tại Ấn Độ",
    indiaPoints: [
      "Sau chiến tranh, Anh kiệt quệ cả về kinh tế lẫn quân sự.",
      "Anh gặp khó khi duy trì kiểm soát ở một quốc gia đông dân như Ấn Độ.",
      "Họ lựa chọn trao trả độc lập có điều kiện và duy trì ảnh hưởng qua Khối Thịnh vượng chung.",
    ],
    takeaway: "Vì vậy, Anh có xu hướng nhượng bộ, trong khi Pháp quyết tâm dùng vũ lực để trở lại Đông Dương.",
  },
  {
    id: "02",
    title: "Việt Nam đã cố gắng hòa bình nhưng bị ép vào chiến tranh",
    image: "/image/image42.png",
    imageAlt: "Tư liệu minh họa những nỗ lực hòa bình của Việt Nam năm 1946",
    vietNamTitle: "Những nỗ lực hòa bình của Việt Nam",
    vietNamPoints: [
      "Ngày 6/3/1946, Chính phủ Việt Nam ký Hiệp định Sơ bộ với Pháp để tránh xung đột trực diện.",
      "Ngày 14/9/1946, Chủ tịch Hồ Chí Minh tiếp tục ký Tạm ước Việt - Pháp nhằm kéo dài khả năng hòa hoãn.",
      "Chính phủ Việt Nam còn gửi thư, vận động ngoại giao và tìm kiếm sự công nhận quốc tế.",
    ],
    indiaTitle: "Những hành động leo thang của Pháp",
    indiaPoints: [
      "Pháp nổ súng chiếm Nam Bộ và liên tục lấn tới trên nhiều mặt trận.",
      "Tháng 11/1946, Pháp gây thảm sát ở Hải Phòng.",
      "Ngày 18/12/1946, Pháp gửi tối hậu thư đòi tước vũ khí và kiểm soát an ninh Hà Nội.",
    ],
    takeaway: "Khi con đường ngoại giao bị đóng lại, Việt Nam buộc phải phát động kháng chiến để bảo vệ độc lập và chính quyền cách mạng.",
  },
  {
    id: "03",
    title: "Phương thức cai trị của chủ nghĩa thực dân không giống nhau",
    image: "/image/image43.png",
    imageAlt: "Tư liệu minh họa sự khác nhau trong cách cai trị của thực dân tại Ấn Độ và Đông Dương",
    vietNamTitle: "Tại Đông Dương",
    vietNamPoints: [
      "Pháp cai trị bằng bạo lực và đàn áp.",
      "Nhiều phong trào yêu nước bị đàn áp đẫm máu, tiêu biểu là Khởi nghĩa Yên Bái năm 1930.",
      "Phong trào Xô Viết Nghệ Tĩnh 1930 - 1931 cũng bị khủng bố ác liệt.",
    ],
    indiaTitle: "Tại Ấn Độ",
    indiaPoints: [
      "Anh vẫn để lại một số không gian cho hoạt động chính trị hợp pháp.",
      "Đảng Quốc đại Ấn Độ có thể hoạt động công khai và tập hợp lực lượng rộng rãi.",
      "Điều đó tạo điều kiện cho phương thức bất hợp tác, bất bạo động phát triển.",
    ],
    takeaway: "Vì thế, đấu tranh hòa bình ở Ấn Độ có đất sống, còn ở Việt Nam nó rất khó tồn tại trước cơ chế đàn áp thuộc địa.",
  },
  {
    id: "04",
    title: "Học thuyết và nghệ thuật lãnh đạo được hình thành từ những bối cảnh khác nhau",
    image: "/image/image44.png",
    imageAlt: "Tư liệu minh họa sự khác nhau về học thuyết lãnh đạo giữa Việt Nam và Ấn Độ",
    vietNamTitle: "Việt Nam",
    vietNamPoints: [
      "Phong trào được Đảng Cộng sản lãnh đạo trên nền tảng chủ nghĩa Mác - Lênin.",
      "Đường lối cách mạng kết hợp sức mạnh toàn dân với lực lượng vũ trang.",
      "Truyền thống chống ngoại xâm của dân tộc được chuyển hóa thành sức mạnh kháng chiến.",
    ],
    indiaTitle: "Ấn Độ",
    indiaPoints: [
      "Phong trào được Mahatma Gandhi lãnh đạo.",
      "Triết lý Satyagraha nhấn mạnh bất bạo động và bất hợp tác.",
      "Phương pháp này phù hợp với bối cảnh xã hội, tôn giáo và văn hóa của Ấn Độ.",
    ],
    takeaway: "Mỗi phong trào giải phóng dân tộc đã lựa chọn con đường đấu tranh phù hợp với đối tượng, bối cảnh và truyền thống của mình.",
  },
];

export const cqConclusion = {
  image: "/image/image45.png",
  title: "Kết luận",
  lead:
    "Sự khác biệt giữa con đường đấu tranh của Việt Nam và Ấn Độ không nằm ở chỗ dân tộc nào yêu chuộng hòa bình hơn, mà nằm ở điều kiện lịch sử và đối tượng cách mạng khác nhau.",
  reasons: [
    "Bối cảnh lịch sử khác nhau sau Chiến tranh thế giới thứ hai.",
    "Bản chất của chính quyền thực dân khác nhau.",
    "Điều kiện chính trị - xã hội và không gian đấu tranh khác nhau.",
  ],
  finalStatement:
    "Vì vậy, Lời kêu gọi Toàn quốc kháng chiến năm 1946 không phải là lựa chọn hiếu chiến, mà là sự phản kháng bắt buộc của dân tộc Việt Nam để bảo vệ độc lập và quyền tự do.",
};