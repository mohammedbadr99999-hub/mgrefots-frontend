import React from 'react';
import { Dumbbell, Activity, HeartPulse, Zap, ShieldCheck, Flame, Leaf, Award, Sparkles, CheckCircle } from 'lucide-react';

interface ProductGraphicProps {
  productId: string;
  name: string;
  category: string;
  gradient: string;
}

export const ProductGraphic: React.FC<ProductGraphicProps> = ({ productId, name }) => {
  // 1. CREATINE MONOHYDRATE (Exact visual replica of poster 1)
  if (productId === 'creatine-monohydrate') {
    return (
      <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 border border-blue-900/40 p-4 shadow-2xl flex flex-col justify-between group-hover:border-amber-500/50 transition-all duration-300">
        {/* Background dark athletic gym glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-black pointer-events-none" />
        
        {/* Poster Top Banner */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2.5 py-0.5 rounded-full mb-1">
            <Award size={12} />
            <span>ULTRA-PURE 99.8%</span>
          </div>
          <h4 className="text-base font-black text-white tracking-wider uppercase leading-none">
            CREATINE MONOHYDRATE
          </h4>
          <span className="text-[9px] font-extrabold text-blue-400 tracking-widest uppercase mt-0.5">
            PURE POWER. MAX PERFORMANCE.
          </span>
        </div>

        {/* Center Product Tub & Gym Stage */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          {/* Left Benefit Badges */}
          <div className="hidden sm:flex flex-col gap-1.5 absolute left-2 z-20 text-[9px] font-bold text-slate-300">
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-amber-400">
              💪 Strength
            </span>
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-blue-400">
              ⚡ Power
            </span>
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-emerald-400">
              🔥 Endurance
            </span>
          </div>

          {/* 3D Tub */}
          <div className="w-36 h-44 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-amber-500/50 shadow-2xl flex flex-col items-center justify-between p-2.5 relative transform group-hover:scale-105 transition-transform duration-500">
            {/* Lid */}
            <div className="w-full h-6 bg-gradient-to-r from-slate-200 via-white to-slate-300 rounded-lg shadow flex items-center justify-center">
              <div className="w-14 h-1 bg-slate-400 rounded-full" />
            </div>

            {/* Label */}
            <div className="w-full my-auto bg-gradient-to-br from-blue-950 via-slate-900 to-black rounded-xl p-2 border border-amber-500/40 text-center flex flex-col items-center justify-center shadow-inner">
              <span className="text-[9px] font-black uppercase text-amber-400 tracking-widest">M.G. REFOTS</span>
              <div className="bg-amber-500/20 border border-amber-500/40 rounded px-1.5 py-0.5 my-0.5">
                <span className="text-[7px] font-black text-amber-300 uppercase">ULTRA-PURE 99.8%</span>
              </div>
              <span className="text-xs font-black text-white tracking-tight">CREATINE</span>
              <span className="text-[8px] font-extrabold text-blue-300">MONOHYDRATE</span>
              <span className="text-[7px] font-bold text-slate-400 uppercase mt-0.5">MICRONIZED MESH 200</span>
            </div>

            {/* Tub Footer */}
            <div className="w-full bg-slate-900/90 rounded-lg py-0.5 px-1 flex justify-between items-center text-[7px] font-black text-amber-400">
              <span>300G</span>
              <span>60 SERV</span>
              <span>5000MG</span>
            </div>
          </div>

          {/* Right Scoop & Powder motif */}
          <div className="hidden sm:flex flex-col gap-1.5 absolute right-2 z-20 text-[9px] font-bold text-slate-300">
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-amber-400">
              🥄 Scoop Incl.
            </span>
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-sky-400">
              ✨ Mesh 200
            </span>
          </div>
        </div>

        {/* Poster Bottom Bar */}
        <div className="relative z-10 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border border-amber-500/30 rounded-xl p-2 flex items-center justify-around text-center">
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">NET WEIGHT</span>
            <span className="text-xs font-black text-white">300G</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">SERVINGS</span>
            <span className="text-xs font-black text-amber-400">60</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">PER SERVING</span>
            <span className="text-xs font-black text-emerald-400">5000MG</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. PLANT PROTEIN (PEA & RICE BLEND) (Exact visual replica of poster 2)
  if (productId === 'protein-pea-rice') {
    return (
      <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 border border-emerald-900/40 p-4 shadow-2xl flex flex-col justify-between group-hover:border-emerald-500/50 transition-all duration-300">
        {/* Background natural green leaves glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-black pointer-events-none" />
        
        {/* Poster Top Banner */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-300 bg-emerald-950/90 border border-emerald-800 px-2.5 py-0.5 rounded-full mb-1">
            <Leaf size={12} />
            <span>PLANT-POWERED • ACTIVE LIFESTYLE</span>
          </div>
          <h4 className="text-base font-black text-white tracking-wider uppercase leading-none">
            PLANT PROTEIN
          </h4>
          <span className="text-[9px] font-extrabold text-emerald-400 tracking-widest uppercase mt-0.5">
            CLEAN. PLANT-BASED. POWERFUL.
          </span>
        </div>

        {/* Center Product Tub */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          {/* Left Plant Badges */}
          <div className="hidden sm:flex flex-col gap-1.5 absolute left-2 z-20 text-[9px] font-bold text-slate-300">
            <span className="bg-emerald-950/90 border border-emerald-800 px-2 py-0.5 rounded flex items-center gap-1 text-emerald-300">
              🌱 81.3% Lab Tested
            </span>
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-amber-300">
              💪 26.8g Scoop
            </span>
          </div>

          {/* 3D Large Tub */}
          <div className="w-38 h-44 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-emerald-500/50 shadow-2xl flex flex-col items-center justify-between p-2.5 relative transform group-hover:scale-105 transition-transform duration-500">
            {/* White Lid */}
            <div className="w-full h-6 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-lg shadow flex items-center justify-center">
              <div className="w-16 h-1 bg-slate-400 rounded-full" />
            </div>

            {/* Label */}
            <div className="w-full my-auto bg-gradient-to-br from-emerald-950 via-slate-900 to-black rounded-xl p-2 border border-emerald-500/40 text-center flex flex-col items-center justify-center shadow-inner">
              <span className="text-[9px] font-black uppercase text-emerald-400 tracking-widest">MGREFOTS</span>
              <span className="text-xs font-black text-white tracking-tight mt-0.5">PLANT PROTEIN</span>
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded px-1.5 py-0.5 my-1">
                <span className="text-[7px] font-black text-emerald-300 uppercase">70% PEA + 30% RICE</span>
              </div>
              <span className="text-[7px] font-bold text-slate-300 uppercase">COMPLETE AMINO PROFILE</span>
            </div>

            {/* Tub Footer */}
            <div className="w-full bg-slate-900/90 rounded-lg py-0.5 px-1 flex justify-between items-center text-[7px] font-black text-emerald-400">
              <span>1000G</span>
              <span>33 SERV</span>
              <span>81.3% PRO</span>
            </div>
          </div>

          {/* Right Ratio Badge */}
          <div className="hidden sm:flex flex-col gap-1.5 absolute right-2 z-20 text-[9px] font-bold text-slate-300">
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-emerald-400">
              🫛 Pea Protein
            </span>
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-amber-400">
              🌾 Rice Protein
            </span>
          </div>
        </div>

        {/* Poster Bottom Bar */}
        <div className="relative z-10 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/30 rounded-xl p-2 flex items-center justify-around text-center">
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">NET WEIGHT</span>
            <span className="text-xs font-black text-white">1000G (2.2LBS)</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">SERVINGS</span>
            <span className="text-xs font-black text-emerald-400">33</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">PROTEIN / SCOOP</span>
            <span className="text-xs font-black text-amber-400">26.8G</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. L-CITRULLINE (Exact visual replica of poster 3)
  if (productId === 'citrulline') {
    return (
      <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 border border-rose-900/40 p-4 shadow-2xl flex flex-col justify-between group-hover:border-rose-500/50 transition-all duration-300">
        {/* Background glowing electrical ring */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/40 via-slate-950 to-black pointer-events-none" />
        
        {/* Poster Top Banner */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-rose-300 bg-rose-950/90 border border-rose-800 px-2.5 py-0.5 rounded-full mb-1">
            <Zap size={12} />
            <span>PURITY 99.9% • NO MALATE</span>
          </div>
          <h4 className="text-base font-black text-white tracking-wider uppercase leading-none">
            L-CITRULLINE
          </h4>
          <span className="text-[9px] font-extrabold text-rose-400 tracking-widest uppercase mt-0.5">
            PURE STRENGTH. MAX PERFORMANCE.
          </span>
        </div>

        {/* Center Product Jar */}
        <div className="relative z-10 my-auto flex items-center justify-center">
          {/* Left Feature Badges */}
          <div className="hidden sm:flex flex-col gap-1.5 absolute left-2 z-20 text-[9px] font-bold text-slate-300">
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-rose-400">
              🩸 Blood Flow
            </span>
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-amber-400">
              💪 Pump & Endurance
            </span>
          </div>

          {/* 3D Jar */}
          <div className="w-36 h-44 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-rose-500/50 shadow-2xl flex flex-col items-center justify-between p-2.5 relative transform group-hover:scale-105 transition-transform duration-500">
            {/* Lid */}
            <div className="w-full h-6 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-lg shadow flex items-center justify-center">
              <div className="w-14 h-1 bg-slate-400 rounded-full" />
            </div>

            {/* Label */}
            <div className="w-full my-auto bg-gradient-to-br from-rose-950 via-slate-900 to-black rounded-xl p-2 border border-rose-500/40 text-center flex flex-col items-center justify-center shadow-inner">
              <span className="text-[9px] font-black uppercase text-rose-400 tracking-widest">M.G. REFOTS</span>
              <span className="text-xs font-black text-white tracking-tight my-0.5">L-CITRULLINE</span>
              <div className="bg-rose-500/20 border border-rose-500/40 rounded px-1.5 py-0.5 my-0.5">
                <span className="text-[7px] font-black text-rose-300 uppercase">3000MG / SERVING</span>
              </div>
              <span className="text-[7px] font-bold text-slate-400 uppercase">100% PURE POWDER</span>
            </div>

            {/* Jar Footer */}
            <div className="w-full bg-slate-900/90 rounded-lg py-0.5 px-1 flex justify-between items-center text-[7px] font-black text-rose-400">
              <span>90G</span>
              <span>30 SERV</span>
              <span>3000MG</span>
            </div>
          </div>

          {/* Right Feature Badges */}
          <div className="hidden sm:flex flex-col gap-1.5 absolute right-2 z-20 text-[9px] font-bold text-slate-300">
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-emerald-400">
              ⚡ Recovery
            </span>
            <span className="bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1 text-sky-400">
              🏆 Max Results
            </span>
          </div>
        </div>

        {/* Poster Bottom Bar */}
        <div className="relative z-10 bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border border-rose-500/30 rounded-xl p-2 flex items-center justify-around text-center">
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">NET WEIGHT</span>
            <span className="text-xs font-black text-white">90G</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">SERVINGS</span>
            <span className="text-xs font-black text-rose-400">30</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">PER SERVING</span>
            <span className="text-xs font-black text-amber-400">3000MG</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. L-CARNITINE
  if (productId === 'l-carnitine') {
    return (
      <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 border border-orange-900/40 p-4 shadow-2xl flex flex-col justify-between group-hover:border-orange-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/40 via-slate-950 to-black pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-orange-300 bg-orange-950/90 border border-orange-800 px-2.5 py-0.5 rounded-full mb-1">
            <Flame size={12} />
            <span>750MG / SERVING • FAT OXIDATION</span>
          </div>
          <h4 className="text-base font-black text-white tracking-wider uppercase leading-none">
            L-CARNITINE
          </h4>
          <span className="text-[9px] font-extrabold text-orange-400 tracking-widest uppercase mt-0.5">
            CELLULAR ENERGY & STAMINA MATRIX
          </span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <div className="w-32 h-44 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-orange-500/50 shadow-2xl flex flex-col items-center justify-between p-2.5 relative transform group-hover:scale-105 transition-transform duration-500">
            <div className="w-16 h-6 bg-gradient-to-r from-orange-600 via-amber-400 to-orange-600 rounded-md shadow flex items-center justify-center">
              <div className="w-10 h-1 bg-orange-950/50 rounded-full" />
            </div>

            <div className="w-full my-auto bg-gradient-to-br from-orange-950 via-slate-900 to-black rounded-xl p-2 border border-orange-500/40 text-center flex flex-col items-center justify-center shadow-inner">
              <span className="text-[9px] font-black uppercase text-orange-400 tracking-widest">MGREFOTS</span>
              <span className="text-xs font-black text-white tracking-tight my-0.5">L-CARNITINE</span>
              <div className="bg-orange-500/20 border border-orange-500/40 rounded px-1.5 py-0.5 my-0.5">
                <span className="text-[7px] font-black text-orange-300 uppercase">750MG FORMULA</span>
              </div>
              <span className="text-[7px] font-bold text-slate-400 uppercase">60 CAPSULES</span>
            </div>

            <div className="w-full bg-slate-900/90 rounded-lg py-0.5 px-1 flex justify-between items-center text-[7px] font-black text-orange-400">
              <span>60 CAPS</span>
              <span>30 SERV</span>
              <span>750MG</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-gradient-to-r from-orange-950 via-slate-900 to-orange-950 border border-orange-500/30 rounded-xl p-2 flex items-center justify-around text-center">
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">CAPSULES</span>
            <span className="text-xs font-black text-white">60</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">SERVINGS</span>
            <span className="text-xs font-black text-orange-400">30</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">DOSAGE</span>
            <span className="text-xs font-black text-amber-400">750MG</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. B-COMPLEX
  if (productId === 'b-complex') {
    return (
      <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 border border-purple-900/40 p-4 shadow-2xl flex flex-col justify-between group-hover:border-purple-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-950/40 via-slate-950 to-black pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase text-purple-300 bg-purple-950/90 border border-purple-800 px-2.5 py-0.5 rounded-full mb-1">
            <Zap size={12} />
            <span>FULL B-SPECTRUM + VIT C 60MG</span>
          </div>
          <h4 className="text-base font-black text-white tracking-wider uppercase leading-none">
            B-COMPLEX
          </h4>
          <span className="text-[9px] font-extrabold text-purple-400 tracking-widest uppercase mt-0.5">
            HIGH POTENCY NEURO & ENERGY SHIELD
          </span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <div className="w-32 h-44 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-purple-500/50 shadow-2xl flex flex-col items-center justify-between p-2.5 relative transform group-hover:scale-105 transition-transform duration-500">
            <div className="w-16 h-6 bg-gradient-to-r from-purple-600 via-indigo-400 to-purple-600 rounded-md shadow flex items-center justify-center">
              <div className="w-10 h-1 bg-purple-950/50 rounded-full" />
            </div>

            <div className="w-full my-auto bg-gradient-to-br from-purple-950 via-slate-900 to-black rounded-xl p-2 border border-purple-500/40 text-center flex flex-col items-center justify-center shadow-inner">
              <span className="text-[9px] font-black uppercase text-purple-400 tracking-widest">MGREFOTS</span>
              <span className="text-xs font-black text-white tracking-tight my-0.5">B-COMPLEX</span>
              <div className="bg-purple-500/20 border border-purple-500/40 rounded px-1.5 py-0.5 my-0.5">
                <span className="text-[7px] font-black text-purple-300 uppercase">+ VIT C 60MG</span>
              </div>
              <span className="text-[7px] font-bold text-slate-400 uppercase">NON-GMO · GLUTEN FREE</span>
            </div>

            <div className="w-full bg-slate-900/90 rounded-lg py-0.5 px-1 flex justify-between items-center text-[7px] font-black text-purple-400">
              <span>60 CAPS</span>
              <span>B12 1000MCG</span>
              <span>BIOTIN</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 border border-purple-500/30 rounded-xl p-2 flex items-center justify-around text-center">
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">CAPSULES</span>
            <span className="text-xs font-black text-white">60</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">VITAMIN B12</span>
            <span className="text-xs font-black text-purple-300">1000MCG</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div>
            <span className="block text-[8px] font-bold text-slate-400 uppercase">BIOTIN B7</span>
            <span className="text-xs font-black text-amber-400">1000MCG</span>
          </div>
        </div>
      </div>
    );
  }

  // 6. C-ZINC
  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-950 border border-sky-900/40 p-4 shadow-2xl flex flex-col justify-between group-hover:border-sky-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-950/40 via-slate-950 to-black pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-1 text-[10px] font-black uppercase text-sky-300 bg-sky-950/90 border border-sky-800 px-2.5 py-0.5 rounded-full mb-1">
          <ShieldCheck size={12} />
          <span>1000MG C + 20MG ZINC BISGLYCINATE</span>
        </div>
        <h4 className="text-base font-black text-white tracking-wider uppercase leading-none">
          C-ZINC
        </h4>
        <span className="text-[9px] font-extrabold text-sky-400 tracking-widest uppercase mt-0.5">
          IMMUNITY & ANTIOXIDANT SHIELD
        </span>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-center">
        <div className="w-32 h-44 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-sky-500/50 shadow-2xl flex flex-col items-center justify-between p-2.5 relative transform group-hover:scale-105 transition-transform duration-500">
          <div className="w-16 h-6 bg-gradient-to-r from-sky-600 via-blue-400 to-sky-600 rounded-md shadow flex items-center justify-center">
            <div className="w-10 h-1 bg-sky-950/50 rounded-full" />
          </div>

          <div className="w-full my-auto bg-gradient-to-br from-sky-950 via-slate-900 to-black rounded-xl p-2 border border-sky-500/40 text-center flex flex-col items-center justify-center shadow-inner">
            <span className="text-[9px] font-black uppercase text-sky-400 tracking-widest">MGREFOTS</span>
            <span className="text-xs font-black text-white tracking-tight my-0.5">C-ZINC</span>
            <div className="bg-sky-500/20 border border-sky-500/40 rounded px-1.5 py-0.5 my-0.5">
              <span className="text-[7px] font-black text-sky-300 uppercase">20MG ZINC CHELATE</span>
            </div>
            <span className="text-[7px] font-bold text-slate-400 uppercase">30 VEGAN CAPS</span>
          </div>

          <div className="w-full bg-slate-900/90 rounded-lg py-0.5 px-1 flex justify-between items-center text-[7px] font-black text-sky-400">
            <span>30 CAPS</span>
            <span>1000MG C</span>
            <span>20MG ZINC</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 border border-sky-500/30 rounded-xl p-2 flex items-center justify-around text-center">
        <div>
          <span className="block text-[8px] font-bold text-slate-400 uppercase">CAPSULES</span>
          <span className="text-xs font-black text-white">30</span>
        </div>
        <div className="w-px h-6 bg-slate-800" />
        <div>
          <span className="block text-[8px] font-bold text-slate-400 uppercase">VITAMIN C</span>
          <span className="text-xs font-black text-sky-300">1000MG</span>
        </div>
        <div className="w-px h-6 bg-slate-800" />
        <div>
          <span className="block text-[8px] font-bold text-slate-400 uppercase">ZINC BISGLYCINATE</span>
          <span className="text-xs font-black text-amber-400">20MG</span>
        </div>
      </div>
    </div>
  );
};
