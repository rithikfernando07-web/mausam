import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface PhotoCardProps {
  reason?: string
}

export default function PhotoCard({ reason }: PhotoCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  const { current } = weather
  const hour = new Date().getHours()
  const inMorningGolden = hour >= 5 && hour <= 8
  const inEveningGolden = hour >= 17 && hour <= 19
  const isGolden = inMorningGolden || inEveningGolden

  const qualityScore = Math.round(
    ((20 - Math.min(current.cloudCover, 20)) / 20) * 40 +
    (current.visibility / 20) * 40 +
    (isGolden ? 20 : 0)
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-4 bg-gradient-to-br from-violet-600/15 to-amber-600/10"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">📸 Photography Window</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      {isGolden && (
        <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-2.5 mb-3">
          <p className="text-amber-300 text-xs font-medium">✨ Golden hour is active right now!</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: 'Visibility', value: `${current.visibility} km`, good: current.visibility > 8 },
          { label: 'Cloud Cover', value: `${current.cloudCover}%`, good: current.cloudCover < 50 },
          { label: 'Photo Score', value: `${qualityScore}/100`, good: qualityScore > 60 },
          { label: 'Condition', value: current.condition.replace(/-/g, ' '), good: ['clear', 'partly-cloudy'].includes(current.condition) },
        ].map(({ label, value, good }) => (
          <div key={label} className="bg-white/5 rounded-xl p-2.5">
            <div className="text-slate-400 text-[10px] mb-0.5">{label}</div>
            <div className={`text-sm font-semibold capitalize ${good ? 'text-amber-300' : 'text-slate-300'}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 text-xs text-slate-300">
        <div className="flex justify-between">
          <span>🌅 Sunrise</span>
          <span className="text-white font-medium">{current.sunrise}</span>
        </div>
        <div className="flex justify-between">
          <span>🌇 Sunset</span>
          <span className="text-white font-medium">{current.sunset}</span>
        </div>
        <div className="flex justify-between">
          <span>⏰ Next golden hour</span>
          <span className="text-amber-300 font-medium">
            {hour < 12 ? '5:30–7:30 PM' : '6:00–7:30 AM tomorrow'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
