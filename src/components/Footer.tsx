import { GithubIcon } from './GithubIcon';

interface FooterProps {
  repoUrl: string;
}

export const Footer = ({ repoUrl }: FooterProps) => {
  return (
    <footer className="relative border-t border-white/10 py-12 px-6 select-none bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-zinc-300 font-semibold uppercase tracking-wider">
            Antigravity Particles
          </span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-mono text-[11px] text-zinc-600">
            REACT 19 • VITE • CANVAS 2D • TAILWIND
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
