import { useState } from 'react';
import { InteractiveBackground } from './components/InteractiveBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { PlaygroundControls } from './components/PlaygroundControls';
import { PALETTES, type ParticleConfig } from './types/particles';

const GITHUB_REPO_URL = 'https://github.com/Purpledie1/antigravity-particles';

export function App() {
  const [config, setConfig] = useState<ParticleConfig>({
    particleCount: 85,
    speedMultiplier: 1.0,
    repelRadius: 150,
    connectionDistance: 115,
    connectionsEnabled: true,
    sparksEnabled: true,
    palette: 'cyan',
    mode: 'repel',
    isPaused: false,
  });

  const [fps, setFps] = useState<number>(60);
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(false);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white font-sans overflow-x-hidden">
      {/* Interactive 60 FPS Canvas in the Background */}
      <InteractiveBackground config={config} onFpsUpdate={setFps} />

      {/* Subtle OLED Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-40 z-[1]" />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header fps={fps} repoUrl={GITHUB_REPO_URL} />
        <main className="flex-1">
          <Hero
            onExploreClick={scrollToFeatures}
            onOpenControls={() => setIsControlsOpen(true)}
            paletteColor={PALETTES[config.palette].primary}
          />
          <Features palette={config.palette} />
        </main>
        <Footer repoUrl={GITHUB_REPO_URL} />
      </div>

      {/* Floating Real-time Controls Dock */}
      <PlaygroundControls
        config={config}
        onChange={setConfig}
        isOpen={isControlsOpen}
        onToggleOpen={() => setIsControlsOpen(!isControlsOpen)}
      />
    </div>
  );
}

export default App;
