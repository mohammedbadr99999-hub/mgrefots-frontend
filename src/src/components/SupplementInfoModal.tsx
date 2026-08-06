import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Zap, Clock, ShieldCheck, Flame, Layers, Sparkles, MessageSquare } from 'lucide-react';
import { SupplementData } from '../data/supplementEncyclopediaData';
import { Language } from '../types';

interface SupplementInfoModalProps {
  supplement: SupplementData | null;
  lang: Language;
  onClose: () => void;
  onAskAI: (suppName: string) => void;
}

export const SupplementInfoModal: React.FC<SupplementInfoModalProps> = ({
  supplement,
  lang,
  onClose,
  onAskAI
}) => {
  useEffect(() => {
    if (supplement) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [supplement]);

  if (!supplement) return null;

  const isRtl = lang === 'ar';
  const alignClass = isRtl ? 'text-right' : 'text-left';

  const name = supplement.name[lang] || supplement.name.ar;
  const subtitle = supplement.subtitle[lang] || supplement.subtitle.ar;
  const summary = supplement.summary[lang] || supplement.summary.ar;
  const category = supplement.category[lang] || supplement.category.ar;
  const benefits = supplement.benefits[lang] || supplement.benefits.ar;
  const mechanism = supplement.mechanism[lang] || supplement.mechanism.ar;
  const dosage = supplement.dosage[lang] || supplement.dosage.ar;
  const bestFor = supplement.bestFor[lang] || supplement.bestFor.ar;
  const synergies = supplement.synergies[lang] || supplement.synergies.ar;
  const safetyNote = supplement.safetyNote[lang] || supplement.safetyNote.ar;

  const labels = {
    ar: {
      benefitsTitle: 'الفوائد الرئيسية والمثبتة علمياً',
      mechanismTitle: 'كيف يعمل المكمل داخل الجسم؟ (الآلية الفسيولوجية)',
      dosageTitle: 'الجرعة الموصى بها والتوقيت الأمثل (NASM Guide)',
      bestForTitle: 'الفئات المستهدفة والرياضيون',
      synergiesTitle: 'المكملات المتوافقة لخلطة تآزرية (Synergistic Stack)',
      safetyTitle: 'ملاحظة الأمان وتوصيات سلامة الاستخدام',
      askAiBtn: 'اسأل خبير الذكاء الاصطناعي تفاصيل أكثر عن هذا المكمل',
      closeBtn: 'إغلاق'
    },
    en: {
      benefitsTitle: 'Clinically Proven Key Benefits',
      mechanismTitle: 'Physiological Mechanism of Action',
      dosageTitle: 'Recommended Dosage & Optimal Timing (NASM Guide)',
      bestForTitle: 'Target Athletes & Best Suited For',
      synergiesTitle: 'Synergistic Stacks & Combinations',
      safetyTitle: 'Safety Guidelines & Research Notes',
      askAiBtn: 'Ask AI Expert Further Custom Questions',
      closeBtn: 'Close'
    },
    rw: {
      benefitsTitle: "Inyungu Z'ingenzi Zizewe",
      mechanismTitle: "Uburyo Ikora Muri Cell y'Umubiri",
      dosageTitle: "Icyipimo n'Igihe cyo Gukoresha (NASM Guide)",
      bestForTitle: "Abantu Bateganijwe Gukoresha",
      synergiesTitle: "Mvange na Ibindi Bikorana Neza",
      safetyTitle: "Amabwiriza y'Ubuziranenge n'Umutekano",
      askAiBtn: "Baza AI Expert Ibibazo Byo Gukoresha",
      closeBtn: "Funga"
    }
  }[lang] || {
    benefitsTitle: 'Clinically Proven Key Benefits',
    mechanismTitle: 'Physiological Mechanism of Action',
    dosageTitle: 'Recommended Dosage & Optimal Timing',
    bestForTitle: 'Target Athletes',
    synergiesTitle: 'Synergistic Stacks',
    safetyTitle: 'Safety Guidelines',
    askAiBtn: 'Ask AI Expert',
    closeBtn: 'Close'
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        dir={isRtl ? 'rtl' : 'ltr'}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-black border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0">
              {supplement.emoji}
            </div>
            <div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black uppercase mb-2 border shadow-sm ${supplement.badgeColor}`}>
                <Sparkles size={12} />
                <span>{category}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">
                {subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-slate-200">
          
          {/* Summary Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm leading-relaxed text-slate-300 font-medium">
            {summary}
          </div>

          {/* Key Benefits */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{labels.benefitsTitle}</span>
            </h4>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {benefits.map((b, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-850 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mechanism & Dosage Split */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Mechanism */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-850 space-y-2">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Flame size={15} />
                <span>{labels.mechanismTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                {mechanism}
              </p>
            </div>

            {/* Dosage & Timing */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-850 space-y-2">
              <h4 className="text-xs font-black text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Clock size={15} />
                <span>{labels.dosageTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                {dosage}
              </p>
            </div>
          </div>

          {/* Best For & Synergies */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Best For */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-850 space-y-2">
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Zap size={15} />
                <span>{labels.bestForTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                {bestFor}
              </p>
            </div>

            {/* Synergies */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-850 space-y-2">
              <h4 className="text-xs font-black text-purple-400 uppercase tracking-wider flex items-center gap-2">
                <Layers size={15} />
                <span>{labels.synergiesTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                {synergies}
              </p>
            </div>
          </div>

          {/* Safety & Research Note */}
          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-900/50 space-y-1.5">
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>{labels.safetyTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
              {safetyNote}
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAI(name);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageSquare size={16} />
            <span>{labels.askAiBtn}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase transition"
          >
            {labels.closeBtn}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
