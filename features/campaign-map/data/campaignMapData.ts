export interface MapQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MapLocation {
  id: string;
  name: string;
  period: string;
  eventDate: string;
  eventTitle: string;
  summary: string;
  shortDescription: string;
  image: string;
  longitude: number;
  latitude: number;
  xPercent: number;
  yPercent: number;
  secretTitle: string;
  secretContent: string;
  quiz: MapQuiz;
}

const VIETNAM_VIEWBOX = {
  width: 1000,
  height: 1600,
};

const VIEWBOX_PADDING = 10;
export const VIETNAM_VIEWBOX_WIDTH = VIETNAM_VIEWBOX.width;
export const VIETNAM_VIEWBOX_HEIGHT = VIETNAM_VIEWBOX.height;

// Simplified Vietnam boundary from public geographic data.
const vietnamBoundaryCoordinates: Array<[number, number]> = [
  [108.05018, 21.55238],
  [106.71507, 20.69685],
  [105.88168, 19.75205],
  [105.66201, 19.05817],
  [106.42682, 18.00412],
  [107.36195, 16.69746],
  [108.26949, 16.07974],
  [108.87711, 15.27669],
  [109.33527, 13.42603],
  [109.20014, 11.66686],
  [108.36613, 11.00832],
  [107.22093, 10.36448],
  [106.40511, 9.53084],
  [105.15826, 8.59976],
  [104.79519, 9.24104],
  [105.0762, 9.91849],
  [104.33433, 10.48654],
  [105.19991, 10.88931],
  [106.24967, 10.96181],
  [105.81052, 11.56761],
  [107.4914, 12.33721],
  [107.61455, 13.53553],
  [107.38273, 14.20244],
  [107.56453, 15.20217],
  [107.3127, 15.90854],
  [106.55601, 16.60428],
  [105.92576, 17.48532],
  [105.0946, 18.66697],
  [103.89653, 19.26518],
  [104.18339, 19.62467],
  [104.82257, 19.88664],
  [104.435, 20.75873],
  [103.20386, 20.76656],
  [102.7549, 21.67514],
  [102.17044, 22.46475],
  [102.70699, 22.7088],
  [103.50451, 22.70376],
  [104.47686, 22.81915],
  [105.32921, 23.35206],
  [105.81125, 22.97689],
  [106.7254, 22.79427],
  [106.56727, 22.2182],
  [107.04342, 21.8119],
  [108.05018, 21.55238],
];

const vietnamBounds = vietnamBoundaryCoordinates.reduce(
  (bounds, [longitude, latitude]) => ({
    minLon: Math.min(bounds.minLon, longitude),
    maxLon: Math.max(bounds.maxLon, longitude),
    minLat: Math.min(bounds.minLat, latitude),
    maxLat: Math.max(bounds.maxLat, latitude),
  }),
  {
    minLon: Number.POSITIVE_INFINITY,
    maxLon: Number.NEGATIVE_INFINITY,
    minLat: Number.POSITIVE_INFINITY,
    maxLat: Number.NEGATIVE_INFINITY,
  }
);

const longitudeRange = vietnamBounds.maxLon - vietnamBounds.minLon;
const latitudeRange = vietnamBounds.maxLat - vietnamBounds.minLat;

const svgDrawableWidth = VIETNAM_VIEWBOX.width - VIEWBOX_PADDING * 2;
const svgDrawableHeight = VIETNAM_VIEWBOX.height - VIEWBOX_PADDING * 2;
const svgScale = Math.min(svgDrawableWidth / longitudeRange, svgDrawableHeight / latitudeRange);

const renderedMapWidth = longitudeRange * svgScale;
const renderedMapHeight = latitudeRange * svgScale;
const mapOffsetX = (VIETNAM_VIEWBOX.width - renderedMapWidth) / 2;
const mapOffsetY = (VIETNAM_VIEWBOX.height - renderedMapHeight) / 2;

const formatValue = (value: number) => Number(value.toFixed(2));

export const projectLonLatToSvgPoint = (longitude: number, latitude: number) => {
  return {
    x: formatValue(mapOffsetX + (longitude - vietnamBounds.minLon) * svgScale),
    y: formatValue(mapOffsetY + (vietnamBounds.maxLat - latitude) * svgScale),
  };
};

