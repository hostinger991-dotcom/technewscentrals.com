import React, { useState } from 'react';
import { AUTHORS } from '../data/authors';
import {
  X,
  Phone,
  Mail,
  Shield,
  FileText,
  Users,
  CheckCircle2,
  Building,
  Send,
} from 'lucide-react';

export type PageViewType = 'about' | 'contact' | 'editors' | 'standards' | 'privacy' | 'terms';

interface PagesModalProps {
  page: PageViewType;
  onClose: () => void;
  onSwitchPage: (page: PageViewType) => void;
}

export const PagesModal: React.FC<PagesModalProps> = ({ page, onClose, onSwitchPage }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-[#141204] border border-[#ffd700]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Ribbon inside modal */}
        <div className="shrink-0 px-4 sm:px-6 py-3 border-b border-[#ffd700]/20 bg-[#201b05] flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase">
            <button
              onClick={() => onSwitchPage('about')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                page === 'about'
                  ? 'bg-[#ffd700] text-[#141204]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </button>
            <button
              onClick={() => onSwitchPage('editors')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                page === 'editors'
                  ? 'bg-[#ffd700] text-[#141204]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Editors
            </button>
            <button
              onClick={() => onSwitchPage('standards')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                page === 'standards'
                  ? 'bg-[#ffd700] text-[#141204]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Editorial Standards
            </button>
            <button
              onClick={() => onSwitchPage('contact')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                page === 'contact'
                  ? 'bg-[#ffd700] text-[#141204]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => onSwitchPage('privacy')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                page === 'privacy'
                  ? 'bg-[#ffd700] text-[#141204]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onSwitchPage('terms')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                page === 'terms'
                  ? 'bg-[#ffd700] text-[#141204]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Terms
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-3xl mx-auto w-full text-slate-300">
          {page === 'about' && (
            <div className="space-y-6">
              <div className="border-b border-yellow-500/15 pb-4">
                <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider">
                  INSTITUTIONAL PROFILE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  About technewscentrals
                </h2>
                <p className="text-sm font-mono text-[#ffd700] mt-1">
                  ENGINEERING &amp; CONSUMER TECH JOURNAL — PUBLISHED DAILY
                </p>
              </div>

              <p className="text-sm sm:text-base leading-relaxed">
                Founded in 2026, <strong>technewscentrals</strong> is an independent digital publication dedicated to peer-reviewed technical journalism. We bridge the gap between speculative consumer hype and rigorous silicon, software, and systems engineering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-yellow-500/20 bg-[#201b05]">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-[#ffd700]" />
                    Hardware Testing Laboratory
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Our evaluations utilize calibrated thermal imaging, precision digital power analyzers, RF anechoic testing, and automated oscilloscope packet tracing.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-yellow-500/20 bg-[#201b05]">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#00ff88]" />
                    Uncompromising Editorial Integrity
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We accept zero payment for product reviews or score placements. All hardware units are purchased at standard retail or documented under strict loaner agreements.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-[#ffd700]/30 bg-[#201b05]/60 space-y-2">
                <h4 className="text-xs font-mono font-bold text-[#ffd700] uppercase">
                  OUR CORE PILLARS OF INVESTIGATION
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li>• <strong>Consumer Electronics &amp; Mobile Tech:</strong> Silicon nodes, battery chemistries, and periscope optical acoustics.</li>
                  <li>• <strong>Artificial Intelligence &amp; Future Tech:</strong> Foundation transformers, compiler graphs, and humanoid kinematics.</li>
                  <li>• <strong>Cybersecurity &amp; Software:</strong> Post-quantum cryptography, memory-safe kernels, and zero-knowledge vaults.</li>
                  <li>• <strong>Smart Home &amp; Enterprise Hardware:</strong> Thread mesh networks, PCIe 5.0 interconnects, and thermodynamic inverters.</li>
                </ul>
              </div>
            </div>
          )}

          {page === 'editors' && (
            <div className="space-y-6">
              <div className="border-b border-yellow-500/15 pb-4">
                <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider">
                  EDITORIAL MASTHEAD
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Editorial Board &amp; Senior Fellows
                </h2>
                <p className="text-xs font-mono text-yellow-500/70 mt-1">
                  Engineers, cryptographers, and systems researchers leading technewscentrals investigations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(AUTHORS).map((author, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-yellow-500/15 bg-[#201b05] space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#141204] border border-[#ffd700] flex items-center justify-center font-mono font-black text-base text-[#ffd700] shrink-0">
                        {author.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{author.name}</h4>
                        <p className="text-[11px] font-mono text-[#00ff88]">{author.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{author.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === 'standards' && (
            <div className="space-y-6">
              <div className="border-b border-yellow-500/15 pb-4">
                <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider">
                  CODE OF CONDUCT &amp; PROTOCOL
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Editorial Standards &amp; Peer Review Policy
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div>
                  <h4 className="text-white font-bold text-base mb-1">1. Peer Review Verification</h4>
                  <p>
                    Every hardware benchmark matrix published on technewscentrals is independently replicated across at least two testing rigs to verify frametimes, power draws, and acoustic metrics. Anomalies exceeding 3% margin of error trigger an automatic re-test before publication.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-base mb-1">2. Commercial Separation &amp; AdSense Compliance</h4>
                  <p>
                    The editorial department operates with absolute independence from advertising networks and sponsors. Advertising placements have zero influence over article inclusion, verdicts, or benchmark methodologies.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-base mb-1">3. Transparent Corrections</h4>
                  <p>
                    When substantive factual errors occur, we promptly issue a dated correction notice at the head of the article detailing the modification, maintaining complete archival transparency.
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'contact' && (
            <div className="space-y-6">
              <div className="border-b border-yellow-500/15 pb-4">
                <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider">
                  DIRECT ACCESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Contact Editorial Newsroom
                </h2>
                <p className="text-xs font-mono text-yellow-500/70 mt-1">
                  Official newsroom coordinates, hardware review submissions, and cryptographic leak hotlines.
                </p>
              </div>

              {/* Official Verified Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border-2 border-[#ffd700] bg-[#201b05] flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#141204] border border-[#ffd700] text-[#ffd700]">
                    <Phone className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-yellow-500/70 block">
                      PHONE &amp; WHATSAPP
                    </span>
                    <a
                      href="tel:03069256639"
                      className="text-base font-mono font-bold text-white hover:text-[#00ff88] transition-colors"
                    >
                      03069256639
                    </a>
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      Direct Newsroom &amp; Editorial Line
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-[#ffd700] bg-[#201b05] flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-[#141204] border border-[#ffd700] text-[#ffd700]">
                    <Mail className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-yellow-500/70 block">
                      OFFICIAL EDITORIAL EMAIL
                    </span>
                    <a
                      href="mailto:sagheerofficial21dnb@gmail.com"
                      className="text-sm sm:text-base font-mono font-bold text-white hover:text-[#00ff88] transition-colors truncate block"
                    >
                      sagheerofficial21dnb@gmail.com
                    </a>
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      Review units, pitches &amp; corrections
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <div className="p-5 rounded-xl border border-yellow-500/15 bg-[#201b05]">
                <h4 className="text-sm font-bold text-white mb-3">Send Editorial Dispatch</h4>
                {formSubmitted ? (
                  <div className="p-4 rounded-lg bg-emerald-950/60 border border-[#00ff88]/40 text-[#00ff88] flex items-center gap-2 text-xs font-mono">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                    <span>Your dispatch has been transmitted to the editorial newsroom desk.</span>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-yellow-500/80 mb-1">YOUR NAME</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#141204] border border-yellow-500/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                          placeholder="Dr. Jordan Hayes"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-yellow-500/80 mb-1">YOUR EMAIL</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#141204] border border-yellow-500/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                          placeholder="jordan@research.edu"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-yellow-500/80 mb-1">SUBJECT / TOPIC</label>
                      <input
                        required
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#141204] border border-yellow-500/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                        placeholder="Hardware Benchmark Re-Evaluation Request"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-yellow-500/80 mb-1">DISPATCH MESSAGE</label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#141204] border border-yellow-500/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                        placeholder="Enter your technical inquiry or review unit proposal..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#ffd700] hover:bg-[#00ff88] text-[#141204] text-xs font-mono font-bold uppercase rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Transmit Dispatch
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {page === 'privacy' && (
            <div className="space-y-5 text-xs sm:text-sm leading-relaxed">
              <div className="border-b border-yellow-500/15 pb-4">
                <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider">
                  LEGAL &amp; GDPR COMPLIANCE
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  Privacy Policy &amp; Cookie Notice
                </h2>
                <p className="text-xs font-mono text-yellow-500/70 mt-1">Last Updated: October 2026</p>
              </div>

              <p>
                At <strong>technewscentrals</strong>, we value reader sovereignty. We do not sell your personal data to commercial data brokers, and our platform operates with strict GDPR, CCPA, and ePrivacy compliance.
              </p>

              <div>
                <h4 className="text-white font-bold mb-1">1. Information We Collect</h4>
                <p>
                  We collect strictly necessary analytics metrics (page load latencies, referrer origins, and anonymized device screen sizes) to guarantee fast zero-lag content delivery. We do not perform cross-site tracking or canvas fingerprinting.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-1">2. Local Storage</h4>
                <p>
                  Saved articles (Reading Vault) and cookie preferences are saved locally on your device via browser LocalStorage and never transmitted to external servers without explicit consent.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-1">3. Privacy Officer Contact</h4>
                <p>
                  For data subject access requests or deletion inquiries, contact our Data Protection Officer at: <strong>sagheerofficial21dnb@gmail.com</strong> or call <strong>03069256639</strong>.
                </p>
              </div>
            </div>
          )}

          {page === 'terms' && (
            <div className="space-y-5 text-xs sm:text-sm leading-relaxed">
              <div className="border-b border-yellow-500/15 pb-4">
                <span className="text-xs font-mono font-bold text-[#ffd700] uppercase tracking-wider">
                  TERMS OF PUBLICATION
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  Terms &amp; Conditions
                </h2>
                <p className="text-xs font-mono text-yellow-500/70 mt-1">Effective: October 2026</p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-1">1. Intellectual Property &amp; Fair Use</h4>
                <p>
                  All articles, laboratory infographics, and benchmark matrices published on technewscentrals are copyright 2026 technewscentrals. Academic citation and short editorial excerpts are permitted under fair use provided explicit attribution and linkbacks are maintained.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-1">2. Disclaimer of Warranties</h4>
                <p>
                  Technical guides and system optimization procedures are tested on reference hardware. Users performing kernel modifications, driver reinstalls, or hardware overclocking assume full responsibility for their system configurations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
