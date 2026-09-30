'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const CELL_SIZE = 18;
const INITIAL_SPEED = 150;

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const getSnakeHighScore = (): number => {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem('snake-high-score');
  return saved ? parseInt(saved) : 0;
};

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => getSnakeHighScore());
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const directionRef = useRef(direction);
  
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        
        switch (directionRef.current) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setIsGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setIsGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        if (head.x === food.x && head.y === food.y) {
          setScore(s => {
            const newScore = s + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('snake-high-score', newScore.toString());
            }
            return newScore;
          });
          setFood(generateFood(newSnake));
          setSpeed(s => Math.max(50, s - 5));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [isPlaying, isGameOver, food, generateFood, highScore, speed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying && !isGameOver && e.key === ' ') {
        setIsPlaying(true);
        return;
      }

      const keyDirectionMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        s: 'DOWN',
        a: 'LEFT',
        d: 'RIGHT',
      };

      const newDirection = keyDirectionMap[e.key];
      if (!newDirection) return;

      const opposites: Record<Direction, Direction> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      };

      if (opposites[newDirection] !== directionRef.current) {
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);

    // Grid dots
    ctx.fillStyle = '#1f1f1f';
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.beginPath();
        ctx.arc(i * CELL_SIZE + CELL_SIZE / 2, j * CELL_SIZE + CELL_SIZE / 2, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#e5e5e5' : '#737373';
      ctx.beginPath();
      ctx.roundRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        3
      );
      ctx.fill();
    });

    // Food
    ctx.fillStyle = '#a3a3a3';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [snake, food]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsGameOver(false);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isGameOver) {
      resetGame();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="min-h-screen bg-neutrals-900 text-neutrals-50 py-32">
      <Container>
        {/* Header */}
        <div className="max-w-md mx-auto mb-12">
          <Link href="/games" className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors">
            ← Games
          </Link>
          <h1 className="text-3xl font-medium text-neutrals-100 mt-4 mb-2">Snake</h1>
          <p className="text-neutrals-500 text-sm">Arrow keys or WASD to move</p>
        </div>

        {/* Stats */}
        <div className="max-w-md mx-auto mb-8 flex justify-between text-sm border-b border-neutrals-800 pb-4">
          <div>
            <span className="text-neutrals-500">Score</span>
            <p className="text-neutrals-200 font-mono">{score}</p>
          </div>
          <div>
            <span className="text-neutrals-500">Length</span>
            <p className="text-neutrals-200 font-mono">{snake.length}</p>
          </div>
          <div>
            <span className="text-neutrals-500">Best</span>
            <p className="text-neutrals-200 font-mono">{highScore}</p>
          </div>
        </div>

        {/* Game Canvas */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="rounded-lg"
            />
            
            {(!isPlaying || isGameOver) && (
              <div className="absolute inset-0 bg-black/80 rounded-lg flex flex-col items-center justify-center">
                {isGameOver ? (
                  <>
                    <p className="text-neutrals-500 text-sm uppercase tracking-wider mb-1">Game Over</p>
                    <p className="text-neutrals-200 font-mono text-2xl mb-6">{score}</p>
                  </>
                ) : (
                  <p className="text-neutrals-500 text-sm mb-6">Press space to start</p>
                )}
                <button
                  onClick={togglePlay}
                  className="px-6 py-2 text-sm bg-neutrals-800 hover:bg-neutrals-700 text-neutrals-200 rounded-lg transition-colors"
                >
                  {isGameOver ? 'Try again' : 'Start'}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Mobile Controls */}
        <div className="flex justify-center mb-8 md:hidden">
          <div className="grid grid-cols-3 gap-2">
            <div />
            <button
              onClick={() => direction !== 'DOWN' && setDirection('UP')}
              className="p-4 bg-neutrals-800 rounded-lg active:bg-neutrals-700 text-neutrals-400"
            >
              ↑
            </button>
            <div />
            <button
              onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
              className="p-4 bg-neutrals-800 rounded-lg active:bg-neutrals-700 text-neutrals-400"
            >
              ←
            </button>
            <button
              onClick={() => direction !== 'UP' && setDirection('DOWN')}
              className="p-4 bg-neutrals-800 rounded-lg active:bg-neutrals-700 text-neutrals-400"
            >
              ↓
            </button>
            <button
              onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
              className="p-4 bg-neutrals-800 rounded-lg active:bg-neutrals-700 text-neutrals-400"
            >
              →
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={togglePlay}
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
