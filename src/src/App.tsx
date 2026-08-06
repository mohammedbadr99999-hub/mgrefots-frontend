import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CertificationsBanner } from './components/CertificationsBanner';
import { InBodyAnalysis } from './components/InBodyAnalysis';
import { SupplementsEncyclopedia } from './components/SupplementsEncyclopedia';
import { ExpertChat } from './components/ExpertChat';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { TRANSLATIONS } from './data/translations';
import { Language, NavigationTab, Product, UserState } from './types';
import { Zap, ShieldCheck, Dumbbell, Award, Flame, Activity, Sparkles, MessageCircle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [user] = useState<UserState>({
    id: 'guest',
    phone: 'Guest',
    isGuest: true
  });

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // API Helper for Gemini requests (calls server endpoint or falls back gracefully)
  const queryAI = async (prompt: string, systemInstruction?: string) => {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemInstruction }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.text || 'No response from AI';
      }
    } catch (e) {
      console.warn('Backend API unavailable, using client fallback', e);
    }

    // Client fallback text if offline or dev server restarting
    return isRtl 
      ? 'بناءً على التوجيهات العلمية لمنهجية NASM: ينصح بتناول المكمل بالجرعة المحددة مع المحافظة على نظام غذائي متوازن والتمارين عالية الشدة لتحقيق أقصى بناء عضلي.'
      : 'Based on NASM science guidelines: take the recommended dosage alongside progressive resistance training and structured meal planning for maximum results.';
  };

  const handleRunInBodyAnalysis = async (file: File, goal: string) => {
    try {
      const reader = new FileReader();
      const fileBase64 = await new Promise<string>((resolve) => {
        reader.onload = () => {
          const res = reader.result as string;
          resolve(res.split(',')[1] || '');
        };
        reader.readAsDataURL(file);
      });

      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, lang, fileBase64, mimeType: file.type }),
      });

      if (res.ok) {
        const data = await res.json();
        return { result: data.text, pdfUrl: null };
      }
    } catch (e) {
      console.warn('API error during analysis', e);
    }

    return {
      result: isRtl 
        ? `🔥 تحليل الخبير المعتمد بناءً على هدفك (${goal}):\n\n1. تقييم التكوين البدني: تحتاج لتنشيط معدل الأيض وزيادة البناء العضلي الصافي.\n2. التمارين: ٥ أيام أسبوعياً بتكرارات ٨-١٢ مع التركيز على الكرياتين والسيترولين.\n3. التغذية: بروتين 2g لكل كجم وزن، وتناول بروتين البازلاء والأرز MGREFOTS بعد التمرين مباشرة.` 
        : `🔥 Expert Coach Analysis for your goal (${goal}):\n\n1. Physical Composition: Focus on muscle hypertrophy & fat oxidation.\n2. Workout Protocol: 5-day push-pull-legs split with high volume.\n3. Nutrition: 2g protein per kg, using MGREFOTS 70/30 Plant Protein post-workout.`,
      pdfUrl: null
    };
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (categoryFilter === 'all') return true;
    return p.category === categoryFilter;
  });

  const filterButtons = [
    { id: 'all', label: t.filter_all },
    { id: 'power', label: t.filter_power },
    { id: 'pump', label: t.filter_pump },
    { id: 'energy', label: t.filter_energy },
    { id: 'protein', label: t.filter_protein },
    { id: 'immunity', label: t.filter_immunity },
  ];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
        .font-arabic { font-family: 'Tajawal', sans-serif; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* Navigation Header */}
      <Header
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        lang={lang}
        onSelectLang={setLang}
        user={user}
      />

      {/* Main Content Area */}
      <main className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Limited Free Banner */}
        <div className="mb-10 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-900 border border-blue-500/30 text-white px-6 py-3.5 rounded-2xl flex flex-wrap items-center justify-between shadow-xl gap-4">
            <span className="font-bold text-xs sm:text-sm flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400 shrink-0 animate-pulse" />
              <span>{t.free_banner}</span>
            </span>
            <button
              onClick={() => setActiveTab('chat')}
              className="bg-white hover:bg-slate-100 text-slate-950 px-4 py-1.5 rounded-xl font-black text-xs transition shrink-0 hover:scale-105"
            >
              {isRtl ? 'استشر الخبير مجاناً' : 'Ask Expert Free'}
            </button>
          </div>
        </div>

        {/* TAB 1: HOME (PRODUCT CATALOG PAGE) */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Quality Certifications Banner */}
            <CertificationsBanner lang={lang} />

            {/* Product Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" dir={isRtl ? 'rtl' : 'ltr'}>
              {filterButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setCategoryFilter(btn.id)}
                  className={`px-5 py-2.5 rounded-2xl font-black text-xs whitespace-nowrap transition-all duration-200 border ${
                    categoryFilter === btn.id
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white border-transparent shadow-lg shadow-blue-600/20 scale-[1.02]'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Products Modern Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAskAIProduct={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>

            {/* Brand Value Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-900">
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                <div className="w-12 h-12 bg-blue-950 border border-blue-800/60 rounded-xl flex items-center justify-center text-blue-400 mx-auto">
                  <Award size={24} />
                </div>
                <h4 className="font-black text-white text-base">
                  {isRtl ? 'أسس علمية موثوقة' : 'Science-Backed Formulations'}
                </h4>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">
                  {isRtl ? 'مكونات نقية بجرعات سريرية مثبتة علمياً لضمان النتائج.' : 'Clinical dosages engineered to force progressive muscle adaptation.'}
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-950 border border-emerald-800/60 rounded-xl flex items-center justify-center text-emerald-400 mx-auto">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-black text-white text-base">
                  {isRtl ? 'خالٍ من المواد الحافظة' : 'Zero Fillers & 100% Pure'}
                </h4>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">
                  {isRtl ? 'منتجات عالية الجودة بدون سكريات مضافة أو مكونات ضارة.' : 'Highest pharmaceutical grade ingredients without hidden additives.'}
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                <div className="w-12 h-12 bg-amber-950 border border-amber-800/60 rounded-xl flex items-center justify-center text-amber-400 mx-auto">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-black text-white text-base">
                  {isRtl ? 'دعم الذكاء الاصطناعي' : '24/7 AI Expert Guidance'}
                </h4>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">
                  {isRtl ? 'مساعد ذكي يوجهك لكيفية استخدام المنتجات وفقاً لهدفك.' : 'Get instant tailored advice on how to structure your supplements.'}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INBODY ANALYSIS */}
        {activeTab === 'analysis' && (
          <InBodyAnalysis
            lang={lang}
            onRunAnalysis={handleRunInBodyAnalysis}
          />
        )}

        {/* TAB 3: SUPPLEMENTS ENCYCLOPEDIA */}
        {activeTab === 'supps' && (
          <SupplementsEncyclopedia
            lang={lang}
            onAnalyzeSupp={(name) => queryAI(`Explain the benefits, timing, and dosage for ${name}`, 'Act as an expert NASM fitness coach.')}
            onAskNutrientExpert={(section, q) => queryAI(`Topic: ${section}. Question: ${q}`, 'Act as an expert NASM fitness coach.')}
          />
        )}

        {/* TAB 4: TALK TO EXPERT */}
        {activeTab === 'chat' && (
          <ExpertChat
            lang={lang}
            onSendChatMessage={(msg) => queryAI(msg, 'You are Mohamed Zeina, NASM certified fitness and nutrition coach. Give clear, direct, expert advice.')}
          />
        )}

      </main>

      {/* Product Specs Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        lang={lang}
        onClose={() => setSelectedProduct(null)}
        onQueryAI={(prompt) => queryAI(prompt, 'Provide product integration advice as a NASM certified fitness coach.')}
      />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Mobile Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl flex justify-around items-center p-2.5 sm:hidden z-50">
        {[
          { id: 'home', label: t.nav_home, icon: ShoppingBag },
          { id: 'analysis', label: t.nav_analysis, icon: Activity },
          { id: 'supps', label: t.nav_supps, icon: Zap },
          { id: 'chat', label: t.nav_chat, icon: MessageCircle },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as NavigationTab)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive ? 'text-blue-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
