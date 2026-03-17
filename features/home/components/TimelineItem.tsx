"use client";

import { PostType } from "@/common/types/post.type";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TimelineItemProps {
  post: PostType;
  index: number;
  linkPrefix?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  post,
  index,
  linkPrefix = "/timeline",
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            x: isEven ? -80 : 80,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (circleRef.current) {
        gsap.fromTo(
          circleRef.current,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={itemRef}
      className={`relative mb-12 flex items-center ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        ref={cardRef}
        className={`w-5/12 ${isEven ? "pr-8 text-right" : "pl-8 text-left"}`}
      >
        <div className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20">
          <div
            className={`mb-3 flex items-center gap-2 ${
              isEven ? "justify-end" : "justify-start"
            }`}
          >
            <Calendar className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-400">{post.milestone}</span>
          </div>

          <h3 className="mb-3 select-text text-xl font-bold text-white transition-colors group-hover:text-amber-300">
            {post.title}
          </h3>

          {post.shortDescription && (
            <p className="mb-4 select-text text-sm leading-relaxed text-white/80">
              {post.shortDescription}
            </p>
          )}

          {post.image && post.image.length > 0 && (
            <div className="mb-4 overflow-hidden rounded-lg border border-white/10 bg-amber-950/25 p-3">
              <img
                src={post.image[0]}
                alt={post.title}
                className="h-48 w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                crossOrigin="anonymous"
              />
            </div>
          )}

          <div
            className={`flex items-center gap-2 ${
              isEven ? "justify-end" : "justify-start"
            }`}
          >
            <Link
              href={`${linkPrefix}/${post.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-600/10 px-4 py-2 text-sm font-medium text-amber-300 transition-all duration-300 hover:border-amber-400/60 hover:bg-amber-500/15 hover:text-amber-200"
            >
              <span>Xem chi tiết</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex w-2/12 justify-center">
        <div
          ref={circleRef}
          className="h-6 w-6 rounded-full border-4 border-amber-900/40 bg-amber-500 shadow-lg shadow-amber-500/50 transition-transform duration-300"
        />
      </div>

      <div className="w-5/12" />
    </div>
  );
};
