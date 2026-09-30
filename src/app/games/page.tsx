'use client';

import { Container } from '@/components/ui/container';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBrain, FaKeyboard, FaPuzzlePiece, FaRocket } from 'react-icons/fa';
import { GiSnake } from 'react-icons/gi';
import { IconType } from 'react-icons';

type Game = {
  title: string;
  description: string;
  icon: IconType;
  href: string;
  tag: string;
};

const games: Game[] = [
  {
    title: 'Memory',
    description: 'Match pairs of cards',
    icon: FaBrain,
    href: '/games/memory',
    tag: 'Casual',
  },
  {
    title: 'Snake',
    description: 'Classic arcade game',
    icon: GiSnake,
    href: '/games/snake',
    tag: 'Arcade',
  },
  {
    title: 'Typing Test',
    description: 'Test your speed',
    icon: FaKeyboard,
    href: '/games/typing',
    tag: 'Skill',
  },
  {
    title: 'Puzzle',
    description: 'Slide to solve',
    icon: FaPuzzlePiece,
    href: '/games/puzzle',
    tag: 'Logic',
  },
  {
    title: 'Space',
    description: 'Shoot asteroids',
    icon: FaRocket,
    href: '/games/space',
    tag: 'Action',
  },
];

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-neutrals-900 text-neutrals-50 py-32">
      <Container>
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-neutrals-500 text-sm tracking-widest uppercase mb-3"
          >
            Interactive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium text-neutrals-100 mb-4"
          >
            Games
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutrals-400 max-w-md"
          >
            A collection of mini-games built with React and Canvas.
          </motion.p>
        </div>

        {/* Games List */}
        <div className="space-y-1">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link href={game.href}>
                <div className="group flex items-center justify-between py-5 border-b border-neutrals-800 hover:border-neutrals-600 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 flex items-center justify-center text-neutrals-500 group-hover:text-neutrals-100 transition-colors">
                      <game.icon className="text-xl" />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-neutrals-200 group-hover:text-neutrals-100 transition-colors">
                        {game.title}
                      </h2>
                      <p className="text-sm text-neutrals-500">
                        {game.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-neutrals-600 uppercase tracking-wider hidden sm:block">
                      {game.tag}
                    </span>
                    <span className="text-neutrals-600 group-hover:text-neutrals-300 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-8 border-t border-neutrals-800"
        >
          <Link
            href="/pro"
            className="text-sm text-neutrals-500 hover:text-neutrals-300 transition-colors"
          >
            ← Back
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}
