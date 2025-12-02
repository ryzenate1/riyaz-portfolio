'use client';

import { Container } from '@/components/ui/container';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 3;

type Tile = {
  value: number;
  position: number;
};

function createPuzzle(): Tile[] {
  const tiles: Tile[] = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    tiles.push({ value: i, position: i });
  }
  return tiles;
}

function shufflePuzzle(tiles: Tile[]): Tile[] {
  const shuffled = [...tiles];
  for (let i = 0; i < 100; i++) {
    const emptyTile = shuffled.find(t => t.value === 0)!;
    const emptyPos = emptyTile.position;
    const emptyRow = Math.floor(emptyPos / GRID_SIZE);
    const emptyCol = emptyPos % GRID_SIZE;
    
    const validMoves: number[] = [];
    if (emptyRow > 0) validMoves.push(emptyPos - GRID_SIZE);
    if (emptyRow < GRID_SIZE - 1) validMoves.push(emptyPos + GRID_SIZE);
    if (emptyCol > 0) validMoves.push(emptyPos - 1);
    if (emptyCol < GRID_SIZE - 1) validMoves.push(emptyPos + 1);
    
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
    const tileToSwap = shuffled.find(t => t.position === randomMove)!;
    
    tileToSwap.position = emptyPos;
    emptyTile.position = randomMove;
  }
  return shuffled;
}

function isSolved(tiles: Tile[]): boolean {
  return tiles.every(tile => tile.value === tile.position);
}

const getInitialPuzzleBestScore = (): number | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('puzzle-best-score');
  return saved ? parseInt(saved) : null;
};

export default function PuzzleGame() {
  const [tiles, setTiles] = useState<Tile[]>(() => shufflePuzzle(createPuzzle()));
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(() => getInitialPuzzleBestScore());
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isComplete) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  const handleTileClick = useCallback((clickedTile: Tile) => {
    if (isComplete || clickedTile.value === 0) return;
    
    if (!isPlaying) setIsPlaying(true);

    const emptyTile = tiles.find(t => t.value === 0)!;
    const emptyPos = emptyTile.position;
    const clickedPos = clickedTile.position;

    const emptyRow = Math.floor(emptyPos / GRID_SIZE);
    const emptyCol = emptyPos % GRID_SIZE;
    const clickedRow = Math.floor(clickedPos / GRID_SIZE);
    const clickedCol = clickedPos % GRID_SIZE;

    const isAdjacent =
      (Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
      (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow);

    if (!isAdjacent) return;

    const newTiles = tiles.map(tile => {
      if (tile.value === clickedTile.value) {
        return { ...tile, position: emptyPos };
      }
      if (tile.value === 0) {
        return { ...tile, position: clickedPos };
      }
      return tile;
    });

    setTiles(newTiles);
    setMoves(m => m + 1);

    if (isSolved(newTiles)) {
      setIsComplete(true);
      const score = moves + 1;
      if (!bestScore || score < bestScore) {
        setBestScore(score);
        localStorage.setItem('puzzle-best-score', score.toString());
      }
    }
  }, [tiles, isComplete, isPlaying, moves, bestScore]);

  const resetGame = () => {
    setTiles(shufflePuzzle(createPuzzle()));
    setMoves(0);
    setIsComplete(false);
    setTimer(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPosition = (position: number) => {
    const row = Math.floor(position / GRID_SIZE);
    const col = position % GRID_SIZE;
    return { x: col * 90, y: row * 90 };
  };

  return (
    <main className="min-h-screen py-32">
      <Container>
        {/* Header */}
        <div className="max-w-md mx-auto mb-12">
          <Link href="/games" className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors">
            ← Games
          </Link>
          <h1 className="text-3xl font-medium text-neutrals-100 mt-4 mb-2">Puzzle</h1>
          <p className="text-neutrals-500 text-sm">Arrange tiles 1-8 in order</p>
        </div>

        {/* Stats */}
        <div className="max-w-md mx-auto mb-8 flex justify-between text-sm border-b border-neutrals-800 pb-4">
          <div>
            <span className="text-neutrals-500">Moves</span>
            <p className="text-neutrals-200 font-mono">{moves}</p>
          </div>
          <div>
            <span className="text-neutrals-500">Time</span>
            <p className="text-neutrals-200 font-mono">{formatTime(timer)}</p>
          </div>
          {bestScore && (
            <div>
              <span className="text-neutrals-500">Best</span>
              <p className="text-neutrals-200 font-mono">{bestScore}</p>
            </div>
          )}
        </div>

        {/* Puzzle Grid */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div 
            className="relative bg-neutrals-900 rounded-lg p-2"
            style={{ width: GRID_SIZE * 90 + 16, height: GRID_SIZE * 90 + 16 }}
          >
            <AnimatePresence>
              {tiles.map((tile) => {
                if (tile.value === 0) return null;
                const pos = getPosition(tile.position);
                return (
                  <motion.button
                    key={tile.value}
                    onClick={() => handleTileClick(tile)}
                    className={`absolute w-[86px] h-[86px] rounded text-2xl font-mono flex items-center justify-center
                      ${tile.value === tile.position ? 'bg-neutrals-700 text-neutrals-300' : 'bg-neutrals-800 text-neutrals-400'}
                      hover:bg-neutrals-700 active:scale-95 transition-all border border-neutrals-700`}
                    initial={false}
                    animate={{
                      x: pos.x + 2,
                      y: pos.y + 2,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {tile.value}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 py-3 text-sm text-neutrals-400 hover:text-neutrals-200 border border-neutrals-700 hover:border-neutrals-600 rounded-lg transition-colors"
          >
            Shuffle
          </button>
        </div>

        {/* Win Modal */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
              onClick={resetGame}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-neutrals-900 border border-neutrals-800 p-8 rounded-xl text-center max-w-xs w-full"
                onClick={e => e.stopPropagation()}
              >
                <p className="text-neutrals-500 text-sm uppercase tracking-wider mb-2">Solved</p>
                <h2 className="text-2xl font-medium text-neutrals-100 mb-6">Well done</h2>
                <div className="flex justify-center gap-8 mb-8 text-sm">
                  <div>
                    <p className="text-neutrals-500">Moves</p>
                    <p className="text-neutrals-200 font-mono text-lg">{moves}</p>
                  </div>
                  <div>
                    <p className="text-neutrals-500">Time</p>
                    <p className="text-neutrals-200 font-mono text-lg">{formatTime(timer)}</p>
                  </div>
                </div>
                {bestScore === moves && (
                  <p className="text-neutrals-400 text-sm mb-6">New personal best</p>
                )}
                <button
                  onClick={resetGame}
                  className="w-full py-3 text-sm bg-neutrals-800 hover:bg-neutrals-700 text-neutrals-200 rounded-lg transition-colors"
                >
                  Play again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
