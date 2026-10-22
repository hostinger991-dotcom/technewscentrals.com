import React, { useState } from 'react';
import { InfographicData } from '../data/types';
import { Maximize2, X, Sparkles, Cpu, Eye, Image as ImageIcon, Sliders } from 'lucide-react';

// Real AI-Generated 6-Panel Infographics for all 20 Keywords
export const GENERATED_INFOGRAPHICS: Record<string, string> = {
  'art-01': '/src/assets/images/hero_flagship_infographic_1792653207089.jpg',
  'art-02': '/src/assets/images/budget_laptops_infographic_1792654174869.jpg',
  'art-03': '/src/assets/images/earbuds_infographic_1792654178726.jpg',
  'art-04': '/src/assets/images/smartwatch_infographic_1792654177635.jpg',
  'art-05': '/src/assets/images/foldable_phone_infographic_1792654178469.jpg',
  'art-06': '/src/assets/images/generative_ai_infographic_1792653207015.jpg',
  'art-07': '/src/assets/images/ai_productivity_infographic_1792654178055.jpg',
  'art-08': '/src/assets/images/drone_tech_infographic_1792654200316.jpg',
  'art-09': '/src/assets/images/ml_frameworks_infographic_1792654202437.jpg',
  'art-10': '/src/assets/images/humanoid_robotics_infographic_1792654203061.jpg',
  'art-11': '/src/assets/images/cybersecurity_infographic_1792653208259.jpg',
  'art-12': '/src/assets/images/antivirus_reviews_infographic_1792654203569.jpg',
  'art-13': '/src/assets/images/speed_up_windows_infographic_1792654207852.jpg',
  'art-14': '/src/assets/images/password_manager_infographic_1792654225562.jpg',
  'art-15': '/src/assets/images/data_privacy_infographic_1792654226917.jpg',
  'art-16': '/src/assets/images/smart_home_hubs_infographic_1792654228378.jpg',
  'art-17': '/src/assets/images/security_camera_infographic_1792654229161.jpg',
  'art-18': '/src/assets/images/pc_hardware_infographic_1792654229458.jpg',
  'art-19': '/src/assets/images/cloud_computing_infographic_1792654253867.jpg',
  'art-20': '/src/assets/images/smart_appliances_infographic_1792654255174.jpg',
};

interface InfographicVisualProps {
  articleId: string;
  data: InfographicData;
  mode?: 'compact' | 'full' | 'thumbnail';
  className?: string;
  onOpenModal?: () => void;
}

