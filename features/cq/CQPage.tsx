"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRightLeft, BookText, Shield, Sparkles } from "lucide-react";
import { cqConclusion, cqHero, cqSections } from "@/features/cq/data";

const CQPage = () => {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/35 px-4 py-2 text-sm text-amber-100 transition-colors hover:bg-amber-900/45"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại</span>
          </Link>
          <div className="rounded-full border border-amber-500/25 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
            Chuyên đề CQ
          </div>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-amber-400/20 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.24),_transparent_32%),linear-gradient(140deg,rgba(22,12,6,0.95),rgba(40,18,8,0.88)_48%,rgba(16,9,5,0.96))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] md:p-8 xl:p-10">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                <Sparkles className="h-4 w-4" />
                <span>{cqHero.badge}</span>
              </div>
              <h1 className="max-w-4xl font-[family-name:var(--font-crimson-text)] text-4xl font-bold leading-tight text-white sm:text-5xl xl:text-6xl">
                {cqHero.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-amber-50/88 sm:text-lg">
                {cqHero.lead}
              </p>

              <div className="mt-6 rounded-[1.4rem] border border-amber-300/20 bg-black/25 p-5 backdrop-blur-sm">
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  <BookText className="h-4 w-4" />
                  <span>Câu hỏi trung tâm</span>
                </div>
                <p className="font-[family-name:var(--font-crimson-text)] text-2xl leading-relaxed text-amber-50 sm:text-3xl">
                  {cqHero.question}
                </p>
              </div>
            </div>

            <div className="relative min-h-[400px] overflow-hidden rounded-[1.7rem] border border-amber-400/20 bg-black/30 md:min-h-[460px]">
              <div className="absolute inset-4 rounded-[1.35rem] border border-amber-200/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_40%),linear-gradient(180deg,rgba(34,17,8,0.92),rgba(10,7,5,0.94))]" />
              <Image
                src={cqHero.image}
                alt="Minh họa cho tab CQ"
                fill
                className="object-contain p-6 md:p-8"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="rounded-2xl border border-amber-300/20 bg-black/35 p-4 backdrop-blur-md">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-amber-300">
                    Hướng tiếp cận
                  </div>
                  <p className="text-sm leading-7 text-amber-50/90 sm:text-base">
                    Trang này không đi theo dạng dòng thời gian, mà sắp xếp nội dung thành 4 luận điểm so sánh để dễ vận dụng và phân tích.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.4rem] border border-amber-500/20 bg-amber-950/35 p-5 backdrop-blur-sm">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              <ArrowRightLeft className="h-4 w-4" />
              <span>Dạng trình bày</span>
            </div>
            <p className="text-white/88">So sánh trực diện giữa Việt Nam và Ấn Độ theo từng luận điểm.</p>
          </article>
          <article className="rounded-[1.4rem] border border-amber-500/20 bg-amber-950/35 p-5 backdrop-blur-sm">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              <Shield className="h-4 w-4" />
              <span>Trọng tâm</span>
            </div>
            <p className="text-white/88">Làm rõ vì sao Việt Nam buộc phải dùng bạo lực cách mạng để bảo vệ độc lập.</p>
          </article>
          <article className="rounded-[1.4rem] border border-amber-500/20 bg-amber-950/35 p-5 backdrop-blur-sm">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              <BookText className="h-4 w-4" />
              <span>Nguồn nội dung</span>
            </div>
            <p className="text-white/88">Tổng hợp trực tiếp từ tài liệu “VNR - Nhóm 3” và sắp xếp lại thành dạng chuyên đề vận dụng.</p>
          </article>
        </section>

        <section className="flex flex-col gap-6">
          {cqSections.map((section, index) => {
            const reverse = index % 2 === 1;

            return (
              <article
                key={section.id}
                className={`grid gap-6 rounded-[1.8rem] border border-amber-400/18 bg-[linear-gradient(135deg,rgba(15,8,5,0.9),rgba(45,19,9,0.88))] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.28)] md:grid-cols-[minmax(280px,0.84fr)_minmax(0,1.16fr)] md:p-6 xl:p-7 ${
                  reverse ? "md:grid-cols-[minmax(0,1.16fr)_minmax(280px,0.84fr)]" : ""
                }`}
              >
                <div className={reverse ? "md:order-2" : ""}>
                  <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.26em] text-amber-200">
                    <span>{section.id}</span>
                    <span>Luận điểm</span>
                  </div>
                  <h2 className="font-[family-name:var(--font-crimson-text)] text-3xl font-bold leading-tight text-white sm:text-4xl">
                    {section.title}
                  </h2>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-[1.3rem] border border-rose-300/20 bg-rose-950/18 p-5">
                      <h3 className="mb-3 text-lg font-semibold text-rose-100">{section.vietNamTitle}</h3>
                      <ul className="space-y-3 text-sm leading-7 text-white/88 sm:text-base">
                        {section.vietNamPoints.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose-300" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-[1.3rem] border border-emerald-300/20 bg-emerald-950/18 p-5">
                      <h3 className="mb-3 text-lg font-semibold text-emerald-100">{section.indiaTitle}</h3>
                      <ul className="space-y-3 text-sm leading-7 text-white/88 sm:text-base">
                        {section.indiaPoints.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.25rem] border border-amber-300/18 bg-black/25 p-4">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                      Ý nghĩa rút ra
                    </div>
                    <p className="text-base leading-8 text-amber-50/92">{section.takeaway}</p>
                  </div>
                </div>

                <div className={`relative min-h-[340px] overflow-hidden rounded-[1.5rem] border border-amber-400/16 bg-black/25 md:min-h-[380px] ${reverse ? "md:order-1" : ""}`}>
                  <div className="absolute inset-4 rounded-[1.2rem] border border-amber-200/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.14),_transparent_38%),linear-gradient(180deg,rgba(35,16,7,0.9),rgba(10,7,5,0.92))]" />
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-contain p-5 md:p-6"
                    sizes="(max-width: 768px) 100vw, 34vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute left-0 right-0 top-0 p-4">
                    <div className="inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-amber-100 backdrop-blur-sm">
                      Tư liệu minh họa
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 rounded-[2rem] border border-amber-400/20 bg-[linear-gradient(135deg,rgba(43,18,8,0.94),rgba(17,10,6,0.96))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.32)] md:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)] md:p-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.6rem] border border-amber-400/18 bg-black/25 md:min-h-[420px]">
            <div className="absolute inset-4 rounded-[1.3rem] border border-amber-200/10 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_40%),linear-gradient(180deg,rgba(35,16,7,0.9),rgba(10,7,5,0.94))]" />
            <Image
              src={cqConclusion.image}
              alt="Tổng kết cho tab CQ"
              fill
              className="object-contain p-6 md:p-8"
              sizes="(max-width: 768px) 100vw, 38vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit rounded-full border border-amber-400/28 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              {cqConclusion.title}
            </div>
            <h2 className="font-[family-name:var(--font-crimson-text)] text-3xl font-bold text-white sm:text-4xl">
              Việt Nam không chọn chiến tranh, mà bị đặt vào tình thế phải chiến đấu
            </h2>
            <p className="mt-4 text-base leading-8 text-amber-50/88 sm:text-lg">{cqConclusion.lead}</p>

            <ul className="mt-6 grid gap-3 text-white/90">
              {cqConclusion.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3 rounded-2xl border border-amber-300/14 bg-black/20 px-4 py-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-300" />
                  <span className="leading-7">{reason}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-[1.35rem] border border-amber-300/18 bg-amber-300/10 p-5">
              <p className="font-[family-name:var(--font-crimson-text)] text-2xl leading-relaxed text-amber-50">
                {cqConclusion.finalStatement}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CQPage;