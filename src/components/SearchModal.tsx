import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../data/types';
import { searchArticles } from '../data/articles';
import { Search, X, ArrowRight, Clock } from 'lucide-react';

interface SearchModalProps {
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const results = searchArticles(query);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#201b05] border border-[#ffd700]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-yellow-500/15 bg-[#141204]">
          <Search className="w-5 h-5 text-[#ffd700] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, silicon nodes, VPN ciphers, AI frameworks..."
            className="w-full bg-transparent text-white placeholder-yellow-500/50 text-sm focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 rounded border border-[#ffd700]/20 text-slate-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Suggested Keywords */}
        {!query && (
          <div className="p-4 border-b border-yellow-500/10 bg-[#120f03]">
            <p className="text-[11px] font-mono text-yellow-500/80 uppercase tracking-wider mb-2">
              POPULAR JOURNAL INVESTIGATIONS:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'flagship smartphones',
                'generative ai tools',
                'best vpn',
                'humanoid robotics',
                'speed up windows',
                'smart home hubs',
                'heat pump',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs font-mono px-2.5 py-1 rounded-md border border-[#ffd700]/30 bg-[#1a1604] text-slate-300 hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-yellow-500/10 p-2">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm font-mono">
              No technical articles matching "{query}".
            </div>
          ) : (
            results.map((article) => (
              <button
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="w-full text-left p-3.5 rounded-xl hover:bg-[#181404] hover:border hover:border-[#ffd700]/50 transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#ffd700] mb-1">
                    <span>{article.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ffd700] transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                    {article.leadSummary}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#00ff88] shrink-0 mt-1" />
              </button>
            ))
          )}
        </div>

        <div className="p-3 bg-[#120f03] border-t border-yellow-500/15 text-center text-[11px] font-mono text-yellow-500/70">
          Showing {results.length} of 20 verified engineering articles
        </div>
      </div>
    </div>
  );
};
