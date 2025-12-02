'use client';

import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Helper to safely get localStorage (for SSR compatibility)
const getStoredChoice = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('fun-gender-choice');
  }
  return null;
};

export default function FunZoneSection() {
  const router = useRouter();
  const [view, setView] = useState<'question' | 'confirmation' | 'result'>('question');
  const [currentChoice, setCurrentChoice] = useState<'boy' | 'girl' | null>(null);
  const [previousChoice] = useState<string | null>(() => getStoredChoice());
  const [resultType, setResultType] = useState<'same' | 'different'>('same');

  const handleChoice = (choice: 'boy' | 'girl') => {
    setCurrentChoice(choice);
    setView('confirmation');
  };

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      const isDifferent = previousChoice && previousChoice !== currentChoice;
      setResultType(isDifferent ? 'different' : 'same');
      setView('result');
      localStorage.setItem('fun-gender-choice', currentChoice!);
    } else {
      setView('question');
      setCurrentChoice(null);
    }
  };

  const confirmationMessages = {
    boy: "Are you sure... you are a boy? 🤔",
    girl: "Are you sure... you are a girl? 🤔"
  };

  const finalMessages = {
    same: {
      boy: "Good boy! 😎",
      girl: "Good girl! 😊"
    },
    different: (opposite: string) => `Aren't you just before clicked on ${opposite}? 🤨`
  };

  return (
    <Section id="fun-zone" aria-labelledby="fun-heading">
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {view === 'question' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <h1
                  id="fun-heading"
                  className="text-6xl/tight font-bold text-balance md:text-8xl/tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
                >
                  Quick Question! 🤔
                </h1>
                <p className="text-neutrals-300 text-xl max-w-2xl mx-auto">
                  Before we dive into the creative chaos, let&apos;s get to know each other...
                </p>
              </div>
              
              <div className="flex gap-6 justify-center flex-wrap">
                <button 
                  onClick={() => handleChoice('boy')}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Boy 👦
                </button>
                <button 
                  onClick={() => handleChoice('girl')}
                  className="bg-pink-500 hover:bg-pink-400 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Girl 👧
                </button>
              </div>

              <div className="text-sm text-neutrals-400 italic">
                💡 Hint: Try selecting different gender for fun 🤪
              </div>
            </div>
          )}

          {view === 'confirmation' && currentChoice && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <h2 className="text-5xl/tight font-bold text-balance md:text-7xl/tight text-primary">
                  {confirmationMessages[currentChoice]}
                </h2>
                <p className="text-neutrals-300 text-xl max-w-3xl mx-auto leading-relaxed">
                  Think carefully now... 🧐
                </p>
              </div>
              
              <div className="flex gap-6 justify-center flex-wrap">
                <button 
                  onClick={() => handleConfirmation(true)}
                  className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Yes, I&apos;m sure! ✅
                </button>
                <button 
                  onClick={() => handleConfirmation(false)}
                  className="bg-red-500 hover:bg-red-400 text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Wait, no! ❌
                </button>
              </div>
            </div>
          )}

          {view === 'result' && currentChoice && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <h2 className="text-5xl/tight font-bold text-balance md:text-7xl/tight text-primary">
                  {resultType === 'same' ? (
                    <span dangerouslySetInnerHTML={{ __html: finalMessages.same[currentChoice] + "<br>btw you are as silly as me... 🤪" }} />
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: finalMessages.different(previousChoice === 'boy' ? 'boy' : 'girl') + "<br>Huhh suspicious... 😏" }} />
                  )}
                </h2>
                <p className="text-neutrals-300 text-xl max-w-3xl mx-auto leading-relaxed">
                  {resultType === 'same' 
                    ? "You seem like someone who appreciates good design and isn't afraid to explore the unknown. Ready to see what creative madness we've cooked up? 🚀"
                    : "I see what's happening here... 😂 But hey, I like your sense of humor!"
                  }
                </p>
              </div>
              
              {resultType === 'same' ? (
                <button 
                  onClick={() => router.push('/')}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary text-white px-12 py-4 rounded-full text-xl font-bold transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl animate-pulse hover:animate-none"
                >
                  Let&apos;s Explore the Magic! ✨
                </button>
              ) : (
                <button 
                  onClick={() => alert('🎮 Game feature coming soon! Stay tuned for some epic fun! 🚀')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 text-white px-12 py-4 rounded-full text-xl font-bold transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Wanna play something? 🎮
                </button>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
