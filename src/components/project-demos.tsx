'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Fish, Leaf, ShieldCheck, Truck, BadgePercent, Star, 
  MapPin, Clock, CreditCard, CheckCircle2, ShoppingCart, Plus, Check,
  Mic, MicOff, Globe, Languages, Bus, Navigation, Users, Thermometer,
  Wifi, BatteryCharging, Droplets, Radio, Search,
  SlidersHorizontal, Armchair, X, ChevronRight, Package, Zap,
  Phone, Building2, ReceiptText, Banknote, QrCode, Smartphone,
  RefreshCw, AlertCircle, Info, Layers,
  Brain, Target, TrendingUp, TrendingDown, Minus, Sparkles, Plug, WifiOff
} from 'lucide-react';

// ============================================================================
// KADAL DEMOS
// ============================================================================

// 0. Hero Banner Demo - Exact replica of the landing page
export function KadalHeroDemo() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative w-full max-w-2xl h-[400px] rounded-2xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/images/kadal-bg.jpg)',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center px-8 text-center z-10">
        
        {/* Welcome Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/90 text-lg md:text-xl tracking-widest uppercase font-light mb-2"
          style={{ letterSpacing: '0.3em' }}
        >
          Welcome To
        </motion.p>

        {/* Main Title - Kadal Thunai */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[#bd2d3c] text-5xl md:text-7xl font-bold mb-3"
          style={{ 
            fontFamily: 'var(--font-neurial-bold, "Inter", sans-serif)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Kadal Thunai.
        </motion.h1>

        {/* SignatureCuts with SVG Underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mb-6"
        >
          <span 
            className="text-white text-4xl md:text-5xl italic font-italianno"
            style={{ 
              fontFamily: 'var(--font-italianno), "Italianno", cursive',
            }}
          >
            SignatureCuts
          </span>
          
          {/* SVG Underline */}
          <motion.svg
            className="absolute -bottom-2 left-0 w-full h-4"
            viewBox="0 0 200 20"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.path
              d="M 10 10 Q 50 5 100 10 T 190 10"
              fill="none"
              stroke="#e1a653"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            />
          </motion.svg>
        </motion.div>

        {/* Promise Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-white/80 text-sm md:text-base max-w-md mb-8 leading-relaxed"
        >
          Experience the finest selection of fresh seafood, 
          delivered with care to your doorstep
        </motion.p>

        {/* Shop Now Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 10px 40px rgba(189, 45, 60, 0.4)' 
          }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-[#bd2d3c] text-white font-bold text-sm uppercase tracking-widest rounded-full shadow-lg shadow-[#bd2d3c]/30 transition-all flex items-center gap-3"
        >
          <ShoppingCart className="w-5 h-5" />
          Shop Now
          <ChevronRight className="w-4 h-4" />
        </motion.button>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-6 left-6"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Fish className="w-8 h-8 text-[#e1a653]/40" />
        </motion.div>

        <motion.div
          className="absolute bottom-6 right-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Fish className="w-10 h-10 text-[#e1a653]/30 rotate-45" />
        </motion.div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-xs text-white/80 font-medium">FSSAI Certified</span>
        </motion.div>

        {/* Delivery Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <Truck className="w-4 h-4 text-[#e1a653]" />
          <span className="text-xs text-white/80 font-medium">Same Day Delivery</span>
        </motion.div>
      </div>

      {/* Animated Border Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={isHovered ? {
          boxShadow: '0 0 0 2px rgba(189, 45, 60, 0.5), 0 0 40px rgba(189, 45, 60, 0.2)'
        } : {
          boxShadow: '0 0 0 0px transparent'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// 1. Product Card with Weight Selector
export function KadalProductCard() {
  const [weight, setWeight] = useState('500g');
  const [inCart, setInCart] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const weights = ['250g', '500g', '1kg', '2kg'];
  const multipliers: Record<string, number> = { '250g': 0.25, '500g': 0.5, '1kg': 1, '2kg': 2 };
  const basePrice = 450;
  const price = Math.round(basePrice * multipliers[weight]);

  return (
    <motion.div 
      className="w-full max-w-[260px] rounded-2xl overflow-hidden bg-white shadow-xl"
      whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
    >
      <div className="relative h-40 bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center">
        <motion.div 
          className="w-16 h-16 rounded-full bg-[#bd2d3c]/10 flex items-center justify-center"
          animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Fish className="w-8 h-8 text-[#bd2d3c]" />
        </motion.div>
        
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <motion.div animate={liked ? { scale: [1, 1.4, 1] } : {}}>
            <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
          </motion.div>
        </motion.button>

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#bd2d3c] text-white flex items-center gap-1">
          <BadgePercent className="w-3 h-3" /> 20% OFF
        </div>
        
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-medium bg-green-500 text-white flex items-center gap-1">
          <Leaf className="w-3 h-3" /> Fresh Today
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-bold text-gray-900 mb-0.5">Seer Fish (Vanjaram)</h4>
        <p className="text-xs text-gray-500 mb-3">Premium cut • Cleaned & gutted</p>

        <div className="flex gap-1.5 mb-4">
          {weights.map((w) => (
            <button
              key={w}
              onClick={() => setWeight(w)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                weight === w
                  ? 'bg-[#bd2d3c] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
            <span className="text-sm text-gray-400 line-through ml-2">₹{Math.round(price * 1.2)}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setInCart(!inCart);
              if (!inCart && 'vibrate' in navigator) navigator.vibrate(50);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
              inCart ? 'bg-green-500 text-white' : 'bg-[#bd2d3c] text-white hover:bg-[#a02532]'
            }`}
          >
            {inCart ? <><Check className="w-4 h-4" /> Added</> : <><Plus className="w-4 h-4" /> Add</>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// 2. Trust Badges
export function KadalTrustBadges() {
  const badges = [
    { icon: ShieldCheck, title: 'FSSAI', desc: 'Certified', gradient: 'from-green-500/20 to-green-600/20', border: 'border-green-500/40', text: 'text-green-400', iconColor: 'text-green-400' },
    { icon: Truck, title: 'Same Day', desc: 'Delivery', gradient: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/40', text: 'text-blue-400', iconColor: 'text-blue-400' },
    { icon: Banknote, title: 'Best', desc: 'Price', gradient: 'from-red-500/20 to-red-600/20', border: 'border-red-500/40', text: 'text-red-400', iconColor: 'text-red-400' },
    { icon: Star, title: 'Premium', desc: 'Quality', gradient: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/40', text: 'text-yellow-400', iconColor: 'text-yellow-400' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.05, y: -4 }}
          className={`flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br ${badge.gradient} border ${badge.border} backdrop-blur min-w-[90px]`}
        >
          <badge.icon className={`w-6 h-6 mb-1 ${badge.iconColor}`} />
          <span className={`text-sm font-bold ${badge.text}`}>{badge.title}</span>
          <span className="text-xs text-neutrals-400">{badge.desc}</span>
        </motion.div>
      ))}
    </div>
  );
}

// 3. Tamil Testimonial Toggle
export function KadalTestimonial() {
  const [showTamil, setShowTamil] = useState(true);

  const testimonial = {
    name: 'Priya Sharma',
    location: 'Chennai',
    tamil: '"காடல் துணை மூலம் மிகவும் புதிய மற்றும் தரமான மீன் கிடைக்கிறது. என் குடும்பம் மிகவும் மகிழ்ச்சியாக இருக்கிறது."',
    english: '"Through Kadal Thunai, I get the freshest and highest quality fish. My family is extremely happy."',
	};

  return (
    <motion.div className="w-full max-w-md p-5 rounded-2xl bg-gradient-to-br from-neutrals-800/80 to-neutrals-900/80 border border-neutrals-700/50 backdrop-blur">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#bd2d3c] to-[#e1a653] flex items-center justify-center text-white font-bold text-lg">
          P
        </div>
        <div className="flex-1">
          <p className="font-semibold text-neutrals-100">{testimonial.name}</p>
          <p className="text-sm text-neutrals-500">{testimonial.location}</p>
        </div>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map((s) => <span key={s} className="text-yellow-400">★</span>)}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={showTamil ? 'tamil' : 'english'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-neutrals-300 leading-relaxed mb-4"
        >
          {showTamil ? testimonial.tamil : testimonial.english}
        </motion.p>
      </AnimatePresence>

      <button
        onClick={() => setShowTamil(!showTamil)}
        className="text-sm px-4 py-2 rounded-full bg-[#bd2d3c]/20 text-[#bd2d3c] hover:bg-[#bd2d3c]/30 transition-colors font-medium flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        {showTamil ? 'Translate to English' : 'தமிழில் காண்க'}
      </button>
    </motion.div>
  );
}

// 4. Checkout Flow Steps
export function KadalCheckoutSteps() {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: MapPin, label: 'Address', desc: 'Delivery location' },
    { icon: Clock, label: 'Time Slot', desc: 'Morning / Evening' },
    { icon: CreditCard, label: 'Payment', desc: 'Card / UPI / COD' },
    { icon: CheckCircle2, label: 'Confirm', desc: 'Review order' },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <motion.button
              onClick={() => setStep(i)}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                i <= step 
                  ? 'bg-[#bd2d3c] text-white shadow-lg shadow-[#bd2d3c]/30' 
                  : 'bg-neutrals-800 text-neutrals-500'
              }`}
            >
              {i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
            </motion.button>
            {i < steps.length - 1 && (
              <div className={`w-8 h-1 mx-1 rounded ${i < step ? 'bg-[#bd2d3c]' : 'bg-neutrals-800'}`} />
            )}
          </div>
        ))}
      </div>
      
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 rounded-xl bg-neutrals-800/50 border border-neutrals-700"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#bd2d3c]/20 flex items-center justify-center">
            {(() => { const Icon = steps[step].icon; return <Icon className="w-6 h-6 text-[#bd2d3c]" />; })()}
          </div>
          <div>
            <h4 className="font-semibold text-neutrals-100">{steps[step].label}</h4>
            <p className="text-sm text-neutrals-400">{steps[step].desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 5. Cart with Free Delivery Progress
export function KadalCartProgress() {
  const [items] = useState([
    { name: 'Seer Fish', weight: '500g', price: 225 },
    { name: 'Prawns', weight: '250g', price: 180 },
  ]);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const freeDeliveryAt = 500;
  const progress = Math.min((total / freeDeliveryAt) * 100, 100);
  const remaining = Math.max(freeDeliveryAt - total, 0);

  return (
    <div className="w-full max-w-sm p-4 rounded-2xl bg-white shadow-xl">
      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-[#bd2d3c]" /> Your Cart <span className="text-sm font-normal text-gray-500">({items.length} items)</span>
      </h4>
      
      {items.map((item, i) => (
        <div key={i} className="flex justify-between py-2 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-500">{item.weight}</p>
          </div>
          <p className="font-semibold text-gray-900">₹{item.price}</p>
        </div>
      ))}

      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-green-700 flex items-center gap-1"><Truck className="w-4 h-4" /> Free Delivery Progress</span>
          <span className="font-medium text-green-700">{remaining > 0 ? `₹${remaining} more` : <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Unlocked!</span>}</span>
        </div>
        <div className="h-2 bg-green-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-600">Total</span>
        <span className="text-2xl font-bold text-gray-900">₹{total}</span>
      </div>
    </div>
  );
}

// 6. Cart Notification Toast
export function KadalCartNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [progress, setProgress] = useState(100);

  const triggerNotification = () => {
    setShowNotification(true);
    setProgress(100);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          setShowNotification(false);
          return 0;
        }
        return prev - 2;
      });
    }, 100);
  };

  return (
    <div className="w-full max-w-sm">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={triggerNotification}
        className="w-full py-3 px-6 rounded-xl bg-[#bd2d3c] text-white font-semibold flex items-center justify-center gap-2 mb-4"
      >
        <Plus className="w-5 h-5" /> Add Item to Cart
      </motion.button>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="p-4 rounded-xl bg-white shadow-2xl border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#bd2d3c]/10 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-[#bd2d3c]" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Added to Cart!</h4>
                <p className="text-sm text-gray-500">Seer Fish (500g) has been added</p>
              </div>
              <button onClick={() => setShowNotification(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500">Cart Total: <span className="font-semibold text-gray-900">₹405</span></p>
                <p className="text-xs text-gray-400">2 items in cart</p>
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-[#bd2d3c] text-white text-sm font-medium flex items-center gap-1"
              >
                View Cart <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="h-1 bg-gray-200 mt-3 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#bd2d3c]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 7. Order Success with Confetti Effect
export function KadalOrderSuccess() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number }[]>([]);

  const triggerSuccess = () => {
    setShowSuccess(true);
    // Generate confetti
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#bd2d3c', '#e1a653', '#22c55e', '#3b82f6', '#f59e0b'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.5,
    }));
    setConfetti(newConfetti);

    // Play sound simulation
    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
  };

  return (
    <div className="w-full max-w-sm">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={triggerSuccess}
        disabled={showSuccess}
        className="w-full py-3 px-6 rounded-xl bg-green-500 text-white font-semibold flex items-center justify-center gap-2 mb-4 disabled:opacity-50"
      >
        <CreditCard className="w-5 h-5" /> Complete Payment
      </motion.button>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-6 rounded-2xl bg-white shadow-2xl text-center overflow-hidden"
          >
            {/* Confetti */}
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ y: -20, x: `${piece.x}%`, opacity: 1 }}
                animate={{ y: 300, opacity: 0, rotate: 360 }}
                transition={{ duration: 2, delay: piece.delay, ease: 'easeOut' }}
                className="absolute top-0 w-2 h-2 rounded-full"
                style={{ backgroundColor: piece.color, left: `${piece.x}%` }}
              />
            ))}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </motion.div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-green-600 mb-2"
            >
              Order Placed!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-500 mb-4"
            >
              Your fresh fish is on its way!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-3 rounded-xl bg-gray-50 mb-4"
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order ID</span>
                <span className="font-mono font-medium text-gray-900">#KT2024001</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Delivery ETA</span>
                <span className="font-medium text-gray-900">90 minutes</span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 rounded-xl bg-[#bd2d3c] text-white font-semibold flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" /> Track Order
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 8. Macro Nutrition Calculator
export function KadalMacroCalculator() {
  const [weight, setWeight] = useState(500);
  const [fish] = useState({
    name: 'Seer Fish (Vanjaram)',
    omega3Per100g: 1.2,
    proteinPer100g: 22,
    caloriesPer100g: 134,
  });

  const multiplier = weight / 100;
  const omega3 = (fish.omega3Per100g * multiplier).toFixed(1);
  const protein = (fish.proteinPer100g * multiplier).toFixed(0);
  const calories = Math.round(fish.caloriesPer100g * multiplier);

  const quickWeights = [250, 500, 750, 1000];

  return (
    <div className="w-full max-w-sm p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900">Nutrition Calculator</h4>
          <p className="text-xs text-blue-600">{fish.name}</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Select weight (grams)</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="50"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-full appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">100g</span>
          <span className="text-lg font-bold text-blue-700">{weight}g</span>
          <span className="text-xs text-gray-500">2000g</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {quickWeights.map((w) => (
          <button
            key={w}
            onClick={() => setWeight(w)}
            className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${
              weight === w
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-blue-50 border border-blue-200'
            }`}
          >
            {w}g
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
          <div className="text-2xl font-bold text-blue-700">{omega3}g</div>
          <div className="text-xs text-blue-600 font-medium">Omega-3</div>
          <div className="text-[10px] text-gray-400 mt-1">Heart health</div>
        </div>
        <div className="text-center p-3 bg-white rounded-xl border border-green-100 shadow-sm">
          <div className="text-2xl font-bold text-green-700">{protein}g</div>
          <div className="text-xs text-green-600 font-medium">Protein</div>
          <div className="text-[10px] text-gray-400 mt-1">Muscle</div>
        </div>
        <div className="text-center p-3 bg-white rounded-xl border border-orange-100 shadow-sm">
          <div className="text-2xl font-bold text-orange-700">{calories}</div>
          <div className="text-xs text-orange-600 font-medium">Calories</div>
          <div className="text-[10px] text-gray-400 mt-1">Energy</div>
        </div>
      </div>
    </div>
  );
}

// 9. Category Slider
export function KadalCategorySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = [
    { name: 'Premium Fish', icon: Fish, count: 24, color: '#bd2d3c' },
    { name: 'Prawns', icon: Fish, count: 12, color: '#e1a653' },
    { name: 'Crabs', icon: Fish, count: 8, color: '#3b82f6' },
    { name: 'Lobster', icon: Fish, count: 6, color: '#8b5cf6' },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#e1a653]" /> Categories
        </h4>
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            className="w-8 h-8 rounded-lg bg-neutrals-800 flex items-center justify-center text-neutrals-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <button 
            onClick={() => setActiveIndex(Math.min(categories.length - 1, activeIndex + 1))}
            className="w-8 h-8 rounded-lg bg-neutrals-800 flex items-center justify-center text-neutrals-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            onClick={() => setActiveIndex(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-shrink-0 p-4 rounded-2xl transition-all min-w-[140px] ${
              activeIndex === i
                ? 'bg-white shadow-xl'
                : 'bg-neutrals-800/60 border border-neutrals-700/50'
            }`}
          >
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                activeIndex === i ? '' : 'bg-neutrals-700/50'
              }`}
              style={{ backgroundColor: activeIndex === i ? `${cat.color}20` : undefined }}
            >
              <cat.icon className="w-6 h-6" style={{ color: activeIndex === i ? cat.color : '#9ca3af' }} />
            </div>
            <p className={`font-semibold text-sm ${activeIndex === i ? 'text-gray-900' : 'text-neutrals-300'}`}>
              {cat.name}
            </p>
            <p className={`text-xs mt-1 ${activeIndex === i ? 'text-gray-500' : 'text-neutrals-500'}`}>
              {cat.count} items
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// 10. Order Tracking Timeline
export function KadalOrderTracking() {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = [
    { id: 0, title: 'Order Placed', time: '10:30 AM', icon: Package, status: 'completed' },
    { id: 1, title: 'Processing', time: '10:35 AM', icon: RefreshCw, status: 'completed' },
    { id: 2, title: 'Out for Delivery', time: '11:45 AM', icon: Truck, status: 'current' },
    { id: 3, title: 'Delivered', time: 'Est. 12:30 PM', icon: CheckCircle2, status: 'pending' },
  ];

  return (
    <div className="w-full max-w-sm p-5 rounded-2xl bg-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-bold text-gray-900">Track Order</h4>
          <p className="text-sm text-gray-500">#KT2024001</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse" /> Live
        </div>
      </div>

      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: step.status === 'current' ? [1, 1.1, 1] : 1,
                  backgroundColor: 
                    step.status === 'completed' ? '#22c55e' :
                    step.status === 'current' ? '#3b82f6' : '#e5e7eb'
                }}
                transition={{ repeat: step.status === 'current' ? Infinity : 0, duration: 2 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed' || step.status === 'current' ? 'text-white' : 'text-gray-400'
                }`}
              >
                <step.icon className="w-5 h-5" />
              </motion.div>
              {i < steps.length - 1 && (
                <div className={`w-0.5 h-12 ${
                  steps[i + 1].status !== 'pending' ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
            <div className="flex-1 pb-8">
              <p className={`font-medium ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                {step.title}
              </p>
              <p className="text-sm text-gray-500">{step.time}</p>
              {step.status === 'current' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-blue-600 mt-1 flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" /> Driver is 2.5 km away
                </motion.p>
              )}
            </div>
          </div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
        className="w-full mt-2 py-3 rounded-xl bg-[#bd2d3c] text-white font-semibold flex items-center justify-center gap-2"
      >
        <Phone className="w-5 h-5" /> Contact Driver
      </motion.button>
    </div>
  );
}

// 11. Global Search Overlay
export function KadalSearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches] = useState(['Seer Fish', 'Prawns', 'Pomfret']);
  const popular = ['Vanjaram', 'Tiger Prawns', 'Crabs', 'Salmon'];

  const results = query.length > 0 ? [
    { name: 'Seer Fish (Vanjaram)', price: 450, type: 'Premium' },
    { name: 'King Fish Steaks', price: 380, type: 'Fresh' },
  ] : [];

  return (
    <div className="w-full max-w-sm">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-3 rounded-xl bg-neutrals-800/60 border border-neutrals-700/50 flex items-center gap-3 text-neutrals-400 hover:border-neutrals-600 transition-colors"
      >
        <Search className="w-5 h-5" />
        <span>Search for fish, seafood...</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 p-4 rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 outline-none text-gray-900"
                autoFocus
              />
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {query.length === 0 ? (
              <div className="pt-3">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="w-4 h-4" /> Recent
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((s) => (
                        <button key={s} onClick={() => setQuery(s)} className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700 hover:bg-gray-200">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Star className="w-4 h-4" /> Popular
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <button key={p} onClick={() => setQuery(p)} className="px-3 py-1.5 rounded-full bg-[#bd2d3c]/10 text-sm text-[#bd2d3c] hover:bg-[#bd2d3c]/20">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-3 space-y-2">
                {results.map((r) => (
                  <div key={r.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-[#bd2d3c]/10 flex items-center justify-center">
                      <Fish className="w-6 h-6 text-[#bd2d3c]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{r.name}</p>
                      <p className="text-xs text-gray-500">{r.type}</p>
                    </div>
                    <span className="font-semibold text-[#bd2d3c]">₹{r.price}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 12. Premium Fish Card (Detailed)
export function KadalPremiumFishCard() {
  const [selectedWeight, setSelectedWeight] = useState('500g');
  const weights = [
    { value: '250g', multiplier: 0.5 },
    { value: '500g', multiplier: 1 },
    { value: '1kg', multiplier: 2 },
    { value: '2kg', multiplier: 3.8 },
  ];
  const basePrice = 899;
  const price = Math.round(basePrice * (weights.find(w => w.value === selectedWeight)?.multiplier || 1));

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-full max-w-[280px] rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-100"
    >
      <div className="relative h-44 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <motion.div 
          className="w-20 h-20 rounded-full bg-[#bd2d3c]/10 flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Fish className="w-12 h-12 text-[#bd2d3c]" />
        </motion.div>
        
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-[#bd2d3c] to-[#e1a653] text-white flex items-center gap-1">
          <Star className="w-3 h-3" /> PREMIUM
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
          <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-green-500/90 text-white flex items-center gap-1">
            <Leaf className="w-3 h-3" /> Fresh
          </span>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 shadow-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">4.9</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-bold text-gray-900 mb-1">Premium Vangaram Fish</h4>
        <p className="text-xs text-gray-500 mb-3">Whole • Cleaned & Gutted • Ready to Cook</p>

        <div className="grid grid-cols-3 gap-2 mb-4 p-2 rounded-lg bg-gray-50">
          <div className="text-center">
            <p className="text-xs font-bold text-red-600">1.2g</p>
            <p className="text-[10px] text-gray-500">Ω-3</p>
          </div>
          <div className="text-center border-x border-gray-200">
            <p className="text-xs font-bold text-green-600">22g</p>
            <p className="text-[10px] text-gray-500">Protein</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-orange-600">134</p>
            <p className="text-[10px] text-gray-500">Cal</p>
          </div>
        </div>

        <div className="flex gap-1.5 mb-4">
          {weights.map((w) => (
            <button
              key={w.value}
              onClick={() => setSelectedWeight(w.value)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedWeight === w.value
                  ? 'bg-[#bd2d3c] text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {w.value}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">₹{price}</span>
              <span className="text-sm text-gray-400 line-through">₹{Math.round(price * 1.35)}</span>
            </div>
            <span className="text-xs text-green-600 font-medium">35% OFF</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#bd2d3c] to-[#a02532] text-white font-semibold flex items-center gap-1.5 shadow-lg shadow-[#bd2d3c]/30"
          >
            <ShoppingCart className="w-4 h-4" /> Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// BUSBUDDY DEMOS
// ============================================================================

// 1. Live Bus Map
export function BusBuddyLiveMap() {
  const [buses, setBuses] = useState([
    { id: 1, route: '47A', x: 20, y: 25, status: 'active', occupancy: 65 },
    { id: 2, route: '23B', x: 60, y: 55, status: 'active', occupancy: 42 },
    { id: 3, route: '15C', x: 40, y: 75, status: 'delayed', occupancy: 88 },
    { id: 4, route: '32D', x: 75, y: 30, status: 'active', occupancy: 23 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => ({
        ...bus,
        x: bus.status === 'active' ? Math.max(8, Math.min(92, bus.x + (Math.random() - 0.5) * 10)) : bus.x,
        y: bus.status === 'active' ? Math.max(8, Math.min(92, bus.y + (Math.random() - 0.5) * 10)) : bus.y,
        occupancy: Math.max(10, Math.min(95, bus.occupancy + Math.floor((Math.random() - 0.5) * 10))),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-neutrals-700/50">
      {/* Grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '25px 25px'
      }} />

      {/* Route lines */}
      <svg className="absolute inset-0 w-full h-full">
        <path d="M 20 70 Q 100 30 180 90 T 340 60" stroke="#E83E59" strokeWidth="2" fill="none" strokeDasharray="8,4" opacity="0.3" />
        <path d="M 30 150 Q 150 80 280 140" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="8,4" opacity="0.3" />
      </svg>

      {/* Buses */}
      {buses.map((bus) => (
        <motion.div
          key={bus.id}
          animate={{ left: `${bus.x}%`, top: `${bus.y}%` }}
          transition={{ type: 'spring', stiffness: 40, damping: 15 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
        >
          {bus.status === 'active' && (
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full bg-[#E83E59]"
              style={{ width: 44, height: 44, margin: -6 }}
            />
          )}
          <motion.div
            whileHover={{ scale: 1.15 }}
            className={`relative w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ${
              bus.status === 'active' ? 'bg-[#E83E59]' : 'bg-amber-500'
            }`}
          >
            {bus.route}
          </motion.div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutrals-900 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-neutrals-700 z-20">
            <div className="font-semibold text-white mb-1">Route {bus.route}</div>
            <div className="text-neutrals-400 mb-1">{bus.occupancy}% occupied</div>
            <div className="h-1.5 bg-neutrals-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${bus.occupancy > 80 ? 'bg-red-500' : bus.occupancy > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${bus.occupancy}%` }}
              />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Live badge */}
      <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E83E59]/20 border border-[#E83E59]/40">
        <Radio className="w-3 h-3 text-[#E83E59] animate-pulse" />
        <span className="text-xs text-[#E83E59] font-semibold">LIVE</span>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutrals-900/80 text-[10px] text-neutrals-400 border border-neutrals-700">
          <span className="w-2 h-2 rounded-full bg-[#E83E59]" /> Active
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutrals-900/80 text-[10px] text-neutrals-400 border border-neutrals-700">
          <AlertCircle className="w-3 h-3 text-amber-500" /> Delayed
        </div>
      </div>
    </div>
  );
}

// 2. Voice Command Interface
export function BusBuddyVoice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en-IN');

  const languages = [
    { code: 'en-IN', name: 'EN', flag: 'EN' },
    { code: 'hi-IN', name: 'हिं', flag: 'HI' },
    { code: 'ta-IN', name: 'த', flag: 'TA' },
    { code: 'te-IN', name: 'తె', flag: 'TE' },
  ];

  const commands: Record<string, { text: string; response: string }[]> = {
    'en-IN': [
      { text: 'Where is bus 47A?', response: 'Bus 47A is 3 stops away, arriving in ~6 minutes at 65% capacity' },
      { text: 'Show nearest bus', response: 'Bus 23B is nearest - 400m away, arriving in 2 minutes' },
    ],
    'hi-IN': [
      { text: 'बस 47A कहाँ है?', response: 'बस 47A 3 स्टॉप दूर है, ~6 मिनट में आएगी' },
    ],
    'ta-IN': [
      { text: '47A பஸ் எங்கே?', response: '47A பஸ் 3 நிறுத்தங்கள் தொலைவில், ~6 நிமிடங்களில் வரும்' },
    ],
    'te-IN': [
      { text: '47A బస్సు ఎక్కడ?', response: '47A బస్సు 3 స్టాప్‌ల దూరంలో, ~6 నిమిషాల్లో వస్తుంది' },
    ],
  };

  const handleVoiceClick = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');
    
    const langCommands = commands[language] || commands['en-IN'];
    const command = langCommands[Math.floor(Math.random() * langCommands.length)];
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= command.text.length) {
        setTranscript(command.text.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsListening(false);
        setTimeout(() => setResponse(command.response), 400);
      }
    }, 60);
  };

  return (
    <div className="w-full max-w-sm p-6 rounded-2xl bg-gradient-to-br from-[#E83E59]/10 to-neutrals-900/80 border border-[#E83E59]/20 backdrop-blur">
      {/* Language selector */}
      <div className="flex justify-center gap-2 mb-6">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => { setLanguage(lang.code); setTranscript(''); setResponse(''); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              language === lang.code
                ? 'bg-[#E83E59] text-white shadow-lg shadow-[#E83E59]/30'
                : 'bg-neutrals-800 text-neutrals-400 hover:bg-neutrals-700'
            }`}
          >
            <Languages className="w-3 h-3" /> {lang.name}
          </button>
        ))}
      </div>

      {/* Mic button */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={handleVoiceClick}
          whileTap={{ scale: 0.95 }}
          className="relative w-24 h-24 rounded-full bg-[#E83E59] flex items-center justify-center shadow-xl shadow-[#E83E59]/40"
        >
          {isListening && (
            <>
              <motion.div
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute inset-0 rounded-full bg-[#E83E59]"
              />
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                className="absolute inset-0 rounded-full bg-[#E83E59]"
              />
            </>
          )}
          {isListening ? <Mic className="w-10 h-10 text-white relative z-10" /> : <MicOff className="w-10 h-10 text-white relative z-10" />}
        </motion.button>
      </div>

      {/* Transcript */}
      <AnimatePresence mode="wait">
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <p className="text-xs text-neutrals-500 mb-1">You said:</p>
            <p className="text-white font-medium text-lg">&ldquo;{transcript}&rdquo;</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response */}
      <AnimatePresence mode="wait">
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-neutrals-800/80 border border-neutrals-700"
          >
            <p className="text-neutrals-200 leading-relaxed">{response}</p>
            <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Response time: 89ms
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!transcript && !response && (
        <p className="text-center text-sm text-neutrals-500">Tap the mic to try voice commands</p>
      )}
    </div>
  );
}

// 3. Bus Card
export function BusBuddyCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="w-full max-w-sm p-4 rounded-2xl bg-gradient-to-br from-neutrals-800/80 to-neutrals-900/80 border border-neutrals-700/50 cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className="w-14 h-14 rounded-xl bg-[#E83E59]/20 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Bus className="w-7 h-7 text-[#E83E59]" />
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-neutrals-100">Route 47A</h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
              <Check className="w-3 h-3" /> On Time
            </span>
          </div>
          <p className="text-sm text-neutrals-400">Central Station → Tech Park</p>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-neutrals-700 overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#E83E59]">5</p>
                <p className="text-xs text-neutrals-500">min away</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-neutrals-100">65%</p>
                <p className="text-xs text-neutrals-500">capacity</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-neutrals-100">32</p>
                <p className="text-xs text-neutrals-500">km/h</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-neutrals-500 mb-1">Occupancy</p>
              <div className="h-2 bg-neutrals-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 4. IoT Devices Panel
export function BusBuddyIoT() {
  const [devices, setDevices] = useState([
    { id: 'gps', name: 'GPS Tracker', icon: Navigation, status: 'active', value: '13.0827°N, 80.2707°E', lastUpdate: '2s ago' },
    { id: 'counter', name: 'Passenger Counter', icon: Users, status: 'active', value: '34/50', lastUpdate: '5s ago' },
    { id: 'env', name: 'Environmental', icon: Thermometer, status: 'active', value: '28°C, 65%', lastUpdate: '3s ago' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(d => ({
        ...d,
        value: d.id === 'counter' 
          ? `${Math.floor(Math.random() * 20 + 30)}/50`
          : d.id === 'env'
          ? `${Math.floor(Math.random() * 5 + 26)}°C, ${Math.floor(Math.random() * 20 + 55)}%`
          : d.value,
        lastUpdate: `${Math.floor(Math.random() * 5 + 1)}s ago`
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <Radio className="w-5 h-5 text-[#E83E59]" />
        <h4 className="font-semibold text-neutrals-100">IoT Devices</h4>
        <span className="ml-auto text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
          <Wifi className="w-3 h-3" /> All Online
        </span>
      </div>
      <div className="space-y-3">
        {devices.map((device) => (
          <motion.div
            key={device.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-neutrals-800/50 border border-neutrals-700/50"
          >
            <div className="w-12 h-12 rounded-xl bg-neutrals-700/50 flex items-center justify-center">
              <device.icon className="w-6 h-6 text-[#E83E59]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-neutrals-200">{device.name}</p>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <p className="text-sm text-neutrals-400">{device.value}</p>
            </div>
            <p className="text-xs text-neutrals-600">{device.lastUpdate}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 5. ML Prediction Display
export function BusBuddyMLPredictor() {
  const [predictions, setPredictions] = useState([
    { id: 1, route: '47A', stop: 'Central Station', eta: 5, confidence: 92, trend: 'stable' },
    { id: 2, route: '23B', stop: 'Tech Park', eta: 12, confidence: 87, trend: 'improving' },
    { id: 3, route: '15C', stop: 'City Mall', eta: 8, confidence: 78, trend: 'delayed' },
  ]);
  const accuracy = { mae: 2.3, samples: 1247 };

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(p => ({
        ...p,
        eta: Math.max(1, p.eta + Math.floor((Math.random() - 0.5) * 3)),
        confidence: Math.min(99, Math.max(70, p.confidence + Math.floor((Math.random() - 0.5) * 5))),
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'delayed': return <TrendingDown className="w-3 h-3 text-red-400" />;
      default: return <Minus className="w-3 h-3 text-yellow-400" />;
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#E83E59]" />
          <h4 className="font-semibold text-neutrals-100">ML Predictions</h4>
        </div>
        <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-neutrals-800 text-neutrals-400">
          <Target className="w-3 h-3" />
          <span>±{accuracy.mae} min</span>
        </div>
      </div>

      <div className="space-y-3">
        {predictions.map((pred) => (
          <motion.div
            key={pred.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 rounded-xl bg-neutrals-800/50 border border-neutrals-700/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#E83E59]/20 text-[#E83E59] text-xs font-bold">
                    {pred.route}
                  </span>
                  {getTrendIcon(pred.trend)}
                </div>
                <p className="text-sm text-neutrals-400">{pred.stop}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neutrals-100">{pred.eta}</p>
                <p className="text-xs text-neutrals-500">minutes</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-neutrals-500 mb-1">
                <span>Confidence</span>
                <span className={pred.confidence >= 85 ? 'text-green-400' : pred.confidence >= 75 ? 'text-yellow-400' : 'text-orange-400'}>
                  {pred.confidence}%
                </span>
              </div>
              <div className="h-1.5 bg-neutrals-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${pred.confidence >= 85 ? 'bg-green-500' : pred.confidence >= 75 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pred.confidence}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl bg-[#E83E59]/10 border border-[#E83E59]/20">
        <p className="text-xs text-neutrals-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E83E59]" />
          Based on {accuracy.samples} historical predictions
        </p>
      </div>
    </div>
  );
}

// 6. WebSocket Status Panel
export function BusBuddyWebSocket() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'location', route: '47A', time: '2s ago' },
    { id: 2, type: 'occupancy', route: '23B', time: '4s ago' },
    { id: 3, type: 'status', route: '15C', time: '7s ago' },
  ]);
  const [stats, setStats] = useState({ messagesPerSec: 12, activeRooms: 8, clients: 156 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => {
        const newMsg = {
          id: Date.now(),
          type: ['location', 'occupancy', 'status'][Math.floor(Math.random() * 3)],
          route: ['47A', '23B', '15C', '32D'][Math.floor(Math.random() * 4)],
          time: 'just now',
        };
        return [newMsg, ...prev.slice(0, 4)];
      });
      setStats({
        messagesPerSec: Math.floor(Math.random() * 8 + 8),
        activeRooms: Math.floor(Math.random() * 4 + 6),
        clients: Math.floor(Math.random() * 50 + 140),
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Plug className="w-5 h-5 text-[#E83E59]" />
          <h4 className="font-semibold text-neutrals-100">WebSocket</h4>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Connected
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-3 rounded-xl bg-neutrals-800/50 text-center">
          <p className="text-xl font-bold text-neutrals-100">{stats.messagesPerSec}</p>
          <p className="text-[10px] text-neutrals-500">msg/sec</p>
        </div>
        <div className="p-3 rounded-xl bg-neutrals-800/50 text-center">
          <p className="text-xl font-bold text-neutrals-100">{stats.activeRooms}</p>
          <p className="text-[10px] text-neutrals-500">rooms</p>
        </div>
        <div className="p-3 rounded-xl bg-neutrals-800/50 text-center">
          <p className="text-xl font-bold text-neutrals-100">{stats.clients}</p>
          <p className="text-[10px] text-neutrals-500">clients</p>
        </div>
      </div>

      {/* Message Stream */}
      <div className="space-y-2">
        <p className="text-xs text-neutrals-500 flex items-center gap-1">
          <Radio className="w-3 h-3" /> Live Message Stream
        </p>
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1 - i * 0.2, x: 0 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-neutrals-800/30 text-xs"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              msg.type === 'location' ? 'bg-blue-500' : msg.type === 'occupancy' ? 'bg-yellow-500' : 'bg-green-500'
            }`} />
            <span className="text-neutrals-400">{msg.type}</span>
            <span className="px-1.5 py-0.5 rounded bg-neutrals-700 text-neutrals-300">{msg.route}</span>
            <span className="ml-auto text-neutrals-600">{msg.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 7. Offline Mode Indicator
export function BusBuddyOfflineMode() {
  const [isOffline, setIsOffline] = useState(false);
  const cachedData = { buses: 12, routes: 8, lastSync: '2 min ago' };

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-neutrals-100 flex items-center gap-2">
          {isOffline ? <WifiOff className="w-5 h-5 text-orange-500" /> : <Wifi className="w-5 h-5 text-green-500" />}
          {isOffline ? 'Offline Mode' : 'Online'}
        </h4>
        <button
          onClick={() => setIsOffline(!isOffline)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            isOffline ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
          }`}
        >
          {isOffline ? 'Go Online' : 'Simulate Offline'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isOffline ? (
          <motion.div
            key="offline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                <p className="text-sm font-medium text-orange-400">Using Cached Data</p>
              </div>
              <p className="text-xs text-neutrals-400">Your bus data is from {cachedData.lastSync}. Connect to update.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-neutrals-800/50 text-center">
                <p className="text-2xl font-bold text-neutrals-100">{cachedData.buses}</p>
                <p className="text-xs text-neutrals-500">Cached Buses</p>
              </div>
              <div className="p-4 rounded-xl bg-neutrals-800/50 text-center">
                <p className="text-2xl font-bold text-neutrals-100">{cachedData.routes}</p>
                <p className="text-xs text-neutrals-500">Cached Routes</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-neutrals-800/30">
              <RefreshCw className="w-4 h-4 text-neutrals-500 animate-spin" />
              <p className="text-xs text-neutrals-400">Attempting to reconnect...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="online"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-400">Connected</p>
                <p className="text-xs text-neutrals-400">Real-time updates active</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 8. Route Frequency Chart
export function BusBuddyRouteFrequency() {
  const routes = [
    { id: '47A', name: 'Central - Tech Park', frequency: 15, peakFrequency: 8, color: '#E83E59' },
    { id: '23B', name: 'Station - Mall', frequency: 20, peakFrequency: 12, color: '#3b82f6' },
    { id: '15C', name: 'Airport - City', frequency: 30, peakFrequency: 20, color: '#10b981' },
  ];

  return (
    <div className="w-full max-w-md">
      <h4 className="font-semibold text-neutrals-100 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-[#E83E59]" /> Route Frequency
      </h4>

      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="p-4 rounded-xl bg-neutrals-800/50 border border-neutrals-700/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: `${route.color}20`, color: route.color }}>
                    {route.id}
                  </span>
                  <span className="text-sm text-neutrals-300">{route.name}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutrals-500 mb-1">Off-Peak</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-neutrals-100">{route.frequency}</span>
                  <span className="text-xs text-neutrals-500">min</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-neutrals-500 mb-1">Peak Hours</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold" style={{ color: route.color }}>{route.peakFrequency}</span>
                  <span className="text-xs text-neutrals-500">min</span>
                </div>
              </div>
            </div>
            <div className="mt-3 h-2 bg-neutrals-700 rounded-full overflow-hidden flex">
              <motion.div
                className="h-full"
                style={{ backgroundColor: route.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(route.peakFrequency / route.frequency) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SAIRA DEMOS
// ============================================================================

// 1. Interactive Seat Map (Full)
export function SairaSeatMap() {
  const [selected, setSelected] = useState<string[]>([]);
  const booked = ['1C', '2A', '3D', '4B', '5C'];
  const ladies = ['1A', '1B', '2C', '2D'];
  
  const rows = [
    { row: 1, seats: ['1A', '1B', null, '1C', '1D'] },
    { row: 2, seats: ['2A', '2B', null, '2C', '2D'] },
    { row: 3, seats: ['3A', '3B', null, '3C', '3D'] },
    { row: 4, seats: ['4A', '4B', null, '4C', '4D'] },
    { row: 5, seats: ['5A', '5B', '5C', '5D', '5E'] },
  ];

  const toggleSeat = (seat: string) => {
    if (booked.includes(seat)) return;
    if (selected.includes(seat)) {
      setSelected(prev => prev.filter(s => s !== seat));
    } else if (selected.length < 6) {
      setSelected(prev => [...prev, seat]);
    }
  };

  const getSeatStyle = (seat: string) => {
    if (booked.includes(seat)) return 'bg-gray-400 text-gray-600 cursor-not-allowed';
    if (selected.includes(seat)) return 'bg-green-500 text-white shadow-lg shadow-green-500/30';
    if (ladies.includes(seat)) return 'bg-pink-200 text-pink-700 hover:bg-pink-300 border-pink-300';
    return 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300';
  };

  const totalPrice = selected.length * 450;

  return (
    <div className="w-full max-w-xs">
      <div className="p-5 rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-gray-300 shadow-xl">
        {/* Driver */}
        <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-dashed border-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gray-400 flex items-center justify-center">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-500">DRIVER</span>
          </div>
          <div className="text-xs text-gray-400">Front</div>
        </div>

        {/* Seats */}
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.row} className="flex justify-center gap-2">
              {row.seats.map((seat, idx) => seat === null ? (
                <div key={`aisle-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-300 text-xs">
                  ║
                </div>
              ) : (
                <motion.button
                  key={seat}
                  whileHover={{ scale: booked.includes(seat) ? 1 : 1.1 }}
                  whileTap={{ scale: booked.includes(seat) ? 1 : 0.95 }}
                  onClick={() => toggleSeat(seat)}
                  className={`w-10 h-10 rounded-lg text-xs font-semibold border-2 transition-all ${getSeatStyle(seat)}`}
                >
                  {seat}
                </motion.button>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-5 pt-4 border-t border-gray-300">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-white border-2 border-gray-300" />
            <span className="text-[10px] text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-[10px] text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-pink-200 border-2 border-pink-300" />
            <span className="text-[10px] text-gray-600">Ladies</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-gray-400" />
            <span className="text-[10px] text-gray-600">Booked</span>
          </div>
        </div>
      </div>

      {/* Selection summary */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#e11d48]/10 to-[#f97316]/10 border border-[#e11d48]/20"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-neutrals-400">Seats:</span>
              <span className="font-medium text-white">{selected.join(', ')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutrals-400">Total:</span>
              <span className="text-xl font-bold text-[#e11d48]">₹{totalPrice}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white font-semibold"
            >
              Continue Booking
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 2. Search Widget with City Swap
export function SairaSearchWidget() {
  const [from, setFrom] = useState('Chennai');
  const [to, setTo] = useState('Bangalore');
  const [isSwapping, setIsSwapping] = useState(false);

  const swapCities = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = from;
      setFrom(to);
      setTo(temp);
      setIsSwapping(false);
    }, 150);
  };

  return (
    <div className="w-full max-w-sm p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
      <div className="relative">
        {/* From */}
        <div className="p-4 rounded-xl bg-white/10 border border-white/10 mb-3">
          <label className="text-[10px] text-white/50 uppercase tracking-wider font-medium">From</label>
          <motion.div 
            animate={{ opacity: isSwapping ? 0 : 1 }}
            className="text-white text-lg font-semibold"
          >
            {from}
          </motion.div>
        </div>
        
        {/* Swap Button */}
        <motion.button
          onClick={swapCities}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: 180 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-[#e11d48] to-[#f97316] flex items-center justify-center text-white shadow-lg shadow-[#e11d48]/40 z-10 text-xl font-bold"
        >
          ⇅
        </motion.button>
        
        {/* To */}
        <div className="p-4 rounded-xl bg-white/10 border border-white/10">
          <label className="text-[10px] text-white/50 uppercase tracking-wider font-medium">To</label>
          <motion.div 
            animate={{ opacity: isSwapping ? 0 : 1 }}
            className="text-white text-lg font-semibold"
          >
            {to}
          </motion.div>
        </div>
      </div>

      {/* Date */}
      <div className="p-4 rounded-xl bg-white/10 border border-white/10 mt-3">
        <label className="text-[10px] text-white/50 uppercase tracking-wider font-medium">Travel Date</label>
        <div className="text-white text-lg font-semibold">Dec 15, 2025</div>
      </div>

      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white font-bold shadow-lg shadow-[#e11d48]/30 text-lg flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" /> Search Buses
      </motion.button>
    </div>
  );
}

// 3. Bus Listing Card
export function SairaBusCard() {
  const amenities = ['WiFi', 'Charging', 'Blanket', 'Water', 'GPS'];
  
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
      className="w-full max-w-md p-5 rounded-2xl bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">IntrCity SmartBus</h4>
          <p className="text-sm text-gray-500">Volvo Multi-Axle A/C Sleeper (2+1)</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100">
          <span className="text-lg font-bold text-green-700">4.5</span>
          <span className="text-yellow-500 text-lg">★</span>
        </div>
      </div>

      {/* Time & Duration */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">22:30</div>
          <div className="text-sm text-gray-500">Chennai</div>
        </div>
        <div className="flex-1 mx-6">
          <div className="text-sm text-center text-gray-400 mb-2">6h 30m</div>
          <div className="relative h-1 bg-gray-200 rounded-full">
            <motion.div 
              className="absolute left-0 h-full bg-gradient-to-r from-[#e11d48] to-[#f97316] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <div className="absolute left-0 w-3 h-3 -top-1 bg-[#e11d48] rounded-full border-2 border-white" />
            <div className="absolute right-0 w-3 h-3 -top-1 bg-gray-300 rounded-full border-2 border-white" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">05:00</div>
          <div className="text-sm text-gray-500">Bangalore</div>
        </div>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mb-5">
        {amenities.map((a) => (
          <span key={a} className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
            {a}
          </span>
        ))}
      </div>

      {/* Price & Book */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <span className="text-sm text-gray-400 line-through">₹1,200</span>
          <div className="text-3xl font-bold text-gray-900">₹899</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-green-600 font-medium mb-2 flex items-center gap-1 justify-end">
            <Zap className="w-4 h-4" /> 12 seats left
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white font-bold shadow-lg shadow-[#e11d48]/30"
          >
            Select Seats
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// 4. Filter Sidebar
export function SairaFilters() {
  const [busTypes, setBusTypes] = useState(['AC Sleeper']);
  const [priceRange, setPriceRange] = useState(1500);
  const [rating, setRating] = useState(3.5);

  const types = ['AC Sleeper', 'Non-AC', 'Volvo', 'Seater'];

  return (
    <div className="w-full max-w-xs p-5 rounded-2xl bg-white shadow-xl">
      <h4 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-[#e11d48]" /> Filters
      </h4>

      {/* Bus Type */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 block">Bus Type</label>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setBusTypes(prev => 
                prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
              )}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                busTypes.includes(type)
                  ? 'bg-[#e11d48] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 flex justify-between">
          <span>Price Range</span>
          <span className="text-[#e11d48]">₹200 - ₹{priceRange}</span>
        </label>
        <input
          type="range"
          min="200"
          max="3000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#e11d48]"
        />
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 flex justify-between">
          <span>Minimum Rating</span>
          <span className="text-[#e11d48]">{rating}+ ★</span>
        </label>
        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#e11d48]"
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white font-bold"
      >
        Apply Filters
      </motion.button>
    </div>
  );
}

// 5. Booking Flow Steps
export function SairaBookingSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { id: 1, title: 'Search', icon: Search, desc: 'Find your bus' },
    { id: 2, title: 'Select Seats', icon: Armchair, desc: 'Choose seats' },
    { id: 3, title: 'Passenger Info', icon: Users, desc: 'Enter details' },
    { id: 4, title: 'Payment', icon: CreditCard, desc: 'Pay securely' },
    { id: 5, title: 'Confirmation', icon: CheckCircle2, desc: 'Get ticket' },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <motion.button
              onClick={() => setCurrentStep(step.id)}
              whileTap={{ scale: 0.95 }}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                step.id <= currentStep
                  ? 'bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white shadow-lg shadow-[#e11d48]/30'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {step.id < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
              {step.id === currentStep && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#e11d48]"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </motion.button>
            {i < steps.length - 1 && (
              <div className={`w-8 lg:w-12 h-1 mx-1 rounded ${
                step.id < currentStep ? 'bg-gradient-to-r from-[#e11d48] to-[#f97316]' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-5 rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#e11d48]/20 to-[#f97316]/20 flex items-center justify-center">
            {(() => { 
              const Icon = steps[currentStep - 1].icon; 
              return <Icon className="w-7 h-7 text-[#e11d48]" />; 
            })()}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{steps[currentStep - 1].title}</h4>
            <p className="text-sm text-gray-500">{steps[currentStep - 1].desc}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
            disabled={currentStep === 5}
            className="flex-1 py-2 rounded-lg bg-[#e11d48] text-white font-medium disabled:opacity-50"
          >
            {currentStep === 5 ? 'Done' : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// 6. Passenger Details Form
export function SairaPassengerForm() {
  const [passengers, setPassengers] = useState([
    { id: 1, name: 'John Doe', age: 28, gender: 'Male', seat: '3A' },
  ]);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="p-5 rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#e11d48]" /> Passenger Details
          </h4>
          <span className="text-sm text-gray-500">{passengers.length} passenger(s)</span>
        </div>

        <div className="space-y-3">
          {passengers.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.age} yrs • {p.gender}</p>
                </div>
                <div className="px-3 py-1 rounded-lg bg-[#e11d48]/10 text-[#e11d48] font-bold text-sm">
                  Seat {p.seat}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#e11d48]/5 to-[#f97316]/5 border border-[#e11d48]/20 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3">
                <input 
                  placeholder="Full Name" 
                  className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48] outline-none"
                />
                <input 
                  placeholder="Age" 
                  type="number"
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48] outline-none"
                />
                <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#e11d48] outline-none">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex gap-2 mt-3">
                <button 
                  onClick={() => setShowAdd(false)}
                  className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-600 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setPassengers([...passengers, { id: Date.now(), name: 'Jane Doe', age: 25, gender: 'Female', seat: '3B' }]);
                    setShowAdd(false);
                  }}
                  className="flex-1 py-2 rounded-lg bg-[#e11d48] text-white font-medium"
                >
                  Add
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showAdd && passengers.length < 6 && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAdd(true)}
            className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-medium flex items-center justify-center gap-2 hover:border-[#e11d48] hover:text-[#e11d48] transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Passenger
          </motion.button>
        )}
      </div>
    </div>
  );
}

// 7. Ticket Preview Card
export function SairaTicketPreview() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-sm perspective-1000">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative preserve-3d cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className="p-5 rounded-2xl bg-gradient-to-br from-[#e11d48] to-[#f97316] text-white shadow-2xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/70 text-sm">Booking ID</p>
              <p className="font-mono font-bold text-lg">#ST2024DEC001</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Bus className="w-6 h-6" />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="text-2xl font-bold">Chennai</p>
              <p className="text-white/70 text-sm">22:30</p>
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="flex-1 h-0.5 bg-white/30 mx-2" />
              <Bus className="w-5 h-5" />
              <div className="flex-1 h-0.5 bg-white/30 mx-2" />
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">Bangalore</p>
              <p className="text-white/70 text-sm">05:00</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-white/10">
            <div>
              <p className="text-white/60 text-xs">Date</p>
              <p className="font-semibold">Dec 15</p>
            </div>
            <div>
              <p className="text-white/60 text-xs">Seat</p>
              <p className="font-semibold">3A, 3B</p>
            </div>
            <div>
              <p className="text-white/60 text-xs">Bus</p>
              <p className="font-semibold">Volvo</p>
            </div>
          </div>

          <p className="text-center text-white/50 text-xs mt-4">Tap to see QR code</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 p-5 rounded-2xl bg-white shadow-2xl flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
            <QrCode className="w-24 h-24 text-gray-800" />
          </div>
          <p className="font-mono text-gray-600 mb-2">#ST2024DEC001</p>
          <p className="text-sm text-gray-400">Scan at boarding point</p>
          <p className="text-xs text-[#e11d48] mt-4">Tap to flip back</p>
        </div>
      </motion.div>
    </div>
  );
}

// 8. Payment Methods
export function SairaPaymentMethods() {
  const [selected, setSelected] = useState('upi');
  const methods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Card', icon: CreditCard, desc: 'Credit/Debit Card' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, desc: 'All major banks' },
    { id: 'wallet', name: 'Wallet', icon: Banknote, desc: 'Paytm, Amazon Pay' },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="p-5 rounded-2xl bg-white shadow-xl">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#e11d48]" /> Payment Method
        </h4>

        <div className="space-y-2">
          {methods.map((method) => (
            <motion.button
              key={method.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(method.id)}
              className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${
                selected === method.id
                  ? 'bg-gradient-to-r from-[#e11d48]/10 to-[#f97316]/10 border-2 border-[#e11d48]'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selected === method.id ? 'bg-[#e11d48] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <method.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-semibold ${selected === method.id ? 'text-[#e11d48]' : 'text-gray-900'}`}>
                  {method.name}
                </p>
                <p className="text-sm text-gray-500">{method.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === method.id ? 'border-[#e11d48]' : 'border-gray-300'
              }`}>
                {selected === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 rounded-full bg-[#e11d48]"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-gray-50 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">₹1,798</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#f97316] text-white font-bold shadow-lg shadow-[#e11d48]/30"
          >
            Pay Now
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// 9. Boarding Point Selection
export function SairaBoardingPoints() {
  const [selectedBoarding, setSelectedBoarding] = useState('koyambedu');
  const [selectedDropping, setSelectedDropping] = useState('majestic');
  
  const boardingPoints = [
    { id: 'koyambedu', name: 'Koyambedu Bus Stand', time: '22:30', distance: '2.5 km' },
    { id: 'guindy', name: 'Guindy Metro Station', time: '22:45', distance: '5.2 km' },
    { id: 'tambaram', name: 'Tambaram Railway Station', time: '23:00', distance: '8.1 km' },
  ];

  const droppingPoints = [
    { id: 'majestic', name: 'Majestic Bus Stand', time: '05:00', distance: '1.2 km' },
    { id: 'electronic', name: 'Electronic City', time: '05:30', distance: '15 km' },
    { id: 'whitefield', name: 'Whitefield', time: '06:00', distance: '22 km' },
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Boarding Points */}
      <div className="p-5 rounded-2xl bg-white shadow-xl">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-500" /> Boarding Point
        </h4>
        <div className="space-y-2">
          {boardingPoints.map((point) => (
            <motion.button
              key={point.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedBoarding(point.id)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all text-left ${
                selectedBoarding === point.id
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedBoarding === point.id ? 'border-green-500' : 'border-gray-300'
              }`}>
                {selectedBoarding === point.id && (
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{point.name}</p>
                <p className="text-sm text-gray-500">{point.distance} away</p>
              </div>
              <p className="font-semibold text-green-600">{point.time}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dropping Points */}
      <div className="p-5 rounded-2xl bg-white shadow-xl">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#e11d48]" /> Dropping Point
        </h4>
        <div className="space-y-2">
          {droppingPoints.map((point) => (
            <motion.button
              key={point.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedDropping(point.id)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all text-left ${
                selectedDropping === point.id
                  ? 'bg-[#e11d48]/5 border-2 border-[#e11d48]'
                  : 'bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedDropping === point.id ? 'border-[#e11d48]' : 'border-gray-300'
              }`}>
                {selectedDropping === point.id && (
                  <div className="w-2 h-2 rounded-full bg-[#e11d48]" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{point.name}</p>
                <p className="text-sm text-gray-500">{point.distance} from center</p>
              </div>
              <p className="font-semibold text-[#e11d48]">{point.time}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 10. Price Breakdown
export function SairaPriceBreakdown() {
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  
  const breakdown = [
    { label: 'Base Fare (2 seats)', amount: 1798 },
    { label: 'GST (5%)', amount: 90 },
    { label: 'Convenience Fee', amount: 30 },
  ];
  
  const discount = couponApplied ? 200 : 0;
  const subtotal = breakdown.reduce((sum, item) => sum + item.amount, 0);
  const total = subtotal - discount;

  return (
    <div className="w-full max-w-sm">
      <div className="p-5 rounded-2xl bg-white shadow-xl">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ReceiptText className="w-5 h-5 text-[#e11d48]" /> Price Breakdown
        </h4>

        <div className="space-y-3">
          {breakdown.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-900">₹{item.amount}</span>
            </div>
          ))}

          {couponApplied && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex justify-between text-sm text-green-600"
            >
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> FIRST200 applied
              </span>
              <span className="font-medium">-₹{discount}</span>
            </motion.div>
          )}
        </div>

        <div className="my-4 border-t border-dashed border-gray-200" />

        {!couponApplied && (
          <div className="mb-4">
            {!showCoupon ? (
              <button
                onClick={() => setShowCoupon(true)}
                className="text-[#e11d48] font-medium text-sm flex items-center gap-1 hover:underline"
              >
                <BadgePercent className="w-4 h-4" /> Have a coupon code?
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
              >
                <input
                  placeholder="Enter code"
                  defaultValue="FIRST200"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#e11d48] outline-none text-sm"
                />
                <button
                  onClick={() => { setCouponApplied(true); setShowCoupon(false); }}
                  className="px-4 py-2 rounded-lg bg-[#e11d48] text-white font-medium text-sm"
                >
                  Apply
                </button>
              </motion.div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-[#e11d48]/10 to-[#f97316]/10">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">₹{total}</span>
              {couponApplied && (
                <span className="text-sm text-gray-400 line-through">₹{subtotal}</span>
              )}
            </div>
          </div>
          {couponApplied && (
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              You save ₹{discount}!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 11. Bus Amenities Grid
export function SairaAmenities() {
  const amenities = [
    { id: 'wifi', name: 'Free WiFi', icon: Wifi, available: true },
    { id: 'charging', name: 'Charging Point', icon: BatteryCharging, available: true },
    { id: 'water', name: 'Water Bottle', icon: Droplets, available: true },
    { id: 'blanket', name: 'Blanket', icon: Armchair, available: true },
    { id: 'gps', name: 'Live Tracking', icon: Navigation, available: true },
    { id: 'emergency', name: 'Emergency Exit', icon: AlertCircle, available: true },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="p-5 rounded-2xl bg-white shadow-xl">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-[#e11d48]" /> Bus Amenities
        </h4>

        <div className="grid grid-cols-3 gap-3">
          {amenities.map((amenity, i) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`p-3 rounded-xl text-center ${
                amenity.available
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200 opacity-50'
              }`}
            >
              <amenity.icon className={`w-6 h-6 mx-auto mb-2 ${
                amenity.available ? 'text-green-600' : 'text-gray-400'
              }`} />
              <p className={`text-xs font-medium ${
                amenity.available ? 'text-green-700' : 'text-gray-500'
              }`}>
                {amenity.name}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-700 flex items-center gap-2">
            <Info className="w-4 h-4" />
            All buses are sanitized before each trip
          </p>
        </div>
      </div>
    </div>
  );
}

// 12. Ratings & Reviews
export function SairaRatings() {
  const ratings = [
    { stars: 5, percent: 65 },
    { stars: 4, percent: 25 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  const reviews = [
    { name: 'Rahul S.', rating: 5, text: 'Excellent service! Bus was on time and very comfortable.', date: '2 days ago' },
    { name: 'Priya M.', rating: 4, text: 'Good experience overall. Clean bus and polite staff.', date: '1 week ago' },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="p-5 rounded-2xl bg-white shadow-xl">
        <div className="flex items-start gap-6 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">4.5</div>
            <div className="flex gap-0.5 justify-center my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-sm text-gray-500">2,456 reviews</p>
          </div>

          <div className="flex-1 space-y-2">
            {ratings.map((r) => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-3">{r.stars}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.percent}%` }}
                    transition={{ duration: 0.5, delay: r.stars * 0.1 }}
                    className="h-full bg-yellow-400"
                  />
                </div>
                <span className="text-xs text-gray-500 w-8">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#e11d48] to-[#f97316] flex items-center justify-center text-white font-bold text-sm">
                    {review.name[0]}
                  </div>
                  <span className="font-medium text-gray-900">{review.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{review.text}</p>
              <p className="text-xs text-gray-400">{review.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
