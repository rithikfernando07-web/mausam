import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CloudRain, Wind, Thermometer, Eye } from 'lucide-react'

const FEATURES = [
  { icon: Eye, text: 'Sees your lifestyle & interests' },
  { icon: Thermometer, text: 'Understands your location & context' },
  { icon: Wind, text: 'Ranks what matters most to you' },
  { icon: CloudRain, text: 'Shows you a personalized homepage' },
]

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
        className="flex items-center justify-center mb-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-400 via-ocean-500 to-sky-700 flex items-center justify-center shadow-glow">
            <span className="font-display font-black text-white text-4xl">M</span>
          </div>
          {/* Orbit elements */}
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-amber-400/90 flex items-center justify-center text-sm"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☀️
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2 w-8 h-8 rounded-xl bg-blue-500/90 flex items-center justify-center text-sm"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            🌧️
          </motion.div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display font-black text-5xl text-gradient mb-2"
      >
        Mausam
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-300 text-xl font-medium mb-2"
      >
        Your weather. Your way.
      </motion.p>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 mb-8 text-left"
      >
        <p className="text-slate-300 text-sm text-center mb-4 leading-relaxed">
          Mausam learns what matters to you and creates a weather homepage{' '}
          <span className="text-sky-300 font-semibold">personalized for your lifestyle</span>.
        </p>
        <div className="space-y-3">
          {FEATURES.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-sky-400" />
              </div>
              <span className="text-slate-300 text-sm">{text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.button
        id="get-started-btn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn-primary w-full py-4 text-lg"
        onClick={() => navigate('/onboarding/location')}
      >
        Get Started →
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-slate-500 text-xs mt-4"
      >
        Smart India Hackathon 2024 Project
      </motion.p>
    </motion.div>
  )
}
