import React from 'react';
import { Article } from '../data/types';
import { InfographicVisual } from './InfographicVisual';
import { Bookmark, ArrowUpRight, Clock, Calendar } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  featured = false,
}) => {
  return (
    <article
      onClick={() => onSelect(article)}
      className={`tech-hover-card group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer select-none transition-all duration-300 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Visual Infographic Thumbnail */}
      <div className="relative w-full overflow-hidden">
        <InfographicVisual
          articleId={article.id}
          data={article.infographic}
          mode="compact"
          className="w-full"
        />
      </div>

      {/* Card Content Body in Warm Yellow Slate Glassmorphism */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 justify-between gap-4">
        <div>
          {/* Zero-Pill Unboxed Clean Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono text-yellow-500/80 mb-2.5">
            <span className="text-[#ffd700] group-hover:text-[#00ff88] transition-colors font-semibold">
              {article.category}
            </span>
            <span aria-hidden="true" className="text-yellow-600/40">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-[#ffd700]" />
              {article.readTime}
            </span>
            <span aria-hidden="true" className="text-yellow-600/40">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Calendar className="w-3 h-3 text-[#ffd700]" />
              {article.publishDate}
            </span>
          </div>

          {/* Primary Article Headline */}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#ffd700] transition-colors leading-snug tracking-tight">
            {article.title}
          </h3>

          {/* Lead Abstract */}
          <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {article.leadSummary}
          </p>
        </div>

        {/* Footer info: Author & Interactive Buttons */}
        <div className="pt-4 border-t border-yellow-500/15 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#141204] border border-[#ffd700]/40 flex items-center justify-center overflow-hidden shrink-0">
              <span className="text-[10px] font-mono font-bold text-[#ffd700]">
                {article.author.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">{article.author.name}</p>
              <p className="text-[10px] font-mono text-yellow-500/70 truncate">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'border-[#00ff88] bg-[#00ff88]/20 text-[#00ff88]'
                  : 'border-yellow-500/20 text-slate-400 hover:text-[#00ff88] hover:border-[#00ff88]'
              }`}
              title={isBookmarked ? 'Remove from Saved' : 'Save for Offline Reading'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#00ff88]' : ''}`} />
            </button>

            <span className="p-2 rounded-lg border border-yellow-500/20 text-slate-400 group-hover:border-[#00ff88] group-hover:bg-[#00ff88] group-hover:text-[#141204] transition-all">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
