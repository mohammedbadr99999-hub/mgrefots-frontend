import React, { useState, useEffect } from 'react';
import { Zap, Activity, ShoppingBag, MessageCircle, Menu, X, Globe, ShieldCheck } from 'lucide-react';
import { Language, NavigationTab, UserState } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  user: UserState | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onSelectLang,
  user
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'home', label: t.nav_home, icon: ShoppingBag },
    { id: 'analysis', label: t.nav_analysis, icon: Activity },
    { id: 'supps', label: t.nav_supps, icon: Zap },
    { id: 'chat', label: t.nav_chat, icon: MessageCircle },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              MG
            </div>
            <div>
              <span className="text-xl font-black tracking-widest text-white group-hover:text-blue-400 transition-colors" dir="ltr">
                MGREFOTS
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                Sports Nutrition
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher & User Status */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex bg-slate-900 rounded-full p-1 border border-slate-800" dir="ltr">
              {(['en', 'rw', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onSelectLang(l)}
                  className={`px-3 py-1 rounded-full text-[11px] font-black uppercase transition-all ${
                    lang === l
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* User status tag */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 px-3.5 py-1.5 rounded-full text-xs font-bold">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>{t.guest_tag}</span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-full w-80 bg-slate-950 z-50 shadow-2xl flex flex-col lg:hidden border-r border-slate-800 transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">MG</div>
            <span className="text-lg font-black text-white tracking-wider" dir="ltr">MGREFOTS</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-black"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col p-4 gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-base transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 border-t border-slate-900 text-center">
          <p className="text-xs font-bold text-slate-500" dir="ltr">© 2026 MGREFOTS LTD</p>
        </div>
      </div>
    </>
  );
};
