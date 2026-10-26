import React from 'react';
import { Sliders, Sparkles, Network, Play, Pause, Zap } from 'lucide-react';
import type { ParticleConfig, PaletteType, PhysicsMode } from '../types/particles';

interface PlaygroundControlsProps {
  config: ParticleConfig;
  onChange: (updater: (prev: ParticleConfig) => ParticleConfig) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const PlaygroundControls: React.FC<PlaygroundControlsProps> = ({
  config,
  onChange,
  isOpen,
  onToggleOpen,
}) => {
  const palettes: { key: PaletteType; label: string; bg: string }[] = [
    { key: 'cyan', label: 'Cyan', bg: 'bg-cyan-500' },
    { key: 'violet', label: 'Violet', bg: 'bg-purple-500' },
    { key: 'emerald', label: 'Emerald', bg: 'bg-emerald-500' },
    { key: 'white', label: 'White', bg: 'bg-slate-100' },
  ];

  const modes: { key: PhysicsMode; label: string }[] = [
    { key: 'repel', label: 'Repel' },
    { key: 'gravity', label: 'Gravity' },
    { key: 'flow', label: 'Vortex' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Control Drawer */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-zinc-950/90 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl shadow-black/80 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>PARTICLE ENGINE CONFIG</span>
            </div>
            <button
              onClick={() => onChange((prev) => ({ ...prev, isPaused: !prev.isPaused }))}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title={config.isPaused ? 'Resume' : 'Pause'}
            >
              {config.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            {/* Physics Mode Selector */}
            <div>
              <label className="block mb-1.5 font-medium text-zinc-400">Physics Reaction Mode</label>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
                {modes.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => onChange((prev) => ({ ...prev, mode: m.key }))}
                    className={`py-1.5 rounded-lg font-medium transition-all ${
                      config.mode === m.key
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette Selector */}
            <div>
              <label className="block mb-1.5 font-medium text-zinc-400">Color Spectrum</label>
              <div className="flex gap-2">
                {palettes.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => onChange((prev) => ({ ...prev, palette: p.key }))}
                    className={`flex-1 py-1.5 px-2 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                      config.palette === p.key
                        ? 'border-white/40 bg-white/10 text-white'
                        : 'border-white/10 bg-black/40 text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${p.bg}`} />
                    <span className="text-[11px]">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Particle Count Slider */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-zinc-400">Particle Density</span>
                <span className="font-mono text-cyan-400">{config.particleCount}</span>
              </div>
              <input
                type="range"
                min="30"
                max="160"
                step="5"
                value={config.particleCount}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, particleCount: Number(e.target.value) }))
                }
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Repel Radius Slider */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-zinc-400">Repel Radius</span>
                <span className="font-mono text-cyan-400">{config.repelRadius}px</span>
              </div>
              <input
                type="range"
                min="70"
                max="260"
                step="10"
                value={config.repelRadius}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, repelRadius: Number(e.target.value) }))
                }
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Speed Multiplier */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-zinc-400">Drift Velocity</span>
                <span className="font-mono text-cyan-400">{config.speedMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.2"
                value={config.speedMultiplier}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, speedMultiplier: Number(e.target.value) }))
                }
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() =>
                  onChange((prev) => ({ ...prev, connectionsEnabled: !prev.connectionsEnabled }))
                }
                className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg border text-[11px] font-medium transition-colors ${
                  config.connectionsEnabled
                    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                    : 'border-white/10 bg-black/40 text-zinc-400'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>Mesh Lines</span>
              </button>

              <button
                onClick={() =>
                  onChange((prev) => ({ ...prev, sparksEnabled: !prev.sparksEnabled }))
                }
                className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg border text-[11px] font-medium transition-colors ${
                  config.sparksEnabled
                    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                    : 'border-white/10 bg-black/40 text-zinc-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cursor Sparks</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Pill Button */}
      <button
        onClick={onToggleOpen}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/15 text-white/90 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-300 active:scale-95"
      >
        <Sliders className="w-4 h-4 text-cyan-400 transition-transform duration-300 group-hover:rotate-45" />
        <span className="text-xs font-semibold tracking-wider uppercase">
          {isOpen ? 'Close Config' : 'Customize Physics'}
        </span>
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      </button>
    </div>
  );
};
