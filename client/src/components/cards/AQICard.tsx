import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface AQICardProps {
  reason?: string
}

function getAQIColor(aqi: number): string {
  if (aqi <= 50) return 'text-green-400'
  if (aqi <= 100) return 'text-lime-400'
  if (aqi <= 150) return 'text-yellow-400'
  if (aqi <= 200) return 'text-orange-400'
  if (aqi <= 300) return 'text-red-400'
  return 'text-purple-400'
}

function getAQIBarColor(aqi: number): string {
  if (aqi <= 50) return 'bg-green-400'
  if (aqi <= 100) return 'bg-lime-400'
  if (aqi <= 150) return 'bg-yellow-400'
  if (aqi <= 200) return 'bg-orange-400'
  if (aqi <= 300) return 'bg-red-400'
  return 'bg-purple-400'
}

export default function AQICard({ reason }: AQICardProps) {
  const { weather } = useApp()
  if (!weather) return null

  const { aqi, pm25, pm10, category, recommendation } = weather.airQuality
  const percent = Math.min((aqi / 500) * 100, 100)
  const colorClass = getAQIColor(aqi)
  const barColor = getAQIBarColor(aqi)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
          🌬️ Air Quality Index
        </h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      <div className="flex items-end gap-3 mb-3">
        <span className={`font-display font-bold text-4xl ${colorClass}`}>{aqi}</span>
        <span className={`text-sm font-medium pb-1 ${colorClass}`}>{category}</span>
      </div>

      {/* AQI bar */}
      <div className="relative h-2.5 bg-white/10 rounded-full overflow-hidden mb-3">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        {/* Scale markers */}
        <div className="absolute inset-0 flex">
          {['bg-green-400', 'bg-lime-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400', 'bg-purple-400'].map((c, i) => (
            <div key={i} className={`flex-1 ${i < 5 ? 'border-r border-black/20' : ''} ${c} opacity-30`} />
          ))}
        </div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-[10px] text-slate-500 mb-3">
        <span>Good</span>
        <span>Moderate</span>
        <span>Poor</span>
        <span>Severe</span>
      </div>

      {/* Metrics */}
      <div className="flex gap-3 mb-3">
        <div className="flex-1 bg-white/5 rounded-xl p-2.5 text-center">
          <div className="text-white font-semibold text-sm">{pm25}</div>
          <div className="text-slate-400 text-[10px]">PM2.5 μg/m³</div>
        </div>
        <div className="flex-1 bg-white/5 rounded-xl p-2.5 text-center">
          <div className="text-white font-semibold text-sm">{pm10}</div>
          <div className="text-slate-400 text-[10px]">PM10 μg/m³</div>
        </div>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed">{recommendation}</p>
    </motion.div>
  )
}
