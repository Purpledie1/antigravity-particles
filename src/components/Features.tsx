import React from 'react';
import { TiltCard } from './TiltCard';
import { Orbit, Cpu, Share2, Sparkles, SlidersHorizontal, Touchpad } from 'lucide-react';
import { PALETTES, type PaletteType } from '../types/particles';

interface FeaturesProps {
  palette: PaletteType;
}

export const Features: React.FC<FeaturesProps> = ({ palette }) => {
  const currentPalette = PALETTES[palette];

  const features = [
    {
      icon: Orbit,
      tag: 'PHYSICS ENGINE',
      title: 'Динамическая невесомость',
      description:
        'Истинная физика частиц: отталкивание по нормали к курсору, гравитационное притяжение или вихревой поток с инерцией скорости мыши.',
    },
    {
      icon: Cpu,
      tag: 'CANVAS 60 FPS',
      title: 'Нулевой оверхед',
      description:
        'Оптимизированный цикл requestAnimationFrame без лишних ре-рендеров React. Поддержка High-DPI (Retina) для максимальной четкости.',
    },
    {
      icon: Share2,
      tag: 'CONSTELLATIONS',
      title: 'Адаптивная паутинка связей',
      description:
        'Алгоритм евклидова расстояния непрерывно связывает близлежащие точки и сам курсор в живые световые созвездия.',
    },
    {
      icon: Sparkles,
      tag: 'LIGHT & SPARKS',
      title: 'Шлейф искр и мягкий спотлайт',
      description:
        'Радиальный ореол за курсором подсвечивает карточки, а при резких движениях и кликах рождаются микро-искры с затуханием.',
    },
    {
      icon: SlidersHorizontal,
      tag: 'LIVE CONTROLS',
      title: 'Панель живой настройки',
      description:
        'Интерактивный пульт позволяет прямо на лету менять плотность точек, радиус действия, скорость дрейфа и цветовой спектр.',
    },
    {
      icon: Touchpad,
      tag: 'RESPONSIVE TOUCH',
      title: 'Полная поддержка тач-экранов',
      description:
        'Единая обработка событий Pointer API гарантирует плавную работу как с мышкой на ПК, так и жестами на смартфонах и планшетах.',
    },
  ];

  return (
    <section id="features" className="relative max-w-7xl mx-auto px-6 py-24 select-none">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
          // ARCHITECTURE & INTERACTION
        </h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Как устроена магия интерфейса
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <TiltCard key={idx} glowColor={currentPalette.spotlight}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item.description}</p>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
};
