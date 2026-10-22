import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown, Bell, Bookmark } from 'lucide-react';
import { CategoryId } from '../data/types';
import { CATEGORIES } from '../data/categories';

interface NavbarProps {
  currentCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  onOpenSearch: () => void;
  onOpenPage: (page: 'about' | 'contact' | 'editors' | 'standards') => void;
  savedCount: number;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenPage,
  savedCount,
  onOpenBookmarks,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#081c18]/95 backdrop-blur-md border-b border-[#5fdee7]/20">
      {/* Top Banner Tagline */}
      <div className="bg-[#051310] border-b border-white/5 py-1 px-4 text-center">
        <p className="text-[10px] md:text-[11px] font-mono tracking-widest text-[#5fdee7] uppercase font-semibold">
          ENGINEERING &amp; CONSUMER TECH JOURNAL — PUBLISHED DAILY
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectCategory('all')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0b2721] border border-[#5fdee7] flex items-center justify-center shadow-sm group-hover:border-[#ffd700] group-hover:shadow-[0_0_12px_rgba(255,215,0,0.4)] transition-all">
                <span className="font-mono font-black text-sm text-[#ffd700]">TC</span>
              </div>
              <div>
                <span className="text-lg md:text-xl font-black tracking-tight text-white group-hover:text-[#ffd700] transition-colors uppercase font-mono">
                  technewscentrals
                </span>
                <span className="block text-[9px] font-mono tracking-wider text-slate-400">
                  PEER-REVIEWED TECH JOURNAL
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wide uppercase">
            <button
              onClick={() => onSelectCategory('all')}
              className={`transition-colors whitespace-nowrap py-1 ${
                currentCategory === 'all'
                  ? 'text-[#ffd700] border-b-2 border-[#ffd700]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Home Feed
            </button>

            {/* Category Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className={`flex items-center gap-1 transition-colors whitespace-nowrap py-1 ${
                  currentCategory !== 'all' ? 'text-[#ffd700]' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-[#0b2721] border border-[#5fdee7]/30 shadow-2xl p-2 hidden group-hover:block hover:block">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex flex-col gap-0.5 ${
                      currentCategory === cat.id
                        ? 'bg-[#ffd700]/10 border border-[#ffd700] text-[#ffd700]'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="font-bold">{cat.name}</span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">{cat.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenPage('about')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap py-1"
            >
              About The Blog
            </button>

            <button
              onClick={() => onOpenPage('editors')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap py-1"
            >
              Editors
            </button>

            <button
              onClick={() => onOpenPage('standards')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap py-1"
            >
              Standards
            </button>

            <button
              onClick={() => onOpenPage('contact')}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap py-1"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Bookmarks, Newsletter/Subscribe) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-[#0b2721] border border-[#5fdee7]/30 text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700] transition-colors"
              title="Search 20 Technical Articles"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-lg bg-[#0b2721] border border-[#5fdee7]/30 text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700] transition-colors"
              title="Saved Articles"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ffd700] text-[#081c18] text-[9px] font-mono font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onOpenPage('about')}
              className="tech-hover-btn hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold uppercase rounded-lg border border-[#5fdee7] text-[#5fdee7] bg-transparent"
            >
              <Bell className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Dispatch Sub</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0b2721] border border-[#5fdee7]/30 text-slate-300 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#5fdee7]/20 space-y-2">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm font-semibold text-slate-200 hover:text-[#ffd700]"
            >
              Home Feed
            </button>

            <div className="px-3 pt-2 pb-1 text-xs font-mono text-[#5fdee7] uppercase tracking-wider">
              Categories
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-1.5 text-xs ${
                  currentCategory === cat.id ? 'text-[#ffd700] font-bold' : 'text-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}

            <div className="pt-2 border-t border-white/10 space-y-1">
              <button
                onClick={() => {
                  onOpenPage('about');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                About The Blog
              </button>
              <button
                onClick={() => {
                  onOpenPage('editors');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                Editors &amp; Authors
              </button>
              <button
                onClick={() => {
                  onOpenPage('standards');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                Editorial Standards
              </button>
              <button
                onClick={() => {
                  onOpenPage('contact');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                Contact Newsroom
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
