import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export default function MorningBriefingCard() {
  const { personalization, user, weather } = useApp()
  if (!personalization || !weather) return null

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
  const greetingEmoji =
    hour < 12 ? '☀️' : hour < 17 ? '🌤️' : '🌙'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-5 bg-gradient-to-br from-sky-600/20 to-ocean-600/15"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="font-display font-bold text-white text-lg">
            {greeting}, {user.name} {greetingEmoji}
          </h2>
          <p className="text-slate-300 text-sm mt-0.5">
            📍 {weather.location.city}, {weather.location.state}
          </p>
        </div>
        <span className="text-3xl">{greetingEmoji}</span>
      </div>

      {/* Key metrics summary */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { emoji: '🌡️', value: `${weather.current.temperature}°`, label: 'Temp' },
          { emoji: '🌧️', value: `${Math.max(...weather.hourly.map(h => h.rainProbability))}%`, label: 'Rain' },
          { emoji: '💨', value: `${weather.current.windSpeed}`, label: 'km/h' },
          { emoji: '🌫️', value: `${weather.airQuality.aqi}`, label: 'AQI' },
        ].map(({ emoji, value, label }) => (
          <div key={label} className="bg-white/10 rounded-xl p-2.5 text-center">
            <div className="text-base">{emoji}</div>
            <div className="text-white font-bold text-sm">{value}</div>
            <div className="text-slate-400 text-[10px]">{label}</div>
          </div>
        ))}
      </div>

      <p className="text-slate-200 text-sm leading-relaxed">
        {personalization.morningBriefing}
      </p>
    </motion.div>
  )
}
