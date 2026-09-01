import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import type { PersonaType } from '../../types'

const PERSONAS: { id: PersonaType; emoji: string; label: string; description: string }[] = [
  { id: 'health', emoji: '❤️', label: 'Health & Wellness', description: 'AQI, PM2.5, pollen & UV index' },
  { id: 'fitness', emoji: '🏃', label: 'Fitness & Outdoor Activities', description: 'Optimal running windows & comfort' },
  { id: 'beach', emoji: '🏄', label: 'Beach & Surfing', description: 'Wave height, tide timings & water temp' },
  { id: 'travel', emoji: '✈️', label: 'Travel', description: 'Saved destinations & smart packing' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family & Kids', description: 'School commute & outdoor play safety' },
  { id: 'farmer', emoji: '🌱', label: 'Gardening & Agriculture', description: 'Soil moisture, rain forecast & planting' },
  { id: 'commuter', emoji: '🚗', label: 'Daily Commute', description: 'Road conditions, visibility & delay risk' },
  { id: 'event', emoji: '🎉', label: 'Events & Outdoor Planning', description: 'Outdoor suitability & Plan B contingency' },
]

export default function Interests() {
  const navigate = useNavigate()
  const { updateUserField } = useApp()
  const [selected, setSelected] = useState<PersonaType[]>([
    'health', 'fitness', 'commuter' // Default initial persona match for demo
  ])

  function toggle(id: PersonaType) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  function handleContinue() {
    const chosenPersonas = selected.length > 0 ? selected : (['health', 'fitness'] as PersonaType[])
    updateUserField('selectedPersonas', chosenPersonas)
    updateUserField('interests', chosenPersonas)
    navigate('/onboarding/notifications')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h2 className="font-display font-bold text-white text-2xl mb-1">What matters most to you?</h2>
        <p className="text-slate-400 text-sm">Select your lifestyle personas — Mausam dynamically customizes your homepage.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {PERSONAS.map(({ id, emoji, label, description }, i) => {
          const isSelected = selected.includes(id)
          return (
            <motion.button
              key={id}
              id={`persona-${id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggle(id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-sky-500/20 border-sky-500/50 shadow-glow'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              aria-pressed={isSelected}
              aria-label={`Select ${label} persona`}
            >
              <div>
                <div className="text-2xl mb-1.5">{emoji}</div>
                <div className={`font-semibold text-xs ${isSelected ? 'text-sky-300' : 'text-white'}`}>{label}</div>
                <div className="text-slate-400 text-[10px] leading-tight mt-1">{description}</div>
              </div>
              {isSelected && (
                <div className="mt-2 w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center ml-auto">
                  <span className="text-slate-950 text-xs font-black">✓</span>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <p className="text-sky-300 text-xs text-center mb-4 font-semibold">
          {selected.length} lifestyle persona{selected.length !== 1 ? 's' : ''} selected
        </p>
      )}

      <button
        id="interests-continue-btn"
        onClick={handleContinue}
        className="btn-primary w-full py-4 font-bold shadow-lg shadow-sky-500/25"
      >
        Configure Preferences →
      </button>
    </motion.div>
  )
}
