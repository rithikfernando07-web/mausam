import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import WeatherIcon from '../ui/WeatherIcon'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface HourlyForecastCardProps {
  reason?: string
}

export default function HourlyForecastCard({ reason }: HourlyForecastCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">Hourly Forecast</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {weather.hourly.slice(0, 12).map((h, i) => (
          <div
            key={i}
            className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl transition-colors ${
              i === 0 ? 'bg-sky-500/20 border border-sky-500/30' : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <span className="text-slate-400 text-xs whitespace-nowrap">
              {i === 0 ? 'Now' : h.time}
            </span>
            <WeatherIcon condition={h.condition} size="sm" />
            <span className="text-white text-sm font-semibold">{h.temperature}°</span>
            {h.rainProbability > 20 && (
              <span className="text-blue-400 text-[10px]">💧{h.rainProbability}%</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
