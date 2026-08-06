import React, { useState } from 'react';
import { ChevronDown, Send, Info, MessageCircle, Sparkles, Search, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SUPPLEMENT_ENCYCLOPEDIA, SupplementData } from '../data/supplementEncyclopediaData';
import { SupplementInfoModal } from './SupplementInfoModal';

interface SupplementsEncyclopediaProps {
  lang: Language;
  onAnalyzeSupp: (suppName: string) => void;
  onAskNutrientExpert: (sectionTitle: string, query: string) => Promise<string>;
}

export const SupplementsEncyclopedia: React.FC<SupplementsEncyclopediaProps> = ({
  lang,
  onAnalyzeSupp,
  onAskNutrientExpert
}) => {
  const [expandedSection, setExpandedSection] = useState<'essential' | 'non-essential' | 'conditional' | null>(null);
  const [selectedSupplement, setSelectedSupplement] = useState<SupplementData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const alignClass = isRtl ? 'text-right' : 'text-left';

  const labels = {
    ar: {
      searchPlaceholder: 'ابحث عن أي مكمل غذائي (مثل: كرياتين، سيترولين، أوميجا...)...',
      clickToView: 'انقر لعرض الدليل العلمي المباشر 📖',
      allSuppsHeader: 'الموسوعة الشاملة للمكملات الرياضية والغذائية (16 مكمل رئيسي)',
      subtitle: 'اختر أي مكمل أدناه لقراءة الشرح الفسيولوجي الكامل، الفوائد، الجرعات الموصى بها، والتركيبات المكملة'
    },
    en: {
      searchPlaceholder: 'Search any supplement (e.g., Creatine, Citrulline, Omega...)...',
      clickToView: 'Click for instant scientific breakdown 📖',
      allSuppsHeader: 'Complete Sports & Health Supplements Encyclopedia (16 Main Supplements)',
      subtitle: 'Select any supplement below for immediate access to pre-written scientific benefits, dosages, & timing'
    },
    rw: {
      searchPlaceholder: 'Shakisha inyunganiramatsiko (Creatine, Citrulline, Omega...)...',
      clickToView: 'Kanda usome ibisobanuro birambuye 📖',
      allSuppsHeader: 'Inkoranyanyandiko y\'Inyunganiramatsiko (16 Inyunganiramatsiko)',
      subtitle: 'Hitamo inyunganiramatsiko wifuza kusoma ibiyerekeye'
    }
  }[lang] || {
    searchPlaceholder: 'Search any supplement...',
    clickToView: 'Click for scientific breakdown 📖',
    allSuppsHeader: 'Complete Supplements Encyclopedia',
    subtitle: 'Select any supplement below for immediate access'
  };

  const filteredSupplements = SUPPLEMENT_ENCYCLOPEDIA.filter((supp) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const name = (supp.name[lang] || supp.name.ar).toLowerCase();
    const category = (supp.category[lang] || supp.category.ar).toLowerCase();
    const summary = (supp.summary[lang] || supp.summary.ar).toLowerCase();
    return name.includes(term) || category.includes(term) || summary.includes(term);
  });

  const handleAskExpert = async (sectionTitle: string) => {
    if (!query.trim()) return;
    setIsQuerying(true);
    setResponse('');
    try {
      const answer = await onAskNutrientExpert(sectionTitle, query);
      setResponse(answer);
    } catch (e) {
      setResponse(isRtl ? 'حدث خطأ في الاتصال بالخبير.' : 'Error contacting expert.');
    } finally {
      setIsQuerying(false);
      setQuery('');
    }
  };

  const formatText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const cleaned = line.replace(/(\*|\#)/g, '').trim();
      if (!cleaned) return <br key={i} />;
      return <p key={i} className="mb-2 font-medium text-slate-200 text-sm leading-relaxed">{cleaned}</p>;
    });
  };

  const renderNutrientChatBox = (sectionTitle: string) => (
    <div className="mt-8 p-6 bg-slate-950/80 rounded-2xl border border-slate-800">
      <h5 className="font-black text-white mb-3 flex items-center gap-2 text-sm">
        <MessageCircle size={18} className="text-blue-400" />
        <span>{t.nutrient_chat_title}</span>
      </h5>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={3}
        className="w-full p-4 bg-slate-900 rounded-xl border border-slate-800 focus:border-blue-500 text-slate-200 text-sm font-medium outline-none transition mb-3"
        placeholder={t.nutrient_chat_placeholder}
      />
      <button
        onClick={() => handleAskExpert(sectionTitle)}
        disabled={isQuerying || !query.trim()}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
      >
        {isQuerying ? <span className="animate-pulse">Thinking...</span> : <><Send size={15}/> {t.nutrient_chat_btn}</>}
      </button>

      {response && !isQuerying && (
        <div className="mt-4 p-5 bg-slate-900 rounded-xl border border-blue-900/60 text-slate-200 text-sm leading-relaxed">
          <div className="flex items-center gap-2 mb-2 text-blue-400 font-black text-xs uppercase">
            <Info size={16} /> {isRtl ? 'إجابة الخبير العلمية:' : 'Expert Scientific Answer:'}
          </div>
          {formatText(response)}
        </div>
      )}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto space-y-12 animate-fade-in" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/80 px-4 py-1.5 rounded-full text-xs font-black text-blue-400">
          <BookOpen size={16} />
          <span>{labels.allSuppsHeader}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">{t.supps_title}</h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">{labels.subtitle}</p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className={`absolute top-3.5 text-slate-500 ${isRtl ? 'right-4' : 'left-4'}`} size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={labels.searchPlaceholder}
          className={`w-full py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-200 text-sm font-medium outline-none focus:border-blue-500 transition shadow-lg ${
            isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
          }`}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className={`absolute top-3.5 text-xs text-slate-400 hover:text-white ${isRtl ? 'left-4' : 'right-4'}`}
          >
            ✕
          </button>
        )}
      </div>

      {/* Expanded Interactive Supplements Grid (16 Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSupplements.map((supp) => {
          const name = supp.name[lang] || supp.name.ar;
          const category = supp.category[lang] || supp.category.ar;
          const subtitle = supp.subtitle[lang] || supp.subtitle.ar;

          return (
            <div
              key={supp.id}
              onClick={() => setSelectedSupplement(supp)}
              className={`p-5 bg-slate-900 border ${supp.borderColor} rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {supp.emoji}
                  </span>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${supp.badgeColor}`}>
                    {category}
                  </span>
                </div>

                <div>
                  <h3 className={`font-black text-base text-white group-hover:${supp.textColor} transition-colors line-clamp-1`}>
                    {name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1 line-clamp-2 leading-relaxed">
                    {subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-extrabold text-blue-400 group-hover:text-emerald-400 transition-colors">
                <span>{labels.clickToView}</span>
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Comprehensive Pre-written Supplement Modal */}
      <SupplementInfoModal
        supplement={selectedSupplement}
        lang={lang}
        onClose={() => setSelectedSupplement(null)}
        onAskAI={(suppName) => onAnalyzeSupp(suppName)}
      />

      {/* Deep Nutrient Breakdown Accordion */}
      <div className="space-y-6 bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="text-center space-y-2 mb-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
            {t.nutrients_title}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> {t.nutrients_legend_essential}</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-500 rounded-full" /> {t.nutrients_legend_non}</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-rose-500 rounded-full" /> {t.nutrients_legend_cond}</span>
          </div>
        </div>

        {/* Section 1: Essential */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setExpandedSection(expandedSection === 'essential' ? null : 'essential')}
            className="w-full flex items-center justify-between p-6 bg-emerald-950/40 hover:bg-emerald-950/60 transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">🟩</span>
              <div className={alignClass}>
                <h4 className="font-black text-emerald-400 text-lg">{t.ess_title}</h4>
                <p className="text-xs font-semibold text-slate-400">{t.ess_sub}</p>
              </div>
            </div>
            <ChevronDown className={`transition-transform duration-300 text-emerald-400 ${expandedSection === 'essential' ? 'rotate-180' : ''}`} />
          </button>

          {expandedSection === 'essential' && (
            <div className={`p-6 sm:p-8 space-y-6 ${alignClass}`}>
              <p className="text-sm font-medium text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {t.ess_desc}
              </p>

              <div>
                <h5 className="font-black text-emerald-400 text-sm uppercase mb-3">{t.ess_macro_title}</h5>
                <div className="grid sm:grid-cols-2 gap-4">
                  {t.ess_macros_list.map((m: any, i: number) => (
                    <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <h6 className="font-black text-white text-sm mb-1">{m.name}</h6>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-black text-emerald-400 text-sm uppercase mb-3">{t.ess_amino_title}</h5>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {t.amino_list_detailed.map((item: any, i: number) => (
                    <div key={i} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                      <span className="font-black text-emerald-400 text-xs block mb-1">{item.name}</span>
                      <span className="text-xs text-slate-400 font-medium leading-relaxed block">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {renderNutrientChatBox(t.ess_title)}
            </div>
          )}
        </div>

        {/* Section 2: Non-Essential */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setExpandedSection(expandedSection === 'non-essential' ? null : 'non-essential')}
            className="w-full flex items-center justify-between p-6 bg-blue-950/40 hover:bg-blue-950/60 transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">🟦</span>
              <div className={alignClass}>
                <h4 className="font-black text-blue-400 text-lg">{t.non_title}</h4>
                <p className="text-xs font-semibold text-slate-400">{t.non_sub}</p>
              </div>
            </div>
            <ChevronDown className={`transition-transform duration-300 text-blue-400 ${expandedSection === 'non-essential' ? 'rotate-180' : ''}`} />
          </button>

          {expandedSection === 'non-essential' && (
            <div className={`p-6 sm:p-8 space-y-6 ${alignClass}`}>
              <p className="text-sm font-medium text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {t.non_desc}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {t.non_list_detailed.map((item: any, i: number) => (
                  <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h6 className="font-black text-white text-sm mb-1">{item.name}</h6>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {renderNutrientChatBox(t.non_title)}
            </div>
          )}
        </div>

        {/* Section 3: Conditional */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setExpandedSection(expandedSection === 'conditional' ? null : 'conditional')}
            className="w-full flex items-center justify-between p-6 bg-rose-950/40 hover:bg-rose-950/60 transition"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">🟥</span>
              <div className={alignClass}>
                <h4 className="font-black text-rose-400 text-lg">{t.cond_title}</h4>
                <p className="text-xs font-semibold text-slate-400">{t.cond_sub}</p>
              </div>
            </div>
            <ChevronDown className={`transition-transform duration-300 text-rose-400 ${expandedSection === 'conditional' ? 'rotate-180' : ''}`} />
          </button>

          {expandedSection === 'conditional' && (
            <div className={`p-6 sm:p-8 space-y-6 ${alignClass}`}>
              <p className="text-sm font-medium text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                {t.cond_desc}
              </p>

              <div className="grid lg:grid-cols-3 gap-4">
                {t.cond_cats.map((cat: any, i: number) => (
                  <div key={i} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <h5 className={`font-black text-sm uppercase flex items-center gap-2 ${cat.color}`}>
                      <span>{cat.icon}</span>
                      <span>{cat.title}</span>
                    </h5>
                    <div className="space-y-2.5">
                      {cat.items.map((item: any, idx: number) => (
                        <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-850">
                          <span className={`font-black text-xs block mb-0.5 ${cat.color}`}>{item.name}</span>
                          <span className="text-[11px] text-slate-400 font-medium leading-relaxed block">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {renderNutrientChatBox(t.cond_title)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
