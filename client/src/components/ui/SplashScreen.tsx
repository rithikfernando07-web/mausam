import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudRain, Wind, Cloud, Sparkles } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white overflow-hidden"
    >
      {/* Background Animated Weather Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [-20, 20, -20],
            y: [-10, 10, -10],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-sky-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [20, -20, 20],
            y: [10, -10, 10],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Top Spacer */}
      <div className="w-full pt-6 flex justify-center">
        <span className="text-[11px] uppercase tracking-widest text-sky-400 font-semibold px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
          Personalized Weather Intelligence
        </span>
      </div>

      {/* Center Logo & Weather Animations */}
      <div className="flex flex-col items-center text-center space-y-6 z-10">
        {/* Animated Brand Emblem */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
            className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-sky-400 via-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-sky-500/40 border border-white/20 relative"
          >
            <span className="font-display font-black text-white text-5xl tracking-tight">M</span>
          </motion.div>

          {/* Floating Weather Icons */}
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-3 p-2 rounded-2xl bg-amber-500/90 text-slate-950 shadow-lg"
          >
            <Sun className="w-5 h-5" />
          </motion.div>

          <motion.div
            animate={{ y: [4, -4, 4], rotate: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute -bottom-3 -left-3 p-2 rounded-2xl bg-blue-500/90 text-white shadow-lg"
          >
            <CloudRain className="w-5 h-5" />
          </motion.div>

          <motion.div
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="absolute top-1/2 -left-6 -translate-y-1/2 p-1.5 rounded-xl bg-teal-500/80 text-white shadow-md"
          >
            <Wind className="w-4 h-4" />
          </motion.div>

          <motion.div
            animate={{ scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="absolute top-1/2 -right-6 -translate-y-1/2 p-1.5 rounded-xl bg-slate-700/80 text-sky-300 shadow-md"
          >
            <Cloud className="w-4 h-4" />
          </motion.div>
        </div>

        {/* App Title & Tagline */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display font-black text-5xl tracking-tight bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent"
          >
            MAUSAM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-300 text-sm font-medium tracking-wide"
          >
            Weather that understands your day.
          </motion.p>
        </div>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-xs space-y-2 z-10">
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Personalizing environment...</span>
          <span className="font-semibold text-sky-400">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
