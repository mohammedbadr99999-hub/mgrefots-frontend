import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Info, Sparkles, Star, ShoppingCart, ThumbsUp } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ProductGraphic } from './ProductGraphic';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onSelectProduct: (product: Product) => void;
  onAskAIProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onSelectProduct,
  onAskAIProduct
}) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [userRating, setUserRating] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const name = product.name[lang] || product.name.en;
  const subtitle = product.subtitle[lang] || product.subtitle.en;
  const description = product.description[lang] || product.description.en;
  const badgeText = product.badge[lang] || product.badge.en;
  const highlights = product.highlights[lang] || product.highlights.en;
  const whatsappMsg = product.whatsappText[lang] || product.whatsappText.en;

  const whatsappUrl = `https://wa.me/250792294432?text=${encodeURIComponent(whatsappMsg)}`;

  const handleRateProduct = (score: number) => {
    setUserRating(score);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 4000);
  };

  return (
    <div className="group bg-slate-900/90 rounded-3xl border border-slate-800 hover:border-blue-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/10 hover:-translate-y-1 relative overflow-hidden">
      
      {/* Top Graphic Banner */}
      <div className="relative mb-5">
        <ProductGraphic
          productId={product.id}
          name={name}
          category={product.category}
          gradient={product.gradient}
        />
        
        {/* Floating Category Badge */}
        <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} ${product.badgeColor} text-xs font-black uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md`}>
          {badgeText}
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between mb-5">
        <div>
          {/* Buyers & Ratings Bar */}
          <div className="flex items-center justify-between mb-3 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
            {/* Star Rating & Review count */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400">
                <Star size={15} fill="currentColor" />
              </div>
              <span className="text-xs font-black text-amber-400">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                ({product.reviewsCount} {isRtl ? 'تقييم' : 'reviews'})
              </span>
            </div>

            {/* Buyers count */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
              <ShoppingCart size={13} className="text-emerald-400" />
              <span>{product.buyersCount.toLocaleString()} {isRtl ? 'اشتروا المنتج' : 'buyers'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.size}</span>
            <span className="text-xs font-extrabold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2.5 py-0.5 rounded-full">
              {product.servings}
            </span>
          </div>

          <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-snug mb-1">
            {name}
          </h3>
          <p className="text-xs font-semibold text-slate-400 leading-relaxed mb-4">
            {subtitle}
          </p>

          <p className="text-sm font-medium text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Highlights List */}
        <div className="space-y-2 pt-3 border-t border-slate-800/80 mb-5">
          {highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-300 leading-tight">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Customer Rating Section (1 to 10) */}
        <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black text-slate-300 flex items-center gap-1.5">
              <ThumbsUp size={13} className="text-amber-400" />
              <span>{isRtl ? 'قيم هذا المنتج (من 1 إلى 10):' : 'Rate this product (1-10):'}</span>
            </span>
            {userRating && (
              <span className="text-[11px] font-extrabold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/60">
                {userRating}/10 ⭐
              </span>
            )}
          </div>

          {/* 10 Buttons Scale */}
          <div className="grid grid-cols-10 gap-1" dir="ltr">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isSelected = userRating === num;
              return (
                <button
                  key={num}
                  onClick={() => handleRateProduct(num)}
                  className={`py-1.5 rounded-lg font-black text-xs transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md scale-110 font-black ring-2 ring-amber-400'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                  title={`Rate ${num}/10`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="mt-2 text-[10px] font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-800/80 p-2 rounded-xl text-center animate-fade-in">
              {isRtl
                ? `شغف ورأيك يهمنا! تم تسجيل تقييمك (${userRating}/10) بنجاح.`
                : `Thank you! Your rating of (${userRating}/10) was submitted successfully.`}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        {/* Primary Action: Order via WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[44px] py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2.5 group-hover:scale-[1.01]"
        >
          <MessageSquare size={18} className="text-white" />
          <span>{t.btn_order_whatsapp}</span>
        </a>

        {/* Secondary Actions Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full min-h-[44px] py-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white rounded-xl font-bold text-xs transition border border-slate-700 flex items-center justify-center gap-1.5"
          >
            <Info size={15} className="text-blue-400" />
            <span className="truncate">{t.btn_view_specs}</span>
          </button>

          <button
            onClick={() => onAskAIProduct(product)}
            className="w-full min-h-[44px] py-2.5 bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 hover:text-white rounded-xl font-bold text-xs transition border border-blue-800/60 flex items-center justify-center gap-1.5"
          >
            <Sparkles size={15} className="text-amber-400" />
            <span className="truncate">{t.btn_ask_ai}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
