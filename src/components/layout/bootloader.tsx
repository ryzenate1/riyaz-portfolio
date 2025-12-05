'use client';

import { useLockBody } from '@/hooks/use-lock-body';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Generate random IP - moved outside component to avoid re-computation
const generateRandomIP = () => 
  `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

interface BootloaderProps {
  onBootComplete: () => void;
}

const BootloaderSequence: React.FC<BootloaderProps> = ({ onBootComplete }) => {
  const [displayLines, setDisplayLines] = useState<string[]>(['']);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [cleared, setCleared] = useState(false);

  // Generate random IP only once using lazy state initialization
  const [randomIP] = useState(generateRandomIP);

  // Fallback timeout to ensure bootloader always completes
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      onBootComplete();
    }, 15000); // 15 seconds fallback

    return () => clearTimeout(fallbackTimeout);
  }, [onBootComplete]);

  const bootSequence = useMemo(() => [
    `ssh ssh@${randomIP} -u ryzen`,
    'Password: ********',
    '',
    'Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-78-generic x86_64)',
    '',
    ' * Documentation:  https://help.ubuntu.com',
    ' * Management:     https://landscape.canonical.com',
    ' * Support:        https://ubuntu.com/advantage',
    '',
    'System information as of Mon Apr 28 17:50:05 UTC 2025',
    '',
    'System load:  0.03    Processes: 111    Memory usage: 24%',
    '',
    'ryzen@ubuntu:~$ whoami',
    'ryzen',
    'ryzen@ubuntu:~$ pwd',
    '/home/ryzen',
    'ryzen@ubuntu:~$ ls -la',
    'total 64',
    'drwxr-xr-x 8 ryzen ryzen 4096 Apr 28 17:48 .',
    'drwxr-xr-x 3 root  root  4096 Apr 28 17:45 ..',
    '-rwx------ 1 ryzen ryzen 2048 Apr 28 17:47 .stealth_init',
    '-rw-r--r-- 1 ryzen ryzen  256 Apr 28 17:48 .portfolio_config',
    'drwxr-xr-x 2 ryzen ryzen 4096 Apr 28 17:48 creative_arsenal',
    'ryzen@ubuntu:~$ cat .portfolio_config',
    '[RYZEN_STUDIO_CONFIG]',
    'MODE=CREATIVE_GENIUS',
    'INNOVATION_LEVEL=MAXIMUM',
    'DESIGN_PROTOCOLS=ACTIVATED',
    'ryzen@ubuntu:~$ bash ./.stealth_init',
    '[+] Initializing RYZEN STUDIO modules...',
    '[+] Scanning creative frequencies...',
    '[+] Preparing to unpack portfolio matrix...',
    '[+] Unpacking visual assets... [████████████████████] 100%',
    '[+] Decrypting design blueprints...',
    '[+] Loading innovation algorithms...',
    '[+] Setting up creative environment...',
    '[+] Bypassing creative blocks... SUCCESS',
    '[+] Injecting inspiration protocols...',
    '[+] Synchronizing artistic vision...',
    '[+] Calibrating aesthetic sensors...',
    '[+] Activating design time machine...',
    '[+] Portfolio neural network: ONLINE',
    '[+] Creative arsenal: LOADED',
    '[+] Design logs synchronized...',
    '[+] RYZEN STUDIO initialization: COMPLETE',
    '[!] WARNING: Extreme creativity levels detected!',
    '[!] Prepare for visual overload...',
    'ryzen@ubuntu:~$ echo "Welcome to the future of design"',
    'Welcome to the future of design',
    'ryzen@ubuntu:~$'
  ], [randomIP]);

  useEffect(() => {
    if (currentLineIndex < bootSequence.length) {
      const currentLine = bootSequence[currentLineIndex] || '';

      if (currentLineIndex <= 1) {
        // First two lines: character by character
        if (currentCharIndex < currentLine.length) {
          const timeout = setTimeout(() => {
            setDisplayLines(prev => {
              const updatedLines = [...prev];
              const lastIndex = updatedLines.length - 1;
              if (lastIndex >= 0 && currentLine && currentCharIndex < currentLine.length) {
                const char = currentLine[currentCharIndex];
                if (char && updatedLines[lastIndex] !== undefined) {
                  updatedLines[lastIndex] += char;
                }
              }
              return updatedLines;
            });
            setCurrentCharIndex(prev => prev + 1);
          }, 50); // Slow typing
          return () => clearTimeout(timeout);
        } else {
          // Line complete, move to next line
          const timeout = setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
            setCurrentCharIndex(0);
            setDisplayLines(prev => [...prev, '']);
          }, 200); // Brief pause before next line
          return () => clearTimeout(timeout);
        }
      } else {
        // Other lines: full line at once (including empty lines)
        let lineDelay = 20; // Fast default timing
        
        // Add dramatic pauses for certain lines
        if (currentLine && (
            currentLine.includes('[+] Unpacking visual assets') || 
            currentLine.includes('[!] WARNING') || 
            currentLine.includes('[+] Portfolio neural network') ||
            currentLine.includes('[+] RYZEN STUDIO initialization'))) {
          lineDelay = 150; // Dramatic effect
        } else if (currentLine && (currentLine.includes('███') || currentLine.includes('SUCCESS'))) {
          lineDelay = 80; // Medium speed
        }
        
        const timeout = setTimeout(() => {
          const nextLine = bootSequence[currentLineIndex] || ''; // Handle empty lines
          setDisplayLines(prev => [...prev.slice(0, -1), nextLine]);
          setCurrentLineIndex(prev => prev + 1);
          setDisplayLines(prev => [...prev, '']);
        }, lineDelay);
        return () => clearTimeout(timeout);
      }
    } else {
      // Boot sequence complete - properly handle completion
      const completeSequence = () => {
        setCleared(true);
        
        setTimeout(() => {
          setShowAccessGranted(true);
          
          setTimeout(() => {
            onBootComplete();
          }, 1000);
        }, 500);
      };
      
      const timeout = setTimeout(completeSequence, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex, bootSequence, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono text-lg md:text-xl p-6 overflow-hidden select-none flex flex-col items-start justify-start z-[9999]">
      {!cleared ? (
        <div className="whitespace-pre-wrap leading-tight w-full">
          {displayLines.map((line, idx) => (
            <div
              key={idx}
              className="overflow-hidden whitespace-nowrap"
            >
              {line}
            </div>
          ))}
          <div className="terminal-cursor animate-pulse mt-1">_</div>
        </div>
      ) : (
        showAccessGranted && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col md:flex-row md:space-x-4 text-green-400 text-3xl md:text-6xl font-bold tracking-wider items-center justify-center text-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 md:mb-0"
              >
                ACCESS GRANTED.
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                WELCOME TO RYZEN STUDIO
              </motion.div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// Helper function to check initial bootloader state from localStorage
const getInitialBootloaderState = (): { shouldShow: boolean; showPrompt: boolean } => {
  if (typeof window === 'undefined') {
    return { shouldShow: false, showPrompt: false };
  }
  
  const hasVisited = localStorage.getItem('ryzen-studio-visited');
  const lastVisit = localStorage.getItem('ryzen-studio-last-visit');
  const refreshCount = parseInt(localStorage.getItem('ryzen-studio-refresh-count') || '0');
  const lastRefreshTime = parseInt(localStorage.getItem('ryzen-studio-last-refresh') || '0');
  const now = Date.now();
  
  const currentUrl = window.location.href;
  const lastUrl = localStorage.getItem('ryzen-studio-last-url');
  
  // Update localStorage for tracking
  if (lastUrl && lastUrl !== currentUrl) {
    localStorage.setItem('ryzen-studio-refresh-count', '0');
  } else {
    if (now - lastRefreshTime > 30000) {
      localStorage.setItem('ryzen-studio-refresh-count', '1');
    } else {
      localStorage.setItem('ryzen-studio-refresh-count', (refreshCount + 1).toString());
    }
  }
  localStorage.setItem('ryzen-studio-last-url', currentUrl);
  localStorage.setItem('ryzen-studio-last-refresh', now.toString());
  
  const currentRefreshCount = parseInt(localStorage.getItem('ryzen-studio-refresh-count') || '1');
  
  // Show bootloader if: never visited OR last visit was more than 1 hour ago
  if (!hasVisited || (lastVisit && now - parseInt(lastVisit) > 60 * 60 * 1000)) {
    return { shouldShow: true, showPrompt: false };
  }
  
  // Show prompt if user refreshed 2+ times within 30 seconds
  if (currentRefreshCount >= 2 && hasVisited && lastUrl === currentUrl) {
    localStorage.setItem('ryzen-studio-refresh-count', '0');
    return { shouldShow: false, showPrompt: true };
  }
  
  return { shouldShow: false, showPrompt: false };
};

function Bootloader() {
  // Use lazy initialization to avoid setState in useEffect
  const [shouldShowBootloader, setShouldShowBootloader] = useState(() => {
    const state = getInitialBootloaderState();
    return state.shouldShow;
  });
  const [isBootloaderActive, setIsBootloaderActive] = useState(() => {
    const state = getInitialBootloaderState();
    return state.shouldShow;
  });
  const [showPrompt, setShowPrompt] = useState(() => {
    const state = getInitialBootloaderState();
    return state.showPrompt;
  });
  useLockBody(isBootloaderActive);

  const handleBootComplete = useCallback(() => {
    // Mark as visited and set timestamp
    localStorage.setItem('ryzen-studio-visited', 'true');
    localStorage.setItem('ryzen-studio-last-visit', Date.now().toString());
    
    // Immediately hide bootloader
    setIsBootloaderActive(false);
    setShouldShowBootloader(false);
  }, []);

  // Emergency escape key handler
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isBootloaderActive) {
        handleBootComplete();
      }
    };

    if (isBootloaderActive) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
    return; // Return void for consistency
  }, [isBootloaderActive, handleBootComplete]);

  const handlePromptYes = () => {
    setShowPrompt(false);
    setShouldShowBootloader(true);
    setIsBootloaderActive(true);
  };

  const handlePromptNo = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence mode="wait">
      {/* Bootloader */}
      {shouldShowBootloader && isBootloaderActive && (
        <motion.div
          key="bootloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.95 
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
          className="fixed inset-0 z-[9999]"
        >
          <BootloaderSequence onBootComplete={handleBootComplete} />
        </motion.div>
      )}
      
      {/* Refresh Prompt */}
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-neutrals-800 border border-neutrals-600 rounded-lg p-6 max-w-md mx-4 text-center"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-neutrals-50 mb-2">
                🚀 Terminal Access
              </h3>
              <p className="text-neutrals-300 text-sm">
                I noticed you refreshed a few times. Want to see the bootloader sequence again?
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handlePromptYes}
                className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md transition-colors font-medium"
              >
                Yes, show me! 🎯
              </button>
              <button
                onClick={handlePromptNo}
                className="px-4 py-2 bg-neutrals-700 hover:bg-neutrals-600 text-neutrals-200 rounded-md transition-colors"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Bootloader };
