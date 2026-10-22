import React, { useState, useEffect } from 'react';
import { Article } from '../data/types';
import { getArticleById } from '../data/articles';
import { InfographicVisual } from './InfographicVisual';
import {
  X,
  Bookmark,
  Share2,
  Check,
  Type,
  Printer,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article;
  onClose: () => void;
  onSelectRelated: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onSelectRelated,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setScrollProgress((scrollTop / total) * 100);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const fontSizeClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-loose',
  }[fontSize];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[94vh] bg-[#081c18] border border-[#5fdee7]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reading Depth Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/40 z-30">
          <div
            className="h-full bg-[#ffd700] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Top Command Bar */}
        <div className="shrink-0 px-4 sm:px-6 py-3 border-b border-[#5fdee7]/20 bg-[#0b2721] flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5fdee7] truncate">
            <ShieldCheck className="w-4 h-4 text-[#ffd700] shrink-0" />
            <span className="truncate uppercase font-bold">{article.category}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400 truncate">{article.keyword}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Font Size Toggle */}
            <div className="flex items-center border border-white/10 rounded-lg p-0.5 bg-[#081c18]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 text-xs font-mono font-bold rounded ${
                  fontSize === 'normal' ? 'bg-[#ffd700] text-[#081c18]' : 'text-slate-400 hover:text-white'
                }`}
                title="Normal Text Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 text-sm font-mono font-bold rounded ${
                  fontSize === 'large' ? 'bg-[#ffd700] text-[#081c18]' : 'text-slate-400 hover:text-white'
                }`}
                title="Large Text Size"
              >
                A+
              </button>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-[#ffd700] bg-[#ffd700]/20 text-[#ffd700]'
                  : 'border-white/10 text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700]'
              }`}
              title={isBookmarked ? 'Saved' : 'Save Article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#ffd700]' : ''}`} />
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-white/10 text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700] transition-colors relative"
              title="Copy Article URL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex p-2 rounded-lg border border-white/10 text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700] transition-colors"
              title="Print Clean Article"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Content */}
        <div
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10 space-y-8 max-w-prose mx-auto w-full"
        >
          {/* Article Header & Typography */}
          <div className="space-y-4 border-b border-white/10 pb-6">
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-[#ffd700] font-bold uppercase">{article.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Published {article.publishDate}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>PEER REVIEWED IN LAB</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base font-mono text-[#5fdee7] uppercase tracking-wide">
              {article.subtitle}
            </p>

            {/* Author Attribution Card */}
            <div className="pt-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0b2721] border border-[#ffd700] flex items-center justify-center font-mono font-bold text-sm text-[#ffd700] shrink-0">
                {article.author.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-100">{article.author.name}</p>
                <p className="text-xs font-mono text-slate-400">{article.author.role}</p>
              </div>
            </div>
          </div>

          {/* Lead Summary Deck */}
          <div className="p-4 sm:p-5 rounded-xl border border-[#5fdee7]/30 bg-[#0b2721]/60 text-slate-200 italic leading-relaxed text-sm sm:text-base">
            {article.leadSummary}
          </div>

          {/* Dedicated Technical Infographic */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#ffd700] uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#ffd700]" />
                APPROVED TECHNICAL SPECIFICATION INFOGRAPHIC
              </h3>
            </div>
            <InfographicVisual
              articleId={article.id}
              data={article.infographic}
              mode="compact"
            />
          </section>

          {/* Article Sections (Comprehensive 1200+ word depth) */}
          <div className="space-y-8 text-slate-300">
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/5">
                  {section.heading}
                </h2>

                {section.lead && (
                  <p className="font-semibold text-slate-200 text-sm sm:text-base leading-relaxed">
                    {section.lead}
                  </p>
                )}

                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className={`${fontSizeClasses} text-slate-300`}>
                    {para}
                  </p>
                ))}

                {section.quote && (
                  <blockquote className="my-6 p-4 border-y border-[#ffd700]/40 text-lg sm:text-xl font-serif italic text-slate-100 bg-[#0b2721]/30">
                    “{section.quote}”
                  </blockquote>
                )}

                {section.takeaways && section.takeaways.length > 0 && (
                  <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2 mt-4">
                    <span className="text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider block">
                      ARCHITECTURAL INVARIANTS:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                      {section.takeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-[#ffd700] font-bold">›</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Laboratory Benchmark Matrix */}
          <section className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#ffd700]" />
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-mono">
                {article.benchmarkTable.title}
              </h3>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#5fdee7]/30 bg-[#0b2721]/80">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#051411] text-[#5fdee7] uppercase tracking-wider border-b border-[#5fdee7]/20">
                  <tr>
                    {article.benchmarkTable.headers.map((h, i) => (
                      <th key={i} className="p-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {article.benchmarkTable.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={
                        row.highlight
                          ? 'bg-[#ffd700]/10 font-bold text-white'
                          : 'text-slate-300 hover:bg-white/5'
                      }
                    >
                      <td className="p-3 flex items-center gap-1.5 whitespace-nowrap">
                        {row.highlight && <span className="text-[#ffd700]">★</span>}
                        <span>{row.device}</span>
                      </td>
                      {row.values.map((v, vIdx) => (
                        <td key={vIdx} className="p-3 whitespace-nowrap tabular-nums">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Peer-Reviewed Verdict Box */}
          <section className="p-5 sm:p-6 rounded-2xl border-2 border-[#ffd700] bg-[#0b2721] space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#5fdee7] uppercase font-bold">
                  TECHNEWSCENTRALS LABS OFFICIAL VERDICT
                </span>
                <h4 className="text-lg font-black text-white">{article.verdict.winner}</h4>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black font-mono text-[#ffd700]">
                  {article.verdict.finalScore}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <p className="text-xs font-mono font-bold text-emerald-400 uppercase">ENGINEERING PROS</p>
                <ul className="space-y-1 text-xs text-slate-300">
                  {article.verdict.pros.map((pro, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-mono font-bold text-rose-400 uppercase">ENGINEERING TRADE-OFFS</p>
                <ul className="space-y-1 text-xs text-slate-300">
                  {article.verdict.cons.map((con, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">-</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Recommendation: </strong>
                {article.verdict.recommendation}
              </p>
            </div>
          </section>

          {/* Related In-Depth Articles */}
          {article.relatedIds.length > 0 && (
            <section className="space-y-3 pt-6 border-t border-white/10">
              <h3 className="text-sm font-mono font-bold text-[#ffd700] uppercase tracking-wider">
                RELATED TECHNICAL ESSAYS IN THIS DOMAIN
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.relatedIds.map((relId) => {
                  const rel = getArticleById(relId);
                  if (!rel) return null;
                  return (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="text-left p-3 rounded-xl border border-white/10 bg-[#0b2721] hover:border-[#ffd700] transition-colors group flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-[#5fdee7] block mb-1">
                          {rel.readTime} · {rel.category}
                        </span>
                        <h5 className="text-xs font-bold text-white group-hover:text-[#ffd700] line-clamp-2">
                          {rel.title}
                        </h5>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-white">
                        <span>Read Study</span>
                        <ChevronRight className="w-3 h-3 text-[#ffd700]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Article Footer & Official Newsroom Contact Badge */}
          <div className="pt-6 border-t border-white/10 text-center text-xs font-mono text-slate-400 space-y-1">
            <p>Published by technewscentrals Editorial Newsroom · ISSN 2981-4412</p>
            <p>Peer review inquiries &amp; Corrections: sagheerofficial21dnb@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
