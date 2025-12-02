'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectData } from './index';
import { ProjectHeader } from './project-header';
import { TechStackGrid } from './tech-stack-grid';
import { FeaturesList } from './features-list';

interface SairaShowcaseProps {
  project: ProjectData;
}

// Interactive Seat Map Demo
function SeatMapDemo() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const maxSeats = 6;

  // Seat layout (simplified bus layout)
  const rows = [
    { row: 1, seats: ['1A', '1B', null, '1C', '1D'] },
    { row: 2, seats: ['2A', '2B', null, '2C', '2D'] },
    { row: 3, seats: ['3A', '3B', null, '3C', '3D'] },
    { row: 4, seats: ['4A', '4B', null, '4C', '4D'] },
    { row: 5, seats: ['5A', '5B', '5C', '5D', '5E'] }, // Back row
  ];

  const bookedSeats = ['1C', '2A', '3D', '4B', '5C'];
  const ladiesSeats = ['1A', '1B', '2C', '2D'];

  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const getSeatStyle = (seatId: string) => {
    if (bookedSeats.includes(seatId)) {
      return 'bg-gray-400 cursor-not-allowed';
    }
    if (selectedSeats.includes(seatId)) {
      return 'bg-green-500 text-white shadow-lg shadow-green-500/30';
    }
    if (ladiesSeats.includes(seatId)) {
      return 'bg-pink-200 hover:bg-pink-300 text-pink-800';
    }
    return 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300';
  };

  const totalPrice = selectedSeats.length * 450;

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Bus Frame */}
      <div className="relative p-4 rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-gray-300">
        {/* Driver Section */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-dashed border-gray-300">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
            <span className="text-sm">🚌</span>
          </div>
          <span className="text-xs text-gray-500 font-medium">DRIVER</span>
        </div>

        {/* Seats Grid */}
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.row} className="flex justify-center gap-1.5">
              {row.seats.map((seat, idx) => (
                seat === null ? (
                  <div key={`aisle-${idx}`} className="w-9 h-9" /> // Aisle
                ) : (
                  <motion.button
                    key={seat}
                    whileHover={{ scale: bookedSeats.includes(seat) ? 1 : 1.1 }}
                    whileTap={{ scale: bookedSeats.includes(seat) ? 1 : 0.95 }}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-9 h-9 rounded-md text-xs font-medium transition-all ${getSeatStyle(seat)}`}
                  >
                    {seat}
                  </motion.button>
                )
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-4 pt-3 border-t border-gray-300">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-white border border-gray-300" />
            <span className="text-[10px] text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-[10px] text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-pink-200" />
            <span className="text-[10px] text-gray-600">Ladies</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-gray-400" />
            <span className="text-[10px] text-gray-600">Booked</span>
          </div>
        </div>
      </div>

      {/* Selection Info */}
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#e11d48]/10 to-[#f97316]/10 border border-[#e11d48]/20"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-neutrals-400">Selected:</span>
              <span className="text-sm font-medium text-white">{selectedSeats.join(', ')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutrals-400">Total:</span>
              <span className="text-lg font-bold text-[#e11d48]">₹{totalPrice}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Glassmorphism Search Widget Demo
function SearchWidgetDemo() {
  const [mode, setMode] = useState<'bus' | 'train'>('bus');
  const [from, setFrom] = useState('Chennai');
  const [to, setTo] = useState('Bangalore');

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="w-full max-w-sm p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {(['bus', 'train'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === m
                ? 'bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {m === 'bus' ? '🚌 Bus' : '🚃 Train'}
          </button>
        ))}
      </div>

      {/* City Inputs */}
      <div className="relative mb-4">
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-white/10 border border-white/10">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">From</label>
            <div className="text-white font-medium">{from}</div>
          </div>
          
          {/* Swap Button */}
          <motion.button
            whileTap={{ rotate: 180 }}
            onClick={swapCities}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#e11d48] flex items-center justify-center text-white shadow-lg z-10"
          >
            ⇅
          </motion.button>
          
          <div className="p-3 rounded-lg bg-white/10 border border-white/10">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">To</label>
            <div className="text-white font-medium">{to}</div>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="p-3 rounded-lg bg-white/10 border border-white/10 mb-4">
        <label className="text-[10px] text-white/50 uppercase tracking-wider">Travel Date</label>
        <div className="text-white font-medium">Dec 15, 2025</div>
      </div>

      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white font-medium shadow-lg shadow-[#e11d48]/30"
      >
        Search {mode === 'bus' ? 'Buses' : 'Trains'}
      </motion.button>
    </div>
  );
}

// Bus Card Demo
function BusCardDemo() {
  const amenities = ['WiFi', 'Charging', 'Blanket', 'Water'];
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="w-full max-w-sm p-4 rounded-xl bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">IntrCity SmartBus</h4>
          <p className="text-xs text-gray-500">Volvo Multi-Axle A/C Sleeper</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-100">
          <span className="text-sm font-bold text-green-700">4.5</span>
          <span className="text-yellow-500">★</span>
        </div>
      </div>

      {/* Time & Duration */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">22:30</div>
          <div className="text-xs text-gray-500">Chennai</div>
        </div>
        <div className="flex-1 mx-4">
          <div className="text-xs text-center text-gray-400 mb-1">6h 30m</div>
          <div className="relative h-0.5 bg-gray-200 rounded">
            <div className="absolute left-0 w-1/3 h-full bg-[#e11d48] rounded" />
            <div className="absolute left-0 w-2 h-2 -top-[3px] bg-[#e11d48] rounded-full" />
            <div className="absolute right-0 w-2 h-2 -top-[3px] bg-gray-300 rounded-full" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">05:00</div>
          <div className="text-xs text-gray-500">Bangalore</div>
        </div>
      </div>

      {/* Amenities */}
      <div className="flex gap-2 mb-4">
        {amenities.map((a) => (
          <span key={a} className="px-2 py-1 text-[10px] rounded bg-gray-100 text-gray-600">
            {a}
          </span>
        ))}
      </div>

      {/* Price & Book */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-400 line-through">₹1,200</span>
          <div className="text-xl font-bold text-gray-900">₹899</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-green-600 mb-1">12 seats left</div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white text-sm font-medium"
          >
            Select Seats
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function SairaShowcase({ project }: SairaShowcaseProps) {
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
        {/* Seat Map Demo */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Interactive Seat Selection
          </h4>
          <SeatMapDemo />
        </div>

        {/* Search Widget Demo */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#e11d48]/5 to-[#f97316]/5 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4">Glassmorphism Search Widget</h4>
          <div className="flex justify-center">
            <SearchWidgetDemo />
          </div>
        </div>

        {/* Bus Card Demo */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4">Bus Listing Card</h4>
          <div className="flex justify-center">
            <BusCardDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
