import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface AgricultureCardProps {
  reason?: string
}

export default function AgricultureCard({ reason }: AgricultureCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  const { current } = weather
  const rain3d = weather.daily.slice(0, 3).reduce((s, d) => s + d.rainProbability, 0) / 3
  const nextRainDay = weather.daily.find(d => d.rainProbability > 50)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-4 bg-gradient-to-br from-green-600/15 to-teal-600/10"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">🌱 Agriculture Advisory</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { emoji: '💧', label: '3-day Rain Avg', value: `${Math.round(rain3d)}%` },
          { emoji: '💨', label: 'Humidity', value: `${current.humidity}%` },
          { emoji: '🌡️', label: 'Temperature', value: `${current.temperature}°C` },
          { emoji: '🌬️', label: 'Wind Speed', value: `${current.windSpeed} km/h` },
        ].map(({ emoji, label, value }) => (
          <div key={label} className="bg-white/5 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <span>{emoji}</span>
              <span className="text-slate-400 text-[10px]">{label}</span>
            </div>
            <div className="text-white font-semibold text-sm">{value}</div>
          </div>
        ))}
      </div>

      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
        <p className="text-green-300 text-xs leading-relaxed">
          {nextRainDay
            ? `🌧️ Rainfall expected on ${nextRainDay.dayName} (${nextRainDay.rainProbability}%). Consider adjusting irrigation and protecting sensitive crops.`
            : `☀️ No significant rainfall in the next 3 days. Consider irrigation if soil moisture is low.`}
        </p>
      </div>
    </motion.div>
  )
}
