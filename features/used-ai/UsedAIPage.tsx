"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, MessageSquare, BookOpen, Code } from "lucide-react";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AITool {
  name: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  link: string;
}

const aiTools: AITool[] = [
  {
    name: "ChatGPT",
    icon: <MessageSquare className="w-8 h-8" />,
    description:
      "Trợ lý AI mạnh mẽ hỗ trợ nghiên cứu, viết nội dung và giải đáp thắc mắc về tư tưởng Hồ Chí Minh.",
    features: [
      "Tổng hợp và phân tích tài liệu lịch sử",
      "Hỗ trợ viết nội dung học thuật",
      "Giải đáp câu hỏi về tư tưởng chính trị",
      "Đề xuất ý tưởng sáng tạo cho dự án",
    ],
    link: "https://chat.openai.com",
  },
  {
    name: "Google Gemini",
    icon: <Sparkles className="w-8 h-8" />,
    description:
      "AI đa phương thức của Google, kết hợp văn bản, hình ảnh và dữ liệu để tạo nội dung phong phú. Hỗ trợ tạo hình ảnh AI từ mô tả văn bản.",
    features: [
      "Tìm kiếm và tổng hợp thông tin",
      "Phân tích hình ảnh lịch sử",
      "Tạo hình ảnh AI từ mô tả",
      "Tạo sơ đồ tư duy",
      "Đề xuất cấu trúc nội dung",
    ],
    link: "https://gemini.google.com",
  },
  {
    name: "NotebookLM",
    icon: <BookOpen className="w-8 h-8" />,
    description:
      "Công cụ AI của Google chuyên phân tích nội dung từ giáo trình chuẩn, tài liệu học thuật và tạo video AI tóm tắt nội dung.",
    features: [
      "Phân tích sâu tài liệu giáo trình",
      "Tổng hợp kiến thức từ nhiều nguồn",
      "Trích xuất thông tin quan trọng",
      "Hỏi đáp dựa trên tài liệu",
    ],
    link: "https://notebooklm.google.com",
  },
  {
    name: "Codex",
    icon: <Code className="w-8 h-8" />,
    description:
      "Trình soạn thảo code tích hợp AI, hỗ trợ lập trình viên viết code nhanh hơn với khả năng hiểu ngữ cảnh dự án và gợi ý thông minh.",
    features: [
      "Code completion thông minh với AI",
    ],
    link: "https://chatgpt.com/codex",
  },
];


const UsedAIPage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
          }
        );
      }

      // Animate intro card
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
          }
        );
      }

      // Animate tool cards with stagger
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.6,
            ease: "back.out(1.2)",
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 mb-8 transition-colors"
        >
          <span>←</span> Quay lại
        </Link>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-100 mb-4 text-center"
        >
          Công Cụ AI Sử Dụng
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-amber-200/70 text-center mb-12 text-lg"
        >
          Các công cụ AI hỗ trợ nghiên cứu, phát triển và hoàn thiện dự án
        </p>

        {/* Introduction Card */}
        <div
          ref={introRef}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-12"
        >
          <p className="text-amber-100 text-lg leading-relaxed mb-4">
            Dự án này được xây dựng với sự hỗ trợ của công cụ AI, giúp tối ưu
            hóa quá trình nghiên cứu và sáng tạo nội dung.
          </p>
          <p className="text-amber-200/80 text-base">
            Mỗi công cụ đóng vai trò quan trọng trong việc đảm bảo chất lượng và
            tính chính xác của thông tin.
          </p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiTools.map((tool, index) => (
            <div
              key={tool.name}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-amber-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-amber-300">{tool.icon}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-amber-100 mb-1">
                    {tool.name}
                  </h3>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber-400 hover:text-amber-300 hover:underline transition-colors"
                  >
                    {tool.link.replace("https://", "")}
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-amber-200/80 mb-4 leading-relaxed">
                {tool.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-amber-300 mb-2">
                  Tính năng chính:
                </p>
                <ul className="space-y-1.5">
                  {tool.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-white flex items-start gap-2"
                    >
                      <span className="text-amber-500 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-amber-200/60 text-sm">
            Các công cụ AI được sử dụng một cách có trách nhiệm, với sự kiểm
            chứng và xác minh thông tin từ các nguồn đáng tin cậy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsedAIPage;
