import React from 'react';
import { Article } from '../data/types';
import { getArticleById } from '../data/articles';
import { Bookmark, X, ArrowRight, Trash2, Clock } from 'lucide-react';

interface BookmarksModalProps {
  savedIds: string[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  savedIds,
  onClose,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  const savedArticles = savedIds
    .map((id) => getArticleById(id))
    .filter((a): a is Article => a !== undefined);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0b2721] border border-[#ffd700]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#081c18]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#ffd700] fill-[#ffd700]" />
            <h3 className="text-base font-bold text-white font-mono uppercase">
              Reading Vault ({savedArticles.length})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {savedArticles.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-mono text-rose-400 hover:text-rose-300 px-2 py-1 rounded border border-rose-500/20"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-mono text-slate-400">
                Your reading vault is empty.
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Bookmark in-depth research papers on any card or reading modal to review offline.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3 rounded-xl border border-white/10 bg-[#081c18] flex items-center justify-between gap-3 group hover:border-[#ffd700]/50 transition-colors"
              >
                <button
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#5fdee7] mb-0.5">
                    <span>{article.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ffd700] transition-colors line-clamp-1">
                    {article.title}
                  </h4>
                </button>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
                    title="Remove from Reading Vault"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="p-2 text-slate-400 hover:text-[#ffd700] rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-[#051411] border-t border-white/10 text-center text-xs font-mono text-slate-400">
          Saved offline to local cache
        </div>
      </div>
    </div>
  );
};
