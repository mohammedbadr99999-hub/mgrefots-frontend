import React from 'react';
import { Mail, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-sm">
            MG
          </div>
          <span className="text-xl font-black text-white tracking-widest" dir="ltr">
            MGREFOTS LTD
          </span>
        </div>

        <p className="text-xs font-semibold text-slate-400 max-w-md mx-auto">
          {t.footer_tagline}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1.5" dir="ltr">
            <Mail size={15} className="text-blue-400" /> info@mgrefots.com
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="text-emerald-400" /> Kigali, Rwanda
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-amber-400" /> NASM Formulated
          </span>
        </div>

        <div className="pt-6 border-t border-slate-900 text-[11px] font-medium text-slate-500" dir="ltr">
          {t.footer_rights}
        </div>
      </div>
    </footer>
  );
};
