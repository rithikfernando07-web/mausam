import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface UVIndexCardProps {
  reason?: string
}

function getUVInfo(uv: number) {
  if (uv <= 2) return { label: 'Low', color: 'text-green-400', bar: 'bg-green-400', advice: 'No sun protection needed.' }
  if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-400', bar: 'bg-yellow-400', advice: 'Wear sunscreen SPF 30+.' }
  if (uv <= 7) return { label: 'High', color: 'text-orange-400', bar: 'bg-orange-400', advice: 'Wear SPF 50+, hat, and sunglasses.' }
  if (uv <= 10) return { label: 'Very High', color: 'text-red-400', bar: 'bg-red-400', advice: 'Avoid outdoor exposure 10 AM–4 PM.' }
  return { label: 'Extreme', color: 'text-purple-400', bar: 'bg-purple-400', advice: '⚠️ Stay indoors — Extreme UV radiation!' }
}

export default function UVIndexCard({ reason }: UVIndexCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  const { uvIndex } = weather.current
  const { label, color, bar, advice } = getUVInfo(uvIndex)
  const percent = Math.min((uvIndex / 12) * 100, 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">☀️ UV Index</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      <div className="flex items-end gap-3 mb-3">
        <span className={`font-display font-bold text-4xl ${color}`}>{uvIndex}</span>
        <span className={`text-sm font-medium pb-1 ${color}`}>{label}</span>
      </div>

      {/* UV bar */}
      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-2">
        <motion.div
          className={`h-full rounded-full ${bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-500 mb-3">
        <span>0 Low</span>
        <span>3</span>
        <span>6</span>
        <span>9</span>
        <span>12+ Extreme</span>
      </div>

      <p className="text-slate-300 text-xs">{advice}</p>

      {/* Best time info */}
      <div className="mt-3 bg-white/5 rounded-xl p-3">
        <p className="text-slate-400 text-xs">
          🕐 Best outdoor time: <span className="text-white font-medium">Before 10 AM or after 5 PM</span>
        </p>
      </div>
    </motion.div>
  )
}
