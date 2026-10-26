export type PaletteType = 'cyan' | 'violet' | 'emerald' | 'white';

export type PhysicsMode = 'repel' | 'gravity' | 'flow';

export interface ParticleConfig {
  particleCount: number;
  speedMultiplier: number;
  repelRadius: number;
  connectionDistance: number;
  connectionsEnabled: boolean;
  sparksEnabled: boolean;
  palette: PaletteType;
  mode: PhysicsMode;
  isPaused: boolean;
}

export interface PaletteColors {
  primary: string;
  glow: string;
  spark: string;
  line: string;
  spotlight: string;
}

export const PALETTES: Record<PaletteType, PaletteColors> = {
  cyan: {
    primary: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.45)',
    spark: '#67e8f9',
    line: 'rgba(6, 182, 212,',
    spotlight: 'rgba(6, 182, 212, 0.12)',
  },
  violet: {
    primary: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.45)',
    spark: '#d8b4fe',
    line: 'rgba(168, 85, 247,',
    spotlight: 'rgba(168, 85, 247, 0.12)',
  },
  emerald: {
    primary: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
    spark: '#6ee7b7',
    line: 'rgba(16, 185, 129,',
    spotlight: 'rgba(16, 185, 129, 0.12)',
  },
  white: {
    primary: '#f8fafc',
    glow: 'rgba(248, 250, 252, 0.35)',
    spark: '#ffffff',
    line: 'rgba(255, 255, 255,',
    spotlight: 'rgba(255, 255, 255, 0.08)',
  },
};
