/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ALL_ARTICLES, getArticleById } from './data/articles';
import { CATEGORIES } from './data/categories';
import { Article, CategoryId } from './data/types';
import { Navbar } from './components/Navbar';
import { TickerTape } from './components/TickerTape';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { PagesModal, PageViewType } from './components/PagesModal';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';
import {
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle2,
  Filter,
  Layers,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageViewType | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('technewscentrals_bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('technewscentrals_bookmarks', JSON.stringify(savedIds));
    } catch (e) {
      console.error('Failed to sync bookmarks', e);
    }
  }, [savedIds]);

  const toggleBookmark = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectArticleById = (id: string) => {
    const found = getArticleById(id);
    if (found) {
      setActiveArticle(found);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  // Filter articles based on active category
  const filteredArticles =
    selectedCategory === 'all'
      ? ALL_ARTICLES
      : ALL_ARTICLES.filter((a) => a.categoryId === selectedCategory);

  // Lead featured story (e.g. Best Flagship Smartphones 2026)
  const leadArticle = ALL_ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#081c18] text-slate-100 flex flex-col font-sans selection:bg-[#ffd700] selection:text-black">
      {/* 1. Navigation Bar */}
      <Navbar
        currentCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenPage={(page) => setActivePage(page)}
        savedCount={savedIds.length}
        onOpenBookmarks={() => setBookmarksOpen(true)}
      />

      {/* 2. Continuous Ticker Tape directly underneath main header */}
      <TickerTape onSelectArticle={handleSelectArticleById} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
        {/* Hero Marquee Section (Lead Investigation) */}
        {selectedCategory === 'all' && (
          <section className="relative rounded-2xl border border-[#5fdee7]/30 bg-gradient-to-br from-[#0b2721] to-[#081c18] overflow-hidden p-6 sm:p-8 lg:p-10 shadow-2xl">
            {/* Background High-Tech Grid */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#5fdee7 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#ffd700]">
                  <Sparkles className="w-4 h-4 text-[#ffd700]" />
                  <span className="font-bold tracking-widest uppercase">
                    FEATURED PEER-REVIEWED INVESTIGATION
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">VOL. XXIV — ISSUE 10</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {leadArticle.title}
                </h1>

                <p className="text-xs sm:text-sm font-mono text-[#5fdee7] uppercase tracking-wide">
                  {leadArticle.subtitle}
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
                  {leadArticle.leadSummary}
                </p>

                {/* Unboxed Metadata Line */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-white font-semibold">{leadArticle.author.name}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{leadArticle.readTime}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{leadArticle.publishDate}</span>
                </div>

                {/* Primary CTA Button */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    onClick={() => setActiveArticle(leadArticle)}
                    className="tech-hover-btn px-5 py-2.5 rounded-xl border border-[#5fdee7] bg-[#5fdee7] text-[#081c18] font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg"
                  >
                    <span>Read Full 1200+ Word Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleBookmark(leadArticle.id)}
                    className="tech-hover-item px-4 py-2.5 rounded-xl border border-[#5fdee7]/30 bg-[#0b2721] text-xs font-mono text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700] transition-colors"
                  >
                    {savedIds.includes(leadArticle.id) ? 'Saved' : 'Save to Vault'}
                  </button>
                </div>
              </div>

              {/* Visual Right Column (Hero Infographic) */}
              <div
                onClick={() => setActiveArticle(leadArticle)}
                className="lg:col-span-5 cursor-pointer group rounded-xl overflow-hidden border border-[#5fdee7]/30 bg-[#0a1624] hover:border-[#ffd700] transition-all duration-300"
              >
                <img
                  src="/src/assets/images/hero_flagship_infographic_1792653207089.jpg"
                  alt="Best Flagship Smartphones 2026 Infographic"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-3 bg-[#0b2721] border-t border-[#5fdee7]/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-[#ffd700] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    Interactive 6-Panel Hardware Map
                  </span>
                  <span>Click to Expand</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Header & Filter Bar */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5fdee7]">
                <Filter className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider font-bold">DISPATCH CATALOG</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                {selectedCategory === 'all'
                  ? 'Latest Peer-Reviewed Articles (20 Total)'
                  : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
              </h2>
            </div>

            <span className="text-xs font-mono text-slate-400">
              Showing {filteredArticles.length} Technical Papers
            </span>
          </div>

          {/* Segmented Category Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0b2721] rounded-xl border border-[#5fdee7]/20 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#ffd700] text-[#081c18] shadow-sm'
                  : 'text-slate-300 hover:text-[#ffd700]'
              }`}
            >
              All Feed (20)
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#ffd700] text-[#081c18] shadow-sm'
                    : 'text-slate-300 hover:text-[#ffd700]'
                }`}
              >
                {cat.name} ({cat.articleCount})
              </button>
            ))}
          </div>
        </section>

        {/* 20 Article Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={(art) => setActiveArticle(art)}
              isBookmarked={savedIds.includes(article.id)}
              onToggleBookmark={toggleBookmark}
              featured={selectedCategory === 'all' && (idx === 1 || idx === 6)}
            />
          ))}
        </section>

        {/* Newsletter / Dispatch Subscription Section */}
        <section className="rounded-2xl border border-[#ffd700]/40 bg-[#0b2721] p-6 sm:p-8 lg:p-10 space-y-4 shadow-xl">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-widest">
              PEER-REVIEWED JOURNAL SUBSCRIPTION
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Receive the technewscentrals Morning Engineering Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every weekday at 06:00 UTC, our senior editors deliver rigorous benchmark breakdowns, kernel patch reviews, and hardware schematics directly to your inbox. No sponsored clutter.
            </p>

            {newsletterSubscribed ? (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscription authenticated. You will receive tomorrow’s engineering dispatch.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  required
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="engineer@domain.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#081c18] border border-white/20 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700]"
                />
                <button
                  type="submit"
                  className="tech-hover-btn px-5 py-2.5 rounded-xl bg-[#ffd700] text-[#081c18] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe</span>
                </button>
              </form>
            )}

            <p className="text-[10px] font-mono text-slate-500 pt-1">
              Zero third-party trackers. Instant 1-click unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenPage={(page) => setActivePage(page)}
      />

      {/* Long-Form Reading Modal */}
      {activeArticle && (
        <ArticleDetailModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          onSelectRelated={(related) => setActiveArticle(related)}
          isBookmarked={savedIds.includes(activeArticle.id)}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {/* Search Modal */}
      {searchOpen && (
        <SearchModal
          onClose={() => setSearchOpen(false)}
          onSelectArticle={(article) => setActiveArticle(article)}
        />
      )}

      {/* Bookmarks Modal */}
      {bookmarksOpen && (
        <BookmarksModal
          savedIds={savedIds}
          onClose={() => setBookmarksOpen(false)}
          onSelectArticle={(article) => setActiveArticle(article)}
          onRemoveBookmark={toggleBookmark}
          onClearAll={() => setSavedIds([])}
        />
      )}

      {/* Dedicated Pages Modal (About, Editors, Standards, Contact, Privacy, Terms) */}
      {activePage && (
        <PagesModal
          page={activePage}
          onClose={() => setActivePage(null)}
          onSwitchPage={(page) => setActivePage(page)}
        />
      )}

      {/* GDPR Cookie Consent Banner */}
      <CookieConsent onOpenPrivacy={() => setActivePage('privacy')} />
    </div>
  );
}
