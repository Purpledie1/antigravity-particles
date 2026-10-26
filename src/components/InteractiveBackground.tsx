import React, { useEffect, useRef } from 'react';
import { PALETTES, type ParticleConfig } from '../types/particles';

interface InteractiveBackgroundProps {
  config: ParticleConfig;
  onFpsUpdate?: (fps: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  pulsePhase: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  config,
  onFpsUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Track mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      vx: 0,
      vy: 0,
      lastMoveX: -1000,
      lastMoveY: -1000,
      isHovered: false,
      isDown: false,
    };

    // Particles and Sparks pools
    let particles: Particle[] = [];
    let sparks: Spark[] = [];

    // FPS measurement
    let frameCount = 0;
    let lastFpsUpdateTime = performance.now();

    // Check system prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize/Resize canvas buffer
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initParticles();
    };

    // Initialize particle cloud
    const initParticles = () => {
      particles = [];
      const count = prefersReducedMotion ? Math.min(config.particleCount, 40) : config.particleCount;

      for (let i = 0; i < count; i++) {
        const baseSpeed = (0.2 + Math.random() * 0.4) * config.speedMultiplier;
        const angle = Math.random() * Math.PI * 2;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * baseSpeed,
          vy: Math.sin(angle) * baseSpeed,
          baseVx: Math.cos(angle) * baseSpeed,
          baseVy: Math.sin(angle) * baseSpeed,
          radius: 1.2 + Math.random() * 1.6,
          alpha: 0.35 + Math.random() * 0.55,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Pointer event listeners
    const handlePointerMove = (e: PointerEvent) => {
      const prevX = mouse.targetX;
      const prevY = mouse.targetY;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;

      // Mouse velocity
      mouse.vx = (e.clientX - prevX) * 0.35;
      mouse.vy = (e.clientY - prevY) * 0.35;

      // Spawn sparks if enabled
      if (config.sparksEnabled && !config.isPaused) {
        const moveDist = Math.hypot(e.clientX - mouse.lastMoveX, e.clientY - mouse.lastMoveY);
        if (moveDist > 6) {
          mouse.lastMoveX = e.clientX;
          mouse.lastMoveY = e.clientY;

          const sparkCount = Math.min(Math.floor(moveDist / 6), 3);
          for (let s = 0; s < sparkCount; s++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2.5;
            sparks.push({
              x: e.clientX,
              y: e.clientY,
              vx: Math.cos(angle) * speed + mouse.vx * 0.2,
              vy: Math.sin(angle) * speed + mouse.vy * 0.2,
              radius: 1.0 + Math.random() * 2.0,
              alpha: 0.8 + Math.random() * 0.2,
              decay: 0.02 + Math.random() * 0.025,
            });
          }
        }
      }
    };

    const handlePointerDown = () => {
      mouse.isDown = true;
      // Pulse explosion on click
      if (!config.isPaused) {
        for (let s = 0; s < 14; s++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 4;
          sparks.push({
            x: mouse.targetX,
            y: mouse.targetY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 1.5 + Math.random() * 2.5,
            alpha: 1,
            decay: 0.025 + Math.random() * 0.02,
          });
        }
      }
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
    };

    const handlePointerLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.body.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    resize();

    // Render loop
    const render = (now: number) => {
      // Calculate FPS
      frameCount++;

      if (now - lastFpsUpdateTime >= 500) {
        const calculatedFps = Math.round((frameCount * 1000) / (now - lastFpsUpdateTime));
        onFpsUpdate?.(Math.min(calculatedFps, 60));
        frameCount = 0;
        lastFpsUpdateTime = now;
      }

      // Smooth mouse lerp (inertia)
      if (mouse.isHovered) {
        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;
        mouse.vx *= 0.9;
        mouse.vy *= 0.9;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Deep Black Clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const palette = PALETTES[config.palette];

      // Draw Cursor Spotlight / Radial glow on background
      if (mouse.isHovered) {
        const spotlightRadius = mouse.isDown ? config.repelRadius * 1.5 : config.repelRadius * 1.25;
        const spotGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotlightRadius
        );
        spotGrad.addColorStop(0, palette.spotlight);
        spotGrad.addColorStop(0.5, palette.spotlight.replace(/[\d.]+\)$/, '0.04)'));
        spotGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update & Draw Particles
      const count = particles.length;
      const repelRad = config.repelRadius * (mouse.isDown ? 1.6 : 1.0);

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        if (!config.isPaused) {
          // Physics interaction with mouse
          if (mouse.isHovered) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < repelRad && dist > 0.01) {
              const force = (1 - dist / repelRad);
              const angle = Math.atan2(dy, dx);
              
              if (config.mode === 'repel') {
                const repStrength = force * 3.8;
                p.vx += Math.cos(angle) * repStrength + mouse.vx * 0.12;
                p.vy += Math.sin(angle) * repStrength + mouse.vy * 0.12;
              } else if (config.mode === 'gravity') {
                const gravStrength = force * 2.8;
                p.vx -= Math.cos(angle) * gravStrength;
                p.vy -= Math.sin(angle) * gravStrength;
              } else if (config.mode === 'flow') {
                // Orbital swirl flow
                const tangentAngle = angle + Math.PI / 2;
                const flowStrength = force * 3.2;
                p.vx += Math.cos(tangentAngle) * flowStrength + mouse.vx * 0.1;
                p.vy += Math.sin(tangentAngle) * flowStrength + mouse.vy * 0.1;
              }
            }
          }

          // Damping and natural drift return
          p.vx = p.vx * 0.94 + p.baseVx * 0.06;
          p.vy = p.vy * 0.94 + p.baseVy * 0.06;

          // Apply position delta
          p.x += p.vx;
          p.y += p.vy;

          // Screen wrap-around with smooth boundary margins
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          p.pulsePhase += 0.025;
        }

        // Draw particle
        const pulse = Math.sin(p.pulsePhase) * 0.15;
        const currentAlpha = Math.max(0.1, Math.min(1, p.alpha + pulse));

        ctx.fillStyle = palette.primary;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra soft glow around larger particles
        if (p.radius > 2.0) {
          ctx.fillStyle = palette.glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Proximity Connection Lines
      if (config.connectionsEnabled) {
        ctx.lineWidth = 0.8;
        const connDist = config.connectionDistance;

        for (let i = 0; i < count; i++) {
          const p1 = particles[i];

          // Particle-to-mouse connection lines
          if (mouse.isHovered) {
            const mDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
            if (mDist < connDist * 1.1) {
              const alpha = (1 - mDist / (connDist * 1.1)) * 0.45;
              ctx.strokeStyle = `${palette.line} ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }

          // Particle-to-particle mesh lines
          for (let j = i + 1; j < count; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

            if (dist < connDist) {
              const alpha = (1 - dist / connDist) * 0.28;
              ctx.strokeStyle = `${palette.line} ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Update & Draw Sparks
      if (sparks.length > 0) {
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];

          if (!config.isPaused) {
            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.94;
            s.vy *= 0.94;
            s.alpha -= s.decay;
          }

          if (s.alpha <= 0) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.fillStyle = palette.spark;
          ctx.globalAlpha = Math.max(0, s.alpha);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * s.alpha, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Reset global alpha
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [config, onFpsUpdate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
};
