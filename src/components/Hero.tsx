import React from 'react';
import { ArrowUpRight, Sparkles, MousePointer } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenControls: () => void;
  paletteColor: string;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenControls }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 text-center select-none">
      {/* Top Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-white/10 text-xs font-mono text-zinc-300 mb-8 backdrop-blur-xl animate-fade-in shadow-[0_0_20px_rgba(6,182,212,0.1)]">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>INTERACTIVE ZERO-GRAVITY CANVAS</span>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <span className="text-cyan-400">PURE OLED BLACK</span>
      </div>

      {/* Main Massive Title */}
      <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-6 text-gradient-cyan">
        THE ART OF DIGITAL MOTION & CODE
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed mb-10">
        Ультрасовременный холст с частицами в открытом космосе. Водите мышкой, расталкивайте созвездия,
        создавайте гравитационные всплески кликом и настраивайте физику в реальном времени.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <button
          onClick={onOpenControls}
          className="group relative px-6 py-3.5 rounded-xl bg-cyan-500 text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] active:scale-95 flex items-center gap-2"
        >
          <MousePointer className="w-4 h-4 text-black transition-transform group-hover:-translate-y-0.5" />
          <span>Настроить физику</span>
        </button>

        <button
          onClick={onExploreClick}
          className="px-6 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/15 hover:border-white/30 text-white font-medium text-sm transition-all duration-300 hover:shadow-xl active:scale-95 flex items-center gap-2"
        >
          <span>Архитектура и возможности</span>
          <ArrowUpRight className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      {/* Interactive Cursor Hint */}
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs text-zinc-400 backdrop-blur-md">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>Пошевелите курсором или кликните в любое место для взрыва искр</span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 mt-20 pt-10 border-t border-white/10 max-w-4xl w-full">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-white">60 FPS</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">V-Sync Render</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400">0 ms</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Input Latency</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-white">100%</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">OLED Black</div>
        </div>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-mono font-bold text-purple-400">0G</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Physics Inertia</div>
        </div>
      </div>
    </section>
  );
};
