import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, Eye, ArrowLeft, UserCheck, Sparkles, SlidersHorizontal } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { DemoScenario, PersonaType } from '../types'

const SCENARIOS: { id: DemoScenario; emoji: string; label: string; description: string }[] = [
  { id: 'normal', emoji: '☀️', label: 'Normal Weather', description: 'Pleasant day in Chennai (32°C)' },
  { id: 'heavy-rain', emoji: '⛈️', label: 'Heavy Rain / Monsoon', description: 'Heavy downpour & commute risk' },
  { id: 'heatwave', emoji: '🌡️', label: 'Heatwave Alert', description: 'Extreme temperature 43°C+' },
  { id: 'cyclone', emoji: '🌀', label: 'Cyclone Alert', description: 'Severe winds & beach closure' },
  { id: 'poor-aqi', emoji: '🌫️', label: 'Poor AQI Smog', description: 'Hazardous air quality (AQI 285)' },
  { id: 'ideal-outdoor', emoji: '🏕️', label: 'Ideal Outdoor', description: 'Perfect 25°C running conditions' },
]

const DEMO_PERSONA_PRESETS: {
  id: string
  name: string
  location: string
  personas: PersonaType[]
  label: string
  desc: string
}[] = [
  {
    id: 'alex-default',
    name: 'Alex',
    location: 'Chennai',
    personas: ['health', 'fitness', 'commuter'],
    label: 'Alex (Health + Fitness + Commuter)',
    desc: 'Prioritizes: Current Weather → AQI → Best Running Time → Commute Risk → UV Index → Rain Alerts',
  },
  {
    id: 'surfer-traveler',
    name: 'Sarah',
    location: 'Chennai',
    personas: ['beach', 'travel'],
    label: 'Sarah (Surfer & Traveler)',
    desc: 'Prioritizes: Beach & Surfing tides → Trip Planner & packing → UV radiation',
  },
  {
    id: 'farmer-family',
    name: 'Ramesh',
    location: 'Chennai',
    personas: ['farmer', 'family'],
    label: 'Ramesh (Gardener & Parent)',
    desc: 'Prioritizes: Soil moisture & planting guide → School commute conditions',
  },
  {
    id: 'event-planner',
    name: 'Priya',
    location: 'Chennai',
    personas: ['event'],
    label: 'Priya (Event Planner)',
    desc: 'Prioritizes: Outdoor event suitability score → Hourly forecast & Plan B contingency',
  },
]

export default function Demo() {
  const {
    demoMode, setDemoMode,
    demoScenario, setDemoScenario,
    personalization,
    setUser,
    setActiveCity,
  } = useApp()
  const navigate = useNavigate()

  const loadPreset = (preset: typeof DEMO_PERSONA_PRESETS[0]) => {
    setDemoMode(true)
    setUser(prev => ({
      ...prev,
      name: preset.name,
      location: { city: preset.location, state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 },
      selectedPersonas: preset.personas,
      interests: preset.personas,
      customWidgetOrder: undefined,
      hiddenWidgets: [],
    }))
    setActiveCity(preset.location)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-display font-bold text-white text-2xl flex items-center gap-2">
            <Zap size={24} className="text-amber-400" />
            Personalization Showcase
          </h1>
          <p className="text-slate-400 text-sm">Interactive Persona & Weather Simulation</p>
        </div>
      </div>

      {/* Demo Preset Selector (Alex Default) */}
      <div className="glass-card p-4 bg-gradient-to-br from-sky-600/20 via-slate-900 to-slate-950 border border-sky-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-sky-400" />
            <h3 className="text-white font-bold text-sm">Quick Demo Personas</h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold">
            One-Click Setup
          </span>
        </div>

        <div className="space-y-2">
          {DEMO_PERSONA_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => loadPreset(p)}
              className="w-full text-left p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{p.label}</span>
                <span className="text-[10px] text-sky-300 font-semibold">Load Profile →</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Weather Scenarios */}
      <div>
        <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
          🌤️ Live Weather Scenario Simulation
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {SCENARIOS.map(({ id, emoji, label, description }) => (
            <motion.button
              key={id}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setDemoMode(true); setDemoScenario(id) }}
              className={`p-3 rounded-xl border text-left transition-all ${
                demoScenario === id && demoMode
                  ? 'bg-amber-500/20 border-amber-500/50 shadow-glow-amber'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="text-xl mb-1">{emoji}</div>
              <div className={`font-semibold text-sm ${demoScenario === id && demoMode ? 'text-amber-300' : 'text-white'}`}>{label}</div>
              <div className="text-slate-400 text-[10px] mt-0.5">{description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Personalization Ranking Explanation */}
      {personalization && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 bg-gradient-to-br from-violet-600/15 to-indigo-600/10"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-violet-400" />
              <h3 className="text-white font-semibold text-sm">Homepage Widget Prioritization Order</h3>
            </div>
            <span className="text-[10px] text-violet-300 font-mono">Real-Time Score</span>
          </div>

          <div className="space-y-2">
            {personalization.cards.map((card, i) => (
              <div key={card.id} className="flex items-center gap-2 text-xs p-2 rounded-xl bg-white/5">
                <span className="text-slate-400 font-bold w-4">{i + 1}.</span>
                <span className="text-white font-semibold">{card.title}</span>
                <span className="text-slate-500 text-[11px] truncate flex-1">— {card.reason}</span>
                <span className="text-violet-300 font-bold text-[11px] shrink-0">Score: {card.score}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/')}
          className="btn-primary py-3 flex items-center justify-center space-x-1.5"
        >
          <Eye size={16} />
          <span>View Homepage</span>
        </button>

        <button
          onClick={() => navigate('/settings')}
          className="py-3 px-4 rounded-2xl bg-white/10 text-white font-bold text-sm hover:bg-white/15 transition-all flex items-center justify-center space-x-1.5 border border-white/10"
        >
          <SlidersHorizontal size={16} />
          <span>Customize</span>
        </button>
      </div>
    </div>
  )
}
