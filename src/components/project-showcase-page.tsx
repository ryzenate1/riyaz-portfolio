'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components/ui/container';
import {
  Fish, Bus, Ticket, Zap, Atom, Leaf, Theater, Database, Layers,
  Palette, Plug, Map, Mic, Code2, Shield, Server, Target,
  ArrowLeft, Github, ExternalLink, Gamepad2, FileCode, List,
  Copy, Check, CircleDot, Sparkles, LucideIcon, HelpCircle, ChevronDown,
  BookOpen, MessageCircleQuestion, Info
} from 'lucide-react';
import {
  KadalHeroDemo,
  KadalProductCard,
  KadalTrustBadges,
  KadalTestimonial,
  KadalCheckoutSteps,
  KadalCartProgress,
  KadalCartNotification,
  KadalOrderSuccess,
  KadalMacroCalculator,
  KadalCategorySlider,
  KadalOrderTracking,
  KadalSearchOverlay,
  KadalPremiumFishCard,
  BusBuddyLiveMap,
  BusBuddyVoice,
  BusBuddyCard,
  BusBuddyIoT,
  BusBuddyMLPredictor,
  BusBuddyWebSocket,
  BusBuddyOfflineMode,
  BusBuddyRouteFrequency,
  SairaSeatMap,
  SairaSearchWidget,
  SairaBusCard,
  SairaFilters,
  SairaBookingSteps,
  SairaPassengerForm,
  SairaTicketPreview,
  SairaPaymentMethods,
  SairaBoardingPoints,
  SairaPriceBreakdown,
  SairaAmenities,
  SairaRatings,
} from '@/components/project-demos';

// ============================================================================
// PROJECT DATA
// ============================================================================

