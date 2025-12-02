'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useTransform, AnimatePresence, type PanInfo } from 'framer-motion';
import { Fish, Bus, Ticket, Heart, ArrowRight, Check, Plus, Radio, AlertCircle, LucideIcon, X } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface ProjectFeature {
  title: string;
  description: string;
  code?: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
  techStack: string[];
  features: ProjectFeature[];
  stats: { label: string; value: string }[];
  uniqueness: string[];
  demoId: string;
}

// ============================================================================
// PROJECT DATA
// ============================================================================

const projects: Project[] = [
  {
    id: 'kadal',
    slug: 'kadal-thunai',
    title: 'Kadal Thunai',
    tagline: 'Premium Seafood E-Commerce',
    description: 'Fresh seafood delivery platform with Tamil language support and weight-based pricing.',
    longDescription: 'A premium fresh seafood e-commerce platform built for the Indian market (Tamil Nadu). Features bilingual Tamil/English support, GSAP-powered animations, weight-based dynamic pricing, Swiggy-style cart experience, and real-time order tracking with confetti celebrations.',
    icon: Fish,
    gradient: 'from-rose-500/20 via-amber-500/10 to-rose-500/20',
    accentColor: '#bd2d3c',
    techStack: ['Next.js 15', 'React 19', 'GSAP', 'Framer Motion', 'Supabase', 'Prisma', 'Tailwind'],
    features: [
      { 
        title: 'Weight-Based Pricing', 
        description: 'Dynamic price calculation based on customer-selected weight (250g to 2kg)',
        code: `const price = basePrice * weightMultiplier;`
      },
      { 
        title: 'GSAP Hero Animations', 
        description: 'Clip-path reveals, SVG path animations, and parallax scrolling',
        code: `gsap.fromTo(el, { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' });`
      },
      { 
        title: 'Tamil/English Toggle', 
        description: 'Seamless language switching for testimonials and content',
      },
      { 
        title: 'Trust Badge System', 
        description: 'FSSAI, Same Day Delivery, Best Price, Premium Quality indicators',
      },
    ],
    stats: [
      { label: 'Components', value: '50+' },
      { label: 'Animations', value: '30+' },
      { label: 'API Routes', value: '25+' },
    ],
    uniqueness: [
      'Regional Tamil language integration with cultural branding',
      'Swiggy/Zomato-inspired cart with free delivery threshold',
      'Confetti + sound effects on successful order',
      'Vibration feedback on mobile interactions',
    ],
    demoId: 'kadal',
  },
  {
    id: 'busbuddy',
    slug: 'busbuddy',
    title: 'BusBuddy',
    tagline: 'Smart Transport Tracker',
    description: 'Real-time bus tracking with voice commands and IoT simulation for Smart India Hackathon.',
    longDescription: 'Smart India Hackathon 2025 project — A comprehensive public transport tracking system with multi-language voice recognition (English, Hindi, Tamil, Telugu), real-time WebSocket updates, IoT device simulation, and offline-first PWA architecture.',
    icon: Bus,
    gradient: 'from-rose-500/20 via-pink-500/10 to-rose-500/20',
    accentColor: '#E83E59',
    techStack: ['Next.js 14', 'Socket.IO', 'Leaflet Maps', 'Web Speech API', 'Zustand', 'Supabase Realtime'],
    features: [
      { 
        title: 'Multi-Language Voice', 
        description: '4 Indian languages with Tanglish/Hinglish pattern matching',
        code: `const TANGLISH_PATTERNS = { bus: ['bas', 'pass', 'buss'], show: ['sho', 'cho'] };`
      },
      { 
        title: 'Real-Time WebSocket', 
        description: 'Socket.IO room-based broadcasting with Supabase Realtime',
        code: `socket.on('bus:location:update', (data) => io.to(\`route:\${routeId}\`).emit('bus:location:updated', data));`
      },
      { 
        title: 'IoT Device Simulation', 
        description: 'GPS Tracker, Passenger Counter, Environmental Sensor simulators',
      },
      { 
        title: 'Offline-First PWA', 
        description: 'Zustand persist middleware + in-memory cache for <100ms response',
      },
    ],
    stats: [
      { label: 'Languages', value: '4' },
      { label: 'Response', value: '<100ms' },
      { label: 'IoT Devices', value: '3' },
    ],
    uniqueness: [
      'Voice commands in 4 Indian languages with accent detection',
      'Real-time bus movement simulation with GPS interpolation',
      'Custom animated Leaflet markers with pulse effects',
      'Room-based WebSocket pub/sub for efficient broadcasting',
    ],
    demoId: 'busbuddy',
  },
  {
    id: 'saira',
    slug: 'saira-tickets',
    title: 'Saira Tickets',
    tagline: 'Bus Booking Platform',
    description: 'Full-stack ticket booking with interactive seat selection and glassmorphism UI.',
    longDescription: 'A complete bus ticket booking platform (Redbus clone) featuring interactive seat map selection, glassmorphism design system, multi-step booking flow, advanced filtering, and a Spring Boot backend with PostgreSQL.',
    icon: Ticket,
    gradient: 'from-orange-500/20 via-red-500/10 to-orange-500/20',
    accentColor: '#e11d48',
    techStack: ['Next.js 15', 'Spring Boot', 'Clerk Auth', 'Framer Motion', 'Radix UI', 'PostgreSQL'],
    features: [
      { 
        title: 'Interactive Seat Map', 
        description: 'Visual bus layout with ladies seats, availability, and live selection',
        code: `const getSeatClass = (seat) => seat.is_ladies ? 'bg-pink-200' : isSelected ? 'bg-green-500' : 'bg-white';`
      },
      { 
        title: 'Glassmorphism Design', 
        description: 'Custom glass effects with backdrop blur and subtle borders',
        code: `.glass { backdrop-filter: blur(12px); background: rgba(255,255,255,0.1); }`
      },
      { 
        title: 'Multi-Step Booking', 
        description: 'Search → Filter → Seats → Passenger Details → Payment → Confirmation',
      },
      { 
        title: 'Spring Boot API', 
        description: 'JPA/Hibernate with PostgreSQL for robust backend',
      },
    ],
    stats: [
      { label: 'UI Components', value: '45+' },
      { label: 'Booking Steps', value: '5' },
      { label: 'API Endpoints', value: '20+' },
    ],
    uniqueness: [
      'Color-coded seat types (ladies, available, selected, booked)',
      'City swap animation with 180° rotation',
      'Real-time seat availability updates',
      'Staggered Framer Motion animations throughout',
    ],
    demoId: 'saira',
  },
];

