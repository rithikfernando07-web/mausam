import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { CheckCircle, Sparkles } from 'lucide-react'

export default function OnboardingComplete() {
  const navigate = useNavigate()
  const { updateUserField, user } = useApp()

  function handleFinish() {
    updateUserField('onboardingCompleted', true)
    navigate('/', { replace: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="text-center"
    >
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
        className="flex justify-center mb-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-lg">
            <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
          </div>
          {/* Sparkle effects */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                x: [0, (Math.cos((i * 60 * Math.PI) / 180)) * 60],
                y: [0, (Math.sin((i * 60 * Math.PI) / 180)) * 60],
              }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
              style={{ top: '50%', left: '50%' }}
            >
              <Sparkles size={14} className="text-amber-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-display font-bold text-white text-3xl mb-2"
      >
        Your Mausam is Ready! 🎉
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-slate-400 text-sm mb-8"
      >
        We've personalized your weather experience based on your preferences.
      </motion.p>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-5 text-left mb-6"
      >
        <h3 className="text-white font-semibold text-sm mb-3">Your Setup</h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <span className="text-base">📍</span>
            <div>
              <div className="text-slate-400 text-[10px]">Location</div>
              <div className="text-white text-sm font-medium">{user.location.city}, {user.location.state}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base">🎯</span>
            <div>
              <div className="text-slate-400 text-[10px]">Interests</div>
              <div className="text-white text-sm font-medium">
                {user.interests.length > 0 ? user.interests.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ') : 'General Weather'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base">🔔</span>
            <div>
              <div className="text-slate-400 text-[10px]">Notifications</div>
              <div className="text-white text-sm font-medium">
                {Object.values(user.notifications).filter(Boolean).length} alerts enabled
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.button
        id="view-weather-btn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn-primary w-full py-4 text-lg"
        onClick={handleFinish}
      >
        View My Weather ☀️
      </motion.button>
    </motion.div>
  )
}
