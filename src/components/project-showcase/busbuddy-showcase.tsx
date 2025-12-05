'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectData } from './index';
import { ProjectHeader } from './project-header';
import { TechStackGrid } from './tech-stack-grid';
import { FeaturesList } from './features-list';

interface BusBuddyShowcaseProps {
  project: ProjectData;
}

// Live Bus Map Demo
function LiveBusMapDemo() {
  const [buses, setBuses] = useState([
    { id: 1, route: '47A', lat: 40, lng: 30, speed: 35, occupancy: 65, status: 'active' },
    { id: 2, route: '23B', lat: 60, lng: 70, speed: 28, occupancy: 42, status: 'active' },
    { id: 3, route: '15C', lat: 25, lng: 55, speed: 0, occupancy: 88, status: 'delayed' },
  ]);

  // Simulate real-time bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => ({
        ...bus,
        lat: bus.status === 'active' ? Math.max(5, Math.min(95, bus.lat + (Math.random() - 0.5) * 8)) : bus.lat,
        lng: bus.status === 'active' ? Math.max(5, Math.min(95, bus.lng + (Math.random() - 0.5) * 8)) : bus.lng,
        speed: bus.status === 'active' ? Math.max(20, Math.min(50, bus.speed + (Math.random() - 0.5) * 10)) : 0,
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1f2e] to-[#0d1117] border border-neutrals-700">
      {/* Map Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Route Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <path 
          d="M 10 128 Q 80 80 160 100 T 280 128" 
          stroke="#E83E59" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="5,5"
          opacity="0.4"
        />
        <path 
          d="M 20 60 Q 140 140 280 80" 
          stroke="#3b82f6" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="5,5"
          opacity="0.4"
        />
      </svg>

      {/* Bus Markers */}
      {buses.map((bus) => (
        <motion.div
          key={bus.id}
          animate={{ 
            left: `${bus.lng}%`, 
            top: `${bus.lat}%`,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ zIndex: 10 }}
        >
          {/* Pulse Ring */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`absolute inset-0 rounded-full ${bus.status === 'active' ? 'bg-[#E83E59]' : 'bg-yellow-500'}`}
            style={{ width: 40, height: 40, margin: -8 }}
          />
          
          {/* Bus Icon */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
              bus.status === 'active' ? 'bg-[#E83E59]' : 'bg-yellow-500'
            }`}
          >
            {bus.route}
          </motion.div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutrals-800 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-neutrals-700">
            <div className="font-medium text-white">Route {bus.route}</div>
            <div className="text-neutrals-400">{bus.speed} km/h • {bus.occupancy}% full</div>
            <div className={`mt-1 ${bus.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
              ● {bus.status === 'active' ? 'On Time' : 'Delayed'}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex gap-3 text-xs">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutrals-800/80">
          <span className="w-2 h-2 rounded-full bg-[#E83E59]" />
          <span className="text-neutrals-400">Active</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutrals-800/80">
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="text-neutrals-400">Delayed</span>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E83E59]/20 border border-[#E83E59]/30">
        <span className="w-2 h-2 rounded-full bg-[#E83E59] animate-pulse" />
        <span className="text-xs text-[#E83E59] font-medium">LIVE</span>
      </div>
    </div>
  );
}

// Voice Command Sample Commands
const voiceSampleCommands = [
  { text: 'Where is bus 47A?', response: '🚌 Bus 47A is 2 stops away, arriving in ~5 minutes' },
  { text: 'Show buses to Central', response: '📍 3 buses heading to Central: 23B (8 min), 15C (12 min), 47A (18 min)' },
  { text: 'Bus 23B kitna door hai?', response: '🚌 Bus 23B 3 stops dur hai, lagbhag 7 minute mein aayegi' },
];

// Voice Command Demo
function VoiceCommandDemo() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en-IN');

  const languages = [
    { code: 'en-IN', name: 'English', flag: '🇮🇳' },
    { code: 'hi-IN', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta-IN', name: 'தமிழ்', flag: '🇮🇳' },
  ];

  const handleVoiceClick = useCallback(() => {
    setIsListening(true);
    setTranscript('');
    setResponse('');
    
    // Simulate voice recognition
    const command = voiceSampleCommands[Math.floor(Math.random() * voiceSampleCommands.length)];
    
    // Type out transcript
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= command.text.length) {
        setTranscript(command.text.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsListening(false);
        
        // Show response after a brief pause
        setTimeout(() => {
          setResponse(command.response);
        }, 500);
      }
    }, 80);
  }, []);

  return (
    <div className="w-full max-w-sm p-5 rounded-xl bg-gradient-to-br from-[#E83E59]/10 to-neutrals-900/50 border border-[#E83E59]/20">
      {/* Language Selector */}
      <div className="flex justify-center gap-2 mb-5">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              language === lang.code
                ? 'bg-[#E83E59] text-white'
                : 'bg-neutrals-800 text-neutrals-400 hover:bg-neutrals-700'
            }`}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>

      {/* Microphone Button */}
      <div className="flex justify-center mb-5">
        <motion.button
          onClick={handleVoiceClick}
          whileTap={{ scale: 0.95 }}
          className="relative w-20 h-20 rounded-full bg-[#E83E59] flex items-center justify-center shadow-lg shadow-[#E83E59]/30"
        >
          {isListening && (
            <>
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full bg-[#E83E59]"
              />
              <motion.div
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                className="absolute inset-0 rounded-full bg-[#E83E59]"
              />
            </>
          )}
          <span className="text-3xl relative z-10">🎤</span>
        </motion.button>
      </div>

      {/* Transcript */}
      <AnimatePresence mode="wait">
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-4"
          >
            <p className="text-neutrals-500 text-xs mb-1">You said:</p>
            <p className="text-white font-medium">&ldquo;{transcript}&rdquo;</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response */}
      <AnimatePresence mode="wait">
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-neutrals-800/80 border border-neutrals-700"
          >
            <p className="text-sm text-neutrals-200 leading-relaxed">{response}</p>
            <p className="text-xs text-neutrals-500 mt-2">⚡ Response time: 87ms</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {!transcript && !response && (
        <p className="text-center text-xs text-neutrals-500">
          Tap the mic to try voice commands
        </p>
      )}
    </div>
  );
}

// IoT Devices Demo
function IoTDevicesDemo() {
  const [devices, setDevices] = useState([
    { id: 'gps', name: 'GPS Tracker', icon: '📍', status: 'active', value: '13.0827°N, 80.2707°E' },
    { id: 'counter', name: 'Passenger Counter', icon: '👥', status: 'active', value: '34/50 passengers' },
    { id: 'env', name: 'Environmental', icon: '🌡️', status: 'active', value: '28°C, 65% humidity' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        value: device.id === 'counter' 
          ? `${Math.floor(Math.random() * 20 + 30)}/50 passengers`
          : device.id === 'env'
          ? `${Math.floor(Math.random() * 5 + 26)}°C, ${Math.floor(Math.random() * 20 + 55)}% humidity`
          : device.value
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {devices.map((device) => (
        <motion.div
          key={device.id}
          whileHover={{ scale: 1.02 }}
          className="p-3 rounded-xl bg-neutrals-800/50 border border-neutrals-700 text-center"
        >
          <div className="text-2xl mb-2">{device.icon}</div>
          <div className="text-xs font-medium text-neutrals-300 mb-1">{device.name}</div>
          <div className="flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-neutrals-500">Live</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function BusBuddyShowcase({ project }: BusBuddyShowcaseProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Project Info */}
      <div>
        <ProjectHeader project={project} />
        <TechStackGrid project={project} />
        <FeaturesList project={project} />

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <motion.a
            href={project.links.github}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutrals-800 border border-neutrals-700 text-neutrals-200 hover:border-neutrals-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Code
          </motion.a>
          <motion.a
            href={project.links.live}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-colors"
            style={{ background: project.accentColor }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </motion.a>
        </div>
      </div>

      {/* Right: Interactive Demos */}
      <div className="space-y-6">
        {/* Live Map Demo */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E83E59] animate-pulse" />
            Real-Time Bus Tracking
          </h4>
          <LiveBusMapDemo />
        </div>

        {/* Voice Command Demo */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4">Multi-Language Voice Commands</h4>
          <div className="flex justify-center">
            <VoiceCommandDemo />
          </div>
        </div>

        {/* IoT Devices */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4">IoT Device Simulation</h4>
          <IoTDevicesDemo />
        </div>
      </div>
    </div>
  );
}
