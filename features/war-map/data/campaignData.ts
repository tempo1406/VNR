import { BadgeRule, TimelineMilestone, WarLocation } from "@/features/war-map/types";

export const warLocations: WarLocation[] = [
  {
    id: "ha-noi",
    name: "Ha Noi",
    region: "Bac Bo",
    period: "19/12/1946 - 17/02/1947",
    coords: { x: 58, y: 33 },
    theme: "Toan quoc khang chien bung no",
    summary:
      "20h ngay 19/12/1946, Ha Noi no sung mo dau toan quoc khang chien. Quan dan Thu do chien dau 60 ngay dem, giam chan dich de bao toan luc luong va co quan dau nao.",
    highlights: [
      "Phao dai Lang no phat sung dau tien vao 20h03.",
      "Tinh than 'Quyet tu cho To quoc quyet sinh' duoc khang dinh trong chien dau do thi.",
      "Trung doan Thu do rut an toan ra ngoai thanh ngay 17/02/1947.",
    ],
    missions: [
      "Ghi nho ly do khang chien toan quoc tro thanh lua chon bat buoc.",
      "Xac dinh y nghia chien luoc cua 60 ngay dem Ha Noi.",
    ],
    prerequisites: [],
    quiz: {
      prompt: "Muc tieu chien luoc chinh cua ta trong 60 ngay dem Ha Noi la gi?",
      options: [
        "Danh chiem ngay tong hanh dinh cua Phap o Dong Duong",
        "Giam chan dich, bao toan luc luong, tao dieu kien khang chien lau dai",
        "Ky hoa uoc moi voi Phap de tam dung xung dot",
        "Mo ngay chien dich bien gioi len Cao Bang",
      ],
      correctIndex: 1,
      explanation:
        "Ha Noi chien dau de giam chan, tieu hao dich va bao toan luc luong, tu do lam that bai ke hoach danh nhanh thang nhanh.",
    },
    secretTitle: "Bi mat Ha Noi",
    secretDetail:
      "Tran chien do thi dau tien da tao khoang thoi gian quy gia de Trung uong rut len can cu, chuan bi cho chien tranh nhan dan truong ky.",
  },
  {
    id: "hai-phong",
    name: "Hai Phong",
    region: "Duyen hai Bac Bo",
    period: "Cuoi 11/1946",
    coords: { x: 65, y: 37 },
    theme: "Cang thang truoc gio no sung",
    summary:
      "Cuoi thang 11/1946, thuc dan Phap mo tan cong vu trang vao Hai Phong, day tinh hinh Viet - Phap den bo vuc chien tranh khong the dao nguoc.",
    highlights: [
      "Phap day manh hanh dong lan chiem va boi uoc.",
      "Hai Phong tro thanh mot diem nong bao hieu chien tranh toan quoc.",
      "Su kien cung co quyet tam cua Dang va Chinh phu trong chuan bi khang chien.",
    ],
    missions: [
      "Lien he su kien Hai Phong voi toi hau thu o Ha Noi.",
      "Xac dinh vi sao con duong hoa binh bi be tac.",
    ],
    prerequisites: [],
    quiz: {
      prompt: "Su kien Hai Phong cuoi 11/1946 co y nghia gi?",
      options: [
        "Danh dau viec Phap chap nhan dam phan binh dang",
        "Cho thay nguy co chien tranh toan quoc da tro nen hien huu",
        "Mo ra thoi ky ngung ban toan quoc",
        "Ket thuc xung dot o Bac Bo",
      ],
      correctIndex: 1,
      explanation:
        "Hai Phong la bang chung ro rang ve chu truong dung vu luc cua Phap, day Viet Nam vao tinh the phai cam sung tu ve.",
    },
    secretTitle: "Bi mat Hai Phong",
    secretDetail:
      "Nhung su kien o Hai Phong va Lang Son da giup Trung uong nhan dien dung thoi diem phat dong toan dan khang chien.",
  },
  {
    id: "viet-bac",
    name: "Viet Bac - ATK",
    region: "Can cu chien luoc",
    period: "Thu Dong 1947",
    coords: { x: 53, y: 21 },
    theme: "Pha tan ke hoach danh nhanh thang nhanh",
    summary:
      "Thu Dong 1947, Phap huy dong luc luong lon tan cong len ATK Viet Bac. Dang chi dao chien tranh du kich, cat tiep te, danh tren moi huong tien cong va giu vung co quan dau nao.",
    highlights: [
      "Chi thi ngay 15/10/1947: Phai pha tan cuoc tan cong mua dong cua giac Phap.",
      "Sau 75 ngay dem, ta be gay cac mui tien cong, bao toan can cu dia.",
      "That bai cua Phap mo dau buoc ngoat chien luoc co loi cho ta.",
    ],
    missions: [
      "Giai thich vi sao Viet Bac la 'trai tim' cua cuoc khang chien.",
      "Tim bang chung cho thay ta da ket hop chu luc va du kich.",
    ],
    prerequisites: ["ha-noi", "hai-phong"],
    quiz: {
      prompt: "Y nghia lon nhat cua Chien thang Viet Bac Thu Dong 1947 la gi?",
      options: [
        "Mo toan bo bien gioi Viet - Trung",
        "Buoc Phap phai cong nhan Doc lap ngay lap tuc",
        "Danh bai ke hoach danh nhanh thang nhanh, giu vung can cu khang chien",
        "Ket thuc chien tranh o Nam Bo",
      ],
      correctIndex: 2,
      explanation:
        "Viet Bac 1947 giu vung co quan dau nao va can cu dia, buoc doi phuong chuyen sang the danh lau dai bat loi.",
    },
    secretTitle: "Bi mat Viet Bac",
    secretDetail:
      "Tu Viet Bac, Dang tung buoc hoan chinh duong loi khang chien toan dan, toan dien, lau dai, dua vao suc minh la chinh.",
  },
  {
    id: "lang-son",
    name: "Lang Son",
    region: "Duong so 4",
    period: "1946 - 1950",
    coords: { x: 68, y: 24 },
    theme: "Cua ngo chien luoc bien gioi",
    summary:
      "Lang Son vua la diem Phap tan cong som nam 1946, vua la truc quan trong trong ke hoach phong toa bien gioi Viet - Trung va la huong then chot cua Chien dich Bien gioi 1950.",
    highlights: [
      "Co mat trong cac dot tan cong cua Phap tu cuoi 1946.",
      "La mat xich trong he thong phong toa duong bien gioi.",
      "Nam trong huong tien cong then chot cua chien dich Thu Dong 1950.",
    ],
    missions: [
      "Xac dinh vai tro cua duong so 4 trong bo tri chien luoc.",
      "Lien he Lang Son voi muc tieu mo thong bien gioi 1950.",
    ],
    prerequisites: ["viet-bac"],
    quiz: {
      prompt: "Tai sao Lang Son co gia tri chien luoc dac biet giai doan 1946-1950?",
      options: [
        "Vi la noi dat tong hanh dinh khang chien cua ta",
        "Vi la cua ngo bien gioi, gan duong so 4 va he thong phong toa cua dich",
        "Vi la khu vuc khong co giao tranh",
        "Vi nam ngoai ban do chien su",
      ],
      correctIndex: 1,
      explanation:
        "Lang Son nam tren truc phong toa bien gioi, anh huong truc tiep den kha nang lien lac quoc te va tiep van cua ta.",
    },
    secretTitle: "Bi mat duong so 4",
    secretDetail:
      "Kiem soat duong so 4 khong chi la van de quan su ma con la khoa mo cho hau can, doi ngoai va can bang luc luong khu vuc.",
  },
  {
    id: "cao-bang",
    name: "Cao Bang",
    region: "Bien gioi Viet - Trung",
    period: "16/09 - 17/10/1950",
    coords: { x: 63, y: 14 },
    theme: "Chien dich Bien gioi Thu Dong 1950",
    summary:
      "Theo chu truong cua Ban Thuong vu Trung uong, chien dich Bien gioi 1950 mo ra tren tuyen Cao Bang - Lang Son, tieu diet sinh luc dich, mo rong can cu Viet Bac va khai thong cua ngo quoc te.",
    highlights: [
      "Day la chien dich lon dau tien do ta chu dong tien cong o quy mo chien dich.",
      "Chu tich Ho Chi Minh truc tiep di thi sat va chi dao chien dich.",
      "Thang loi mo ra giai doan phat trien cao hon cho cuoc khang chien.",
    ],
    missions: [
      "Xac dinh 3 muc tieu chien luoc cua Chien dich Bien gioi 1950.",
      "Neu tac dong cua chien dich doi voi cuc dien chien tranh.",
    ],
    prerequisites: ["lang-son"],
    quiz: {
      prompt: "Muc tieu nao KHONG thuoc Chien dich Bien gioi 1950?",
      options: [
        "Tieu diet bo phan quan trong sinh luc dich",
        "Mo rong can cu Viet Bac va thong bien gioi",
        "Tao hanh lang quan he voi cac nuoc xa hoi chu nghia",
        "Ket thuc ngay lap tuc toan bo cuoc chien tren ca nuoc",
      ],
      correctIndex: 3,
      explanation:
        "Chien dich Bien gioi tao buoc ngoat lon, nhung khong dong nghia ket thuc ngay lap tuc toan bo cuoc khang chien.",
    },
    secretTitle: "Bi mat Bien gioi",
    secretDetail:
      "Sau Bien gioi 1950, tuong quan luc luong chuyen bien manh theo huong co loi cho ta, mo duong cho nhung chien dich quy mo lon hon.",
  },
  {
    id: "sai-gon",
    name: "Sai Gon - Cho Lon",
    region: "Nam Bo",
    period: "01 - 03/1950",
    coords: { x: 62, y: 82 },
    theme: "Dau tranh do thi va chong can thiep My",
    summary:
      "Dau nam 1950, nhieu cuoc bieu tinh lon o Sai Gon - Cho Lon no ra chong ap buc thuc dan va can thiep My, tieu bieu la phong trao sau su hy sinh cua Tran Van On.",
    highlights: [
      "Ngay 09/01/1950, hoc sinh sinh vien bieu tinh bi dan ap.",
      "Ngay 19/03/1950, hon 500.000 nguoi bieu tinh chong My.",
      "Phong trao do thi ket hop voi dau tranh vu trang o Nam Bo.",
    ],
    missions: [
      "So sanh hinh thuc dau tranh do thi va nong thon Nam Bo.",
      "Lam ro vai tro cua phong trao hoc sinh - sinh vien nam 1950.",
    ],
    prerequisites: ["ha-noi"],
    quiz: {
      prompt: "Su kien nao gan voi phong trao chong My o Sai Gon nam 1950?",
      options: [
        "Mo chien dich Bien gioi Cao Bang",
        "Bieu tinh quy mo lon ngay 19/03/1950 tai Sai Gon",
        "Ky Hiep dinh Geneve",
        "Cong bo chinh sach doi moi",
      ],
      correctIndex: 1,
      explanation:
        "Phong trao ngay 19/03/1950 cho thay suc huy dong quan chung do thi rat manh trong tong the khang chien.",
    },
    secretTitle: "Bi mat Sai Gon",
    secretDetail:
      "Nam Bo khong chi danh giac bang vu trang; dau tranh chinh tri o do thi da boi dap hau phuong xa hoi cho khang chien.",
  },
  {
    id: "tra-vinh",
    name: "Tra Vinh - Nam Bo",
    region: "Khu VIII",
    period: "1949 - 1950",
    coords: { x: 57, y: 88 },
    theme: "Chien tranh du kich sang tao",
    summary:
      "Tren dia ban Nam Bo, ta mo Chien dich Cau Ke Tra Vinh (4/1949), phat trien cach danh vay don - diet vien; dong thoi thu nghiem cach danh dac cong nhu tran cau Ba Kien (18/4/1950).",
    highlights: [
      "Doi pho hieu qua voi he thong thap canh 'mang nhen' cua dich.",
      "Mo rong chien tranh du kich, danh vao cau cong, kho tang cua doi phuong.",
      "Hiep dong giua luc luong vu trang va nhan dan ngay cang chat che.",
    ],
    missions: [
      "Mo ta diem moi trong nghe thuat tac chien o Nam Bo.",
      "Chi ra y nghia cua phuong cham 'bien hau phuong dich thanh tien phuong ta'.",
    ],
    prerequisites: ["sai-gon"],
    quiz: {
      prompt: "Diem noi bat cua tac chien Nam Bo giai doan 1949-1950 la gi?",
      options: [
        "Danh theo doi hinh quy uoc lon tren mot mat tran duy nhat",
        "Ket hop du kich linh hoat voi thu nghiem cach danh dac cong",
        "Tam ngung chien dau de cho vien tro",
        "Chi dau tranh ngoai giao, khong dung vu trang",
      ],
      correctIndex: 1,
      explanation:
        "Nam Bo sang tao trong cach danh, ket hop du kich va dac cong de pha the kiem soat cua dich.",
    },
    secretTitle: "Bi mat Nam Bo",
    secretDetail:
      "Tu thuc tien Nam Bo, nghe thuat tac chien linh hoat duoc bo sung vao kho kinh nghiem quan su cua cuoc khang chien toan quoc.",
  },
];

