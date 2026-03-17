"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { CheckCircle2, Lock, MapPin, Medal, ShieldCheck, Sparkles } from "lucide-react";
import {
  campaignLocations,
  VIETNAM_VIEWBOX_HEIGHT,
  VIETNAM_VIEWBOX_WIDTH,
  projectLonLatToSvgPoint,
  type MapQuiz,
  vietnamArchipelagoGroups,
  vietnamOutlinePath,
} from "@/features/campaign-map/data/campaignMapData";

const MIN_ZOOM = 0.85;
const MAX_ZOOM = 2.2;

const LABEL_OFFSET_BY_ID: Record<string, { x: number; y: number }> = {
  "ha-noi": { x: 0, y: 0 },
  "hai-phong": { x: 0, y: 0 },
  "viet-bac": { x: 0, y: -55 },
  "bac-kan": { x: 0, y: 0 },
  "tuyen-quang": { x: 0, y: 0 },
  "cao-bang": { x: 0, y: -55 },
  "lang-son": { x: 0, y: 0 },
  "sai-gon": { x: 0, y: 0 },
};

const EXTRA_MINI_QUIZZES_BY_LOCATION: Record<string, MapQuiz[]> = {
  "ha-noi": [
    {
      question: "Ở Hà Nội, loạt đại bác mở đầu kháng chiến toàn quốc được bắn vào thời điểm nào?",
      options: ["20 giờ 3 phút ngày 19/12/1946", "0 giờ ngày 20/12/1946", "6 giờ sáng ngày 19/12/1946"],
      correctIndex: 0,
      explanation: "Pháo đài Láng nổ súng lúc 20 giờ 3 phút, mở đầu toàn quốc kháng chiến ở Hà Nội.",
    },
    {
      question: "Mặt trận Hà Nội đã giam chân địch trong bao lâu?",
      options: ["60 ngày đêm", "30 ngày đêm", "7 ngày đêm"],
      correctIndex: 0,
      explanation: "Quân dân Hà Nội chiến đấu suốt 60 ngày đêm, tạo thời gian cho cơ quan đầu não rút an toàn.",
    },
  ],
  "hai-phong": [
    {
      question: "Cuối tháng 11/1946, thực dân Pháp đã làm gì ở Hải Phòng?",
      options: [
        "Mở cuộc tấn công vũ trang đánh chiếm Hải Phòng",
        "Rút quân và bàn giao chính quyền",
        "Ký hiệp định đình chiến lâu dài",
      ],
      correctIndex: 0,
      explanation: "Theo tài liệu, Pháp đánh chiếm Hải Phòng cuối tháng 11/1946, đẩy xung đột lên cao.",
    },
    {
      question: "Diễn biến ở Hải Phòng cho thấy điều gì về con đường hòa hoãn?",
      options: [
        "Khả năng hòa hoãn bị phá vỡ, nguy cơ chiến tranh toàn quốc cận kề",
        "Hai bên đã hoàn toàn chấm dứt xung đột",
        "Pháp công nhận đầy đủ độc lập của Việt Nam",
      ],
      correctIndex: 0,
      explanation: "Các hành động quân sự ở Hải Phòng cho thấy con đường hòa bình bị thu hẹp nghiêm trọng.",
    },
  ],
  "viet-bac": [
    {
      question: "Trong Thu - Đông 1947, Pháp huy động khoảng bao nhiêu quân tiến công Việt Bắc?",
      options: ["Khoảng 15.000 quân", "Khoảng 5.000 quân", "Khoảng 30.000 quân"],
      correctIndex: 0,
      explanation: "Tài liệu nêu rõ Pháp huy động khoảng 15.000 quân với nhiều mũi tiến công lên ATK Việt Bắc.",
    },
    {
      question: "Quân và dân ta đã bẻ gãy cuộc tấn công mùa đông 1947 sau bao nhiêu ngày đêm?",
      options: ["75 ngày đêm", "45 ngày đêm", "100 ngày đêm"],
      correctIndex: 0,
      explanation: "Sau 75 ngày đêm chiến đấu liên tục, quân dân ta phá tan cuộc tấn công của địch.",
    },
  ],
  "bac-kan": [
    {
      question: "Mũi nhảy dù thọc sâu vào Bắc Kạn của Pháp nhằm mục tiêu chính nào?",
      options: ["Bắt gọn Chính phủ Hồ Chí Minh", "Giải cứu tù binh", "Mở cảng quân sự"],
      correctIndex: 0,
      explanation: "Mục tiêu then chốt của địch là bắt cơ quan đầu não kháng chiến tại trung tâm ATK.",
    },
    {
      question: "Trong kế hoạch nhảy dù Thu - Đông 1947, tài liệu nêu các điểm nào?",
      options: ["Bắc Kạn, Chợ Mới, Chợ Đồn", "Hà Nội, Hải Phòng, Nam Định", "Huế, Đà Nẵng, Quy Nhơn"],
      correctIndex: 0,
      explanation: "Địch nhảy dù xuống Bắc Kạn, Chợ Mới, Chợ Đồn để thọc sâu vào trung tâm Việt Bắc.",
    },
  ],
  "tuyen-quang": [
    {
      question: "Một mũi tiến công của địch vào ATK Tuyên Quang đi theo hướng nào?",
      options: [
        "Theo đường sông Hồng lên sông Lô, sông Gâm",
        "Theo đường biển từ Vịnh Bắc Bộ",
        "Theo đường Tây Nguyên",
      ],
      correctIndex: 0,
      explanation: "Tài liệu nêu rõ mũi tiến công đường sông lên khu vực Tuyên Quang - ATK.",
    },
    {
      question: "Để phá thế tiến công này, chỉ thị 15/10/1947 nhấn mạnh biện pháp nào?",
      options: [
        "Chặt đứt giao thông, bao vây không cho địch tiếp tế",
        "Rút toàn bộ lực lượng khỏi Việt Bắc",
        "Chỉ phòng thủ cố định tại đô thị",
      ],
      correctIndex: 0,
      explanation: "Ta chủ trương chiến tranh nhân dân, đánh trên mọi hướng, cắt tiếp tế và liên lạc của địch.",
    },
  ],
  "cao-bang": [
    {
      question: "Chiến dịch Biên giới Thu - Đông 1950 bắt đầu từ ngày nào?",
      options: ["16/9/1950", "19/12/1946", "7/5/1954"],
      correctIndex: 0,
      explanation: "Chiến dịch diễn ra từ 16/9 đến 17/10/1950, mở đầu giai đoạn phát triển mới của kháng chiến.",
    },
    {
      question: "Một mục tiêu quan trọng của Chiến dịch Biên giới là gì?",
      options: [
        "Mở rộng căn cứ Việt Bắc, thông thương với Trung Quốc",
        "Rút toàn bộ lực lượng về đồng bằng",
        "Ký hiệp định đình chiến ngay lập tức",
      ],
      correctIndex: 0,
      explanation: "Chiến dịch nhằm tiêu diệt sinh lực địch, mở rộng căn cứ và khai thông hành lang chiến lược.",
    },
  ],
  "lang-son": [
    {
      question: "Chiến dịch Biên giới 1950 tiến công dọc tuyến biên giới thuộc hai tỉnh nào?",
      options: ["Cao Bằng và Lạng Sơn", "Hà Nội và Hải Phòng", "Huế và Đà Nẵng"],
      correctIndex: 0,
      explanation: "Tuyến chiến dịch trọng điểm đi dọc khu vực Cao Bằng - Lạng Sơn.",
    },
    {
      question: "Tài liệu nêu tuyến chiến dịch kéo dài từ thị xã Cao Bằng đến đâu?",
      options: ["Đình Lập", "Móng Cái", "Lào Cai"],
      correctIndex: 0,
      explanation: "Tuyến chính của chiến dịch được nêu từ thị xã Cao Bằng đến Đình Lập.",
    },
  ],
  "sai-gon": [
    {
      question: "Ngày 9/1/1950, ở Sài Gòn - Chợ Lớn có khoảng bao nhiêu học sinh, sinh viên biểu tình?",
      options: ["Khoảng 3.000 người", "Khoảng 300 người", "Khoảng 30.000 người"],
      correctIndex: 0,
      explanation: "Tài liệu ghi nhận khoảng 3.000 học sinh, sinh viên tham gia biểu tình ngày 9/1/1950.",
    },
    {
      question: "Ngày 19/3/1950, quy mô biểu tình chống Mỹ ở Sài Gòn được nêu là bao nhiêu?",
      options: ["Hơn 500.000 người", "Khoảng 5.000 người", "Khoảng 50.000 người"],
      correctIndex: 0,
      explanation: "Sự kiện 19/3/1950 có hơn 500.000 người dân Sài Gòn tham gia biểu tình chống Mỹ.",
    },
  ],
};

