import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Sparkles, Brain, Zap, Database, BarChart2, Target, Heart, Waves, Users, Sprout, Car, CalendarDays, Plane } from 'lucide-react'

const FLOW_STEPS = [
  { icon: '👤', label: '1. Multi-Persona Selection', description: 'Health, Fitness, Beach/Surfing, Travel, Family, Gardening, Commuter, Event Planning', color: 'from-sky-500/20 to-sky-600/20' },
  { icon: '🌦️', label: '2. Multi-Source Meteorological Data', description: 'Atmospheric, Air Quality PM2.5/PM10, Marine Swells/Tides, Solar UV & Soil Moisture', color: 'from-ocean-500/20 to-ocean-600/20' },
  { icon: '📍', label: '3. Context & Urgency Evaluation', description: 'Location, time-of-day relevance, seasonal planting cycles, road risk & hazard severity', color: 'from-teal-500/20 to-teal-600/20' },
  { icon: '⚙️', label: '4. Rule-Based Personalization Engine', description: 'Weighted dynamic priority ranking with pin & user custom reorder overrides', color: 'from-amber-500/20 to-amber-600/20' },
  { icon: '🎯', label: '5. Modular Dynamic Dashboard', description: 'Tailored modular cards with real-time health score, running window, and Plan B contingencies', color: 'from-violet-500/20 to-violet-600/20' },
  { icon: '🤖', label: '6. Contextual Mausam AI', description: 'Natural language assistance providing direct persona advice (packing, running, beach, events)', color: 'from-emerald-500/20 to-emerald-600/20' },
]

const PERSONA_DETAILS = [
  { icon: '❤️', label: 'Health-Conscious', priority: 'AQI, PM2.5, PM10, Pollen count, UV Index, Skin humidity comfort & Health Score' },
  { icon: '🏃', label: 'Outdoor Fitness', priority: 'Best running window (e.g. 6–8 AM), Workout Comfort Score, heat alerts, wind & hourly trend' },
  { icon: '🏄', label: 'Beach & Surfer', priority: 'Wave height/direction, tide timings, water temperature, UV index & Beach Safety score' },
  { icon: '✈️', label: 'Traveler', priority: 'Multi-destination forecast comparison, travel dates planner & automatic smart packing lists' },
  { icon: '👨‍👩‍👧', label: 'Parent & Family', priority: 'School commute morning conditions & advice, outdoor play suitability & storm safety alerts' },
  { icon: '🌱', label: 'Gardener & Farmer', priority: 'Soil moisture %, 24h rainfall, frost alerts, watering advice & seasonal planting guide' },
  { icon: '🚗', label: 'Daily Commuter', priority: 'Road condition (wet/slippery), visibility, commute risk score (LOW/MOD/HIGH) & traffic delays' },
  { icon: '🎉', label: 'Event Planner', priority: 'Outdoor event suitability score (0–100), comfort index & Plan B weather contingency' },
]

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-display font-bold text-white text-2xl">How Mausam Works</h1>
          <p className="text-slate-400 text-xs">Architecture & Multi-Persona Personalization</p>
        </div>
      </div>

      {/* Core Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 bg-gradient-to-br from-sky-600/20 via-slate-900 to-slate-950 border border-sky-500/30 space-y-2"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-sky-400" />
          <span className="text-sky-300 text-xs font-bold uppercase tracking-wide">Core Innovation</span>
        </div>
        <p className="text-white text-sm leading-relaxed font-medium">
          "Conventional weather apps display the identical layout to every user. <span className="text-sky-300 font-bold">Mausam</span> dynamically reorganizes and calculates specialized scores (Health, Running, Beach, Commute, Soil, Events) tailored directly to the individual's lifestyle personas."
        </p>
      </motion.div>

      {/* Personalization Flow */}
      <div>
        <h2 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
          <Zap size={15} className="text-amber-400" /> 6-Step Personalization Pipeline
        </h2>
        <div className="space-y-2">
          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className={`glass-card p-3.5 bg-gradient-to-r ${step.color} border border-white/10`}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl shrink-0 mt-0.5">{step.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-xs">{step.label}</div>
                    <div className="text-slate-300 text-[11px] leading-relaxed mt-0.5">{step.description}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All 8 Persona Prioritization Breakdown */}
      <div className="glass-card p-5 border border-white/10 space-y-3">
        <h3 className="text-white font-bold text-sm">Supported User Personas & Priorities</h3>
        <div className="space-y-2.5">
          {PERSONA_DETAILS.map((p, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <div className="flex items-center space-x-2 font-bold text-xs text-white">
                <span className="text-lg">{p.icon}</span>
                <span>{p.label}</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">{p.priority}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scoring Engine Details */}
      <div className="glass-card p-5 border border-white/10 space-y-3">
        <h3 className="text-white font-bold text-sm">Scoring & Prioritization Formula</h3>
        <div className="bg-black/40 rounded-2xl p-3.5 font-mono text-xs text-slate-300 space-y-1">
          <div className="text-sky-400">// Dynamic Priority Evaluation:</div>
          <div>Card Priority = (PersonaWeight × 100) + UrgencyBoost - CustomOrderRank</div>
          <div className="text-slate-500 text-[10px] pt-1">User pinned widgets receive top-level priority pinning.</div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/demo')}
        className="btn-primary w-full py-3.5 font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2"
      >
        <span>Test Personalization in Demo Mode</span>
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
