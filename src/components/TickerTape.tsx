import React from 'react';
import { getBreakingHeadlines } from '../data/articles';
import { Flame } from 'lucide-react';

interface TickerTapeProps {
  onSelectArticle: (articleId: string) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onSelectArticle }) => {
  const headlines = getBreakingHeadlines();
  // Duplicate for seamless infinite loop
  const duplicated = [...headlines, ...headlines];

  return (
    <div className="relative w-full overflow-hidden bg-[#061713] border-y border-[#5fdee7]/20 py-2.5 z-20">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Fixed Lead Badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 mr-3 ml-2 rounded border border-[#5fdee7] bg-[#0b2721] text-[#5fdee7] text-xs font-mono font-bold tracking-wider uppercase z-10 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
          <span>BREAKING WIRE</span>
        </div>

        {/* Continuous Marquee Rail */}
        <div className="relative overflow-hidden w-full">
          <div className="animate-ticker flex items-center gap-8">
            {duplicated.map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                onClick={() => onSelectArticle(item.id)}
                className="group inline-flex items-center gap-3 text-xs text-slate-300 hover:text-[#ffd700] transition-colors whitespace-nowrap text-left"
              >
                <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border border-[#5fdee7]/40 text-[#5fdee7] group-hover:border-[#ffd700] group-hover:text-[#ffd700] transition-colors bg-[#081c18]">
                  {item.tag}
                </span>
                <span className="font-medium tracking-tight group-hover:underline underline-offset-4 decoration-[#ffd700]">
                  {item.title}
                </span>
                <span className="text-slate-600 font-mono">/</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