const QUIZ_POOL_BY_LOCATION: Record<string, MapQuiz[]> = Object.fromEntries(
  campaignLocations.map((location) => [
    location.id,
    [location.quiz, ...(EXTRA_MINI_QUIZZES_BY_LOCATION[location.id] ?? [])],
  ])
) as Record<string, MapQuiz[]>;

const GLOBAL_SECRET_LEVEL_ONE_CONTENT =
  "Chiến thắng Việt Bắc 1947 cho thấy nghệ thuật bảo toàn lực lượng có thể bẻ gãy chiến lược đối phương ngay cả khi tương quan còn chênh lệch.";

const GLOBAL_SECRET_FINAL_CONTENT =
  "Bài học xuyên suốt: bảo vệ cơ quan đầu não, giữ căn cứ, kết hợp chiến đấu quân sự với thế trận toàn dân mới là chìa khóa của thắng lợi lâu dài.";

const buildQuizStatus = () => {
  return Object.fromEntries(campaignLocations.map((location) => [location.id, "idle"])) as Record<
    string,
    "idle" | "correct" | "wrong"
  >;
};

const buildQuizAnswer = () => {
  return Object.fromEntries(campaignLocations.map((location) => [location.id, -1])) as Record<string, number>;
};

const buildQuizStep = () => {
  return Object.fromEntries(campaignLocations.map((location) => [location.id, 0])) as Record<string, number>;
};