export const InfographicVisual: React.FC<InfographicVisualProps> = ({
  articleId,
  data,
  mode = 'compact',
  className = '',
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [viewMode, setViewMode] = useState<'image' | 'schematic'>('image');
  const aiImageUrl = GENERATED_INFOGRAPHICS[articleId];

  return (
    <>
      <div className={`relative group overflow-hidden rounded-xl border border-[#5fdee7]/25 bg-[#0a1624] transition-all duration-300 ${className}`}>
        {/* Toggle between AI Real Visual & Interactive Schematic */}
        {aiImageUrl && !imageFailed && (
          <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-[#081c18]/90 border border-white/15 rounded-lg p-0.5 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('image');
              }}
              className={`p-1.5 rounded text-[10px] font-mono flex items-center gap-1 ${
                viewMode === 'image'
                  ? 'bg-[#ffd700] text-[#081c18] font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Real AI Infographic View"
            >
              <ImageIcon className="w-3 h-3" />
              <span className="hidden sm:inline">AI Visual</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('schematic');
              }}
              className={`p-1.5 rounded text-[10px] font-mono flex items-center gap-1 ${
                viewMode === 'schematic'
                  ? 'bg-[#ffd700] text-[#081c18] font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="6-Panel Schematic Matrix"
            >
              <Sliders className="w-3 h-3" />
              <span className="hidden sm:inline">6-Panel</span>
            </button>
          </div>
        )}

        {/* View Mode 1: AI Photorealistic Infographic */}
        {aiImageUrl && !imageFailed && viewMode === 'image' ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
            <img
              src={aiImageUrl}
              alt={`${data.title} - ${data.subtitle}`}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* High-tech overlay with zoom and title */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081c18]/90 via-[#081c18]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 pointer-events-none">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#ffd700]">
                  REAL AI INFOGRAPHIC SPECIFICATION
                </p>
                <p className="text-xs font-bold text-white truncate max-w-sm">{data.title}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
                className="pointer-events-auto p-2 rounded-lg bg-[#0b2721]/95 border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-[#081c18] transition-colors"
                title="Expand High-Res Infographic"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* View Mode 2: Interactive 6-Panel Vector Schematic */
          <div
            className="p-4 sm:p-5 relative overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${data.theme.bg} 0%, #081c18 100%)`,
            }}
          >
            {/* Header Ribbon */}
            <div className="relative z-10 mb-3 pb-2.5 border-b border-white/10 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#ffd700] uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#ffd700]" />
                    6-PANEL TECHNICAL INFOGRAPHIC
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase">
                  {data.title}
                </h4>
                <p className="text-[10px] font-mono text-slate-300">{data.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
                className="p-1.5 shrink-0 rounded bg-white/5 border border-white/15 text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700] transition-colors"
                title="Inspect High-Res Visual"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 6 Panels Grid */}
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-2">
              {data.panels.map((panel, idx) => (
                <div
                  key={panel.id}
                  className="p-2 rounded-lg border border-white/10 bg-black/50 hover:border-[#ffd700]/70 transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                    <span
                      className="text-[8px] font-mono px-1 py-0.5 rounded text-slate-200 border"
                      style={{
                        borderColor: `${data.theme.accent1}40`,
                        backgroundColor: `${data.theme.accent1}15`,
                      }}
                    >
                      {panel.badge}
                    </span>
                  </div>

                  <h5 className="text-[11px] font-bold text-white tracking-tight leading-snug truncate">
                    {panel.title}
                  </h5>

                  <div className="text-[11px] font-mono font-semibold truncate" style={{ color: data.theme.accent1 }}>
                    {panel.stat}
                  </div>

                  <p className="mt-0.5 text-[10px] text-slate-300 line-clamp-1 leading-relaxed">
                    {panel.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-[#5fdee7]" />
                LAB HARDWARE MAP
              </span>
              <span className="text-[#ffd700]">technewscentrals</span>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Modal (Full 4K High-Res View) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/95 backdrop-blur-md"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0b2721] border border-[#ffd700] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3.5 border-b border-[#5fdee7]/20 bg-[#081c18]">
              <div>
                <span className="text-[11px] font-mono text-[#ffd700] uppercase tracking-wider font-bold">
                  HIGH-RES REALISTIC TECHNICAL INFOGRAPHIC
                </span>
                <h3 className="text-sm md:text-base font-bold text-white uppercase">{data.title}</h3>
                <p className="text-[11px] font-mono text-slate-400">{data.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-white/15 rounded-lg p-0.5 bg-[#0b2721]">
                  <button
                    type="button"
                    onClick={() => setViewMode('image')}
                    className={`px-2.5 py-1 text-xs font-mono rounded ${
                      viewMode === 'image' ? 'bg-[#ffd700] text-[#081c18] font-bold' : 'text-slate-300'
                    }`}
                  >
                    AI Real Picture
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('schematic')}
                    className={`px-2.5 py-1 text-xs font-mono rounded ${
                      viewMode === 'schematic' ? 'bg-[#ffd700] text-[#081c18] font-bold' : 'text-slate-300'
                    }`}
                  >
                    6-Panel Specs
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto flex-1">
              {viewMode === 'image' && aiImageUrl ? (
                <div className="w-full flex justify-center">
                  <img
                    src={aiImageUrl}
                    alt={data.title}
                    className="w-full h-auto rounded-xl shadow-2xl border border-white/10"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.panels.map((panel, idx) => (
                    <div
                      key={panel.id}
                      className="p-4 rounded-xl border border-white/15 bg-black/60 hover:border-[#ffd700] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#ffd700]">
                          PANEL 0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#5fdee7]/40 text-[#5fdee7] bg-[#5fdee7]/10">
                          {panel.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white uppercase">{panel.title}</h4>
                      <div className="text-sm font-mono font-bold my-1 text-[#ffd700]">{panel.stat}</div>
                      <p className="text-xs text-slate-300 mb-3">{panel.description}</p>
                      <div className="space-y-1 pt-2 border-t border-white/10 text-xs text-slate-400">
                        {panel.details.map((d, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-[#5fdee7]">›</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/10 bg-[#081c18] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>technewscentrals Peer-Reviewed Visual Asset</span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#ffd700] text-[#081c18] font-bold hover:bg-[#ffcc00] transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
