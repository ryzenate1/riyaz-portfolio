'use client';

import { Container } from '@/components/ui/container';
import Section from '@/components/ui/section';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type AmbitionType = 'hacker' | 'doctor' | 'pilot' | 'astronaut' | 'police' | 'artist';

const responses = {
  hacker: {
    text: "A Hacker! 💻⚡",
    subtext: "You wanted to dive into the digital world and unlock its secrets! Time to live that dream... Let's see if you're ready for the underground! 😈"
  },
  doctor: {
    text: "A Doctor! 👩‍⚕️✨",
    subtext: "Aww, you wanted to save lives and heal people! That's so sweet! 💕 I bet you would have been amazing at it. Now look at you - saving websites from bad design instead! 😄"
  },
  pilot: {
    text: "A Pilot! ✈️☁️",
    subtext: "Flying high in the sky! 🌤️ You dreamed of touching clouds and seeing the world from above. Now you're flying high with your career instead! Still reaching for the sky! 🚀"
  },
  astronaut: {
    text: "An Astronaut! 🚀🌕",
    subtext: "To infinity and beyond! 🌌 You dreamed of exploring space and walking on the moon! Well, now you're exploring the digital universe instead! Still pretty cosmic! ✨"
  },
  police: {
    text: "A Police Officer! 👮‍♂️🚓",
    subtext: "You wanted to protect and serve! 🦸‍♀️ Fighting crime and keeping everyone safe! Now you're probably protecting websites from hackers and serving up great designs! 😎"
  },
  artist: {
    text: "An Artist! 🎨🖼️",
    subtext: "A creative soul from the very beginning! 🌈 You were born to create beautiful things, and guess what? You're still doing it! Some dreams do come true! 💫"
  }
};

const hackerCommands = [
  'ls -la /System/Library/CoreServices/',
  'sudo nmap -sS -O target.nasa.gov',
  'ssh -o StrictHostKeyChecking=no admin@nasa-satellite.gov',
  'cat /etc/passwd | grep admin',
  'python3 exploit.py --target nasa.gov',
  'hydra -l admin -P wordlist.txt nasa.gov ssh',
  './metasploit_nasa_exploit.rb',
  'nc -lvp 4444',
  'echo "Gaining access to satellite systems..."',
  'sudo ./nasa_backdoor --install',
  'curl -X POST https://nasa.gov/api/satellites/control',
  'python3 -c "import socket; s=socket.socket(); s.connect((\'nasa.gov\', 22))"',
  'echo "Bypassing NASA firewall..." && sleep 2',
  'openssl s_client -connect nasa.gov:443',
  'sudo tcpdump -i en0 host nasa.gov',
  './quantum_decrypt.py --file nasa_secrets.enc'
];

const nasaHackResults = [
  '🛰️  Accessing NASA satellite control systems...',
  '🔐  Bypassing quantum encryption protocols...',
  '🚀  Injecting payload into Mars rover communication...',
  '⚡  Overriding Houston mission control...',
  '🛸  UFO database unlocked! 👽',
  '🌍  Earth defense systems compromised...',
  '🚨  WARNING: FBI cyber division alerted!',
  '💨  Deploying digital smoke screen...',
  '🥷  Vanishing into the dark web...',
  '✅  Mission accomplished! You\'re officially a legend!'
];

const macPrompt = (
  <>
    <span className="text-cyan-400">ryzen@MacBook-Pro</span>
    <span className="text-white">:</span>
    <span className="text-blue-400">~/hacker-dreams</span>
    <span className="text-white">$ </span>
  </>
);