const buildQuizNotice = () => {
  return Object.fromEntries(campaignLocations.map((location) => [location.id, ""])) as Record<string, string>;
};

const clampValue = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const CampaignMapPage = () => {
  const [selectedId, setSelectedId] = useState(campaignLocations[0].id);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [blockPinClick, setBlockPinClick] = useState(false);

  const [visitedIds, setVisitedIds] = useState<string[]>([campaignLocations[0].id]);
  const [quizStatus, setQuizStatus] = useState<Record<string, "idle" | "correct" | "wrong">>(buildQuizStatus);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(buildQuizAnswer);
  const [quizSteps, setQuizSteps] = useState<Record<string, number>>(buildQuizStep);
  const [quizNotice, setQuizNotice] = useState<Record<string, string>>(buildQuizNotice);
  const [claimedSecrets, setClaimedSecrets] = useState<string[]>([]);
  const [secretModal, setSecretModal] = useState<{ title: string; content: string } | null>(null);

  const mapViewportRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });

  const completedLocationIds = useMemo(
    () => campaignLocations.filter((location) => quizStatus[location.id] === "correct").map((location) => location.id),
    [quizStatus]
  );

  const unlockedIds = useMemo(() => {
    const unlockedCount = Math.min(campaignLocations.length, Math.max(1, completedLocationIds.length + 1));
    return campaignLocations.slice(0, unlockedCount).map((location) => location.id);
  }, [completedLocationIds]);

  const selectedLocation = useMemo(
    () => campaignLocations.find((location) => location.id === selectedId) ?? campaignLocations[0],
    [selectedId]
  );

  const selectedIndex = useMemo(
    () => campaignLocations.findIndex((location) => location.id === selectedLocation.id),
    [selectedLocation.id]
  );

  const previousLocation = selectedIndex > 0 ? campaignLocations[selectedIndex - 1] : null;
  const selectedUnlocked = unlockedIds.includes(selectedLocation.id);
  const selectedCompleted = completedLocationIds.includes(selectedLocation.id);

  const selectedQuizPool = QUIZ_POOL_BY_LOCATION[selectedLocation.id] ?? [selectedLocation.quiz];
  const selectedQuizStep = Math.min(Math.max(quizSteps[selectedLocation.id] ?? 0, 0), selectedQuizPool.length - 1);
  const selectedQuiz = selectedQuizPool[selectedQuizStep] ?? selectedLocation.quiz;
  const selectedQuizAnswer = quizAnswers[selectedLocation.id] ?? -1;
  const selectedQuizStatus = quizStatus[selectedLocation.id] ?? "idle";
  const selectedQuizNotice = quizNotice[selectedLocation.id] ?? "";

  const visitedProgress = Math.round((visitedIds.length / campaignLocations.length) * 100);
  const completedProgress = Math.round((completedLocationIds.length / campaignLocations.length) * 100);
  const quizCorrectCount = completedLocationIds.length;
  const globalSecretUnlocked = claimedSecrets.length >= 4;
  const finalSecretUnlocked = claimedSecrets.length >= campaignLocations.length;

  const badgeRules = useMemo(
    () => [
      {
        id: "giai-ma-su-lieu",
        title: "Giải mã sử liệu",
        requirement: "Trả lời đúng ít nhất 1 câu hỏi mini",
        unlocked: quizCorrectCount >= 1,
      },
      {
        id: "trinh-sat-viet-bac",
        title: "Trinh sát Việt Bắc",
        requirement: "Khám phá ít nhất 4 địa điểm",
        unlocked: visitedIds.length >= 4,
      },
      {
        id: "nguoi-san-mat-ma",
        title: "Người săn mật mã",
        requirement: "Mở khóa ít nhất 4 bí mật địa điểm",
        unlocked: claimedSecrets.length >= 4,
      },
      {
        id: "nguoi-giu-lua-khang-chien",
        title: "Người giữ lửa kháng chiến",
        requirement: "Hoàn thành toàn bộ mốc trên bản đồ",
        unlocked: completedLocationIds.length >= campaignLocations.length,
      },
    ],
    [claimedSecrets.length, completedLocationIds.length, quizCorrectCount, visitedIds.length]
  );

  const projectedLocationPositions = useMemo(() => {
    return Object.fromEntries(
      campaignLocations.map((location) => {
        const point = projectLonLatToSvgPoint(location.longitude, location.latitude);
        return [
          location.id,
          {
            left: Number(((point.x / VIETNAM_VIEWBOX_WIDTH) * 100).toFixed(3)),
            top: Number(((point.y / VIETNAM_VIEWBOX_HEIGHT) * 100).toFixed(3)),
          },
        ];
      })
    ) as Record<string, { left: number; top: number }>;
  }, []);

  const clampPanByZoom = useCallback((nextX: number, nextY: number, targetZoom: number) => {
    const viewport = mapViewportRef.current;
    if (!viewport) {
      return { x: nextX, y: nextY };
    }

    const rect = viewport.getBoundingClientRect();
    const overflowX = Math.max(0, rect.width * targetZoom - rect.width);
    const overflowY = Math.max(0, rect.height * targetZoom - rect.height);

    const maxX = targetZoom > 1 ? overflowX / 2 + 34 : 22;
    const maxY = targetZoom > 1 ? overflowY / 2 + 34 : 22;

    return {
      x: clampValue(nextX, -maxX, maxX),
      y: clampValue(nextY, -maxY, maxY),
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest(".map-pin")) {
      return;
    }

    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;

    if (!dragStateRef.current.moved && Math.abs(deltaX) + Math.abs(deltaY) > 4) {
      dragStateRef.current.moved = true;
      setBlockPinClick(true);
    }

    const nextX = dragStateRef.current.originX + deltaX;
    const nextY = dragStateRef.current.originY + deltaY;

    setPan(clampPanByZoom(nextX, nextY, zoom));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!isDragging) {
      return;
    }

    setIsDragging(false);

    if (dragStateRef.current.moved) {
      window.setTimeout(() => {
        setBlockPinClick(false);
      }, 0);
    } else {
      setBlockPinClick(false);
    }
  };

  const handleSelectLocation = (locationId: string) => {
    if (blockPinClick) {
      return;
    }

    setSelectedId(locationId);

    if (unlockedIds.includes(locationId) && !visitedIds.includes(locationId)) {
      setVisitedIds((prev) => [...prev, locationId]);
    }
  };

  const handleQuizAnswer = (optionIndex: number) => {
    if (!selectedUnlocked) {
      return;
    }

    const quizPool = QUIZ_POOL_BY_LOCATION[selectedLocation.id] ?? [selectedLocation.quiz];
    const currentStepRaw = quizSteps[selectedLocation.id] ?? 0;
    const currentStep = Math.min(currentStepRaw, quizPool.length - 1);
    const currentQuiz = quizPool[currentStep] ?? selectedLocation.quiz;
    const isCorrect = optionIndex === currentQuiz.correctIndex;

    if (isCorrect) {
      setQuizAnswers((prev) => ({
        ...prev,
        [selectedLocation.id]: optionIndex,
      }));

      setQuizStatus((prev) => ({
        ...prev,
        [selectedLocation.id]: "correct",
      }));

      setQuizNotice((prev) => ({
        ...prev,
        [selectedLocation.id]: "",
      }));

      if (!claimedSecrets.includes(selectedLocation.id)) {
        const nextClaimedCount = claimedSecrets.length + 1;
        setClaimedSecrets((prev) => [...prev, selectedLocation.id]);

        if (nextClaimedCount === campaignLocations.length) {
          setSecretModal({
            title: "Hồ sơ bí mật cấp 2",
            content: GLOBAL_SECRET_FINAL_CONTENT,
          });
        } else if (nextClaimedCount === 4) {
          setSecretModal({
            title: "Hồ sơ bí mật cấp 1",
            content: GLOBAL_SECRET_LEVEL_ONE_CONTENT,
          });
        }
      }
      return;
    }

    const nextStep = currentStep + 1;
    if (nextStep < quizPool.length) {
      setQuizSteps((prev) => ({
        ...prev,
        [selectedLocation.id]: nextStep,
      }));

      setQuizAnswers((prev) => ({
        ...prev,
        [selectedLocation.id]: -1,
      }));

      setQuizStatus((prev) => ({
        ...prev,
        [selectedLocation.id]: "idle",
      }));

      setQuizNotice((prev) => ({
        ...prev,
        [selectedLocation.id]: `Chưa chính xác. Mời bạn làm tiếp câu ${nextStep + 1}/${quizPool.length}.`,
      }));
      return;
    }

    setQuizAnswers((prev) => ({
      ...prev,
      [selectedLocation.id]: optionIndex,
    }));

    setQuizStatus((prev) => ({
      ...prev,
      [selectedLocation.id]: "wrong",
    }));

    setQuizNotice((prev) => ({
      ...prev,
      [selectedLocation.id]: "",
    }));
  };

  const increaseZoom = () => {
    const nextZoom = Math.min(MAX_ZOOM, Number((zoom + 0.1).toFixed(2)));
    setZoom(nextZoom);
    setPan((current) => clampPanByZoom(current.x, current.y, nextZoom));
  };

  const decreaseZoom = () => {
    const nextZoom = Math.max(MIN_ZOOM, Number((zoom - 0.1).toFixed(2)));
    setZoom(nextZoom);
    setPan((current) => clampPanByZoom(current.x, current.y, nextZoom));
  };

  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <main className="campaign-shell px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-5">
        <section className="campaign-card animate-rise">
          <h1 className="campaign-title">Khám phá bản đồ Việt Nam qua các mốc lịch sử tương tác</h1>
          <p className="campaign-subtitle">
            Bấm vào từng địa điểm để xem sự kiện, ảnh minh họa, mô tả ngắn và câu hỏi mini. Trả lời
            đúng để mở huy hiệu và giải mã bí mật lịch sử.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="campaign-card stat-card">
            <div className="stat-head">
              <MapPin size={16} /> Tiến độ khám phá
            </div>
            <strong>
              {visitedIds.length} / {campaignLocations.length} địa điểm
            </strong>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${visitedProgress}%` }} />
            </div>
            <small>{visitedProgress}% đã khám phá</small>
          </article>

          <article className="campaign-card stat-card">
            <div className="stat-head">
              <CheckCircle2 size={16} /> Tiến độ hoàn thành
            </div>
            <strong>
              {completedLocationIds.length} / {campaignLocations.length} mốc hoàn chỉnh
            </strong>
            <div className="progress-track">
              <div className="progress-fill completion" style={{ width: `${completedProgress}%` }} />
            </div>
            <small>{completedProgress}% đã hoàn thành mục tiêu</small>
          </article>

          <article className="campaign-card stat-card">
            <div className="stat-head">
              <Medal size={16} /> Bí mật đã mở khóa
            </div>
            <strong>
              {claimedSecrets.length} / {campaignLocations.length} mật mã
            </strong>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${Math.round((claimedSecrets.length / campaignLocations.length) * 100)}%` }}
              />
            </div>
            <small>{quizCorrectCount} câu hỏi mini trả lời đúng</small>
          </article>
        </section>

        <section className="campaign-card campaign-achievement-card">
          <h2 className="section-title">
            <ShieldCheck size={18} /> Huy hiệu và bí mật chiến dịch
          </h2>

          <div className="badge-rule-list">
            {badgeRules.map((badge) => (
              <article key={badge.id} className={`badge-rule ${badge.unlocked ? "open" : "closed"}`}>
                <p>{badge.title}</p>
                <small>{badge.requirement}</small>
              </article>
            ))}
          </div>

          <div className="secret-grid">
            <article className={`secret-card ${globalSecretUnlocked ? "open" : "closed"}`}>
              <div className="secret-card-head">
                <strong>
                  <Sparkles size={15} /> Hồ sơ bí mật cấp 1
                </strong>
                <span>{globalSecretUnlocked ? "Mở" : "Khóa"}</span>
              </div>
              <p>
                {globalSecretUnlocked
                  ? GLOBAL_SECRET_LEVEL_ONE_CONTENT
                  : "Mở ít nhất 4 bí mật địa điểm để xem hồ sơ này."}
              </p>
            </article>

            <article className={`secret-card ${finalSecretUnlocked ? "open" : "closed"}`}>
              <div className="secret-card-head">
                <strong>
                  <Sparkles size={15} /> Hồ sơ bí mật cấp 2
                </strong>
                <span>{finalSecretUnlocked ? "Mở" : "Khóa"}</span>
              </div>
              <p>
                {finalSecretUnlocked
                  ? GLOBAL_SECRET_FINAL_CONTENT
                  : "Mở khóa toàn bộ bí mật địa điểm để nhận hồ sơ cấp 2."}
              </p>
            </article>
          </div>
        </section>
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.32fr)_minmax(0,0.68fr)]">
          <article className="campaign-card map-frame">
            <div className="map-toolbar">
              <h2 className="section-title">Bản đồ Việt Nam tương tác</h2>
              <div className="map-toolbar-actions">
                <div className="zoom-controls">
                  <button className="zoom-btn" onClick={decreaseZoom} disabled={zoom <= MIN_ZOOM}>
                    -
                  </button>
                  <span className="zoom-readout">{Math.round(zoom * 100)}%</span>
                  <button className="zoom-btn" onClick={increaseZoom} disabled={zoom >= MAX_ZOOM}>
                    +
                  </button>
                  <button className="zoom-btn zoom-reset" onClick={resetZoom}>
                    reset
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={mapViewportRef}
              className={`war-map-canvas ${isDragging ? "dragging" : ""}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <div className="war-map-scene" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
                <svg className="vietnam-outline" viewBox="0 0 1000 1600" aria-hidden>
                  <path className="vietnam-outline-fill" d={vietnamOutlinePath} />
                  <path className="vietnam-outline-stroke" d={vietnamOutlinePath} />
                  {vietnamArchipelagoGroups.map((group) => (
                    <g key={group.id} className="archipelago-group">
                      <path
                        className="archipelago-connector"
                        d={`M ${group.label.x} ${group.label.y + 10} `}
                      />
                      {group.dots.map((dot, index) => (
                        <circle key={`${group.id}-${index}`} className="island-dot" cx={dot.x} cy={dot.y} r={dot.r ?? 2.2} />
                      ))}
                      <text className="island-label" x={group.label.x} y={group.label.y} textAnchor="middle">
                        {group.name}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="map-overlay" />

                {campaignLocations.map((location) => {
                  const unlocked = unlockedIds.includes(location.id);
                  const visited = visitedIds.includes(location.id);
                  const completed = completedLocationIds.includes(location.id);
                  const selected = selectedLocation.id === location.id;

                  const stateClass = completed
                    ? "completed"
                    : visited
                    ? "visited"
                    : unlocked
                    ? "unlocked"
                    : "locked";

                  const labelOffset = LABEL_OFFSET_BY_ID[location.id] ?? { x: 0, y: 16 };
                  const projectedPosition = projectedLocationPositions[location.id];
                  const safeLeft = Number.isFinite(projectedPosition?.left)
                    ? projectedPosition.left
                    : Number.isFinite(location.xPercent)
                    ? location.xPercent
                    : 50;
                  const safeTop = Number.isFinite(projectedPosition?.top)
                    ? projectedPosition.top
                    : Number.isFinite(location.yPercent)
                    ? location.yPercent
                    : 50;

                  return (
                    <button
                      key={location.id}
                      className={`map-pin ${stateClass} ${selected ? "selected" : ""}`}
                      style={{
                        position: "absolute",
                        left: `${safeLeft}%`,
                        top: `${safeTop}%`,
                        transform: "translate(-50%, -50%)",
                        zIndex: selected ? 4 : 3,
                      }}
                      onClick={() => handleSelectLocation(location.id)}
                      type="button"
                    >
                      <span className="pin-core">{unlocked ? <MapPin size={12} /> : <Lock size={11} />}</span>
                      <span
                        className="pin-label"
                        style={{ transform: `translate(${labelOffset.x}px, ${labelOffset.y}px)` }}
                      >
                        {location.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="campaign-card detail-panel">
            <div className="location-tag-row">
              <strong className="location-name">{selectedLocation.name}</strong>
              <span className="location-period">{selectedLocation.period}</span>
              {selectedCompleted ? (
                <span className="badge-chip">Đã hoàn thành</span>
              ) : (
                <span className="badge-muted">Đang khám phá</span>
              )}
            </div>

            {selectedUnlocked ? (
              <>
                <p className="location-theme">{selectedLocation.eventTitle}</p>
                <p className="event-date">Mốc thời gian: {selectedLocation.eventDate}</p>

                <div className="detail-image-wrap">
                  <Image
                    src={selectedLocation.image}
                    alt={`Ảnh minh họa ${selectedLocation.name}`}
                    width={920}
                    height={520}
                    className="detail-image"
                  />
                </div>

                <p className="location-summary">{selectedLocation.summary}</p>

                <div className="detail-block">
                  <h3>Mô tả ngắn</h3>
                  <p className="location-summary">{selectedLocation.shortDescription}</p>
                </div>

                <div className="detail-block" data-disable-text-explainer>
                  <h3>Câu hỏi mini</h3>
                  <p className="location-summary">
                    Câu {selectedQuizStep + 1}/{selectedQuizPool.length}
                  </p>
                  {selectedQuizStatus === "idle" && selectedQuizNotice ? (
                    <p className="quiz-feedback bad">{selectedQuizNotice}</p>
                  ) : null}
                  <p className="quiz-prompt">{selectedQuiz.question}</p>
                  <div className="quiz-options">
                    {selectedQuiz.options.map((option, index) => {
                      const picked = selectedQuizAnswer === index;
                      const pickedClass =
                        picked && selectedQuizStatus === "correct"
                          ? "correct"
                          : picked && selectedQuizStatus === "wrong"
                          ? "wrong"
                          : "";

                      return (
                        <button
                          key={`${selectedLocation.id}-quiz-${selectedQuizStep}-${index}`}
                          className={`quiz-option ${pickedClass}`}
                          type="button"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          <span>{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedQuizStatus !== "idle" ? (
                    <p className={`quiz-feedback ${selectedQuizStatus === "correct" ? "good" : "bad"}`}>
                      {selectedQuizStatus === "correct"
                        ? `Đúng rồi. ${selectedQuiz.explanation}`
                        : "Bạn đã sai ở câu cuối của mốc này. Hãy thử lại từ đầu mốc để mở khóa bí mật."}
                    </p>
                  ) : null}
                </div>

                {claimedSecrets.includes(selectedLocation.id) ? (
                  <div className="secret-box">
                    <h3>{selectedLocation.secretTitle}</h3>
                    <p>{selectedLocation.secretContent}</p>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="locked-note">
                <Lock size={16} />
                <div>
                  <strong>Địa điểm chưa mở khóa</strong>
                  <p className="location-summary">
                    Hoàn thành mốc trước đó{previousLocation ? ` (${previousLocation.name})` : ""} để mở địa điểm này.
                  </p>
                </div>
              </div>
            )}
          </aside>
        </section>
      </div>

      {secretModal ? (
        <div className="secret-modal-backdrop" role="dialog" aria-modal="true">
          <div className="secret-modal-card">
            <p className="secret-modal-kicker">Hồ sơ vừa mở khóa</p>
            <h3>{secretModal.title}</h3>
            <p>{secretModal.content}</p>
            <button type="button" className="claim-btn" onClick={() => setSecretModal(null)}>
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default CampaignMapPage;






