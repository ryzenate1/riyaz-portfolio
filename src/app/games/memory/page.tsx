'use client';

import { Container } from '@/components/ui/container';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const emojis = ['🚀', '⚡', '🎮', '💻', '🎨', '🔥', '💎', '🌟'];

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

function createCards(): Card[] {
  const pairs = [...emojis, ...emojis];
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
}

const getInitialBestScore = (): number | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('memory-best-score');
  return saved ? parseInt(saved) : null;
};

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(() => createCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(() => getInitialBestScore());
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isComplete) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  const handleCardClick = useCallback((id: number) => {
    if (!isPlaying) setIsPlaying(true);
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newCards = cards.map(c =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      
      const [first, second] = newFlipped;
      const firstCard = newCards.find(c => c.id === first);
      const secondCard = newCards.find(c => c.id === second);

      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === first || c.id === second
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(m => {
            const newMatches = m + 1;
            if (newMatches === emojis.length) {
              setIsComplete(true);
              const score = moves + 1;
              if (!bestScore || score < bestScore) {
                setBestScore(score);
                localStorage.setItem('memory-best-score', score.toString());
              }
            }
            return newMatches;
          });
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === first || c.id === second
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [cards, flippedCards, isPlaying, moves, bestScore]);

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsComplete(false);
    setTimer(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="min-h-screen bg-neutrals-900 text-neutrals-50 py-32">
      <Container>
        {/* Header */}
        <div className="max-w-md mx-auto mb-12">
          <Link href="/games" className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors">
            ← Games
          </Link>
          <h1 className="text-3xl font-medium text-neutrals-100 mt-4 mb-2">Memory</h1>
          <p className="text-neutrals-500 text-sm">Match all pairs to win</p>
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
          <div>
            <span className="text-neutrals-500">Found</span>
            <p className="text-neutrals-200 font-mono">{matches}/{emojis.length}</p>
          </div>
          {bestScore && (
            <div>
              <span className="text-neutrals-500">Best</span>
              <p className="text-neutrals-200 font-mono">{bestScore}</p>
            </div>
          )}
        </div>

        {/* Game Grid */}
        <motion.div
          className="grid grid-cols-4 gap-2 max-w-md mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-lg text-3xl flex items-center justify-center transition-all duration-200 ${
                card.isFlipped || card.isMatched
                  ? 'bg-neutrals-700'
                  : 'bg-neutrals-800 hover:bg-neutrals-750 border border-neutrals-700'
              } ${card.isMatched ? 'opacity-50' : ''}`}
              whileTap={{ scale: 0.95 }}
              disabled={card.isFlipped || card.isMatched}
            >
              <AnimatePresence mode="wait">
                {(card.isFlipped || card.isMatched) ? (
                  <motion.span
                    key="emoji"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {card.emoji}
                  </motion.span>
                ) : (
                  <motion.span
                    key="hidden"
                    className="w-3 h-3 rounded-full bg-neutrals-600"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        {/* Actions */}
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 py-3 text-sm text-neutrals-400 hover:text-neutrals-200 border border-neutrals-700 hover:border-neutrals-600 rounded-lg transition-colors"
          >
            Reset
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
                <p className="text-neutrals-500 text-sm uppercase tracking-wider mb-2">Complete</p>
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
