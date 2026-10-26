import { Activity } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface HeaderProps {
  fps: number;
  repoUrl: string;
}

export const Header = ({ fps, repoUrl }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-black border border-white/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute opacity-75" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>
          <div>
            <span className="font-extrabold tracking-widest text-sm text-white uppercase">
              Antigravity
            </span>
            <span className="text-xs text-zinc-500 font-mono ml-2 hidden sm:inline">
              // 0G-CANVAS
            </span>
          </div>
        </div>

        {/* Center Live FPS Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/70 border border-white/10 backdrop-blur-md">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-zinc-300">
            {fps} <span className="text-zinc-500">FPS</span>
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              fps >= 55 ? 'bg-emerald-400' : fps >= 30 ? 'bg-amber-400' : 'bg-rose-400'
            }`}
          />
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-cyan-500/50 text-xs font-medium text-white transition-all duration-200"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
