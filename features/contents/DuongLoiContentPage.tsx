import ContentNavigation from "@/components/ContentNavigation";
import { getDuongLoiSection } from "@/features/contents/data/duong-loi-sections";
import { notFound } from "next/navigation";

interface DuongLoiContentPageProps {
  sectionNumber: number;
}

export default function DuongLoiContentPage({
  sectionNumber,
}: DuongLoiContentPageProps) {
  const section = getDuongLoiSection(sectionNumber);

  if (!section) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 rounded-2xl border border-amber-600/40 bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-stone-900/40 p-8 shadow-2xl backdrop-blur-sm">
            <p className="mb-3 text-sm font-semibold tracking-widest text-amber-300/90">
              NỘI DUNG {section.number} • {section.period}
            </p>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-amber-100 md:text-5xl">
              {section.title}
            </h1>
            <p className="text-base leading-relaxed text-amber-100/90 md:text-lg">
              {section.lead}
            </p>
          </div>

          {section.quote && (
            <blockquote className="mb-10 rounded-2xl border-l-4 border-amber-500 bg-black/20 p-6 italic text-amber-50 shadow-xl backdrop-blur-sm md:p-8 md:text-xl">
              <p className="mb-4">
                &ldquo;{section.quote.text}&rdquo;
              </p>
              <footer className="text-sm not-italic text-amber-300/90 md:text-base">
                — {section.quote.source}
              </footer>
            </blockquote>
          )}

          <div className="space-y-6">
            {section.parts.map((part, index) => (
              <section
                key={`${section.number}-${index}`}
                className="rounded-2xl border border-amber-700/40 bg-black/20 p-6 shadow-lg backdrop-blur-sm md:p-8"
              >
                <h2 className="mb-3 text-2xl font-bold text-amber-100">
                  {part.heading}
                </h2>
                <p className="mb-4 leading-relaxed text-amber-100/90">
                  {part.description}
                </p>

                {part.bullets && part.bullets.length > 0 && (
                  <ul className="space-y-3">
                    {part.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${section.number}-${index}-${bulletIndex}`}
                        className="flex items-start gap-3 text-amber-100/90"
                      >
                        <span className="mt-1 text-amber-400">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-amber-500/50 bg-gradient-to-r from-amber-700/60 to-orange-700/60 p-6 shadow-xl">
            <h3 className="mb-2 text-xl font-bold text-white">Ý nghĩa cốt lõi</h3>
            <p className="text-white/95">{section.takeaway}</p>
          </div>

          <ContentNavigation />
        </div>
      </div>
    </div>
  );
}
