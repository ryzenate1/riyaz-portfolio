'use client';

import { useCallback } from 'react';
import { Particles } from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

function StarsBackground() {
  const initializeParticleEngine = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      options={{
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 2000,
            },
          },
          color: {
            value: '#FFFEF9',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: false,
            },
          },
          size: {
            value: 1.5,
            random: true,
            anim: {
              enable: false,
            },
          },
          move: {
            enable: false,
          },
        },
        fullScreen: false,
        detectRetina: true,
        fpsLimit: 30,
      }}
      init={initializeParticleEngine}
      className="pointer-events-none absolute inset-0 -z-10 mask-x-from-80%"
    />
  );
}

export { StarsBackground };