export default function AmbitionSection() {
  const router = useRouter();
  const [view, setView] = useState<'question' | 'terminal' | 'response'>('question');
  const [selectedAmbition, setSelectedAmbition] = useState<AmbitionType | null>(null);
  const [terminalLines, setTerminalLines] = useState<Array<{ content: React.ReactNode, type: 'command' | 'output' | 'system' }>>([
    { content: "What's your hacker alias? ", type: 'system' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<'name' | 'age' | 'nasa'>('name');
  const [, setHackerName] = useState('');
  const [, setHackerAge] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  const handleAmbitionClick = (ambition: AmbitionType) => {
    setSelectedAmbition(ambition);
    if (ambition === 'hacker') {
      setView('terminal');
      // Reset terminal state
      setTerminalLines([{ content: "What's your hacker alias? ", type: 'system' }]);
      setCurrentStep('name');
      setHackerName('');
      setHackerAge('');
      setInputValue('');
      setIsInputVisible(true);
    } else {
      setView('response');
    }
  };

  const addMacTerminalLine = (command: string) => {
    setTerminalLines(prev => [...prev, { content: command, type: 'command' }]);
  };

  const addSystemMessage = (message: string, color = 'text-yellow-400') => {
    setTerminalLines(prev => [...prev, { content: <div className={`${color} my-1`}>{message}</div>, type: 'system' }]);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputValue.trim();
    if (!input) return;

    // Add user input to terminal
    setTerminalLines(prev => [...prev, { content: input, type: 'output' }]);
    setInputValue('');

    if (currentStep === 'name') {
      setHackerName(input);
      setTimeout(() => {
        addMacTerminalLine(`echo "Nice to meet you, ${input}!"`);
        addSystemMessage(`Nice to meet you, ${input}! 😎`);
        addMacTerminalLine('read -p "How old are you? " AGE');
        addSystemMessage('How old are you? ', 'text-yellow-400');
        setCurrentStep('age');
      }, 800);
    } else if (currentStep === 'age') {
      setHackerAge(input);
      setTimeout(() => {
        addMacTerminalLine(`echo "${input}? Perfect age for digital rebellion!"`);
        addSystemMessage(`${input}? Perfect age for digital rebellion! 🔥`);
        setTimeout(() => {
          addMacTerminalLine('echo "Ready to hack the world? Your childhood dream is about to come true!"');
          addSystemMessage('Ready to hack the world? Your childhood dream is about to come true! 🚀');
          addMacTerminalLine('read -p "Should we hack NASA computers together? [y/n]: " NASA_HACK');
          addSystemMessage('Should we hack NASA computers together? [y/n]: ', 'text-yellow-400');
          setCurrentStep('nasa');
        }, 1500);
      }, 800);
    } else if (currentStep === 'nasa') {
      const response = input.toLowerCase();
      if (response === 'y' || response === 'yes') {
        addMacTerminalLine('echo "EXCELLENT! Initiating NASA hack protocol..."');
        addSystemMessage('EXCELLENT! Initiating NASA hack protocol... 😈');
        setIsInputVisible(false);

        let commandIndex = 0;
        const executeNextCommand = () => {
          if (commandIndex < hackerCommands.length) {
            setTimeout(() => {
              addMacTerminalLine(hackerCommands[commandIndex]);
              
              setTimeout(() => {
                if (commandIndex < nasaHackResults.length) {
                  addSystemMessage(nasaHackResults[commandIndex], 'text-green-400');
                } else {
                  addSystemMessage('...processing...', 'text-gray-400');
                }
                commandIndex++;
                executeNextCommand();
              }, Math.random() * 1000 + 500);
            }, 200);
          } else {
            setTimeout(() => {
              addSystemMessage('🎉 MISSION ACCOMPLISHED! 🎉', 'text-yellow-400');
              addSystemMessage('Congratulations! You\'re officially a hacker now! (In simulation mode 😄)', 'text-green-400');
              addMacTerminalLine('echo "Remember: With great power comes great responsibility!"');
              addSystemMessage('Remember: With great power comes great responsibility! 💫', 'text-cyan-400');
            }, 2000);
          }
        };
        executeNextCommand();
      } else if (response === 'n' || response === 'no') {
        addMacTerminalLine('echo "Aww, why not?"');
        addSystemMessage('Aww, why not? 😢', 'text-yellow-400');
        addMacTerminalLine('echo "Don\'t worry, it\'s just a simulation!"');
        addSystemMessage('Don\'t worry, it\'s just a simulation! 🥺', 'text-cyan-400');
        addMacTerminalLine('echo "Maybe next time when you\'re feeling more adventurous..."');
        addSystemMessage('Maybe next time when you\'re feeling more adventurous... 😊', 'text-green-400');
        setIsInputVisible(false);
      } else {
        addSystemMessage('Please enter "y" for yes or "n" for no', 'text-red-400');
      }
    }
  };

  return (
    <Section id="ambition-zone" aria-labelledby="ambition-heading">
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {view === 'question' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <h1
                  id="ambition-heading"
                  className="text-5xl/tight font-bold text-balance md:text-7xl/tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
                >
                  Childhood Dreams 🌟
                </h1>
                <p className="text-neutrals-300 text-xl max-w-3xl mx-auto leading-relaxed">
                  Let&apos;s take a trip down memory lane... When you were a little kiddo with big dreams and wild imagination! ✨
                </p>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-neutrals-100">
                  What was your ambition when you were a child? 🤔
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  <button onClick={() => handleAmbitionClick('hacker')} className="bg-green-500 hover:bg-green-400 text-white p-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Hacker 💻</button>
                  <button onClick={() => handleAmbitionClick('pilot')} className="bg-blue-500 hover:bg-blue-400 text-white p-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Pilot ✈️</button>
                  <button onClick={() => handleAmbitionClick('astronaut')} className="bg-purple-500 hover:bg-purple-400 text-white p-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Astronaut 🚀</button>
                  <button onClick={() => handleAmbitionClick('artist')} className="bg-pink-500 hover:bg-pink-400 text-white p-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Artist 🎨</button>
                  <button onClick={() => handleAmbitionClick('police')} className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Police 👮‍♂️</button>
                  <button onClick={() => handleAmbitionClick('doctor')} className="bg-red-500 hover:bg-red-400 text-white p-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">Doctor 👩‍⚕️</button>
                </div>
              </div>
            </div>
          )}

          {view === 'terminal' && (
            <div className="space-y-6 w-full animate-fadeIn">
              <div className="bg-black rounded-lg shadow-2xl max-w-6xl mx-auto overflow-hidden border border-gray-700 text-left">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer"></div>
                  </div>
                  <div className="text-gray-400 text-sm font-medium">Terminal — zsh — 120×50</div>
                  <div className="w-12"></div>
                </div>
                
                <div className="bg-black p-6 font-mono text-sm leading-relaxed min-h-[400px] max-h-[600px] overflow-y-auto relative">
                  <div className="space-y-1">
                    {terminalLines.map((line, index) => (
                      <div key={index}>
                        {line.type === 'command' ? (
                          <div>{macPrompt}<span className="text-green-400">{line.content}</span></div>
                        ) : line.type === 'output' ? (
                          <div className="text-white">{line.content}</div>
                        ) : (
                          line.content
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {isInputVisible && (
                    <form onSubmit={handleTerminalSubmit} className="flex items-center mt-1">
                      <span className="text-cyan-400 mr-2">➜</span>
                      <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        aria-label="Type your response and press Enter"
                        className="bg-transparent border-none outline-none text-white font-mono text-sm flex-1 caret-white"
                        autoFocus
                        spellCheck={false}
                      />
                    </form>
                  )}
                  <div ref={terminalEndRef} />
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setView('question')}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <span>←</span> Back to Dreams
                </button>
                <button 
                  onClick={() => handleAmbitionClick('hacker')}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Restart Demo
                </button>
              </div>
            </div>
          )}

          {view === 'response' && selectedAmbition && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <h2 className="text-4xl/tight font-bold text-balance md:text-6xl/tight text-primary">
                  {responses[selectedAmbition].text}
                </h2>
                <p className="text-neutrals-300 text-xl max-w-3xl mx-auto leading-relaxed">
                  {responses[selectedAmbition].subtext}
                </p>
              </div>
              
              <div className="flex gap-4 justify-center flex-wrap">
                <button 
                  onClick={() => router.push('/')}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-purple-500 hover:to-primary text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Back to Reality 🏠
                </button>
                <button 
                  onClick={() => router.push('/fun')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  More Fun? 🎮
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
