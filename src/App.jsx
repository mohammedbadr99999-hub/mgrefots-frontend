import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, Lock, MessageCircle, Send, Info, Activity, User,
  ShoppingBag, LogOut, Menu, X, Award, Camera, FileText,
  AlertCircle, Mail, ChevronDown
} from 'lucide-react';
import { auth, db, firebase } from './firebase';
import { translations, supplementsData } from './translations';
import ProgressChart from './components/ProgressChart';

const GEMINI_API_KEY = "AIzaSyAPE5NdqeChD4YV07fF-S6vq1rk80qfZY0";
const BACKEND_URL = "https://mgrefots-backend-production.up.railway.app";
const API_KEY = GEMINI_API_KEY; // السطر ده هو اللي هيخلي الكود يقرأ المفتاح صح مهما كان اسمه تحت

export default function App() {
  // ── State ──
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("current_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState(() => window.location.hash.replace("#","") || "home");
  const navigateTo = (tab) => { setActiveTab(tab); window.location.hash = tab; };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Auth
  const [authPhone, setAuthPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [authStep, setAuthStep] = useState("phone");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState("");

  // Analysis
  const [selectedFile, setSelectedFile] = useState(null);
  const [goal, setGoal] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState("");
  const [history, setHistory] = useState([]);
  const [expandedNutrient, setExpandedNutrient] = useState(null);
  const [bmi, setBmi] = useState({ weight: "", height: "", result: null, status: "" });

  // Pipeline
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [pipelineRunning, setPipelineRunning] = useState(false);

  // Chat
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const [chatResponse, setChatResponse] = useState("");

  // Supps
  const [selectedSupp, setSelectedSupp] = useState(null);
  const [suppInfo, setSuppInfo] = useState("");
  const [isSuppLoading, setIsSuppLoading] = useState(false);

  // Nutrients
  const [nutrientQuery, setNutrientQuery] = useState("");
  const [nutrientResponse, setNutrientResponse] = useState("");
  const [isNutrientChatting, setIsNutrientChatting] = useState(false);

  const loadingTimerRef = useRef(null);
  const t = translations[lang] || translations.en;
  const isRtl = lang === "ar";
  const alignClass = isRtl ? "text-right" : "text-left";

  // ── Effects ──
  useEffect(() => {
    const saved = localStorage.getItem("inbody_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => { setNutrientQuery(""); setNutrientResponse(""); }, [expandedNutrient]);

  useEffect(() => {
    let unsubSnap = null;
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const u = { id: user.uid, phone: user.phoneNumber, isGuest: false };
        setCurrentUser(u);
        localStorage.setItem("current_user", JSON.stringify(u));
      }
    });
    return () => { unsub(); if (unsubSnap) unsubSnap(); };
  }, []);

  // ── Gemini Helper ──
  const fetchGemini = async (prompt, systemInstruction, inlineData = null) => {
    const payload = {
      contents: [{ parts: [{ text: `Instructions: ${systemInstruction}\n\nUser Question: ${prompt}` }, ...(inlineData ? [{ inlineData }] : [])] }],
      generationConfig: { maxOutputTokens: 8192, temperature: 0.7 }
    };
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const result = await r.json();
      if (r.ok && result?.candidates?.[0]?.content?.parts?.[0]?.text) return result.candidates[0].content.parts[0].text;
      return isRtl ? "عذراً، حدث خطأ." : "Sorry, an error occurred.";
    } catch { return isRtl ? "الخادم مشغول." : "Server busy."; }
  };

  // ── Auth ──
  const handleGuestEntry = () => setCurrentUser({ id: "guest", phone: "Guest", isGuest: true });
  const handleLogout = async () => { await auth.signOut(); localStorage.removeItem("current_user"); setCurrentUser(null); navigateTo("home"); };

  // ── Features ──
  const handleFileSelect = (e) => { if (e.target.files[0]) setSelectedFile(e.target.files[0]); };

  const calculateBMI = () => {
    const w = parseFloat(bmi.weight), h = parseFloat(bmi.height) / 100;
    if (!w || !h) return;
    const res = (w / (h * h)).toFixed(1);
    let status = t.bmi_normal;
    if (res < 18.5) status = t.bmi_under;
    else if (res >= 25 && res < 30) status = t.bmi_over;
    else if (res >= 30) status = t.bmi_obese;
    setBmi({ ...bmi, result: res, status });
  };

  const runElitePipeline = async () => {
    if (!selectedFile || !goal) { alert(t.alert_missing); return; }
    setPipelineRunning(true); setPipelineStep(1); setPdfUrl(null); setAnalysisResult("");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("goal", goal);
      formData.append("lang", lang);
      formData.append("clientName", currentUser?.phone || "Client");
      setPipelineStep(2);
      const response = await fetch(`${BACKEND_URL}/api/ai-pipeline`, { method: "POST", body: formData });
      if (!response.ok) throw new Error("Failed");
      setPipelineStep(3);
      const data = await response.json();
      setAnalysisResult([data.analysis, "\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n", data.plan].join("\n"));
      setPdfUrl(data.pdfUrl);
    } catch (err) {
      setAnalysisResult(isRtl ? "عذراً، حدث خطأ. حاول مرة أخرى." : "Sorry, error occurred. Try again.");
    } finally { setPipelineRunning(false); }
  };

// المحاولة الأولى بموديل Flash السريع
  const callGeminiDirect = async (prompt, sysPrompt) => {
    // استخدمنا الرابط المباشر لموديل 1.5-flash الأحدث
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: sysPrompt + "\n\nUser Question: " + prompt }]
          }]
        })
      });

      const data = await res.json();
      
      if (data.candidates && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        // لو الموديل الأول فشل، جرب البرو كاحتياطي أخير فوراً
        return await callGeminiBackup(prompt, sysPrompt);
      }
    } catch (e) {
      return await callGeminiBackup(prompt, sysPrompt);
    }
  };

  const callGeminiBackup = async (prompt, sysPrompt) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: sysPrompt + "\n\nUser Question: " + prompt }] }]
        })
      });
      const data = await res.json();
      return data.candidates[0].content.parts[0].text;
    } catch (e) {
      return lang === "ar" ? "عذراً، الخبير غير متاح حالياً." : "Expert unavailable.";
    }
  };
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const q = chatInput;
    setChatInput(""); 
    setIsChatting(true); 
    setChatResponse("");
    const ll = lang === "ar" ? "Answer ONLY in Arabic." : lang === "rw" ? "Answer ONLY in Kinyarwanda." : "Answer ONLY in English.";
    const res = await callGeminiDirect(q, `You are an elite fitness coach. ${ll} Be specific and actionable.`);
    setChatResponse(res); 
    setIsChatting(false);
  };

  const analyzeSupplement = (name) => {
    setSelectedSupp(name);
    // السطر ده هو اللي بيروح يجيب الكلام من الـ PDF اللي في translations.js
    const info = supplementsData[name]?.[lang] || supplementsData[name]?.["en"];
    setSuppInfo(info);
    setIsSuppLoading(false);
  };

  const formatText = (text) => {
    if (!text) return "";
    return text.split('\n').map((line, i) => {
      const cleaned = line.replace(/[*#]/g, '').trim();
      if (!cleaned) return <br key={i} />;
      if (cleaned.match(/^[-•\d]/)) return <li key={i} className="ml-4 mb-2">{cleaned}</li>;
      return <p key={i} className="mb-3 font-bold">{cleaned}</p>;
    });
  };

  // ── Social Links Component ──
  const SocialLinks = () => (
    <div className="flex justify-center gap-4">
      <a href="https://www.instagram.com/mobadr2026/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-pink-100 text-pink-600 shadow-md hover:scale-110 transition" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.272 2.69.072 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61580765596064" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-blue-100 text-blue-600 shadow-md hover:scale-110 transition" aria-label="Facebook">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a href="https://wa.me/250792294432" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-green-100 text-green-600 shadow-md hover:scale-110 transition" aria-label="WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.9 11.9 0 0012.02 0C5.38 0 .02 5.36.02 12c0 2.12.56 4.2 1.62 6.03L0 24l6.13-1.6A11.94 11.94 0 0012.02 24c6.64 0 12-5.36 12-12 0-3.2-1.25-6.22-3.5-8.52zM12.02 21.82c-1.82 0-3.6-.49-5.15-1.42l-.37-.22-3.64.95.97-3.55-.24-.37A9.77 9.77 0 012.2 12c0-5.42 4.4-9.82 9.82-9.82 2.62 0 5.08 1.02 6.93 2.88a9.73 9.73 0 012.88 6.93c0 5.42-4.4 9.82-9.82 9.82zm5.45-7.36c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.14 4.53.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.12-.27-.2-.57-.35z"/></svg>
      </a>
    </div>
  );

  // ══════════════════════════════════
  // LOGIN SCREEN
  // ══════════════════════════════════
  if (!currentUser) {
    return (
      <div className={`min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 ${isRtl ? "font-arabic" : "font-sans"}`} dir={isRtl ? "rtl" : "ltr"}>
        <div className="flex bg-white rounded-full p-1.5 shadow-sm border border-slate-100 mb-8" dir="ltr">
          {["en", "rw", "ar"].map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`px-5 py-2 rounded-full text-xs font-black uppercase transition-all ${lang === l ? "bg-blue-900 text-white shadow-md" : "text-slate-500 hover:text-slate-800"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="text-center space-y-8 animate-fade-in max-w-lg">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-blue-950 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl">
            <span className="text-3xl font-black tracking-widest">MG</span>
          </div>
          <h1 className="text-5xl font-black text-blue-950 tracking-tighter" dir="ltr">MGREFOTS</h1>
          <button onClick={handleGuestEntry} className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-950 transition-all shadow-xl">
            {t.login_guest_btn}
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════
  // MAIN APP
  // ══════════════════════════════════
  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-900 pb-24 ${isRtl ? "font-arabic" : "font-sans"}`} dir={isRtl ? "rtl" : "ltr"}>

      {/* Supplement Modal */}
      {selectedSupp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedSupp(null)}>
          <div className="bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedSupp(null)} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-red-100 transition font-black text-lg" aria-label="Close">✕</button>
            <h3 className="text-3xl font-black text-blue-900 mb-6 uppercase pr-10" dir="ltr">{selectedSupp}</h3>
            {isSuppLoading ? <div className="flex items-center gap-3 text-emerald-600 font-bold animate-pulse-fast py-8"><span className="text-2xl animate-spin">⟳</span>{isRtl ? "جاري الرد..." : "Loading..."}</div>
              : <div className="text-slate-700 leading-relaxed text-lg">{formatText(suppInfo)}</div>}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 onClick={() => navigateTo("home")} className="text-2xl font-black tracking-tighter text-blue-900 cursor-pointer" dir="ltr">MGREFOTS</h1>
            <div className="hidden lg:flex items-center gap-2">
              {[{id:'home',l:t.nav_home,I:Zap},{id:'about',l:t.nav_about,I:User},{id:'analysis',l:t.nav_analysis,I:Activity},{id:'chat',l:t.nav_chat,I:MessageCircle},{id:'supps',l:t.nav_supps,I:ShoppingBag}].map(n => (
                <button key={n.id} onClick={() => navigateTo(n.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition ${activeTab === n.id ? "bg-blue-900 text-white shadow-md" : "text-slate-500 hover:bg-slate-100"}`}>
                  <n.I size={18} /> {n.l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 rounded-full p-1" dir="ltr">
              {["en","rw","ar"].map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 rounded-full text-xs font-black uppercase transition ${lang === l ? "bg-white text-blue-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{l}</button>
              ))}
            </div>
            {currentUser.isGuest ? (
              <span className="text-xs bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold flex items-center gap-1"><Lock size={14}/> {isRtl ? "زائر" : "Guest"}</span>
            ) : (
              <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition" aria-label="Logout"><LogOut size={20} /></button>
            )}
            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">{isMenuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)} />}

      {/* Mobile sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col lg:hidden transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-blue-900" dir="ltr">MGREFOTS</h2>
          <button onClick={() => setIsMenuOpen(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-red-100 flex items-center justify-center font-black" aria-label="Close menu">✕</button>
        </div>
        <div className="flex flex-col p-4 gap-1 flex-1">
          {[{id:'home',l:t.nav_home,e:'🏠'},{id:'about',l:t.nav_about,e:'📖'},{id:'analysis',l:t.nav_analysis,e:'📊'},{id:'chat',l:t.nav_chat,e:'💬'},{id:'supps',l:t.nav_supps,e:'💊'}].map(n => (
            <button key={n.id} onClick={() => {navigateTo(n.id);setIsMenuOpen(false);}} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-left transition ${activeTab === n.id ? "bg-blue-900 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
              <span className="text-xl">{n.e}</span><span>{n.l}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <main className="pt-32 pb-28 md:pb-20 px-4 md:px-6">

        {/* HOME */}
        {activeTab === "home" && (
          <section className="max-w-7xl mx-auto animate-fade-in">
            <div className="bg-gradient-to-r from-blue-900 to-emerald-700 text-white px-6 py-4 rounded-2xl flex items-center justify-between shadow-lg mb-8">
              <span className="font-black text-sm md:text-base">⚡ {isRtl ? "وصول مجاني محدود" : "Limited free access"}</span>
              <button onClick={() => navigateTo("analysis")} className="bg-white text-blue-900 px-4 py-2 rounded-xl font-black text-xs">{isRtl ? "ابدأ الآن" : "Start Now"}</button>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-start">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase"><Award size={14} /> NASM Certified</div>
                <h2 className="text-4xl lg:text-7xl font-black text-blue-950 leading-[1.1] tracking-tighter uppercase">{t.hero_title}</h2>
                <p className="text-xl text-slate-600 font-bold">{t.hero_desc}</p>
                <button onClick={() => navigateTo("analysis")} className="px-8 py-4 bg-blue-900 text-white rounded-xl font-black text-lg hover:bg-blue-950 transition shadow-lg">{t.hero_btn_analysis}</button>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-blue-950 text-center">{isRtl ? "المؤسسون" : "Founders"}</h3>
                {[
                  {name:"Mohamed Zeina",role:isRtl?"مدرب لياقة 13+ سنة · NASM":"Fitness Coach 13+ yrs · NASM",tags:["Elite Coach","Founder"]},
                  {name:"Dr. Ghada Hassan",role:isRtl?"دكتوراه تكنولوجيا حيوية":"PhD Biotechnology",tags:["PhD","Co-Founder"]}
                ].map((f,i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                    <div className="flex flex-wrap gap-2 mb-3">{f.tags.map(t=><span key={t} className="bg-blue-900 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">{t}</span>)}</div>
                    <div className="flex items-center gap-3 mb-2"><div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-700"><User size={24}/></div><h4 className="text-lg font-black text-blue-950">{f.name}</h4></div>
                    <p className="text-slate-500 font-bold text-sm">{f.role}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[t.test_1, t.test_2, t.test_3].map((text,i) => (
                <div key={i} className="p-8 bg-white rounded-2xl shadow-md border border-slate-100 hover:-translate-y-1 transition">
                  <div className="text-yellow-400 text-xl mb-4" dir="ltr">★★★★★</div>
                  <p className="font-bold text-lg text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <section className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100">
              <h2 className="text-4xl font-black text-blue-950 mb-8 border-b pb-6 uppercase">{t.story_title}</h2>
              <div className={`text-lg text-slate-700 leading-loose whitespace-pre-line text-justify font-bold ${alignClass}`}>{t.story_content}</div>
            </div>
          </section>
        )}

        {/* ANALYSIS */}
        {activeTab === "analysis" && (
          <section className="max-w-5xl mx-auto space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-blue-950 uppercase">{t.analysis_title}</h2>
              <p className="text-slate-500 text-lg">{t.analysis_subtitle}</p>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-8 rounded-[2rem] border border-blue-100 text-center space-y-4">
              <p className="font-black text-blue-900 text-lg">{t.contact_text}</p>
              <SocialLinks />
            </div>

            {/* BMI */}
            <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 grid md:grid-cols-2 gap-12 items-center shadow-lg">
              <h3 className="text-3xl font-black text-blue-950 uppercase text-center md:text-start">{t.bmi_title}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Weight (kg)" value={bmi.weight} onChange={e => setBmi({...bmi,weight:e.target.value})} className="p-5 bg-white rounded-xl font-bold text-center focus:ring-2 focus:ring-blue-200 outline-none" />
                  <input type="number" placeholder="Height (cm)" value={bmi.height} onChange={e => setBmi({...bmi,height:e.target.value})} className="p-5 bg-white rounded-xl font-bold text-center focus:ring-2 focus:ring-blue-200 outline-none" />
                </div>
                <button onClick={calculateBMI} className="w-full bg-blue-900 text-white py-4 rounded-xl font-black uppercase hover:bg-blue-950 transition">{t.bmi_btn}</button>
                {bmi.result && <div className="text-center p-6 bg-white rounded-3xl border-2 border-blue-200 animate-fade-in"><span className="text-5xl font-black text-blue-900">{bmi.result}</span><p className="text-sm font-black text-blue-600 uppercase mt-2">{bmi.status}</p></div>}
              </div>
            </div>

            {/* Upload + Analyze */}
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 space-y-8">
              {history.length > 1 && (
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200" dir="ltr">
                  <h4 className="font-black mb-6 text-blue-900 text-xl text-center">{t.chart_title}</h4>
                  <ProgressChart history={history} fatLabel={t.fat_label} muscleLabel={t.muscle_label} />
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-black text-blue-900 flex items-center gap-2 uppercase"><Camera size={18} /> 1. InBody</label>
                  <div onClick={() => document.getElementById("file-in").click()} className="border-4 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center cursor-pointer hover:border-blue-400 bg-slate-50 transition">
                    <FileText size={40} className="text-blue-500 mb-4" />
                    <p className="font-bold text-slate-600 text-center">{selectedFile ? selectedFile.name : t.upload_placeholder}</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-2">{t.support_files}</p>
                  </div>
                  <input type="file" id="file-in" className="hidden" accept="image/*,application/pdf" onChange={handleFileSelect} />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-black text-blue-900 flex items-center gap-2 uppercase"><Zap size={18} /> 2. Goal</label>
                  <textarea value={goal} onChange={e => setGoal(e.target.value)} rows="7" className="w-full p-6 bg-slate-50 rounded-xl border-2 border-transparent focus:border-blue-300 focus:bg-white outline-none font-bold text-slate-700" placeholder={t.goal_label} />
                </div>
              </div>

              <button onClick={runElitePipeline} disabled={pipelineRunning} className="w-full py-5 bg-gradient-to-r from-emerald-600 to-blue-700 text-white rounded-[2rem] font-black text-xl hover:from-emerald-700 hover:to-blue-800 transition shadow-xl disabled:opacity-50">
                {pipelineRunning ? (
                  <span className="flex items-center justify-center gap-3 animate-pulse-fast"><Activity className="animate-spin" size={24} />
                    {pipelineStep === 1 && (isRtl ? "جاري تحليل الجسم..." : "Analyzing body...")}
                    {pipelineStep === 2 && (isRtl ? "جاري بناء النظام الغذائي..." : "Building nutrition plan...")}
                    {pipelineStep === 3 && (isRtl ? "جاري إنشاء التقرير..." : "Generating report...")}
                  </span>
                ) : (isRtl ? "🚀 تحليل + تقرير PDF" : "🚀 Analyze + PDF Report")}
              </button>

              {analysisResult && !pipelineRunning && (
                <div className="bg-blue-50 text-blue-950 p-8 md:p-12 rounded-[3rem] border-2 border-blue-200 mt-8">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase"><Award className="text-emerald-500" size={32} />{isRtl ? "النظام الغذائي جاهز:" : "Nutrition Plan Ready:"}</h3>
                  <div className={`text-lg leading-loose ${alignClass}`}>{formatText(analysisResult)}</div>
                  {pdfUrl && (
                    <div className="mt-10 text-center">
                      <a href={`${BACKEND_URL}${pdfUrl}`} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-blue-700 text-white rounded-2xl font-black text-lg hover:scale-105 transition shadow-xl">
                        <FileText size={24} />{isRtl ? "📥 تحميل التقرير PDF" : "📥 Download PDF Report"}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* CHAT */}
        {activeTab === "chat" && (
          <section className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-200">
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">MZ</div>
                <div><p className="font-black text-blue-900 uppercase">MGREFOTS Expert</p><p className="text-xs text-emerald-600 font-bold">● {isRtl ? "متصل · مجاناً" : "Online · Free"}</p></div>
              </div>
              <p className={`text-slate-500 font-bold mb-6 text-sm ${alignClass}`}>{t.chat_desc}</p>
              <div className="mb-6 text-center">
                <p className="font-black text-blue-900 mb-3">{t.contact_text}</p>
                <SocialLinks />
              </div>
              <div className="space-y-4">
                <textarea value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}} rows="4" placeholder={t.chat_placeholder} className={`w-full p-5 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-blue-400 outline-none font-bold text-slate-700 resize-none ${alignClass}`} />
                <button onClick={handleSendMessage} disabled={isChatting || !chatInput.trim()} className="w-full bg-blue-900 text-white py-4 rounded-xl font-black hover:bg-blue-950 transition disabled:opacity-40 flex items-center justify-center gap-3">
                  {isChatting ? <span className="animate-pulse-fast">{isRtl ? "جاري التفكير..." : "Thinking..."}</span> : t.chat_btn}
                </button>
              </div>
              {(isChatting || chatResponse) && (
                <div className={`mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-fade-in ${alignClass}`}>
                  <div className="flex items-center gap-2 mb-4 text-blue-700"><div className="w-7 h-7 bg-gradient-to-br from-blue-900 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xs">MZ</div><span className="font-black text-xs uppercase">{isRtl ? "رد الخبير" : "Expert Reply"}</span></div>
                  {isChatting ? <div className="flex gap-3 py-4"><span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" /><span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:"0.2s"}} /><span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:"0.4s"}} /></div>
                    : <div className="text-slate-700 text-base leading-loose font-bold">{formatText(chatResponse)}</div>}
                </div>
              )}
            </div>
          </section>
        )}

        {/* SUPPLEMENTS */}
        {activeTab === "supps" && (
          <section className="max-w-7xl mx-auto space-y-16 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-blue-950 uppercase">{t.supps_title}</h2>
              <p className="text-slate-500 text-lg">{t.supps_subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {name:"Creatine",emoji:"⚡",bg:"bg-yellow-50",text:"text-yellow-600"},
                {name:"Omega-3",emoji:"🐟",bg:"bg-blue-50",text:"text-blue-600"},
                {name:"Vitamin D",emoji:"☀️",bg:"bg-orange-50",text:"text-orange-600"},
                {name:"Citrulline",emoji:"❤️",bg:"bg-red-50",text:"text-red-500"},
                {name:"Whey Protein",emoji:"🧬",bg:"bg-emerald-50",text:"text-emerald-600"},
                {name:"BCAA",emoji:"🧪",bg:"bg-purple-50",text:"text-purple-600"},
                {name:"Glutamine",emoji:"🛡️",bg:"bg-slate-100",text:"text-slate-600"},
                {name:"Beta-Alanine",emoji:"🔥",bg:"bg-rose-50",text:"text-rose-600"},
              ].map(({name,emoji,bg,text}) => (
                <button key={name} onClick={() => analyzeSupplement(name)} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition text-center flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center mb-4 text-3xl`}>{emoji}</div>
                  <h3 className={`font-black text-lg ${text}`} dir="ltr">{name}</h3>
                  <p className="text-xs text-slate-400 mt-2 font-bold uppercase">{t.click_to_analyze}</p>
                </button>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 text-center rounded-t-[3rem] mx-2">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-black tracking-widest text-emerald-400" dir="ltr">MGREFOTS LTD</h2>
          <div className="flex justify-center items-center gap-2 text-slate-300 font-bold" dir="ltr"><Mail size={18} /> {t.email_contact}</div>
          <p className="text-sm font-bold opacity-50 uppercase" dir="ltr">{t.footer_rights}</p>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex justify-around items-center p-3 md:hidden z-50 border-t border-slate-100">
        {[{id:'home',l:t.nav_home,e:'🏠'},{id:'about',l:t.nav_about,e:'📖'},{id:'analysis',l:t.nav_analysis,e:'📊'},{id:'chat',l:t.nav_chat,e:'💬'},{id:'supps',l:t.nav_supps,e:'💊'}].map(n => (
          <button key={n.id} onClick={() => navigateTo(n.id)} className={`flex flex-col items-center min-h-[44px] min-w-[44px] gap-1 transition ${activeTab === n.id ? "text-blue-900 scale-110" : "text-slate-400"}`}>
            <span className="text-xl">{n.e}</span><span className="text-[10px] font-bold">{n.l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
