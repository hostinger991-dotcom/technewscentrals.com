import React from 'react';
import { CategoryId } from '../data/types';
import { CATEGORIES } from '../data/categories';
import { Phone, Mail, Shield, Award, Terminal } from 'lucide-react';
import { PageViewType } from './PagesModal';

interface FooterProps {
  onSelectCategory: (category: CategoryId) => void;
  onOpenPage: (page: PageViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenPage }) => {
  return (
    <footer className="bg-[#100e02] border-t border-[#ffd700]/25 text-slate-300">
      {/* Upper Footer Columns in Cyber Yellow Palette */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#241e06] border border-[#ffd700] flex items-center justify-center font-mono font-bold text-xs text-[#ffd700]">
                TC
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase font-mono">
                technewscentrals
              </span>
            </div>

            <p className="text-xs text-yellow-500/70 leading-relaxed max-w-sm">
              ENGINEERING &amp; CONSUMER TECH JOURNAL — PUBLISHED DAILY.
              Rigorous, peer-reviewed technical investigations into consumer electronics, artificial intelligence, cybersecurity, and enterprise hardware architectures.
            </p>

            {/* Official Contact Info Box (Embedded strictly in footer as requested) */}
            <div className="p-3.5 rounded-xl border border-[#ffd700]/30 bg-[#181403] space-y-2 max-w-sm">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#ffd700] font-bold">
                OFFICIAL EDITORIAL CONTACT
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <a
                  href="tel:03069256639"
                  className="flex items-center gap-2 text-slate-300 hover:text-[#00ff88] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ffd700] shrink-0" />
                  <span>03069256639 (Phone / WhatsApp)</span>
                </a>
                <a
                  href="mailto:sagheerofficial21dnb@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-[#00ff88] transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ffd700] shrink-0" />
                  <span className="truncate">sagheerofficial21dnb@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Tech Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#ffd700] uppercase">
              Tech Domains
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="text-slate-400 hover:text-[#00ff88] transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Editorial Standards & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#ffd700] uppercase">
              Editorial Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenPage('standards')}
                  className="text-slate-400 hover:text-[#ffd700] transition-colors"
                >
                  Editorial Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPage('privacy')}
                  className="text-slate-400 hover:text-[#ffd700] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPage('terms')}
                  className="text-slate-400 hover:text-[#ffd700] transition-colors"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPage('about')}
                  className="text-slate-400 hover:text-[#ffd700] transition-colors"
                >
                  Lab Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Coordinates */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#ffd700] uppercase">
              Newsroom
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenPage('about')}
                  className="text-slate-400 hover:text-[#ffd700] transition-colors"
                >
                  About The Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPage('editors')}
                  className="text-slate-400 hover:text-[#ffd700] transition-colors"
                >
                  Editorial Board &amp; Fellows
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPage('contact')}
                  className="text-slate-400 hover:text-[#ffd700] transition-colors"
                >
                  Contact Desk &amp; Leads
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar & Copyright */}
      <div className="border-t border-yellow-500/10 bg-[#0a0801] py-5 px-4 text-center text-xs font-mono text-yellow-500/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 technewscentrals. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onOpenPage('privacy')} className="hover:text-yellow-400">
              GDPR Compliance
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onOpenPage('terms')} className="hover:text-yellow-400">
              Fair Use Guidelines
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onOpenPage('standards')} className="hover:text-yellow-400">
              Peer-Reviewed Journal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
