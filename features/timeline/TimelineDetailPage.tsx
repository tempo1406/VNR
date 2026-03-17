"use client";

import { PostType } from "@/common/types/post.type";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AudioPlayer from "@/components/AudioPlayer";

interface TimelineDetailPageProps {
  post: PostType;
}

const TimelineDetailPage: React.FC<TimelineDetailPageProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }

    // Animate content
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/timeline"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại dòng thời gian
        </Link>

        {/* Header */}
        <div ref={headerRef} className="mb-8">
          {/* Milestone Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-600/20 backdrop-blur-md rounded-full border border-amber-500/30">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-bold text-lg">{post.milestone}</span>
            </div>
          </div>

          {/* Title */}
          <h1
            data-page-title
            className="mb-4 select-text text-5xl font-bold leading-tight text-white"
          >
            {post.title}
          </h1>

          {/* Short Description */}
          {post.shortDescription && (
            <p className="text-white/80 text-xl leading-relaxed">
              {post.shortDescription}
            </p>
          )}

          {post.audio && (
            <div className="mt-4">
              <AudioPlayer src={post.audio} title={post.title} />
            </div>
          )}
        </div>

        {/* Main Content Card */}
        <div ref={contentRef} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          {/* Image */}
          {post.image && post.image.length > 0 && (
            <div className="w-full h-96 overflow-hidden bg-amber-950/25 p-4">
              <img
                src={post.image[0]}
                alt={post.title}
                className="w-full h-full object-contain hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div
              data-page-content
              className="prose prose-invert prose-lg max-w-none select-text"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="mt-8 mb-4 select-text border-b border-amber-500/30 pb-2 text-3xl font-bold text-white">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-6 mb-3 select-text text-2xl font-semibold text-white">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 select-text text-lg leading-relaxed text-white/90">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 list-inside list-disc space-y-2 select-text text-white/90">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4 select-text leading-relaxed text-white/90">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-6 select-text rounded-r-lg border-l-4 border-amber-500 bg-amber-900/20 py-2 pl-4">
                      <div className="select-text text-xl italic text-amber-200">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="select-text font-bold text-amber-300">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="select-text italic text-amber-200">
                      {children}
                    </em>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Resource Links */}
            {post.linkResource && post.linkResource.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Tài liệu tham khảo
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.linkResource.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 text-amber-300 rounded-lg hover:bg-amber-600/40 transition-all duration-300 border border-amber-500/30 hover:border-amber-500/60 group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span className="font-medium">
                        {new URL(link).hostname.replace('www.', '')}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Images */}
            {post.image && post.image.length > 1 && (
              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Hình ảnh liên quan
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {post.image.slice(1).map((img, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg">
                      <img
                        src={img}
                        alt={`${post.title} - ${idx + 2}`}
                        className="w-full h-48 object-contain bg-amber-950/25 p-2 hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineDetailPage;



