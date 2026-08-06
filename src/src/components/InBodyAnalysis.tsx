import React, { useState } from 'react';
import { Camera, FileText, Zap, Award, Activity, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface InBodyAnalysisProps {
  lang: Language;
  onRunAnalysis: (file: File, goal: string) => Promise<{ result: string; pdfUrl?: string }>;
}

export const InBodyAnalysis: React.FC<InBodyAnalysisProps> = ({ lang, onRunAnalysis }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [goal, setGoal] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const alignClass = isRtl ? 'text-right' : 'text-left';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !goal.trim()) {
      alert(isRtl ? 'يرجى اختيار ملف InBody وكتابة هدفك الرياضي أولاً.' : 'Please select an InBody file and enter your goal first.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult('');
    setPdfUrl(null);

    try {
      const { result, pdfUrl: generatedPdf } = await onRunAnalysis(selectedFile, goal);
      setAnalysisResult(result);
      if (generatedPdf) setPdfUrl(generatedPdf);
    } catch (error) {
      setAnalysisResult(
        isRtl 
          ? 'عذراً، حدث خطأ أثناء تحليل الملف. حاول مرة أخرى.' 
          : 'Sorry, an error occurred during analysis. Please try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const cleaned = line.replace(/(\*|\#)/g, '').trim();
      if (!cleaned) return <br key={i} />;
      if (cleaned.match(/^[-•\d]/)) return <li key={i} className="ml-4 mb-2 text-slate-300 font-medium">{cleaned}</li>;
      return <p key={i} className="mb-3 font-bold text-white text-base leading-relaxed">{cleaned}</p>;
    });
  };

  return (
    <section className="max-w-5xl mx-auto space-y-10 animate-fade-in">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          {t.analysis_title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          {t.analysis_subtitle}
        </p>
      </div>

      <div className="bg-slate-900 p-6 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
        
        {/* Direct Coach Contact Banner */}
        <div className="p-6 bg-slate-950/80 rounded-2xl border border-blue-900/60 text-center">
          <p className="font-bold text-blue-300 text-sm sm:text-base leading-relaxed mb-4">
            {lang === 'ar' 
              ? 'للتعرف بشكل أوسع على النظام التدريبي والنظام الغذائي يرجى التواصل مع كابتن Mohamed Zeina'
              : lang === 'rw'
              ? 'Kugira ngo umenye byinshi kuri gahunda y\'imyitozo n\'imirire, hamagara Coach Mohamed Zeina'
              : 'To learn more about custom training and nutrition, contact Coach Mohamed Zeina directly'}
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://www.instagram.com/mobadr2026/?hl=ar" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900 text-pink-500 hover:text-white hover:bg-pink-600 border border-slate-800 shadow-md hover:scale-110 transition"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61580765596064" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900 text-blue-400 hover:text-white hover:bg-blue-600 border border-slate-800 shadow-md hover:scale-110 transition"
              title="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://wa.me/250792294432" 
              target="_blank" 
              rel="noreferrer"
              className="p-3 rounded-xl bg-slate-900 text-emerald-400 hover:text-white hover:bg-emerald-600 border border-slate-800 shadow-md hover:scale-110 transition"
              title="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Upload & Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Picker */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-300 flex items-center gap-2 uppercase tracking-wider">
              <Camera size={16} className="text-blue-400" /> 1. InBody Scan
            </label>
            <div 
              onClick={() => document.getElementById('inbody-file-input')?.click()} 
              className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 transition min-h-[180px] group"
            >
              <FileText size={40} className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-slate-300 text-sm text-center">
                {selectedFile ? selectedFile.name : t.upload_placeholder}
              </p>
              <p className="text-[10px] text-slate-500 uppercase mt-2 font-bold">{t.support_files}</p>
            </div>
            <input 
              type="file" 
              id="inbody-file-input" 
              className="hidden" 
              accept="image/*,application/pdf" 
              onChange={handleFileChange} 
            />
          </div>

          {/* Goal Input */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-300 flex items-center gap-2 uppercase tracking-wider">
              <Zap size={16} className="text-emerald-400" /> 2. Fitness Goal
            </label>
            <textarea 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)} 
              rows={7} 
              className="w-full p-5 bg-slate-950/60 rounded-2xl border border-slate-800 focus:border-blue-500 outline-none font-medium text-slate-200 text-sm transition"
              placeholder={t.goal_label}
            />
          </div>
        </div>

        {/* Generate Plan Button */}
        <button
          onClick={handleSubmit}
          disabled={isAnalyzing}
          className="w-full py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white rounded-2xl font-black text-lg hover:shadow-xl hover:shadow-blue-500/25 transition disabled:opacity-50 shadow-lg flex items-center justify-center gap-3"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-3 animate-pulse">
              <Activity className="animate-spin" />
              <span>{isRtl ? 'جاري تحليل بيانات InBody وصياغة الخطة...' : 'Analyzing InBody Scan & Generating Plan...'}</span>
            </span>
          ) : (
            <span>🚀 {t.btn_analyze}</span>
          )}
        </button>
        
        {/* Result & PDF Output */}
        {analysisResult && !isAnalyzing && (
          <div className="bg-slate-950 p-6 sm:p-10 rounded-3xl border border-blue-900/60 shadow-inner mt-8 space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase border-b border-slate-800 pb-4">
              <Award className="text-emerald-400" size={28} />
              <span>{isRtl ? 'خطة التدريب والتغذية المصممة لك:' : 'Your Custom Program:'}</span>
            </h3>

            <div className={`text-sm sm:text-base leading-relaxed ${alignClass}`}>
              {formatText(analysisResult)}
            </div>
            
            {pdfUrl && (
              <div className="mt-8 text-center pt-6 border-t border-slate-800">
                <a
                  href={pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black text-base hover:scale-105 transition shadow-lg shadow-emerald-600/25"
                >
                  <FileText size={20} />
                  <span>{t.download_pdf}</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