interface Demo {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TechItem {
  name: string;
  icon: LucideIcon;
}

interface ProjectInfo {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  accentColor: string;
  techStack: TechItem[];
  features: string[];
  stats: { label: string; value: string }[];
  demos: Demo[];
  codeSnippets: CodeSnippet[];
  uniquePoints: string[];
  faqs: FAQ[];
}

const projects: Record<string, ProjectInfo> = {
  'kadal-thunai': {
    id: 'kadal',
    slug: 'kadal-thunai',
    title: 'Kadal Thunai',
    tagline: 'Premium Seafood E-Commerce Platform',
    description: 'A premium fresh seafood e-commerce platform for Tamil Nadu with bilingual support, GSAP animations, weight-based dynamic pricing, Swiggy-style cart, and celebration effects on successful orders.',
    icon: Fish,
    gradient: 'from-[#bd2d3c]/20 via-[#e1a653]/10 to-[#bd2d3c]/20',
    accentColor: '#bd2d3c',
    techStack: [
      { name: 'Next.js 15', icon: Zap },
      { name: 'React 19', icon: Atom },
      { name: 'GSAP', icon: Leaf },
      { name: 'Framer Motion', icon: Theater },
      { name: 'Supabase', icon: Database },
      { name: 'Prisma', icon: Layers },
      { name: 'Tailwind CSS', icon: Palette },
      { name: 'TypeScript', icon: Code2 },
    ],
    features: [
      'Tamil/English bilingual testimonials with toggle',
      'GSAP hero with clip-path reveals & SVG stroke animations',
      'Weight-based dynamic pricing (250g to 2kg)',
      'Swiggy-style cart with free delivery progress',
      'Multi-step checkout flow (Address → Time → Payment → Confirm)',
      'Confetti + sound effects on order success',
      'Haptic vibration feedback on mobile',
      'Trust badge system (FSSAI, Same Day, Best Price, Premium)',
      'Real-time order tracking with driver location',
      'Nutrition calculator based on weight selection',
      'Global search with recent & popular suggestions',
      'Auto-dismissing cart notifications with progress bar',
    ],
    stats: [
      { label: 'Components', value: '50+' },
      { label: 'Animations', value: '30+' },
      { label: 'API Routes', value: '25+' },
      { label: 'Fish Varieties', value: '40+' },
    ],
    demos: [
      { id: 'hero', title: 'Landing Hero Banner', description: 'GSAP-inspired hero with SVG underline animation & custom fonts', component: <KadalHeroDemo /> },
      { id: 'premium-card', title: 'Premium Fish Card', description: 'Detailed product card with nutrition info & weight selector', component: <KadalPremiumFishCard /> },
      { id: 'product', title: 'Product Card', description: 'Interactive weight selector with dynamic pricing', component: <KadalProductCard /> },
      { id: 'macro', title: 'Nutrition Calculator', description: 'Calculate Omega-3, protein & calories based on weight', component: <KadalMacroCalculator /> },
      { id: 'cart-notify', title: 'Cart Notification', description: 'Auto-dismissing toast with progress bar', component: <KadalCartNotification /> },
      { id: 'order-success', title: 'Order Success', description: 'Confetti celebration with haptic feedback', component: <KadalOrderSuccess /> },
      { id: 'tracking', title: 'Order Tracking', description: 'Real-time delivery status with driver location', component: <KadalOrderTracking /> },
      { id: 'search', title: 'Global Search', description: 'Search overlay with recent & popular suggestions', component: <KadalSearchOverlay /> },
      { id: 'categories', title: 'Category Slider', description: 'Horizontal category navigation', component: <KadalCategorySlider /> },
      { id: 'badges', title: 'Trust Badges', description: 'Animated trust indicators with gradients', component: <KadalTrustBadges /> },
      { id: 'testimonial', title: 'Tamil Testimonial', description: 'Bilingual toggle between Tamil and English', component: <KadalTestimonial /> },
      { id: 'checkout', title: 'Checkout Steps', description: 'Multi-step checkout flow visualization', component: <KadalCheckoutSteps /> },
      { id: 'cart', title: 'Cart Progress', description: 'Free delivery threshold with progress bar', component: <KadalCartProgress /> },
    ],
    codeSnippets: [
      {
        title: 'Weight-Based Dynamic Pricing',
        language: 'typescript',
        code: `const weightOptions = [
  { value: '250g', label: '250g', multiplier: 0.25 },
  { value: '500g', label: '500g', multiplier: 0.5 },
  { value: '1kg', label: '1kg', multiplier: 1 },
  { value: '2kg', label: '2kg', multiplier: 2 },
];

const calculatePrice = (basePrice: number, weight: string) => {
  const option = weightOptions.find(w => w.value === weight);
  return Math.round(basePrice * (option?.multiplier || 0.5));
};

// Usage in component
const [selectedWeight, setSelectedWeight] = useState('500g');
const price = calculatePrice(fish.basePrice, selectedWeight);`,
        explanation: 'Dynamic pricing system that calculates final price based on selected weight. The basePrice is per 500g, and multipliers scale accordingly.',
      },
      {
        title: 'GSAP Clip-Path Text Reveal',
        language: 'typescript',
        code: `import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const HeroText = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, []);
  
  return <h1 ref={textRef}>Kadal Thunai</h1>;
};`,
        explanation: 'Uses GSAP clip-path animation to create a smooth text reveal effect. The polygon values animate from hidden (top line) to fully visible.',
      },
      {
        title: 'SVG Stroke Animation',
        language: 'typescript',
        code: `<motion.svg viewBox="0 0 200 20">
  <motion.path
    d="M 10 10 Q 50 5 100 10 T 190 10"
    fill="none"
    stroke="#e1a653"
    strokeWidth="2"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ delay: 0.8, duration: 1.2 }}
  />
</motion.svg>`,
        explanation: 'Framer Motion pathLength animation creates a hand-drawn underline effect. The quadratic bezier curve gives it a natural, flowing appearance.',
      },
      {
        title: 'Haptic Vibration Feedback',
        language: 'typescript',
        code: `const handleAddToCart = () => {
  // Add to cart logic...
  
  // Haptic feedback for mobile devices
  if ('vibrate' in navigator) {
    navigator.vibrate(50); // 50ms pulse
  }
  
  // For order success, use pattern
  if ('vibrate' in navigator) {
    navigator.vibrate([100, 50, 100]); // buzz-pause-buzz
  }
};`,
        explanation: 'Web Vibration API provides tactile feedback on mobile devices. Single pulse for actions, patterns for celebrations.',
      },
      {
        title: 'Cart Notification with Auto-Dismiss',
        language: 'typescript',
        code: `const [progress, setProgress] = useState(100);
const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  if (isOpen) {
    setProgress(100);
    const timer = setTimeout(() => setIsOpen(false), 5000);
    
    const interval = setInterval(() => {
      setProgress(prev => Math.max(prev - 2, 0));
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }
}, [isOpen]);`,
        explanation: 'Auto-dismissing notification with visual progress bar. Decrements progress every 100ms over 5 seconds.',
      },
      {
        title: 'Confetti Celebration Effect',
        language: 'typescript',
        code: `const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

const triggerConfetti = () => {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#bd2d3c', '#e1a653', '#22c55e'][
      Math.floor(Math.random() * 3)
    ],
    delay: Math.random() * 0.5,
  }));
  setConfetti(pieces);
};

// In JSX
{confetti.map((piece) => (
  <motion.div
    key={piece.id}
    initial={{ y: -20, x: \`\${piece.x}%\`, opacity: 1 }}
    animate={{ y: 300, opacity: 0, rotate: 360 }}
    transition={{ duration: 2, delay: piece.delay }}
    style={{ backgroundColor: piece.color }}
  />
))}`,
        explanation: 'CSS-based confetti effect using Framer Motion. Each piece has random position, color, and animation delay for natural effect.',
      },
      {
        title: 'Bilingual Content Toggle (Tamil/English)',
        language: 'typescript',
        code: `interface Testimonial {
  name: string;
  tamil: string;
  english: string;
}

const [showTamil, setShowTamil] = useState(true);

<AnimatePresence mode="wait">
  <motion.p
    key={showTamil ? 'tamil' : 'english'}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    {showTamil ? testimonial.tamil : testimonial.english}
  </motion.p>
</AnimatePresence>

<button onClick={() => setShowTamil(!showTamil)}>
  {showTamil ? 'Translate to English' : 'தமிழில் காண்க'}
</button>`,
        explanation: 'AnimatePresence handles smooth transitions between Tamil and English content. Button text also toggles between languages.',
      },
      {
        title: 'Nutrition Calculator Logic',
        language: 'typescript',
        code: `interface FishNutrition {
  omega3Per100g: number;  // grams
  proteinPer100g: number; // grams
  caloriesPer100g: number;
}

const calculateNutrition = (
  fish: FishNutrition, 
  weightInGrams: number
) => {
  const multiplier = weightInGrams / 100;
  return {
    omega3: (fish.omega3Per100g * multiplier).toFixed(1),
    protein: (fish.proteinPer100g * multiplier).toFixed(0),
    calories: Math.round(fish.caloriesPer100g * multiplier),
  };
};

// Example: Seer Fish (Vanjaram)
const seerFish = {
  omega3Per100g: 1.2,
  proteinPer100g: 22,
  caloriesPer100g: 134,
};
const nutrition = calculateNutrition(seerFish, 500);
// { omega3: '6.0', protein: '110', calories: 670 }`,
        explanation: 'Nutrition values are stored per 100g and scaled based on selected weight. Helps customers make informed dietary decisions.',
      },
    ],
    uniquePoints: [
      'Regional Tamil language integration preserving cultural identity',
      'Confetti celebration + sound on successful orders',
      'Swiggy/Zomato-inspired cart UX with delivery threshold',
      'Mobile haptic feedback for add-to-cart actions',
      'GSAP-powered hero with custom clip-path animations',
      'Weight-based pricing with visual nutrition calculator',
      'Real-time order tracking with driver distance',
    ],
    faqs: [
      {
        question: 'Why did you choose weight-based pricing instead of fixed prices?',
        answer: 'Fresh seafood is traditionally sold by weight in India. Weight-based pricing (250g to 2kg) matches customer expectations and allows flexibility. The basePrice is set for 500g, and multipliers handle scaling. This approach increased average order value by 40% in testing.',
      },
      {
        question: 'How does the Tamil/English bilingual feature work?',
        answer: 'Each testimonial and some UI elements store both Tamil and English versions. Using AnimatePresence from Framer Motion, we smoothly transition between languages. The toggle preserves the cultural connection for Tamil-speaking customers while remaining accessible to all.',
      },
      {
        question: 'What\'s the technical implementation behind the GSAP hero animations?',
        answer: 'The hero uses GSAP for clip-path polygon reveals and SVG stroke animations. The text reveals from top using clip-path: polygon(), while the underline uses pathLength animation. GSAP was chosen over pure CSS for timeline control and complex sequencing.',
      },
      {
        question: 'How did you implement the confetti celebration effect?',
        answer: 'Instead of heavy libraries like canvas-confetti, I used CSS/Framer Motion. 30 div elements are positioned randomly and animated downward with rotation. Each piece has random delay and color. This approach is more performant and integrates with React\'s lifecycle.',
      },
      {
        question: 'Why use haptic feedback for cart actions?',
        answer: 'The Web Vibration API provides tactile confirmation on mobile devices. A 50ms pulse on "Add to Cart" and a buzz-pause-buzz pattern on order success creates a satisfying, app-like experience. Feature detection ensures it degrades gracefully on unsupported devices.',
      },
      {
        question: 'How does the free delivery progress bar work?',
        answer: 'The cart tracks total value and compares against a ₹500 threshold. A progress bar fills proportionally: (total / threshold) * 100. When threshold is met, the bar shows "Unlocked!" with a Zap icon. This gamification increased average order value significantly.',
      },
      {
        question: 'What\'s the architecture for real-time order tracking?',
        answer: 'Order tracking uses Supabase Realtime subscriptions. When the delivery driver updates their location, it broadcasts to the customer\'s session. The timeline component shows 4 stages: Placed → Processing → Out for Delivery → Delivered, with live driver distance.',
      },
      {
        question: 'How is the nutrition calculator implemented?',
        answer: 'Each fish has per-100g nutritional data (Omega-3, protein, calories). The calculator takes selected weight and applies a multiplier. This helps health-conscious customers understand nutritional value at their chosen portion size.',
      },
      {
        question: 'What was the biggest technical challenge?',
        answer: 'Integrating GSAP with React\'s render cycle was tricky. GSAP animations need refs and cleanup. I used useLayoutEffect for initial animations and GSAP\'s context() for proper cleanup on unmount. This prevents memory leaks and animation conflicts.',
      },
      {
        question: 'How do you handle image optimization for fish products?',
        answer: 'All product images use Next.js Image component with blur placeholders (blurDataURL). Images are served from Supabase Storage with CDN caching. We generate multiple sizes (320px, 640px, 1280px) and use srcSet for responsive loading.',
      },
    ],
  },
  'busbuddy': {
    id: 'busbuddy',
    slug: 'busbuddy',
    title: 'BusBuddy',
    tagline: 'Smart Public Transport Tracker',
    description: 'Smart India Hackathon 2025 project — Real-time bus tracking with multi-language voice commands (English, Hindi, Tamil, Telugu), IoT device simulation, WebSocket updates, and offline-first PWA architecture.',
    icon: Bus,
    gradient: 'from-[#E83E59]/20 via-[#FF6B6B]/10 to-[#E83E59]/20',
    accentColor: '#E83E59',
    techStack: [
      { name: 'Next.js 14', icon: Zap },
      { name: 'Socket.IO', icon: Plug },
      { name: 'Leaflet Maps', icon: Map },
      { name: 'Web Speech API', icon: Mic },
      { name: 'Zustand', icon: Database },
      { name: 'Supabase RT', icon: Zap },
    ],
    features: [
      'Voice commands in 4 Indian languages',
      'Tanglish/Hinglish pattern matching NLP',
      'Real-time WebSocket bus location updates',
      'Room-based pub/sub for efficient broadcasting',
      'GPS, Passenger Counter, Environmental IoT simulators',
      'Custom animated Leaflet markers with pulse effects',
      'Offline-first with <100ms cached responses',
      'Occupancy visualization with color coding',
    ],
    stats: [
      { label: 'Languages', value: '4' },
      { label: 'Response', value: '<100ms' },
      { label: 'IoT Devices', value: '3' },
    ],
    demos: [
      { id: 'map', title: 'Live Bus Map', description: 'Real-time bus tracking with animated markers', component: <BusBuddyLiveMap /> },
      { id: 'voice', title: 'Voice Commands', description: 'Multi-language voice recognition interface', component: <BusBuddyVoice /> },
      { id: 'ml', title: 'ML Predictions', description: 'ETA predictions with confidence scores', component: <BusBuddyMLPredictor /> },
      { id: 'websocket', title: 'WebSocket Panel', description: 'Real-time message stream visualization', component: <BusBuddyWebSocket /> },
      { id: 'card', title: 'Bus Card', description: 'Expandable bus info with occupancy meter', component: <BusBuddyCard /> },
      { id: 'iot', title: 'IoT Devices', description: 'Live device simulation panel', component: <BusBuddyIoT /> },
      { id: 'offline', title: 'Offline Mode', description: 'PWA offline-first caching demo', component: <BusBuddyOfflineMode /> },
      { id: 'frequency', title: 'Route Frequency', description: 'Peak vs off-peak scheduling', component: <BusBuddyRouteFrequency /> },
    ],
    codeSnippets: [
      {
        title: 'Multi-Language Voice Patterns',
        language: 'typescript',
        code: `// Tanglish (Tamil written in English) patterns
const TANGLISH_PATTERNS = {
  bus: ['bas', 'pass', 'buss', 'paas', 'bass', 'best', 'pest'],
  show: ['sho', 'cho', 'shew', 'saw', 'jo'],
  nearest: ['neerest', 'niarest', 'neerust', 'nerest'],
  where: ['vere', 'ver', 'vhere', 'were'],
};

// Pure Tamil patterns
const TAMIL_PATTERNS = {
  bus: ['பஸ்', 'வண்டி', 'பேருந்து'],
  show: ['காட்டு', 'காண்பி', 'சொல்லு'],
  find: ['தேடு', 'கண்டுபிடி'],
  nearest: ['அருகில்', 'கிட்ட', 'பக்கத்தில்'],
};

// Language detection using Unicode ranges
function detectLanguage(text: string): string {
  if (/[\\u0B80-\\u0BFF]/.test(text)) return 'ta-IN';
  if (/[\\u0900-\\u097F]/.test(text)) return 'hi-IN';
  return 'en-IN';
}`,
        explanation: 'Voice recognition handles 4 languages. Tanglish/Hinglish patterns map romanized Indian words to English commands. Unicode ranges detect native script automatically.'
      },
      {
        title: 'WebSocket Room-Based Pub/Sub',
        language: 'javascript',
        code: `// Server-side room management
io.on('connection', (socket) => {
  // Subscribe to specific routes
  socket.on('subscribe:route', (routeId) => {
    socket.join(\`route:\${routeId}\`);
    console.log(\`Client joined route:\${routeId}\`);
  });

  // Broadcast to route subscribers only
  socket.on('bus:location:update', (data) => {
    io.to(\`route:\${data.routeId}\`).emit('bus:location:updated', {
      busId: data.busId,
      position: data.position,
      speed: data.speed,
      occupancy: data.occupancy,
      timestamp: new Date().toISOString(),
    });
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});`,
        explanation: 'Room-based architecture ensures clients only receive updates for routes they\'re tracking. This dramatically reduces bandwidth vs broadcasting to all clients.'
      },
      {
        title: 'ML ETA Prediction Algorithm',
        language: 'javascript',
        code: `async function predictETA(routeId, stopId) {
  // Get historical arrival times (last 30 days)
  const historicalData = await getHistoricalData(routeId, stopId);
  
  // Calculate time-weighted average
  // Recent data weighted higher than older data
  const currentHour = new Date().getHours();
  let weightedSum = 0, totalWeight = 0;
  
  historicalData.forEach(record => {
    const recordHour = new Date(record.timestamp).getHours();
    const hourDiff = Math.abs(recordHour - currentHour);
    const weight = 1 / (1 + hourDiff); // Same-hour = weight 1
    
    weightedSum += record.arrivalTime * weight;
    totalWeight += weight;
  });

  // Apply traffic factor based on time of day
  const trafficFactor = getTrafficFactor(currentHour);
  // Peak hours: 1.3x, Late night: 0.8x, Normal: 1.0x
  
  return Math.round((weightedSum / totalWeight) * trafficFactor);
}`,
        explanation: 'ETA prediction uses time-weighted historical averages. Arrivals at similar hours are weighted more heavily. Traffic factors adjust for peak (8-10am, 5-8pm) vs off-peak times.'
      },
      {
        title: 'GPS Interpolation for Smooth Animation',
        language: 'javascript',
        code: `class GPSTracker {
  interpolatePosition(currentStop, nextStop, progress) {
    // Linear interpolation between stops
    const lat = currentStop.lat + 
      (nextStop.lat - currentStop.lat) * progress;
    const lng = currentStop.lng + 
      (nextStop.lng - currentStop.lng) * progress;
    
    // Add slight random deviation for realism
    const jitter = 0.0001;
    return {
      lat: lat + (Math.random() - 0.5) * jitter,
      lng: lng + (Math.random() - 0.5) * jitter,
    };
  }

  calculateSpeed(routeType, timeOfDay) {
    const baseSpeed = routeType === 'express' ? 45 : 30;
    const trafficMultiplier = this.getTrafficMultiplier(timeOfDay);
    return baseSpeed * trafficMultiplier + (Math.random() - 0.5) * 5;
  }
}`,
        explanation: 'IoT GPS simulator interpolates bus positions between known stops. Random jitter adds realism. Speed varies by route type and time of day to simulate actual traffic conditions.'
      },
      {
        title: 'Offline-First Caching Strategy',
        language: 'typescript',
        code: `// In-memory cache for instant responses
let busCache: Bus[] = [];
let lastCacheUpdate = 0;
const CACHE_DURATION = 30000; // 30 seconds

export function useVoiceRecognition() {
  // Preload buses into memory on mount
  useEffect(() => {
    const loadCache = async () => {
      const now = Date.now();
      if (now - lastCacheUpdate > CACHE_DURATION) {
        busCache = await BusService.getBuses();
        lastCacheUpdate = now;
      }
    };
    loadCache();
    const interval = setInterval(loadCache, CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const processCommand = async (text: string) => {
    const startTime = Date.now();
    
    // Use cached data - NO API DELAY!
    const foundBus = findClosestBus(busNumber, busCache);
    
    console.log('Response time:', Date.now() - startTime, 'ms');
    // Typical: 50-100ms vs 500ms+ with API call
  };
}`,
        explanation: 'Voice commands need instant response. In-memory cache eliminates API latency. Cache refreshes every 30s in background. Result: <100ms response time vs 500ms+ with network calls.'
      },
      {
        title: 'Custom Leaflet Bus Markers',
        language: 'typescript',
        code: `const createBusIcon = (routeNo: string, color: string) => {
  return L.divIcon({
    html: \`
      <div style="
        background: \${color};
        width: 40px; height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      ">
        \${routeNo}
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      </style>
    \`,
    className: 'custom-bus-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};`,
        explanation: 'Custom Leaflet divIcon renders HTML/CSS for rich markers. Inline keyframe animation creates pulse effect without external CSS. Route number displayed inside marker for quick identification.'
      },
      {
        title: 'Passenger Counter IoT Simulator',
        language: 'javascript',
        code: `class PassengerCounter {
  constructor(busId, capacity = 50) {
    this.busId = busId;
    this.capacity = capacity;
    this.currentCount = Math.floor(Math.random() * capacity * 0.5);
  }

  simulateStop() {
    // Simulate boarding/alighting at a stop
    const alighting = Math.floor(Math.random() * 
      Math.min(10, this.currentCount));
    const boarding = Math.floor(Math.random() * 
      Math.min(12, this.capacity - this.currentCount + alighting));
    
    this.currentCount = this.currentCount - alighting + boarding;
    
    return {
      busId: this.busId,
      type: 'passenger_count',
      data: {
        current: this.currentCount,
        capacity: this.capacity,
        occupancyPercent: Math.round((this.currentCount / this.capacity) * 100),
        lastBoarding: boarding,
        lastAlighting: alighting,
      },
      timestamp: new Date().toISOString(),
    };
  }
}`,
        explanation: 'Passenger counter simulates realistic boarding patterns. At each stop, some passengers alight (up to 10) and board (up to 12). Occupancy percentage drives the color-coded visualization.'
      },
      {
        title: 'Speech Synthesis for Responses',
        language: 'typescript',
        code: `const RESPONSES = {
  'en-IN': {
    searching: (num: string) => \`Searching for bus \${num}...\`,
    found: (num: string, eta: number) => 
      \`Found bus \${num}! Arriving in \${eta} minutes\`,
    notFound: (num: string) => \`Sorry, couldn't find bus \${num}\`,
  },
  'ta-IN': {
    searching: (num: string) => \`\${num} பஸ்ஸை தேடுகிறேன்...\`,
    found: (num: string, eta: number) => 
      \`\${num} பஸ் கிடைத்தது! \${eta} நிமிடங்களில் வரும்\`,
    notFound: (num: string) => 
      \`மன்னிக்கவும், \${num} பஸ் கிடைக்கவில்லை\`,
  },
};

function speakText(text: string, lang: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }
}`,
        explanation: 'Responses are spoken in the detected language. Tamil responses use Tamil script text. Speech rate is slowed slightly (0.95) for clarity. Previous speech is cancelled to prevent overlap.'
      },
    ],
    uniquePoints: [
      'Voice commands work in Tamil, Hindi, Telugu with accent detection',
      'Tanglish pattern matching ("bas 47 kaattu" → "show bus 47")',
      'Real-time simulation of GPS, passenger counter, environmental sensors',
      'Room-based WebSocket for efficient multi-route broadcasting',
      'ML-based ETA predictions with time-weighted historical data',
      'Offline-first PWA with <100ms cached voice responses',
    ],
    faqs: [
      {
        question: 'How does the multi-language voice recognition work?',
        answer: 'We use the Web Speech API with language-specific recognition (en-IN, hi-IN, ta-IN, te-IN). Each language has pattern dictionaries for common words. Unicode range detection identifies native scripts (Tamil: U+0B80-0BFF, Hindi: U+0900-097F). The system responds in the detected language using Speech Synthesis.',
      },
      {
        question: 'What is Tanglish/Hinglish pattern matching?',
        answer: 'Tanglish is Tamil written in English letters (romanized). We maintain pattern dictionaries mapping variations like "bas/pass/buss" to "bus" and "kaattu/kattu" to "show". Example: "bas 47 kaattu" maps to "show bus 47". This handles the informal way millions of Indians communicate daily mixing languages.',
      },
      {
        question: 'How do the IoT device simulators work?',
        answer: 'Three Node.js simulators run independently: (1) GPS Tracker interpolates bus positions between route stops with realistic jitter, (2) Passenger Counter simulates boarding/alighting at stops, (3) Environmental Sensor reports temperature/humidity. Each publishes to dedicated WebSocket channels at configurable intervals (default: 3-5 seconds).',
      },
      {
        question: 'How does the ML ETA prediction work?',
        answer: 'The predictor uses time-weighted historical averages. Data from the past 30 days is analyzed, with arrivals at similar hours weighted more heavily (weight = 1/(1+hourDiff)). Traffic factors adjust the prediction: 1.3x during peak hours (8-10am, 5-8pm), 0.8x late night, 1.0x otherwise. Confidence scores indicate prediction reliability.',
      },
      {
        question: 'Why room-based WebSocket architecture?',
        answer: 'Traditional broadcasting sends every update to every client, wasting bandwidth. Room-based pub/sub means clients only receive updates for routes they\'re actively tracking. Client joins route:47A room → only gets 47A updates. This scales efficiently with thousands of concurrent users without overloading the server.',
      },
      {
        question: 'How does the offline-first PWA work?',
        answer: 'Voice commands need instant feedback (<100ms). We cache bus data in memory, refreshing every 30 seconds. When offline, the app uses this cache with an "Offline Mode" indicator. Service workers cache static assets. IndexedDB stores route data for offline map viewing. Response times drop from 500ms+ (API) to <100ms (cache).',
      },
      {
        question: 'How are the custom map markers created?',
        answer: 'Leaflet\'s divIcon allows HTML/CSS rendering for markers instead of static images. We create circular markers showing the route number, with inline CSS animations for pulse effects. The icon anchor is set to center (20,20 for 40px icons) so markers appear at exact GPS coordinates. Color coding indicates bus status.',
      },
      {
        question: 'What\'s the SIH 2025 hackathon context?',
        answer: 'Smart India Hackathon is India\'s largest hackathon. The BusBuddy problem statement focused on improving public transport accessibility. Key judging criteria: (1) Real-world applicability, (2) Technical innovation, (3) User experience, (4) Scalability. Multi-language voice commands and IoT simulation addressed accessibility and innovation requirements.',
      },
      {
        question: 'How does occupancy color-coding work?',
        answer: 'Occupancy percentage drives the visualization: Green (<50%) = plenty of seats, Yellow (50-80%) = moderate crowding, Red (>80%) = very crowded. This appears in progress bars, marker colors, and card badges. Users can quickly decide whether to wait for the next bus based on color without reading numbers.',
      },
      {
        question: 'What database and real-time infrastructure is used?',
        answer: 'Supabase provides: PostgreSQL for structured data (routes, stops, schedules), PostGIS for geospatial queries (nearby stops), Real-time subscriptions for database changes. Socket.IO handles custom real-time events (bus locations, IoT data). Zustand manages client-side state with persistence to localStorage for offline support.',
      },
    ],
  },
  'saira-tickets': {
    id: 'saira',
    slug: 'saira-tickets',
    title: 'Saira Tickets',
    tagline: 'Bus Ticket Booking Platform',
    description: 'Full-stack bus booking platform (Redbus clone) with interactive seat map, glassmorphism UI, multi-step booking flow, Spring Boot backend, and advanced filtering system.',
    icon: Ticket,
    gradient: 'from-[#e11d48]/20 via-[#f97316]/10 to-[#e11d48]/20',
    accentColor: '#e11d48',
    techStack: [
      { name: 'Next.js 15', icon: Zap },
      { name: 'Spring Boot', icon: Leaf },
      { name: 'Clerk Auth', icon: Shield },
      { name: 'Framer Motion', icon: Theater },
      { name: 'Radix UI', icon: Target },
      { name: 'PostgreSQL', icon: Server },
    ],
    features: [
      'Interactive seat map with color-coded seats',
      'Ladies seat reservation system',
      'City swap animation with 180° rotation',
      'Glassmorphism design with backdrop blur',
      'Multi-step booking: Search → Seats → Details → Payment',
      'Advanced filtering (type, price, rating, amenities)',
      'Spring Boot REST API with JPA/Hibernate',
      'Real-time seat availability updates',
    ],
    stats: [
      { label: 'UI Components', value: '45+' },
      { label: 'Booking Steps', value: '5' },
      { label: 'API Endpoints', value: '20+' },
    ],
    demos: [
      { id: 'seats', title: 'Interactive Seat Map', description: 'Color-coded seats with selection logic', component: <SairaSeatMap /> },
      { id: 'booking-steps', title: 'Booking Flow', description: '5-step booking process with progress indicator', component: <SairaBookingSteps /> },
      { id: 'search', title: 'Search Widget', description: 'Glassmorphism search with city swap animation', component: <SairaSearchWidget /> },
      { id: 'buscard', title: 'Bus Listing Card', description: 'Route details with amenities and pricing', component: <SairaBusCard /> },
      { id: 'passenger', title: 'Passenger Form', description: 'Add multiple passengers with validation', component: <SairaPassengerForm /> },
      { id: 'boarding', title: 'Boarding Points', description: 'Pickup/Drop location selection', component: <SairaBoardingPoints /> },
      { id: 'payment', title: 'Payment Methods', description: 'UPI, Card, Net Banking, Wallet options', component: <SairaPaymentMethods /> },
      { id: 'price', title: 'Price Breakdown', description: 'Itemized fare with coupon support', component: <SairaPriceBreakdown /> },
      { id: 'ticket', title: 'Ticket Preview', description: 'Flip card with QR code for boarding', component: <SairaTicketPreview /> },
      { id: 'amenities', title: 'Bus Amenities', description: 'Grid of available bus features', component: <SairaAmenities /> },
      { id: 'ratings', title: 'Ratings & Reviews', description: 'Star distribution with user feedback', component: <SairaRatings /> },
      { id: 'filters', title: 'Filter Controls', description: 'Advanced filtering options', component: <SairaFilters /> },
    ],
    codeSnippets: [
      {
        title: 'Seat Selection State Machine',
        language: 'typescript',
        code: `type SeatStatus = 'available' | 'selected' | 'booked' | 'ladies';

const getSeatClass = (seat: Seat, selectedIds: Set<string>) => {
  if (!seat.is_available) return 'bg-gray-400 cursor-not-allowed';
  if (selectedIds.has(seat.id)) return 'bg-green-500 text-white scale-105';
  if (seat.is_ladies) return 'bg-pink-200 hover:bg-pink-300';
  return 'bg-white hover:bg-gray-50 shadow-sm';
};

const handleSeatClick = (seat: Seat) => {
  if (!seat.is_available) return;
  if (selectedSeats.includes(seat.id)) {
    setSelectedSeats(prev => prev.filter(id => id !== seat.id));
  } else if (selectedSeats.length < MAX_SEATS) {
    setSelectedSeats(prev => [...prev, seat.id]);
  } else {
    toast.error(\`Maximum \${MAX_SEATS} seats allowed\`);
  }
};`,
        explanation: 'Seats use a state machine pattern - each seat transitions between states based on user interaction. Color coding (pink=ladies, gray=booked, green=selected) provides instant visual feedback.'
      },
      {
        title: 'Glassmorphism Design System',
        language: 'css',
        code: `.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.glass-card-elevated {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}`,
        explanation: 'Glassmorphism creates depth using backdrop-filter blur with semi-transparent backgrounds. The key is balancing blur amount (12-20px), background opacity (0.05-0.1), and border subtlety.'
      },
      {
        title: 'City Swap Animation',
        language: 'typescript',
        code: `const [isSwapped, setIsSwapped] = useState(false);

const handleSwap = () => {
  setIsSwapped(prev => !prev);
  // Swap cities with satisfying rotation
  const temp = fromCity;
  setFromCity(toCity);
  setToCity(temp);
};

// In JSX:
<motion.button
  onClick={handleSwap}
  animate={{ rotate: isSwapped ? 180 : 0 }}
  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
  className="p-3 rounded-full bg-gradient-to-r from-rose-500 to-orange-500"
>
  <ArrowLeftRight className="w-5 h-5 text-white" />
</motion.button>`,
        explanation: 'The swap button rotates 180° on each click using Framer Motion spring physics. This creates a satisfying interaction where users can instantly see the action taking effect.'
      },
      {
        title: 'Multi-Step Booking Context',
        language: 'typescript',
        code: `interface BookingState {
  step: 'search' | 'select' | 'passengers' | 'payment' | 'confirmation';
  searchData: {
    from: string;
    to: string;
    date: Date;
    returnDate?: Date;
  } | null;
  selectedBus: Bus | null;
  selectedSeats: Seat[];
  boardingPoint: BoardingPoint | null;
  droppingPoint: DroppingPoint | null;
  passengers: Passenger[];
  coupon: string | null;
  totalAmount: number;
}

const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | null>(null);`,
        explanation: 'A centralized context manages the entire booking flow. Each step validates before proceeding, and the state persists across page navigations for seamless user experience.'
      },
      {
        title: 'Spring Boot REST Controller',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/buses")
@CrossOrigin(origins = "*")
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping("/search")
    public ResponseEntity<List<BusDTO>> searchBuses(
        @RequestParam String from,
        @RequestParam String to,
        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
    ) {
        return ResponseEntity.ok(busService.searchBuses(from, to, date));
    }

    @GetMapping("/{busId}/seats")
    public ResponseEntity<SeatLayoutDTO> getSeatLayout(@PathVariable Long busId) {
        return ResponseEntity.ok(busService.getSeatLayout(busId));
    }

    @PostMapping("/book")
    public ResponseEntity<BookingDTO> createBooking(
        @Valid @RequestBody BookingRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(busService.createBooking(request));
    }
}`,
        explanation: 'Spring Boot backend provides RESTful endpoints. @Valid ensures request validation, @CrossOrigin enables frontend communication. Service layer handles business logic with proper exception handling.'
      },
      {
        title: 'Dynamic Price Calculation',
        language: 'typescript',
        code: `const calculateFare = (
  selectedSeats: Seat[],
  coupon: Coupon | null
): PriceBreakdown => {
  const baseFare = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const gstAmount = baseFare * 0.05; // 5% GST
  const convenienceFee = 30;
  
  let discount = 0;
  if (coupon) {
    discount = coupon.type === 'percentage'
      ? (baseFare * coupon.value) / 100
      : coupon.value;
    discount = Math.min(discount, coupon.maxDiscount || Infinity);
  }
  
  return {
    baseFare,
    gstAmount,
    convenienceFee,
    discount,
    total: baseFare + gstAmount + convenienceFee - discount,
  };
};`,
        explanation: 'Price calculation is centralized to ensure consistency. Coupons support both percentage and flat discounts with max cap. GST (5%) is standard for bus tickets in India.'
      },
      {
        title: 'Real-time Seat Lock',
        language: 'typescript',
        code: `// Temporary seat lock when user starts booking
const lockSeats = async (seatIds: string[], busId: string) => {
  try {
    await api.post('/seats/lock', {
      seatIds,
      busId,
      userId: user.id,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    });
    
    setLockTimer(600); // Start countdown
    
    const interval = setInterval(() => {
      setLockTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleLockExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  } catch (error) {
    toast.error('Failed to lock seats. Please try again.');
  }
};`,
        explanation: 'Seat locking prevents double bookings. When a user selects seats, they\'re temporarily locked for 10 minutes. If booking isn\'t completed, seats are automatically released.'
      },
      {
        title: 'Amenity Filter System',
        language: 'typescript',
        code: `type AmenityFilter = {
  wifi: boolean;
  charging: boolean;
  blanket: boolean;
  waterBottle: boolean;
  liveTracking: boolean;
};

const filterBuses = (buses: Bus[], filters: FilterState) => {
  return buses.filter(bus => {
    // Price filter
    if (bus.fare < filters.priceRange[0] || bus.fare > filters.priceRange[1]) 
      return false;
    
    // Rating filter
    if (bus.rating < filters.minRating) return false;
    
    // Bus type filter
    if (filters.busTypes.length && !filters.busTypes.includes(bus.type)) 
      return false;
    
    // Amenity filter (all selected must be present)
    const requiredAmenities = Object.entries(filters.amenities)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key);
    
    return requiredAmenities.every(amenity => 
      bus.amenities.includes(amenity)
    );
  });
};`,
        explanation: 'Filter system uses compound AND logic - buses must match all criteria. Price uses range slider, rating uses minimum threshold, and amenities require all selected features to be present.'
      },
    ],
    uniquePoints: [
      'Color-coded seats: ladies (pink), booked (gray), selected (green)',
      'Maximum 6 seats per booking with live validation',
      'City swap with satisfying 180° rotation animation',
      'Full Spring Boot backend with proper REST architecture',
      '10-minute seat lock to prevent double bookings',
      'QR code ticket generation for contactless boarding',
    ],
    faqs: [
      {
        question: 'How does the interactive seat selection work?',
        answer: 'The seat map renders a 2D grid where each seat is a clickable element with its own state. Colors indicate availability: white (available), pink (ladies-only), gray (booked), green (selected). When clicked, seats toggle between available/selected states, with a maximum limit of 6 seats enforced. The state updates optimistically and syncs with the backend.',
      },
      {
        question: 'Why did you choose Spring Boot for the backend?',
        answer: 'Spring Boot was chosen to demonstrate full-stack Java capabilities. It provides: (1) Robust REST API development with built-in validation, (2) JPA/Hibernate for efficient database operations, (3) Spring Security for authentication, (4) Easy integration with PostgreSQL. This showcases enterprise-grade backend skills alongside modern frontend work.',
      },
      {
        question: 'How is the glassmorphism effect implemented?',
        answer: 'Glassmorphism uses CSS backdrop-filter with blur() combined with semi-transparent backgrounds (rgba with low alpha). The recipe: background: rgba(255,255,255,0.08), backdrop-filter: blur(12px), and subtle borders with rgba(255,255,255,0.12). This creates the frosted glass effect while maintaining content readability.',
      },
      {
        question: 'How do you handle concurrent booking conflicts?',
        answer: 'We implement a temporary seat lock system. When a user selects seats, those seats are locked on the server for 10 minutes. Other users see them as "being booked". If the booking isn\'t completed within the time limit, seats are automatically released. This prevents the frustrating experience of booking a seat that someone else already took.',
      },
      {
        question: 'What\'s the multi-step booking flow architecture?',
        answer: 'The flow uses React Context with a state machine pattern: Search → Select Bus → Choose Seats → Boarding Points → Passenger Details → Payment → Confirmation. Each step validates before proceeding. A central BookingContext holds all data, persisting across navigations. Users can go back to previous steps without losing progress.',
      },
      {
        question: 'How does the price calculation work?',
        answer: 'Pricing follows Indian bus ticket norms: Base Fare (sum of selected seat prices) + GST (5%) + Convenience Fee (₹30). Coupons can be percentage-based or flat discounts with maximum caps. The breakdown is calculated in real-time as users modify their selection, providing full transparency.',
      },
      {
        question: 'Why separate boarding and dropping point selection?',
        answer: 'Long-distance buses have multiple pickup and drop points in each city. Letting users choose specific points (e.g., "Koyambedu Bus Stand" or "Electronic City") provides convenience and accurate arrival time estimates. Each point shows distance from city center to help users pick the nearest option.',
      },
      {
        question: 'How is the ticket QR code generated?',
        answer: 'After successful payment, the server generates a unique booking ID and creates a QR code containing encrypted booking details. The QR is shown on the ticket preview and can be scanned at boarding points for contactless verification. The flip animation (front: ticket details, back: QR) adds a delightful interaction.',
      },
      {
        question: 'What authentication method is used?',
        answer: 'Clerk Auth handles authentication with support for email/password, Google, and phone OTP. It provides: pre-built UI components, session management, webhook integration for backend sync, and organization/role management. This allows focusing on core features while having enterprise-grade auth.',
      },
      {
        question: 'How are bus ratings and reviews managed?',
        answer: 'After completing a trip, users can rate (1-5 stars) and review the service. Ratings are aggregated with a weighted average (recent reviews count more). Reviews go through moderation before appearing. The rating distribution chart shows authenticity - real services have natural distributions, not all 5-stars.',
      },
    ],
  },
};

// ============================================================================
// COMPONENTS
// ============================================================================

function DemoCard({ demo, index, fullWidth = false }: { demo: Demo; index: number; fullWidth?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-2xl bg-neutrals-900/60 border border-neutrals-700/50 backdrop-blur-xl overflow-hidden ${fullWidth ? 'col-span-full' : ''}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <CircleDot className="w-3 h-3 text-green-500 animate-pulse" />
        <h4 className="font-semibold text-neutrals-100">{demo.title}</h4>
      </div>
      <p className="text-sm text-neutrals-500 mb-6">{demo.description}</p>
      <div className="flex justify-center items-center">
        {demo.component}
      </div>
    </motion.div>
  );
}

function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-neutrals-700/50 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-2 bg-neutrals-800/80">
        <span className="text-sm font-medium text-neutrals-300 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-primary" /> {snippet.title}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-neutrals-700 text-neutrals-400 hover:text-white transition-colors"
        >
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <pre className="p-4 bg-neutrals-900/90 overflow-x-auto scrollbar-hide">
        <code className="text-sm text-primary font-mono whitespace-pre">{snippet.code}</code>
      </pre>
      {snippet.explanation && (
        <div className="px-4 py-3 bg-neutrals-800/40 border-t border-neutrals-700/30">
          <p className="text-xs text-neutrals-400 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
            {snippet.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function FAQAccordion({ faqs, accentColor }: { faqs: FAQ[]; accentColor: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-xl overflow-hidden border border-neutrals-700/50 backdrop-blur"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-5 py-4 flex items-center justify-between text-left bg-neutrals-800/40 hover:bg-neutrals-800/60 transition-colors"
          >
            <span className="font-medium text-neutrals-100 flex items-center gap-3 pr-4">
              <MessageCircleQuestion className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-neutrals-400 flex-shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 py-4 bg-neutrals-900/40 border-t border-neutrals-700/30">
                  <p className="text-neutrals-300 leading-relaxed pl-8">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ProjectShowcasePage({ slug }: { slug: string }) {
  const project = projects[slug];
  const [activeTab, setActiveTab] = useState<'demos' | 'code' | 'details' | 'faq'>('demos');

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutrals-400">Project not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <Container>
        {/* Back Button */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-neutrals-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative p-8 md:p-12 rounded-3xl mb-12 overflow-hidden bg-neutrals-900/60 backdrop-blur-xl border border-neutrals-700/50`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
          
          {/* Accent glow */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: project.accentColor }}
          />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center bg-neutrals-800/80 backdrop-blur border border-neutrals-700/50"
                style={{ boxShadow: `0 0 40px ${project.accentColor}30` }}
              >
                <project.icon className="w-10 h-10 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{project.title}</h1>
                <p className="text-xl text-white/70 mb-4">{project.tagline}</p>
                <p className="text-neutrals-300 leading-relaxed max-w-2xl">{project.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {project.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-lg font-semibold text-neutrals-200 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutrals-800/60 border border-neutrals-700/50 text-neutrals-300 backdrop-blur"
              >
                <tech.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-neutrals-800 pb-4 overflow-x-auto scrollbar-hide">
          {(['demos', 'code', 'details', 'faq'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white/10 text-white backdrop-blur'
                  : 'text-neutrals-500 hover:text-neutrals-300'
              }`}
            >
              {tab === 'demos' && <Gamepad2 className="w-4 h-4" />}
              {tab === 'code' && <FileCode className="w-4 h-4" />}
              {tab === 'details' && <List className="w-4 h-4" />}
              {tab === 'faq' && <HelpCircle className="w-4 h-4" />}
              {tab === 'faq' ? 'FAQ' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'faq' && project.faqs && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                  {project.faqs.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'demos' && (
            <motion.div
              key="demos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {project.demos.map((demo, i) => (
                  <DemoCard 
                    key={demo.id} 
                    demo={demo} 
                    index={i} 
                    fullWidth={demo.id === 'hero'}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-neutrals-400 mb-6">Key code patterns from this project:</p>
              {project.codeSnippets.map((snippet) => (
                <CodeBlock key={snippet.title} snippet={snippet} />
              ))}
            </motion.div>
          )}

          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-neutrals-100 mb-4">Key Features</h3>
                <div className="space-y-2">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-neutrals-800/30 border border-neutrals-800"
                    >
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: project.accentColor }} />
                      <span className="text-sm text-neutrals-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* What Makes It Unique */}
              <div>
                <h3 className="text-lg font-semibold text-neutrals-100 mb-4">What Makes It Unique</h3>
                <div className="space-y-3">
                  {project.uniquePoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-xl border border-neutrals-700/50"
                      style={{ background: `linear-gradient(135deg, ${project.accentColor}10, transparent)` }}
                    >
                      <p className="text-neutrals-200">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'faq' && project.faqs && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-neutrals-100 mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" style={{ color: project.accentColor }} />
                  Frequently Asked Questions
                </h3>
                <p className="text-neutrals-400 text-sm">
                  Deep dive into the technical decisions and implementation details of {project.title}.
                </p>
              </div>
              <FAQAccordion faqs={project.faqs} accentColor={project.accentColor} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 mt-12 pt-8 border-t border-neutrals-800"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutrals-800/60 border border-neutrals-700/50 text-neutrals-200 hover:border-neutrals-600 transition-colors backdrop-blur"
          >
            <Github className="w-5 h-5" />
            View Source Code
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-colors"
            style={{ background: project.accentColor }}
          >
            <ExternalLink className="w-5 h-5" />
            Live Demo
          </motion.a>
        </motion.div>
      </Container>
    </main>
  );
}
