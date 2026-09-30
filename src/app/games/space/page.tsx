'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

const CANVAS_WIDTH = 380;
const CANVAS_HEIGHT = 560;

type GameObject = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed?: number;
};

type Asteroid = GameObject & {
  id: number;
  rotation: number;
  rotationSpeed: number;
};

type Bullet = GameObject & {
  id: number;
};

const getSpaceHighScore = (): number => {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem('space-high-score');
  return saved ? parseInt(saved) : 0;
};

export default function SpaceGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => getSpaceHighScore());
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const playerRef = useRef<GameObject>({ x: CANVAS_WIDTH / 2 - 18, y: CANVAS_HEIGHT - 70, width: 36, height: 44 });
  const asteroidsRef = useRef<Asteroid[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const keysRef = useRef<Set<string>>(new Set());
  const lastShotRef = useRef(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const asteroidIdRef = useRef(0);
  const bulletIdRef = useRef(0);

  const spawnAsteroid = useCallback(() => {
    const size = 24 + Math.random() * 24;
    asteroidsRef.current.push({
      id: asteroidIdRef.current++,
      x: Math.random() * (CANVAS_WIDTH - size),
      y: -size,
      width: size,
      height: size,
      speed: 2 + Math.random() * 2 + level * 0.5,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
    });
  }, [level]);

  const shoot = useCallback(() => {
    const now = Date.now();
    if (now - lastShotRef.current < 200) return;
    lastShotRef.current = now;

    const player = playerRef.current;
    bulletsRef.current.push({
      id: bulletIdRef.current++,
      x: player.x + player.width / 2 - 2,
      y: player.y,
      width: 4,
      height: 12,
      speed: 10,
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (e.key === ' ' && isPlaying) {
        e.preventDefault();
        shoot();
      }
      if (e.key === ' ' && !isPlaying && !isGameOver) {
        setIsPlaying(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, isGameOver, shoot]);

  useEffect(() => {
    if (!isPlaying || isGameOver) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    let lastSpawn = Date.now();
    const spawnInterval = Math.max(500, 2000 - level * 200);

    const gameLoop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const player = playerRef.current;
      const speed = 6;
      if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a')) {
        player.x = Math.max(0, player.x - speed);
      }
      if (keysRef.current.has('ArrowRight') || keysRef.current.has('d')) {
        player.x = Math.min(CANVAS_WIDTH - player.width, player.x + speed);
      }

      if (Date.now() - lastSpawn > spawnInterval) {
        spawnAsteroid();
        lastSpawn = Date.now();
      }

      bulletsRef.current = bulletsRef.current.filter(bullet => {
        bullet.y -= bullet.speed!;
        return bullet.y > -bullet.height;
      });

      let scoreIncrease = 0;
      asteroidsRef.current = asteroidsRef.current.filter(asteroid => {
        asteroid.y += asteroid.speed!;
        asteroid.rotation += asteroid.rotationSpeed;

        const hitBullet = bulletsRef.current.find(bullet =>
          bullet.x < asteroid.x + asteroid.width &&
          bullet.x + bullet.width > asteroid.x &&
          bullet.y < asteroid.y + asteroid.height &&
          bullet.y + bullet.height > asteroid.y
        );

        if (hitBullet) {
          bulletsRef.current = bulletsRef.current.filter(b => b.id !== hitBullet.id);
          scoreIncrease += 10;
          return false;
        }

        if (
          player.x < asteroid.x + asteroid.width &&
          player.x + player.width > asteroid.x &&
          player.y < asteroid.y + asteroid.height &&
          player.y + player.height > asteroid.y
        ) {
          setLives(l => {
            if (l <= 1) {
              setIsGameOver(true);
              setIsPlaying(false);
              return 0;
            }
            return l - 1;
          });
          return false;
        }

        return asteroid.y < CANVAS_HEIGHT;
      });

      if (scoreIncrease > 0) {
        setScore(s => {
          const newScore = s + scoreIncrease;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('space-high-score', newScore.toString());
          }
          setLevel(Math.floor(newScore / 100) + 1);
          return newScore;
        });
      }

      // Draw - monochrome theme
      ctx.fillStyle = '#141414';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Subtle stars
      ctx.fillStyle = '#3f3f3f';
      for (let i = 0; i < 40; i++) {
        const x = (i * 97 + Date.now() * 0.008) % CANVAS_WIDTH;
        const y = (i * 71 + Date.now() * 0.015) % CANVAS_HEIGHT;
        ctx.fillRect(x, y, 1, 1);
      }

      // Player ship - grayscale
      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      
      ctx.fillStyle = '#e5e5e5';
      ctx.beginPath();
      ctx.moveTo(0, -player.height / 2);
      ctx.lineTo(-player.width / 2, player.height / 2);
      ctx.lineTo(0, player.height / 3);
      ctx.lineTo(player.width / 2, player.height / 2);
      ctx.closePath();
      ctx.fill();

      // Engine - subtle
      ctx.fillStyle = '#737373';
      ctx.beginPath();
      ctx.moveTo(-6, player.height / 3);
      ctx.lineTo(0, player.height / 2 + 8 + Math.random() * 4);
      ctx.lineTo(6, player.height / 3);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();

      // Bullets - light
      ctx.fillStyle = '#d4d4d4';
      bulletsRef.current.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });

      // Asteroids - gray
      asteroidsRef.current.forEach(asteroid => {
        ctx.save();
        ctx.translate(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
        ctx.rotate(asteroid.rotation);
        
        ctx.fillStyle = '#525252';
        ctx.beginPath();
        const sides = 7;
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2;
          const radius = asteroid.width / 2 * (0.8 + Math.sin(i * 3) * 0.2);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#3f3f3f';
        ctx.beginPath();
        ctx.arc(-4, -4, asteroid.width / 7, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isGameOver, level, highScore, spawnAsteroid]);

  const resetGame = () => {
    playerRef.current = { x: CANVAS_WIDTH / 2 - 18, y: CANVAS_HEIGHT - 70, width: 36, height: 44 };
    asteroidsRef.current = [];
    bulletsRef.current = [];
    setScore(0);
    setLives(3);
    setLevel(1);
    setIsGameOver(false);
    setIsPlaying(false);
  };

  const startGame = () => {
    if (isGameOver) resetGame();
    setIsPlaying(true);
  };

  return (
    <main className="min-h-screen bg-neutrals-900 text-neutrals-50 py-32">
      <Container>
        {/* Header */}
        <div className="max-w-md mx-auto mb-12">
          <Link href="/games" className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors">
            ← Games
          </Link>
          <h1 className="text-3xl font-medium text-neutrals-100 mt-4 mb-2">Space</h1>
          <p className="text-neutrals-500 text-sm">Arrow keys to move, space to shoot</p>
        </div>

        {/* Stats */}
        <div className="max-w-md mx-auto mb-8 flex justify-between text-sm border-b border-neutrals-800 pb-4">
          <div>
            <span className="text-neutrals-500">Score</span>
            <p className="text-neutrals-200 font-mono">{score}</p>
          </div>
          <div>
            <span className="text-neutrals-500">Level</span>
            <p className="text-neutrals-200 font-mono">{level}</p>
          </div>
          <div>
            <span className="text-neutrals-500">Lives</span>
            <p className="text-neutrals-200 font-mono">{lives}</p>
          </div>
          {highScore > 0 && (
            <div>
              <span className="text-neutrals-500">Best</span>
              <p className="text-neutrals-200 font-mono">{highScore}</p>
            </div>
          )}
        </div>

        {/* Game Canvas */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="rounded-lg"
            />
            
            {(!isPlaying || isGameOver) && (
              <div className="absolute inset-0 bg-black/80 rounded-lg flex flex-col items-center justify-center">
                {isGameOver ? (
                  <>
                    <p className="text-neutrals-500 text-sm uppercase tracking-wider mb-2">Game Over</p>
                    <p className="text-neutrals-200 font-mono text-2xl mb-6">{score}</p>
                  </>
                ) : (
                  <p className="text-neutrals-500 text-sm mb-6">Press space or tap to start</p>
                )}
                <button
                  onClick={startGame}
                  className="px-6 py-3 text-sm bg-neutrals-800 hover:bg-neutrals-700 text-neutrals-200 rounded-lg transition-colors"
                >
                  {isGameOver ? 'Play again' : 'Start'}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Mobile Controls */}
        <div className="flex justify-center gap-3 mb-8 md:hidden">
          <button
            onTouchStart={() => keysRef.current.add('ArrowLeft')}
            onTouchEnd={() => keysRef.current.delete('ArrowLeft')}
            className="p-5 bg-neutrals-800 rounded-lg active:bg-neutrals-700 text-neutrals-400"
          >
            ←
          </button>
          <button
            onTouchStart={() => shoot()}
            className="px-8 py-5 bg-neutrals-800 rounded-lg active:bg-neutrals-700 text-neutrals-400 text-sm"
          >
            Fire
          </button>
          <button
            onTouchStart={() => keysRef.current.add('ArrowRight')}
            onTouchEnd={() => keysRef.current.delete('ArrowRight')}
            className="p-5 bg-neutrals-800 rounded-lg active:bg-neutrals-700 text-neutrals-400"
          >
            →
          </button>
        </div>

        {/* Actions */}
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-1 py-3 text-sm text-neutrals-400 hover:text-neutrals-200 border border-neutrals-700 hover:border-neutrals-600 rounded-lg transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={resetGame}
            className="flex-1 py-3 text-sm text-neutrals-400 hover:text-neutrals-200 border border-neutrals-700 hover:border-neutrals-600 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </Container>
    </main>
  );
}
