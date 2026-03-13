export interface DuongLoiSectionPart {
  heading: string;
  description: string;
  bullets?: string[];
}

export interface DuongLoiSection {
  number: string;
  title: string;
  period: string;
  lead: string;
  quote?: {
    text: string;
    source: string;
  };
  parts: DuongLoiSectionPart[];
  takeaway: string;
}

export const DUONG_LOI_SECTIONS: Record<number, DuongLoiSection> = {
  1: {
    number: "01",
    title: "Bối cảnh bùng nổ toàn quốc kháng chiến",
    period: "Cuối năm 1946",
    lead:
      "Từ cuối tháng 10/1946, tình hình Việt - Pháp ngày càng căng thẳng. Dù Chính phủ Việt Nam kiên trì hòa hoãn, phía Pháp liên tục leo thang quân sự và áp đặt các yêu sách vô lý.",
    parts: [
      {
        heading: "Diễn biến leo thang",
        description:
          "Thực dân Pháp mở rộng đánh chiếm ở nhiều nơi, đặc biệt tại Bắc Bộ và Trung Bộ, đồng thời xúc tiến các kế hoạch chính trị nhằm chia cắt Đông Dương.",
        bullets: [
          "Cuối tháng 11/1946: tấn công Hải Phòng, Lạng Sơn; chiếm đóng trái phép tại Đà Nẵng, Hải Dương.",
          "16-17/12/1946: nổ súng vào các cơ quan của ta tại Hà Nội, gây thảm sát dân thường.",
          "18/12/1946: đưa tối hậu thư đòi giải tán lực lượng tự vệ, đòi quyền kiểm soát an ninh Hà Nội.",
        ],
      },
      {
        heading: "Quyết định lịch sử",
        description:
          "Khi thiện chí hòa bình bị cự tuyệt, Đảng và nhân dân Việt Nam buộc phải lựa chọn con đường kháng chiến để bảo vệ độc lập và chính quyền cách mạng.",
      },
    ],
    takeaway:
      "Kháng chiến toàn quốc là lựa chọn bắt buộc của dân tộc trước âm mưu tái xâm lược của thực dân Pháp.",
  },
  2: {
    number: "02",
    title: "Lời kêu gọi toàn quốc kháng chiến và quyết tâm chiến đấu",
    period: "19/12/1946 - 02/1947",
    lead:
      "Ngày 19/12/1946, Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến, hiệu triệu toàn dân đứng lên bảo vệ Tổ quốc.",
    quote: {
      text: "Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.",
      source: "Lời kêu gọi toàn quốc kháng chiến, 19/12/1946",
    },
    parts: [
      {
        heading: "Kháng chiến bùng nổ",
        description:
          "Từ 20 giờ ngày 19/12/1946, quân dân Hà Nội và các đô thị phía Bắc vĩ tuyến 16 đồng loạt nổ súng.",
      },
      {
        heading: "60 ngày đêm Hà Nội",
        description:
          "Mặt trận Hà Nội chiến đấu ác liệt, giam chân địch, bảo vệ cơ quan đầu não của ta rút an toàn lên căn cứ.",
        bullets: [
          "Tinh thần chiến đấu tiêu biểu: 'Quyết tử cho Tổ quốc quyết sinh'.",
          "Làm thất bại bước đầu kế hoạch 'đánh nhanh, thắng nhanh' của Pháp.",
          "Ngày 17/2/1947, Trung đoàn Thủ đô rút ra ngoài thành phố để bảo toàn lực lượng lâu dài.",
        ],
      },
    ],
    takeaway:
      "Lời kêu gọi của Chủ tịch Hồ Chí Minh trở thành ngọn cờ quy tụ ý chí toàn dân trong những ngày đầu toàn quốc kháng chiến.",
  },
  3: {
    number: "03",
    title: "Nội dung cốt lõi của đường lối kháng chiến",
    period: "Hình thành 1945 - 1947",
    lead:
      "Đường lối kháng chiến chống thực dân Pháp được Đảng hình thành và hoàn thiện qua nhiều văn kiện, nổi bật ở giai đoạn 1945-1947.",
    parts: [
      {
        heading: "Mục tiêu chiến lược",
        description:
          "Đánh đổ thực dân Pháp xâm lược, giành độc lập, tự do, thống nhất hoàn toàn; góp phần bảo vệ hòa bình thế giới.",
      },
      {
        heading: "Toàn dân",
        description:
          "Huy động toàn bộ sức dân, tài dân, lực dân; mỗi người dân là một chiến sĩ, mỗi làng xã là một pháo đài.",
      },
      {
        heading: "Toàn diện",
        description:
          "Kết hợp đấu tranh quân sự với chính trị, kinh tế, văn hóa, tư tưởng, ngoại giao; trong đó quân sự là mũi nhọn quyết định.",
      },
      {
        heading: "Lâu dài và dựa vào sức mình là chính",
        description:
          "Trường kỳ kháng chiến để chuyển hóa tương quan lực lượng; lấy nội lực dân tộc làm nền tảng, đồng thời tranh thủ ủng hộ quốc tế.",
      },
    ],
    takeaway:
      "Đường lối toàn dân, toàn diện, lâu dài, dựa vào sức mình là chính là nhân tố quyết định thắng lợi của cuộc kháng chiến.",
  },
  4: {
    number: "04",
    title: "Tổ chức, củng cố lực lượng kháng chiến",
    period: "1947",
    lead:
      "Sau khi toàn quốc kháng chiến bùng nổ, Trung ương Đảng tập trung tổ chức lại hệ thống chỉ đạo và củng cố toàn diện lực lượng chính trị, quân sự, hậu phương.",
    parts: [
      {
        heading: "Kiện toàn hệ thống lãnh đạo",
        description:
          "Cả nước được chia thành các khu, chiến khu quân sự; Ủy ban kháng chiến hành chính được thành lập và củng cố ở nhiều cấp.",
      },
      {
        heading: "Mở rộng lực lượng",
        description:
          "Hội nghị cán bộ Trung ương (6/4/1947) nhấn mạnh mở rộng mặt trận dân tộc thống nhất, phát triển chiến tranh du kích, củng cố tổ chức Đảng.",
        bullets: [
          "Cuối năm 1947: đảng viên toàn Đảng vượt 70.000 người.",
          "Bộ đội chính quy phát triển hơn 12 vạn quân.",
          "Dân quân tự vệ phát triển trên 1 triệu người.",
        ],
      },
      {
        heading: "Xây dựng hậu phương",
        description:
          "Đẩy mạnh tăng gia sản xuất, duy trì bình dân học vụ, phát triển công an, tranh thủ sự ủng hộ quốc tế phục vụ kháng chiến lâu dài.",
      },
    ],
    takeaway:
      "Tổ chức lực lượng đúng hướng giúp ta giữ thế chủ động chiến lược ngay trong giai đoạn đầu đầy khó khăn.",
  },
  5: {
    number: "05",
    title: "Chiến thắng Việt Bắc Thu - Đông 1947",
    period: "10/1947 - 12/1947",
    lead:
      "Thu - Đông 1947, thực dân Pháp mở cuộc tấn công quy mô lớn lên căn cứ Việt Bắc nhằm tiêu diệt cơ quan đầu não kháng chiến.",
    parts: [
      {
        heading: "Âm mưu và lực lượng địch",
        description:
          "Pháp huy động khoảng 15.000 quân, tổ chức nhiều mũi tiến công đường bộ, đường sông và nhảy dù nhằm đánh nhanh, thắng nhanh.",
      },
      {
        heading: "Chủ trương chỉ đạo của Đảng",
        description:
          "Ngày 15/10/1947, Ban Thường vụ Trung ương ra Chỉ thị 'Phải phá tan cuộc tấn công mùa đông của giặc Pháp'.",
        bullets: [
          "Đẩy mạnh chiến tranh du kích.",
          "Cắt đường tiếp tế của địch.",
          "Đánh địch đồng loạt trên các hướng tiến công.",
        ],
      },
      {
        heading: "Kết quả",
        description:
          "Sau 75 ngày đêm chiến đấu, quân dân ta bẻ gãy các mũi tiến công, bảo toàn căn cứ địa và làm thất bại kế hoạch chiến lược của Pháp.",
      },
    ],
    takeaway:
      "Chiến thắng Việt Bắc 1947 khẳng định tính đúng đắn của đường lối chiến tranh nhân dân do Đảng đề ra.",
  },
  6: {
    number: "06",
    title: "Đẩy mạnh kháng chiến toàn diện",
    period: "1948 - 1949",
    lead:
      "Từ năm 1948, Đảng chủ trương đẩy mạnh kháng chiến toàn diện để làm thất bại âm mưu kéo dài chiến tranh của thực dân Pháp.",
    parts: [
      {
        heading: "Củng cố thực lực trong nước",
        description:
          "Phong trào thi đua ái quốc được phát động sâu rộng; sản xuất, giáo dục và văn hóa được duy trì ngay trong điều kiện chiến tranh.",
        bullets: [
          "11/6/1948: Chủ tịch Hồ Chí Minh ra Lời kêu gọi Thi đua ái quốc.",
          "7/1948: Hội nghị Văn hóa toàn quốc thông qua phương châm văn hóa dân tộc, khoa học, đại chúng.",
        ],
      },
      {
        heading: "Phát triển chiến tranh du kích",
        description:
          "Tại vùng tạm chiếm, ta đẩy mạnh tổng phá tề, trừ gian, chống càn quét, phối hợp tác chiến ở nhiều địa bàn.",
      },
      {
        heading: "Mở rộng phối hợp khu vực",
        description:
          "Đảng chủ trương tăng cường phối hợp chiến đấu với Lào, Campuchia và hỗ trợ lực lượng cách mạng tại khu vực biên giới.",
      },
    ],
    takeaway:
      "Giai đoạn 1948-1949 tạo nền thực lực toàn diện để cuộc kháng chiến chuyển sang thế phát triển cao hơn.",
  },
  7: {
    number: "07",
    title: "Đột phá đối ngoại và Chiến dịch Biên giới 1950",
    period: "1950",
    lead:
      "Năm 1950, cuộc kháng chiến đạt bước ngoặt lớn trên cả mặt trận ngoại giao và quân sự, tạo cục diện mới có lợi cho ta.",
    parts: [
      {
        heading: "Mở rộng quan hệ quốc tế",
        description:
          "Đầu năm 1950, Trung Quốc, Liên Xô và nhiều nước xã hội chủ nghĩa lần lượt công nhận, đặt quan hệ ngoại giao với Việt Nam Dân chủ Cộng hòa.",
      },
      {
        heading: "Tăng cường lực lượng",
        description:
          "Quân đội và dân quân phát triển nhanh, công tác động viên nhân lực - vật lực được đẩy mạnh để chuẩn bị cho chiến dịch lớn.",
      },
      {
        heading: "Chiến dịch Biên giới Thu - Đông 1950",
        description:
          "Từ 16/9 đến 17/10/1950, ta mở chiến dịch dọc biên giới Cao Bằng - Lạng Sơn, tiêu diệt sinh lực địch, mở thông biên giới Việt - Trung.",
        bullets: [
          "Phá thế bao vây chiến lược của địch.",
          "Mở rộng căn cứ địa Việt Bắc.",
          "Đưa cuộc kháng chiến sang giai đoạn phát triển cao hơn.",
        ],
      },
    ],
    takeaway:
      "Thắng lợi năm 1950 xác lập thế và lực mới cho kháng chiến chống Pháp, tạo tiền đề cho các bước tiến chiến lược tiếp theo.",
  },
};

export function getDuongLoiSection(sectionNumber: number) {
  return DUONG_LOI_SECTIONS[sectionNumber];
}
