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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-neutrals-900 pt-32 pb-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Game Zone
          </h1>
          <p className="text-neutrals-400 text-lg max-w-2xl mx-auto">
            Take a break and enjoy some mini-games. Challenge yourself or just have fun!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {games.map((game) => (
            <motion.div key={game.title} variants={itemVariants}>
              <Link href={game.href}>
                <div className="group relative overflow-hidden rounded-2xl bg-neutrals-800/50 border border-neutrals-700/50 p-6 hover:border-primary/50 transition-all duration-300 hover:bg-neutrals-800/80">
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {game.tag}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <game.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-neutrals-400 text-sm">
                    {game.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Play Now →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="/pro"
            className="inline-flex items-center gap-2 text-neutrals-400 hover:text-white transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}
