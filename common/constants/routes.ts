export const CONTENT_ROUTES = [
  {
    name: "Bối cảnh bùng nổ toàn quốc kháng chiến",
    path: "/contents/tinh-tat-yeu-va-vai-tro-lanh-dao",
    number: "01",
  },
  {
    name: "Lời kêu gọi toàn quốc kháng chiến và quyết tâm chiến đấu",
    path: "/contents/dang-phai-trong-sach-vung-manh",
    number: "02",
  },
  {
    name: "Nội dung cốt lõi của đường lối kháng chiến",
    path: "/contents/nguyen-tac-to-chuc-cua-dang",
    number: "03",
  },
  {
    name: "Tổ chức, củng cố lực lượng kháng chiến",
    path: "/contents/Ban-chat-nha-nuoc",
    number: "04",
  },
   {
    name: "Chiến thắng Việt Bắc Thu - Đông 1947",
    path: "/contents/Nha-nuoc-do-nhan-dan-va-nha-nuoc-vi-nhan-dan",
    number: "05",
  },
  {
    name: "Đẩy mạnh kháng chiến toàn diện 1948 - 1949",
    path: "/contents/Xay-dung-Nha-nuoc-phap-quyen",
    number: "06",
  },
  {
    name: "Đột phá đối ngoại và Chiến dịch Biên giới 1950",
    path: "/contents/Nha-nuoc-trong-sach-vung-manh",
    number: "07",
  }

] as const;

export type ContentRoute = (typeof CONTENT_ROUTES)[number];
