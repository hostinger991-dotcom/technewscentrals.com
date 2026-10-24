import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('technewscentrals_cookie_consent');
    if (!consent) {
      // Delay showing slightly for zero intrusive feel
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('technewscentrals_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('technewscentrals_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#201b05] border border-[#ffd700]/40 shadow-2xl backdrop-blur-xl text-slate-200 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00ff88] shrink-0" />
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              PRIVACY &amp; COOKIE CONSENT
            </h4>
          </div>
          <button
            onClick={handleDecline}
            className="text-slate-400 hover:text-white p-1"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          We use strictly essential technical telemetry and local storage to preserve your reading preferences, bookmarks, and font scale. We do not track you across external domains. Read our{' '}
          <button
            onClick={onOpenPrivacy}
            className="text-[#ffd700] underline hover:text-[#00ff88]"
          >
            Privacy Policy
          </button>
          .
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-1.5 px-3 bg-[#ffd700] hover:bg-[#00ff88] text-[#141204] font-mono text-xs font-bold uppercase rounded-lg transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="py-1.5 px-3 border border-yellow-500/20 hover:border-yellow-500/40 text-slate-300 hover:text-white font-mono text-xs rounded-lg transition-colors"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
};
