'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useCallback, useRef } from 'react';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling a computer what to do.",
  "React and Next.js make building web apps a breeze.",
  "Every great developer was once a beginner who never gave up.",
  "Code is like humor. When you have to explain it, its bad.",
  "First solve the problem, then write the code.",
  "The best error message is the one that never shows up.",
  "Simplicity is the soul of efficiency.",
];

const getRandomText = () => sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

const getTypingHighScore = (): number => {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem('typing-high-score');
  return saved ? parseInt(saved) : 0;
};

export default function TypingGame() {
  const [text, setText] = useState<string>(() => getRandomText());
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [currentWpm, setCurrentWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [highScore, setHighScore] = useState<number>(() => getTypingHighScore());
  const [errors, setErrors] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const calculateResults = useCallback(() => {
    if (!startTime) return;
    
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = text.split(' ').length;
    const calculatedWpm = Math.round(wordsTyped / timeInMinutes);
    
    let errorCount = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== text[i]) errorCount++;
    }
    
    const calculatedAccuracy = Math.round(((text.length - errorCount) / text.length) * 100);
    
    setWpm(calculatedWpm);
    setCurrentWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setErrors(errorCount);
    setEndTime(Date.now());
    setIsComplete(true);

    const score = Math.round(calculatedWpm * (calculatedAccuracy / 100));
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('typing-high-score', score.toString());
    }
  }, [startTime, text, userInput, highScore]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const now = Date.now();
    
    if (!startTime) {
      setStartTime(now);
    } else {
      const timeInMinutes = (now - startTime) / 60000;
      const wordsTyped = value.split(' ').filter(w => w).length;
      const liveWpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;
      setCurrentWpm(liveWpm);
    }

    setUserInput(value);

    if (value === text) {
      calculateResults();
    }
  };

  const resetGame = () => {
    setText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsComplete(false);
    setWpm(0);
    setCurrentWpm(0);
    setAccuracy(100);
    setErrors(0);
    inputRef.current?.focus();
  };

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return 'text-neutrals-500';
    if (userInput[index] === text[index]) return 'text-neutrals-100';
    return 'text-red-400';
  };

  const displayWpm = isComplete ? wpm : currentWpm;
  const progress = Math.round((userInput.length / text.length) * 100);

  return (
    <main className="min-h-screen py-32">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <Link href="/games" className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors">
            ← Games
          </Link>
          <h1 className="text-3xl font-medium text-neutrals-100 mt-4 mb-2">Typing Test</h1>
          <p className="text-neutrals-500 text-sm">Type the text below as accurately as you can</p>
        </div>

        {/* Stats */}
        <div className="max-w-2xl mx-auto mb-8 flex justify-between text-sm border-b border-neutrals-800 pb-4">
          <div>
            <span className="text-neutrals-500">WPM</span>
            <p className="text-neutrals-200 font-mono">{displayWpm}</p>
          </div>
          <div>
            <span className="text-neutrals-500">Accuracy</span>
            <p className="text-neutrals-200 font-mono">
              {isComplete ? accuracy : Math.round(((userInput.length - errors) / Math.max(userInput.length, 1)) * 100)}%
            </p>
          </div>
          <div>
            <span className="text-neutrals-500">Progress</span>
            <p className="text-neutrals-200 font-mono">{progress}%</p>
          </div>
          <div>
            <span className="text-neutrals-500">Best</span>
            <p className="text-neutrals-200 font-mono">{highScore}</p>
          </div>
        </div>

        {/* Text Display */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-neutrals-900 p-6 rounded-lg border border-neutrals-800 mb-4">
            <p className="text-lg font-mono leading-relaxed tracking-wide">
              {text.split('').map((char, index) => (
                <span key={index} className={`${getCharacterClass(index)} transition-colors`}>
                  {char}
                </span>
              ))}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-neutrals-800 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-neutrals-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            disabled={isComplete}
            placeholder="Start typing..."
            className="w-full p-4 bg-neutrals-900 border border-neutrals-800 rounded-lg text-lg font-mono focus:outline-none focus:border-neutrals-600 disabled:opacity-50 placeholder:text-neutrals-600"
            autoFocus
          />
        </motion.div>

        {/* Results */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto bg-neutrals-900 border border-neutrals-800 p-8 rounded-lg text-center mb-8"
          >
            <p className="text-neutrals-500 text-sm uppercase tracking-wider mb-2">Complete</p>
            <div className="flex justify-center gap-12 mb-6">
              <div>
                <p className="text-neutrals-200 font-mono text-3xl">{wpm}</p>
                <p className="text-neutrals-500 text-sm">WPM</p>
              </div>
              <div>
                <p className="text-neutrals-200 font-mono text-3xl">{accuracy}%</p>
                <p className="text-neutrals-500 text-sm">Accuracy</p>
              </div>
              <div>
                <p className="text-neutrals-200 font-mono text-3xl">
                  {endTime && startTime ? ((endTime - startTime) / 1000).toFixed(1) : 0}s
                </p>
                <p className="text-neutrals-500 text-sm">Time</p>
              </div>
            </div>
            {wpm * (accuracy / 100) >= highScore && (
              <p className="text-neutrals-400 text-sm">New personal best</p>
            )}
          </motion.div>
        )}

        {/* Actions */}
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 py-3 text-sm text-neutrals-400 hover:text-neutrals-200 border border-neutrals-700 hover:border-neutrals-600 rounded-lg transition-colors"
          >
            New text
          </button>
        </div>
      </Container>
    </main>
  );
}
