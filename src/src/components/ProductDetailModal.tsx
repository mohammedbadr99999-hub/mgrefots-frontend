import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageSquare, Sparkles, Send, Clock, Beaker, FileText, Star, ShoppingCart, ThumbsUp, ShieldCheck, ListCheck } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  lang: Language;
  onClose: () => void;
  onQueryAI: (prompt: string) => Promise<string>;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  lang,
  onClose,
  onQueryAI
}) => {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [modalUserRating, setModalUserRating] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const name = product.name[lang] || product.name.en;
  const subtitle = product.subtitle[lang] || product.subtitle.en;
  const description = product.description[lang] || product.description.en;
  const usage = product.usage[lang] || product.usage.en;
  const ingredients = product.ingredients[lang] || product.ingredients.en;
  const otherIngredients = product.otherIngredients ? (product.otherIngredients[lang] || product.otherIngredients.en) : null;
  const science = product.scienceNote[lang] || product.scienceNote.en;
  const whatsappMsg = product.whatsappText[lang] || product.whatsappText.en;
  const whatsappUrl = `https://wa.me/250792294432?text=${encodeURIComponent(whatsappMsg)}`;

  const handleRateProduct = (score: number) => {
    setModalUserRating(score);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 4000);
  };

  const handleSendAiQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsLoadingAI(true);
    setAiResponse('');
    try {
      const prompt = `Product: ${name}. Question: ${aiQuestion}. Provide an expert, science-backed NASM response in ${lang === 'ar' ? 'Arabic' : lang === 'rw' ? 'Kinyarwanda' : 'English'}.`;
      const reply = await onQueryAI(prompt);
      setAiResponse(reply);
    } catch (err) {
      setAiResponse(isRtl ? 'حدث خطأ أثناء الاتصال بالمساعد الذكي.' : 'Error contacting AI assistant.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-800 hover:bg-red-500/20 hover:text-red-400 border border-slate-700 text-slate-400 flex items-center justify-center font-black transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full">
              {product.size} · {product.servings}
            </span>

            {/* Rating Pill */}
            <span className="text-xs font-black text-amber-400 bg-amber-950/80 border border-amber-800/80 px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={13} fill="currentColor" />
              <span>{product.rating.toFixed(1)} / 5.0</span>
            </span>

            {/* Buyers count */}
            <span className="text-xs font-extrabold text-blue-300 bg-blue-950/80 border border-blue-800/80 px-3 py-1 rounded-full flex items-center gap-1">
              <ShoppingCart size={13} />
              <span>{product.buyersCount.toLocaleString()} {isRtl ? 'مشتري' : 'buyers'}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            {name}
          </h2>
          <p className="text-sm font-semibold text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Customer Interactive Rating (1 to 10) */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-200 flex items-center gap-1.5">
              <ThumbsUp size={15} className="text-amber-400" />
              <span>{isRtl ? 'قيم هذا المنتج (من 1 إلى 10):' : 'Rate this product (1-10):'}</span>
            </span>
            {modalUserRating && (
              <span className="text-xs font-extrabold text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
                {modalUserRating}/10 ⭐
              </span>
            )}
          </div>

          <div className="grid grid-cols-10 gap-1.5" dir="ltr">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isSelected = modalUserRating === num;
              return (
                <button
                  key={num}
                  onClick={() => handleRateProduct(num)}
                  className={`py-2 rounded-xl font-black text-xs transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg scale-110 ring-2 ring-amber-400'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-2.5 text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 p-2.5 rounded-xl text-center animate-fade-in">
              {isRtl
                ? `شغف ورأيك يهمنا! تم تسجيل تقييمك (${modalUserRating}/10) بنجاح.`
                : `Thank you! Your rating of (${modalUserRating}/10) was submitted successfully.`}
            </div>
          )}
        </div>

        {/* Product Details Grid */}
        <div className="space-y-6 mb-8">
          {/* Description Box */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {description}
            </p>

            {/* Claims tags if any */}
            {product.claims && product.claims.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-800/80">
                {product.claims.map((claim, idx) => (
                  <span key={idx} className="bg-purple-950/80 border border-purple-800/60 text-purple-300 text-xs font-black px-3 py-1 rounded-full">
                    ✓ {claim}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Supplement Facts Table (If present e.g. B-Complex) */}
          {product.supplementFacts && product.supplementFacts.length > 0 && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-purple-900/40">
              <h4 className="font-black text-purple-300 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                <ListCheck size={18} className="text-purple-400" />
                <span>{isRtl ? 'جدول القيمة الغذائية التفصيلية (Supplement Facts)' : 'Supplement Facts'}</span>
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 font-medium">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2 px-3">{isRtl ? 'المكون' : 'Ingredient'}</th>
                      <th className="py-2 px-3">{isRtl ? 'الكمية/الجرعة' : 'Amount / Serving'}</th>
                      <th className="py-2 px-3">{isRtl ? 'النسبة اليومية (%DV)' : '% Daily Value'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.supplementFacts.map((fact, idx) => (
                      <tr key={idx} className="border-b border-slate-900 hover:bg-slate-900/60 transition">
                        <td className="py-2 px-3 font-semibold text-white">{fact.ingredient}</td>
                        <td className="py-2 px-3 font-mono text-emerald-400">{fact.amount}</td>
                        <td className="py-2 px-3 font-mono text-amber-400">{fact.dv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dosage & Timing */}
          <div className="bg-blue-950/40 p-5 rounded-2xl border border-blue-900/40 flex items-start gap-4">
            <div className="p-3 bg-blue-900/60 rounded-xl text-blue-400 shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <h4 className="font-black text-blue-300 text-sm mb-1 uppercase tracking-wider">
                {t.modal_usage}
              </h4>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                {usage}
              </p>
            </div>
          </div>

          {/* Key Ingredients */}
          <div className="bg-emerald-950/40 p-5 rounded-2xl border border-emerald-900/40 flex items-start gap-4">
            <div className="p-3 bg-emerald-900/60 rounded-xl text-emerald-400 shrink-0">
              <Beaker size={22} />
            </div>
            <div>
              <h4 className="font-black text-emerald-300 text-sm mb-1 uppercase tracking-wider">
                {t.modal_ingredients}
              </h4>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                {ingredients}
              </p>

              {otherIngredients && (
                <div className="mt-3 pt-3 border-t border-emerald-900/60">
                  <span className="block text-xs font-bold text-slate-400 mb-1">
                    {isRtl ? 'المكونات الأخرى:' : 'Other Ingredients:'}
                  </span>
                  <p className="text-xs text-slate-400 font-normal leading-relaxed">
                    {otherIngredients}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* NASM Science Note */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 flex items-start gap-4">
            <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <h4 className="font-black text-amber-300 text-sm mb-1 uppercase tracking-wider">
                {t.modal_science}
              </h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {science}
              </p>
            </div>
          </div>
        </div>

        {/* AI Query Box inside Modal */}
        <div className="p-6 bg-slate-950/90 rounded-2xl border border-slate-800 mb-8">
          <h4 className="font-black text-sm text-white mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-400" />
            <span>{t.modal_ask_ai_title}</span>
          </h4>

          <form onSubmit={handleSendAiQuestion} className="space-y-3">
            <textarea
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder={t.modal_ai_placeholder}
              rows={2}
              className="w-full p-4 bg-slate-900 rounded-xl border border-slate-800 focus:border-blue-500 text-slate-200 text-sm font-medium outline-none transition"
            />
            <button
              type="submit"
              disabled={isLoadingAI || !aiQuestion.trim()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              {isLoadingAI ? (
                <span className="animate-pulse">Consulting AI...</span>
              ) : (
                <>
                  <Send size={15} />
                  <span>{t.modal_ai_btn}</span>
                </>
              )}
            </button>
          </form>

          {aiResponse && (
            <div className="mt-4 p-4 bg-blue-950/60 rounded-xl border border-blue-800/60 text-xs text-slate-200 leading-relaxed font-medium animate-fade-in">
              {aiResponse}
            </div>
          )}
        </div>

        {/* Order WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black text-base shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-3 transition hover:scale-[1.01]"
        >
          <MessageSquare size={20} />
          <span>{t.btn_order_whatsapp}</span>
        </a>
      </div>
    </div>,
    document.body
  );
};
