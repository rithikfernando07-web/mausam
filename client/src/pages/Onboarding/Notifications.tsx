import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import type { NotificationPrefs } from '../../types'
import { Thermometer, Wind, Bell, Sparkles } from 'lucide-react'

const NOTIFICATION_OPTIONS: { key: keyof NotificationPrefs; emoji: string; label: string; description: string }[] = [
  { key: 'severeWeather', emoji: '🚨', label: 'Severe Weather Alerts', description: 'Cyclone, thunderstorm, flood warnings' },
  { key: 'rain', emoji: '🌧️', label: 'Rain Alerts', description: 'Rain expected in your area' },
  { key: 'morningBriefing', emoji: '☀️', label: 'Morning Weather Briefing', description: 'Personalized morning forecast & recommendations' },
  { key: 'eveningForecast', emoji: '🌙', label: 'Evening Weather Summary', description: 'Next day preview and outdoor suggestions' },
  { key: 'airQuality', emoji: '🌫️', label: 'Air Quality & UV Alerts', description: 'When AQI or UV reach hazardous levels' },
]

export default function Notifications() {
  const navigate = useNavigate()
  const { user, updateUserField } = useApp()
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>(user.temperatureUnit || 'C')
  const [windUnit, setWindUnit] = useState<'km/h' | 'mph'>(user.windSpeedUnit || 'km/h')
  const [prefs, setPrefs] = useState<NotificationPrefs>({
    severeWeather: true,
    rain: true,
    heat: true,
    airQuality: true,
    morningBriefing: true,
    eveningForecast: true,
    travel: true,
    workout: true,
    eventReminders: true,
  })

  function toggle(key: keyof NotificationPrefs) {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleCreateHomepage() {
    updateUserField('temperatureUnit', tempUnit)
    updateUserField('windSpeedUnit', windUnit)
    updateUserField('notifications', prefs)
    updateUserField('onboardingCompleted', true)
    navigate('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div>
        <h2 className="font-display font-bold text-white text-2xl mb-1">Units & Notifications</h2>
        <p className="text-slate-400 text-sm">Fine-tune your preferred weather metrics and alert triggers.</p>
      </div>

      {/* Temperature & Wind Units Selector */}
      <div className="grid grid-cols-2 gap-3">
        {/* Temp Unit */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-semibold">
            <Thermometer className="w-4 h-4 text-sky-400" />
            <span>Temperature</span>
          </div>
          <div className="flex bg-slate-900/80 rounded-xl p-1 border border-white/5 text-xs">
            <button
              onClick={() => setTempUnit('C')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                tempUnit === 'C' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              °C Celsius
            </button>
            <button
              onClick={() => setTempUnit('F')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                tempUnit === 'F' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              °F Fahrenheit
            </button>
          </div>
        </div>

        {/* Wind Unit */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-semibold">
            <Wind className="w-4 h-4 text-teal-400" />
            <span>Wind Speed</span>
          </div>
          <div className="flex bg-slate-900/80 rounded-xl p-1 border border-white/5 text-xs">
            <button
              onClick={() => setWindUnit('km/h')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                windUnit === 'km/h' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              km/h
            </button>
            <button
              onClick={() => setWindUnit('mph')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                windUnit === 'mph' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              mph
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-300">
          <Bell className="w-3.5 h-3.5 text-sky-400" />
          <span>Active Notifications & Briefings</span>
        </div>

        {NOTIFICATION_OPTIONS.map(({ key, emoji, label, description }, i) => {
          const enabled = prefs[key]
          return (
            <motion.button
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggle(key)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border transition-all duration-200 text-left ${
                enabled
                  ? 'bg-sky-500/15 border-sky-500/40'
                  : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}
              aria-pressed={enabled}
            >
              <span className="text-xl">{emoji}</span>
              <div className="flex-1">
                <div className={`font-semibold text-xs ${enabled ? 'text-white' : 'text-slate-300'}`}>{label}</div>
                <div className="text-slate-400 text-[10px]">{description}</div>
              </div>
              <div
                className={`w-9 h-5 rounded-full transition-all duration-200 flex items-center px-0.5 ${
                  enabled ? 'bg-sky-500' : 'bg-white/15'
                }`}
              >
                <motion.div
                  className="w-4 h-4 rounded-full bg-white shadow-sm"
                  animate={{ x: enabled ? 16 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          id="create-homepage-btn"
          onClick={handleCreateHomepage}
          className="btn-primary w-full py-4 font-black text-base shadow-xl shadow-sky-500/30 flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>Create My Homepage</span>
        </button>
      </div>
    </motion.div>
  )
}