// ============================================================================
// INTERACTIVE DEMOS
// ============================================================================

// Kadal - Fish Product Card Demo
function KadalDemo() {
  const [weight, setWeight] = useState('500g');
  const [inCart, setInCart] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const weights = ['250g', '500g', '1kg', '2kg'];
  const multipliers: Record<string, number> = { '250g': 0.25, '500g': 0.5, '1kg': 1, '2kg': 2 };
  const price = Math.round(450 * multipliers[weight]);

  return (
    <div className="w-full max-w-[240px] mx-auto">
      <motion.div 
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-neutrals-800/80 to-neutrals-900/80 border border-neutrals-700/50 backdrop-blur-xl"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Image Area */}
        <div className="relative h-32 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 flex items-center justify-center">
          <motion.div 
            className="w-14 h-14 rounded-full bg-[#bd2d3c]/20 flex items-center justify-center"
            animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Fish className="w-7 h-7 text-[#bd2d3c]" />
          </motion.div>
          
          {/* Like Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setLiked(!liked)}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-neutrals-900/60 backdrop-blur flex items-center justify-center border border-neutrals-700/50"
          >
            <motion.div animate={liked ? { scale: [1, 1.4, 1] } : {}}>
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : 'text-neutrals-500'}`} />
            </motion.div>
          </motion.button>

          {/* Badge */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium bg-[#bd2d3c] text-white">
            Fresh
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h4 className="font-semibold text-neutrals-100 text-sm mb-0.5">Seer Fish</h4>
          <p className="text-[10px] text-neutrals-500 mb-2">Cleaned & gutted</p>

          {/* Weight Selector */}
          <div className="flex gap-1 mb-3">
            {weights.map((w) => (
              <button
                key={w}
                onClick={() => setWeight(w)}
                className={`flex-1 py-1 text-[10px] rounded transition-all ${
                  weight === w
                    ? 'bg-[#bd2d3c] text-white'
                    : 'bg-neutrals-800 text-neutrals-400 hover:bg-neutrals-700'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Price & Cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-neutrals-100">₹{price}</span>
              <span className="text-[10px] text-neutrals-600 line-through ml-1">₹{Math.round(price * 1.2)}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setInCart(!inCart)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                inCart ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#bd2d3c] text-white'
              }`}
            >
              {inCart ? <><Check className="w-3 h-3" /> Added</> : <><Plus className="w-3 h-3" /> Add</>}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// BusBuddy - Live Bus Map Demo
function BusBuddyDemo() {
  const [buses, setBuses] = useState([
    { id: 1, route: '47A', x: 25, y: 30, active: true },
    { id: 2, route: '23B', x: 65, y: 60, active: true },
    { id: 3, route: '15C', x: 45, y: 80, active: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => ({
        ...bus,
        x: bus.active ? Math.max(10, Math.min(90, bus.x + (Math.random() - 0.5) * 12)) : bus.x,
        y: bus.active ? Math.max(10, Math.min(90, bus.y + (Math.random() - 0.5) * 12)) : bus.y,
      })));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="relative h-44 rounded-xl overflow-hidden bg-gradient-to-br from-neutrals-900 to-neutrals-800 border border-neutrals-700/50">
        {/* Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        {/* Buses */}
        {buses.map((bus) => (
          <motion.div
            key={bus.id}
            animate={{ left: `${bus.x}%`, top: `${bus.y}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          >
            {/* Pulse */}
            {bus.active && (
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full bg-[#E83E59]"
                style={{ width: 32, height: 32, margin: -4 }}
              />
            )}
            <div className={`relative w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg ${
              bus.active ? 'bg-[#E83E59]' : 'bg-amber-500'
            }`}>
              {bus.route}
            </div>
          </motion.div>
        ))}

        {/* Live Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#E83E59]/20 border border-[#E83E59]/30">
          <Radio className="w-3 h-3 text-[#E83E59] animate-pulse" />
          <span className="text-[10px] text-[#E83E59] font-medium">LIVE</span>
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 flex gap-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutrals-800/80 text-[9px] text-neutrals-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E83E59]" /> Active
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutrals-800/80 text-[9px] text-neutrals-400">
            <AlertCircle className="w-3 h-3 text-amber-500" /> Delayed
          </div>
        </div>
      </div>
    </div>
  );
}

// Saira - Seat Map Demo
function SairaDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const booked = ['1C', '2A', '3D'];
  const ladies = ['1A', '1B'];
  
  const rows = [
    ['1A', '1B', null, '1C', '1D'],
    ['2A', '2B', null, '2C', '2D'],
    ['3A', '3B', null, '3C', '3D'],
  ];

  const toggleSeat = (seat: string) => {
    if (booked.includes(seat)) return;
    setSelected(prev => prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat].slice(0, 4));
  };

  const getSeatStyle = (seat: string) => {
    if (booked.includes(seat)) return 'bg-neutrals-700 cursor-not-allowed';
    if (selected.includes(seat)) return 'bg-green-500 text-white';
    if (ladies.includes(seat)) return 'bg-pink-500/30 text-pink-300 hover:bg-pink-500/50';
    return 'bg-neutrals-800 hover:bg-neutrals-700 text-neutrals-400';
  };

  return (
    <div className="w-full max-w-[200px] mx-auto">
      <div className="p-3 rounded-xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-700/50 backdrop-blur">
        {/* Driver */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-dashed border-neutrals-700">
          <div className="w-7 h-7 rounded bg-neutrals-700 flex items-center justify-center">
            <Bus className="w-4 h-4 text-neutrals-400" />
          </div>
          <span className="text-[10px] text-neutrals-500">DRIVER</span>
        </div>

        {/* Seats */}
        <div className="space-y-1.5">
          {rows.map((row, i) => (
            <div key={i} className="flex justify-center gap-1">
              {row.map((seat, j) => seat === null ? (
                <div key={j} className="w-7 h-7" />
              ) : (
                <motion.button
                  key={seat}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleSeat(seat)}
                  className={`w-7 h-7 rounded text-[9px] font-medium transition-all ${getSeatStyle(seat)}`}
                >
                  {seat}
                </motion.button>
              ))}
            </div>
          ))}
        </div>

        {/* Selection */}
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 pt-2 border-t border-neutrals-700 flex justify-between items-center"
          >
            <span className="text-[10px] text-neutrals-400">{selected.join(', ')}</span>
            <span className="text-sm font-bold text-[#e11d48]">₹{selected.length * 450}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const demos: Record<string, React.ReactNode> = {
  kadal: <KadalDemo />,
  busbuddy: <BusBuddyDemo />,
  saira: <SairaDemo />,
};

// ============================================================================
// SWIPE CARD COMPONENT
// ============================================================================

function SwipeCard({ 
  project, 
  onSwipe,
  onViewDetails,
  isTop,
}: { 
  project: Project; 
  onSwipe: (direction: 'left' | 'right') => void;
  onViewDetails: () => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  // Pre-compute transforms at top level to avoid conditional hook calls
  const skipOpacity = useTransform(x, [-100, 0], [1, 0]);
  const viewOpacity = useTransform(x, [0, 100], [0, 1]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) onSwipe('right');
    else if (info.offset.x < -100) onSwipe('left');
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
      style={{ x, rotate, opacity }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: x.get() > 0 ? 300 : -300, opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className={`relative h-full rounded-3xl overflow-hidden border border-neutrals-800/80 backdrop-blur-xl bg-gradient-to-br ${project.gradient} bg-neutrals-900/90`}>
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutrals-950/95" />
        
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />

        {/* Icon */}
        <motion.div 
          className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl bg-neutrals-800/50 backdrop-blur flex items-center justify-center border border-neutrals-700/30"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <project.icon className="w-10 h-10 text-primary opacity-60" />
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-neutrals-400 border border-white/10">
                {tech}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-neutrals-50 mb-1">{project.title}</h3>
          <p className="text-sm text-primary font-medium mb-2">{project.tagline}</p>
          <p className="text-sm text-neutrals-400 leading-relaxed mb-4">{project.description}</p>

          {/* View Details Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutrals-200 font-medium transition-all flex items-center justify-center gap-2"
          >
            <span>View Details</span>
            <span className="text-lg">→</span>
          </motion.button>
        </div>

        {/* Swipe indicators */}
        {isTop && (
          <>
            <motion.div
              className="absolute top-6 left-6 px-3 py-1.5 rounded-lg border border-neutrals-600 text-neutrals-500 text-xs font-medium uppercase tracking-wider -rotate-12"
              style={{ opacity: skipOpacity }}
            >
              Skip
            </motion.div>
            <motion.div
              className="absolute top-6 right-6 px-3 py-1.5 rounded-lg border border-primary text-primary text-xs font-medium uppercase tracking-wider rotate-12"
              style={{ opacity: viewOpacity }}
            >
              View
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ProjectCards() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = () => {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 150);
  };

  const handleViewDetails = (slug: string) => {
    router.push(`/showcase/${slug}`);
  };

  const currentProject = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Card Stack */}
      <div className="relative h-[480px] sm:h-[520px]">
        <AnimatePresence mode="popLayout">
          {/* Background card */}
          <motion.div
            key={`bg-${nextProject.id}`}
            className="absolute inset-0"
            initial={{ scale: 0.9 }}
            animate={{ scale: 0.95, y: 10 }}
            style={{ zIndex: 0 }}
          >
            <div className={`h-full rounded-3xl bg-gradient-to-br ${nextProject.gradient} bg-neutrals-900/50 border border-neutrals-800/50 opacity-50`} />
          </motion.div>

          {/* Current card */}
          <SwipeCard
            key={currentProject.id}
            project={currentProject}
            onSwipe={handleSwipe}
            onViewDetails={() => handleViewDetails(currentProject.slug)}
            isTop={true}
          />
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={() => handleSwipe()}
          className="w-12 h-12 rounded-full border border-neutrals-700 flex items-center justify-center text-neutrals-500 hover:text-neutrals-300 hover:border-neutrals-600 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-6 bg-primary' : 'w-2 bg-neutrals-700 hover:bg-neutrals-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => handleViewDetails(currentProject.slug)}
          className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center text-primary hover:bg-primary/10 transition-all"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Hint */}
      <p className="text-center text-neutrals-600 text-xs mt-5">
        Swipe or tap → for details
      </p>
    </div>
  );
}