const outlinePoints = vietnamBoundaryCoordinates.map(([longitude, latitude]) =>
  projectLonLatToSvgPoint(longitude, latitude)
);

const [firstOutlinePoint, ...restOutlinePoints] = outlinePoints;

export const vietnamOutlinePath =
  `M ${firstOutlinePoint.x} ${firstOutlinePoint.y}` +
  restOutlinePoints.map((point) => ` L ${point.x} ${point.y}`).join("") +
  " Z";

export const campaignLocations: MapLocation[] = [
  {
    id: "ha-noi",
    name: "Hà Nội",
    period: "1946 - 1947",
    eventDate: "19/12/1946",
    eventTitle: "Toàn quốc kháng chiến bùng nổ từ Thủ đô",
    summary:
      "Đúng 20 giờ ngày 19/12/1946, Hà Nội nổ súng mở đầu cuộc kháng chiến toàn quốc, giam chân địch suốt 60 ngày đêm.",
    shortDescription:
      "Mặt trận Hà Nội đã hoàn thành nhiệm vụ chiến lược: bảo vệ cơ quan đầu não rút an toàn lên chiến khu, làm thất bại âm mưu đánh nhanh thắng nhanh của Pháp.",
    image: "/image/anh30.jpg",
    longitude: 105.83416,
    latitude: 21.02776,
    xPercent: 50.76,
    yPercent: 20.46,
    secretTitle: "Mật lệnh rút khỏi đô thị",
    secretContent:
      "Giữ thành không phải để giữ phố, mà để kéo thời gian cho cả nước chuyển sang thế trận kháng chiến lâu dài.",
    quiz: {
      question: "Sự kiện nào đánh dấu cuộc kháng chiến toàn quốc chính thức bùng nổ?",
      options: [
        "Lời kêu gọi toàn quốc kháng chiến ngày 19/12/1946",
        "Chiến thắng Biên giới 1950",
        "Hiệp định Sơ bộ 6/3/1946",
      ],
      correctIndex: 0,
      explanation:
        "Lời kêu gọi toàn quốc kháng chiến ngày 19/12/1946 là mốc lịch sử mở đầu cho cuộc kháng chiến toàn dân.",
    },
  },
  {
    id: "hai-phong",
    name: "Hải Phòng",
    period: "Cuối 1946",
    eventDate: "11/1946",
    eventTitle: "Thực dân Pháp mở rộng tiến công",
    summary:
      "Cuối tháng 11/1946, Pháp đánh chiếm Hải Phòng, đẩy căng thẳng quân sự lên cực điểm và làm tan vỡ khả năng hòa hoãn.",
    shortDescription:
      "Diễn biến ở Hải Phòng cho thấy đối phương quyết tâm dùng quân sự để áp đặt, buộc ta phải chuẩn bị cho kháng chiến toàn diện.",
    image: "/image/31.jpg",
    longitude: 106.68808,
    latitude: 20.84491,
    xPercent: 58.75,
    yPercent: 21.53,
    secretTitle: "Tín hiệu trước giờ bùng nổ",
    secretContent:
      "Những điểm nóng như Hải Phòng là dấu hiệu rõ nhất cho thấy con đường hòa bình đã bị chặn đứng.",
    quiz: {
      question: "Hành động nào của Pháp góp phần đẩy tình hình đến toàn quốc kháng chiến?",
      options: [
        "Mở rộng tấn công vũ trang ở các đô thị như Hải Phòng",
        "Rút quân khỏi miền Bắc",
        "Công nhận độc lập hoàn toàn của Việt Nam",
      ],
      correctIndex: 0,
      explanation:
        "Các cuộc tiến công ở Hải Phòng và nhiều đô thị chứng tỏ Pháp lựa chọn giải pháp quân sự.",
    },
  },
  {
    id: "viet-bac",
    name: "Việt Bắc",
    period: "Thu - Đông 1947",
    eventDate: "15/10 - 21/12/1947",
    eventTitle: "Phá tan cuộc tiến công mùa đông của địch",
    summary:
      "Pháp huy động khoảng 15.000 quân đánh lên ATK Việt Bắc nhưng bị bẻ gãy sau 75 ngày đêm chiến đấu.",
    shortDescription:
      "Việt Bắc là trung tâm bảo vệ cơ quan đầu não. Chiến thắng tại đây giữ vững căn cứ địa và khẳng định đường lối kháng chiến toàn dân, toàn diện, lâu dài.",
    image: "/image/32.jpg",
    longitude: 105.40,
    latitude: 22.2,
    xPercent: 42.1,
    yPercent: 13.61,
    secretTitle: "Lá chắn của Trung ương",
    secretContent:
      "Giữ được Việt Bắc là giữ được nhịp chỉ đạo của cả cuộc kháng chiến và thế chủ động lâu dài.",
    quiz: {
      question: "Ý nghĩa lớn nhất của chiến thắng Việt Bắc 1947 là gì?",
      options: [
        "Bảo toàn cơ quan đầu não, đánh bại kế hoạch đánh nhanh thắng nhanh",
        "Kết thúc hoàn toàn chiến tranh với Pháp",
        "Giải phóng toàn bộ Đông Dương",
      ],
      correctIndex: 0,
      explanation:
        "Chiến thắng Việt Bắc đã bảo vệ được căn cứ địa và làm phá sản kế hoạch chiến lược của Pháp.",
    },
  },
  {
    id: "bac-kan",
    name: "Bắc Kạn",
    period: "Thu - Đông 1947",
    eventDate: "10/1947",
    eventTitle: "Địch nhảy dù thọc sâu vào trung tâm ATK",
    summary:
      "Bắc Kạn là một mục tiêu nhảy dù then chốt của Pháp nhằm bắt gọn cơ quan lãnh đạo kháng chiến.",
    shortDescription:
      "Tại đây, ta vận dụng chiến thuật cơ động, phân tán và phản kích linh hoạt để làm địch sa lầy trong địa hình rừng núi.",
    image: "/image/images.jpg",
    longitude: 105.83481,
    latitude: 22.14701,
    xPercent: 50.77,
    yPercent: 13.92,
    secretTitle: "Đòn phản kích trong vòng vây",
    secretContent:
      "Không đối đầu cứng ở mọi điểm, ta chọn nhịp đánh linh hoạt để kéo địch vào thế bất lợi.",
    quiz: {
      question: "Tại Bắc Kạn, Pháp chủ yếu hướng tới mục tiêu nào?",
      options: [
        "Bắt cơ quan đầu não kháng chiến",
        "Mở trường học bình dân học vụ",
        "Rút lui khỏi chiến trường Bắc Bộ",
      ],
      correctIndex: 0,
      explanation:
        "Mũi nhảy dù vào Bắc Kạn là nỗ lực thọc sâu nhằm bắt cơ quan lãnh đạo.",
    },
  },
  {
    id: "tuyen-quang",
    name: "Tuyên Quang",
    period: "1947",
    eventDate: "Chiến dịch Việt Bắc",
    eventTitle: "Giữ trục sông Lô - sông Gâm",
    summary:
      "Một mũi tiến công của địch theo đường sông vào ATK Tuyên Quang đã bị chặn đánh quyết liệt.",
    shortDescription:
      "Việc kiểm soát các trục vận động đường sông giúp ta cắt tiếp tế địch và tăng hiệu quả chiến tranh nhân dân.",
    image: "/image/33jpg.jpg",
    longitude: 105.214,
    latitude: 21.823,
    xPercent: 44.96,
    yPercent: 15.81,
    secretTitle: "Dòng sông quyết định thế trận",
    secretContent:
      "Khi các tuyến tiếp tế bị chia cắt, ưu thế cơ giới của địch suy giảm nhanh chóng.",
    quiz: {
      question: "Vì sao mặt trận Tuyên Quang có ý nghĩa quan trọng trong chiến dịch Việt Bắc?",
      options: [
        "Vì đây là trục đường sông then chốt để địch thọc sâu và tiếp tế",
        "Vì đây là nơi ký hiệp định đình chiến",
        "Vì đây là căn cứ hải quân lớn của Pháp",
      ],
      correctIndex: 0,
      explanation:
        "Tuyến sông Lô - Gâm là hướng thọc sâu và tiếp tế quan trọng của địch trong chiến dịch.",
    },
  },
  {
    id: "cao-bang",
    name: "Cao Bằng",
    period: "Thu - Đông 1950",
    eventDate: "16/9/1950",
    eventTitle: "Mở màn Chiến dịch Biên giới",
    summary:
      "Chiến dịch Biên giới bắt đầu từ tuyến Cao Bằng - Đình Lập, mở hành lang thông thương với Trung Quốc.",
    shortDescription:
      "Đây là chiến dịch lớn đầu tiên do ta chủ động tiến công, tạo bước chuyển lên giai đoạn phát triển cao hơn của kháng chiến.",
    image: "/image/34.jpg",
    longitude: 106.257,
    latitude: 22.480,
    xPercent: 54.72,
    yPercent: 10.89,
    secretTitle: "Cánh cửa biên giới mở ra",
    secretContent:
      "Từ thắng lợi Cao Bằng, thế bị bao vây dần bị phá, kháng chiến có thêm nguồn lực chiến lược.",
    quiz: {
      question: "Chiến dịch Biên giới 1950 giúp ta đạt được điều gì quan trọng?",
      options: [
        "Mở rộng căn cứ và phá thế bao vây chiến lược",
        "Kết thúc ngay cuộc chiến tranh",
        "Mất toàn bộ tuyến biên giới phía Bắc",
      ],
      correctIndex: 0,
      explanation:
        "Chiến dịch Biên giới mở ra cục diện mới, tạo thế thuận lợi lớn cho cuộc kháng chiến.",
    },
  },
  {
    id: "lang-son",
    name: "Lạng Sơn",
    period: "1947 - 1950",
    eventDate: "Đường số 4",
    eventTitle: "Trục giao thông then chốt của chiến trường biên giới",
    summary:
      "Lạng Sơn nằm trên đường số 4, là hướng tiến công và tiếp vận quan trọng của đối phương lên biên giới.",
    shortDescription:
      "Kiểm soát được khu vực này giúp ta phá thế bố trí chiến lược của địch, nối liền các điểm kháng chiến ở miền núi phía Bắc.",
    image: "/image/35.jpg",
    longitude: 106.700,
    latitude: 21.600,
    xPercent: 59.43,
    yPercent: 15.64,
    secretTitle: "Đường số 4 - mạch sống chiến lược",
    secretContent:
      "Mỗi điểm chặn đúng trên đường số 4 có thể làm đảo chiều cả một hướng tiến công.",
    quiz: {
      question: "Lạng Sơn có ý nghĩa nổi bật nào trong giai đoạn 1947 - 1950?",
      options: [
        "Là cửa ngõ chiến lược trên trục biên giới và đường số 4",
        "Là trung tâm công nghiệp lớn nhất Đông Dương",
        "Là nơi không có hoạt động quân sự",
      ],
      correctIndex: 0,
      explanation:
        "Lạng Sơn giữ vai trò cửa ngõ biên giới, ảnh hưởng trực tiếp đến thế bố trí chiến trường phía Bắc.",
    },
  },
  {
    id: "sai-gon",
    name: "Sài Gòn",
    period: "1950",
    eventDate: "9/1 và 19/3/1950",
    eventTitle: "Phong trào đấu tranh đô thị lan rộng",
    summary:
      "Học sinh, sinh viên và nhân dân Sài Gòn biểu tình lớn chống thực dân Pháp, chống can thiệp Mỹ.",
    shortDescription:
      "Đấu tranh ở đô thị miền Nam đã phối hợp với mặt trận chính, làm hậu phương địch thêm bất ổn và phân tán lực lượng.",
    image: "/image/36.jpg",
    longitude: 106.62966,
    latitude: 10.8231,
    xPercent: 58.2,
    yPercent: 80.13,
    secretTitle: "Làn sóng đô thị đồng hành chiến khu",
    secretContent:
      "Sức ép ở đô thị đã góp phần buộc đối phương phân tán nguồn lực, hỗ trợ mặt trận toàn quốc.",
    quiz: {
      question: "Sự kiện nào tại Sài Gòn năm 1950 có ý nghĩa biểu tượng lớn?",
      options: [
        "Phong trào học sinh, sinh viên ngày 9/1/1950",
        "Mở màn chiến dịch Điện Biên Phủ",
        "Ký kết Hiệp định Giơ-ne-vơ",
      ],
      correctIndex: 0,
      explanation:
        "Ngày 9/1/1950 là dấu mốc đấu tranh tiêu biểu của học sinh, sinh viên Sài Gòn - Chợ Lớn.",
    },
  },
];
