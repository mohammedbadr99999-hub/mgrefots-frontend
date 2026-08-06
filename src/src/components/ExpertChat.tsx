import React, { useState } from 'react';
import { Send, Instagram, Facebook, MessageCircle, Sparkles, User, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ExpertChatProps {
  lang: Language;
  onSendChatMessage: (message: string) => Promise<string>;
}

export const ExpertChat: React.FC<ExpertChatProps> = ({ lang, onSendChatMessage }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const alignClass = isRtl ? 'text-right' : 'text-left';

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setIsChatting(true);
    setChatResponse('');

    try {
      const response = await onSendChatMessage(userMessage);
      setChatResponse(response);
    } catch (e) {
      setChatResponse(isRtl ? 'عذراً، حدث خطأ أثناء الاتصال بالخبير.' : 'Error contacting expert.');
    } finally {
      setIsChatting(false);
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

  return (
    <section className="max-w-3xl mx-auto animate-fade-in space-y-8">
      <div className="bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
        
        {/* Coach Header */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-800">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
            MZ
          </div>
          <div>
            <h3 className="font-black text-white text-lg">Mohamed Zeina</h3>
            <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isRtl ? 'خبير التغذية واللياقة البدنية · NASM Certified' : 'Fitness & Nutrition Expert · NASM Certified'}</span>
            </p>
          </div>
        </div>

        <p className={`text-slate-400 text-sm font-medium mb-8 leading-relaxed ${alignClass}`}>
          {t.chat_desc}
        </p>

        {/* Social Direct Links */}
        <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 text-center mb-8">
          <h4 className="text-sm font-black text-white mb-2">
            {t.contact_expert_direct}
          </h4>
          <p className="text-xs text-slate-400 font-medium mb-4">
            {isRtl ? 'للحصول على استشارة شخصية مباشرة عبر منصات التواصل:' : 'Connect directly on your favorite platform:'}
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://www.instagram.com/mobadr2026/?hl=ar" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900 text-pink-500 hover:bg-pink-600 hover:text-white border border-slate-800 shadow-md hover:scale-110 transition flex items-center gap-2 text-xs font-bold"
            >
              <Instagram size={18} />
              <span>Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61580765596064" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900 text-blue-400 hover:bg-blue-600 hover:text-white border border-slate-800 shadow-md hover:scale-110 transition flex items-center gap-2 text-xs font-bold"
            >
              <Facebook size={18} />
              <span>Facebook</span>
            </a>
            <a 
              href="https://wa.me/250792294432" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-slate-800 shadow-md hover:scale-110 transition flex items-center gap-2 text-xs font-bold"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* AI Input Box */}
        <div className="space-y-4">
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={4}
            placeholder={t.chat_placeholder}
            className={`w-full p-5 bg-slate-950/80 rounded-2xl border border-slate-800 focus:border-blue-500 text-slate-200 text-sm font-medium outline-none transition ${alignClass}`}
          />
          <button
            onClick={handleSendMessage}
            disabled={isChatting || !chatInput.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-2xl font-black text-sm transition shadow-lg shadow-blue-600/20 disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isChatting ? (
              <span className="animate-pulse">Consulting Expert AI...</span>
            ) : (
              <>
                <Sparkles size={18} />
                <span>{t.chat_btn}</span>
              </>
            )}
          </button>
        </div>

        {/* AI Response Output */}
        {(isChatting || chatResponse) && (
          <div className={`mt-8 p-6 bg-slate-950/90 rounded-2xl border border-blue-900/60 shadow-inner ${alignClass}`}>
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
                MZ
              </div>
              <span className="font-black text-xs uppercase tracking-wider">
                {isRtl ? 'رد الخبير' : 'Expert Coach Response'}
              </span>
            </div>

            {isChatting ? (
              <div className="flex items-center gap-2 py-4 text-slate-400 text-xs font-bold animate-pulse">
                <span>Analyzing request & formulating protocol...</span>
              </div>
            ) : (
              <div className="text-slate-200 text-sm leading-relaxed font-medium">
                {formatText(chatResponse)}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
