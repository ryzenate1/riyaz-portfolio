'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

// Icon Imports
import { SiUbuntu } from "react-icons/si";
import { FaReact, FaCloud } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";

import { IconType } from "react-icons";

// Skill Type
type Skill = {
  name: string;
  Icon: IconType;
  color: string;
  textLines: string[];
};

// Skills Array
const skills: Skill[] = [
  {
    name: "Linux",
    Icon: SiUbuntu,
    color: "text-[#E95420]",
    textLines: ["Server Provisioning", "Shell Scripting & Automation", "Service Monitoring & Uptime"],
  },
  {
    name: "React.js",
    Icon: FaReact,
    color: "text-[#61DAFB]",
    textLines: ["Component Architecture", "State Management Patterns", "Performance Optimization"],
  },
  {
    name: "Cloud",
    Icon: FaCloud,
    color: "text-[#4285F4]",
    textLines: ["Scalable Cloud Solutions", "Infrastructure as Code (IaC)", "Serverless Computing"],
  },
  {
    name: "Networking",
    Icon: IoShareSocialOutline,
    color: "text-[#34A853]",
    textLines: ["Network Configuration", "Troubleshooting Protocols", "Security Best Practices"],
  },
];

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const AboutSkills = () => {
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  const terminalContent = 
`riyaz@portfolio/root:~$ bash /.riyaz

Processing... 
Compiling sources...
Installing necessary packages...
Fetching profile...

Initializing Riyaz Portfolio...

Hey there! I'm a 17-year-old passionate coder who's absolutely obsessed with exploring new things and questioning everything around me. Why? Because that's how you truly learn!

"Jack of all trades, master of none" - that's my motto and I wear it proudly. I dive deep into Android development, web development, cloud architecture, system administration, networking, nutrition, server management, PC building, content creation, teaching, inventing new stuff, kinesiology, and biomechanics. 

I'm a free learner - I learn what I want to learn, do what I love, and I'm genuinely good at what I do. Haven't mastered everything yet, but that's the beauty of the journey, right?

Currently rocking as a Full-Stack Web Developer, and when I'm not coding, you'll find me chatting with ChatGPT (yes, I love ragebaiting LLMs - it's an art form), hitting the gym as a fitness hobbyist, or diving into the latest tech that caught my curiosity.

I'm passionate about everything I touch, always questioning "why" and "how can this be better?" Ready to build something amazing together?

riyaz@portfolio/root:~$ _
`;

  const typingSpeed = 25;

  useEffect(() => {
    const currentRef = terminalBodyRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !startTyping) {
          setStartTyping(true);
        }
      },
      { threshold: 0.3 }
    );
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [startTyping]);

  // Check if typing is complete
  const isTypingComplete = displayedText.length >= terminalContent.length;

  useEffect(() => {
    if (!startTyping || isTypingComplete) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const nextChar = terminalContent.charAt(displayedText.length);
      setDisplayedText(prev => prev + nextChar);
    }, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [startTyping, displayedText, terminalContent, typingSpeed, isTypingComplete]);

  // Update typingComplete when typing finishes
  useEffect(() => {
    if (isTypingComplete && !typingComplete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Required to sync derived state for scroll behavior
      setTypingComplete(true);
    }
  }, [isTypingComplete, typingComplete]);

  // Only auto-scroll if user is not manually scrolling and typing is not complete
  useEffect(() => {
    if (terminalBodyRef.current && !isUserScrolling && !typingComplete) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [displayedText, isUserScrolling, typingComplete]);

  // Detect user scrolling
  const handleScroll = () => {
    if (terminalBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = terminalBodyRef.current;
      // If user scrolls up (not at bottom), mark as user scrolling
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setIsUserScrolling(!isAtBottom);
    }
  };

  return (
    <div className="relative py-16 md:py-24 px-4 md:px-8">
      
      {/* Skills Icons */}
      <motion.div
        className="max-w-screen-lg mx-auto grid grid-cols-2 justify-items-center gap-x-8 gap-y-12 sm:gap-x-12 md:flex md:flex-wrap md:justify-center md:gap-x-20 md:gap-y-12 lg:gap-x-28 mb-16 sm:mb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill) => {
          return (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="flex flex-col items-center w-28 sm:w-32 md:w-36 text-center"
              title={skill.name}
              aria-label={`Skill: ${skill.name}`}
            >
              <skill.Icon size={35} className={`${skill.color}`} aria-label={skill.name} />
              <span className="mt-2 text-sm font-semibold text-center text-neutrals-300 font-sans">
                {skill.name}
              </span>
              <div className="skill-popup-text w-full h-[4.5em] text-center text-xs sm:text-sm font-jetbrains text-[#39FF14] flex items-center justify-center">
                <Typewriter
                  words={skill.textLines}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={40}
                  deleteSpeed={20}
                  delaySpeed={2500}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Terminal with GitHub-style glow */}
      <motion.div
        className="relative max-w-4xl w-full mx-auto mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Terminal glow effect - purple glow behind terminal */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/30 to-primary/20 rounded-3xl blur-2xl opacity-60" />
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-400/20 to-primary/30 rounded-2xl blur-xl opacity-40" />
        
        {/* Terminal container with rounded design */}
        <div className="relative bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl">
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
            <span className="h-3 w-3 bg-[#ff5f56] rounded-full"></span>
            <span className="h-3 w-3 bg-[#ffbd2e] rounded-full"></span>
            <span className="h-3 w-3 bg-[#27ca3f] rounded-full"></span>
            <span className="ml-4 text-xs text-neutrals-400 font-mono">riyaz@portfolio ~ terminal</span>
          </div>
          {/* Terminal body - with custom scrollbar */}
          <div
            ref={terminalBodyRef}
            onScroll={handleScroll}
            className="p-6 text-[#39FF14] font-jetbrains text-xs sm:text-sm md:text-base h-[300px] sm:h-[400px] md:h-[450px] overflow-y-auto whitespace-pre-wrap leading-relaxed terminal-scrollbar"
          >
            <pre className="whitespace-pre-wrap">{displayedText}</pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export { AboutSkills };