export const campaignTimeline: TimelineMilestone[] = [
  {
    date: "12/12/1946",
    title: "Chi thi Toan dan khang chien",
    detail:
      "Trung uong Dang xac lap quyet tam khang chien, chuan bi chuyen dat nuoc vao thoi chien.",
  },
  {
    date: "19/12/1946",
    title: "Loi keu goi Toan quoc khang chien",
    detail:
      "Chu tich Ho Chi Minh khang dinh: 'Thà hy sinh tất cả, chứ nhất định không chịu mất nước'.",
  },
  {
    date: "15/10/1947",
    title: "Chi thi pha tan tan cong len Viet Bac",
    detail:
      "Dang chi dao chien tranh nhan dan de be gay chien luoc danh nhanh thang nhanh cua Phap.",
  },
  {
    date: "11/06/1948",
    title: "Loi keu goi Thi dua ai quoc",
    detail:
      "Dong vien toan dan xay dung thuc luc khang chien tren cac mat tran kinh te, van hoa, xa hoi.",
  },
  {
    date: "01 - 02/1950",
    title: "Dot pha ngoai giao",
    detail:
      "Trung Quoc, Lien Xo va nhieu nuoc dan chu nhan dan cong nhan Viet Nam Dan chu Cong hoa.",
  },
  {
    date: "09 - 10/1950",
    title: "Chien dich Bien gioi Thu Dong",
    detail:
      "Cuoc tien cong quy mo lon dau tien do ta chu dong mo, tao buoc ngoat chien luoc cho khang chien.",
  },
];

export const badgeRules: BadgeRule[] = [
  {
    id: "trinh-sat",
    label: "Trinh sat dia ban",
    description: "Mo khoa khi tham quan it nhat 3 dia diem.",
  },
  {
    id: "to-chuc",
    label: "Nha to chuc khang chien",
    description: "Mo khoa khi hoan thanh 4 dia diem dau tien.",
  },
  {
    id: "chien-luoc",
    label: "Kien truc su chien luoc",
    description: "Mo khoa khi chinh phuc bo ba Ha Noi - Viet Bac - Cao Bang.",
  },
  {
    id: "toan-thang",
    label: "Ban do toan thang",
    description: "Mo khoa khi hoan thanh toan bo dia diem.",
  },
];

export const sourceAttribution = [
  "Tai lieu goc: Duong_loi.docx (chu de Duong loi khang chien toan quoc 1946-1950).",
  "Noi dung da duoc chuyen hoa thanh cac moc su kien, mini quiz va nhiem vu tuong tac.",
];

