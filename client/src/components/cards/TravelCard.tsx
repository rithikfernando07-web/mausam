import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface TravelCardProps {
  reason?: string
}

export default function TravelCard({ reason }: TravelCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  const { current, alerts } = weather
  const maxRain = Math.max(...weather.hourly.map(h => h.rainProbability))
  const hasAlert = alerts.some(a => ['HIGH', 'CRITICAL'].includes(a.severity))
  const isGood = !hasAlert && maxRain < 40 && current.visibility > 6

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-card p-4 bg-gradient-to-br ${isGood ? 'from-teal-500/15 to-sky-500/10' : 'from-orange-500/10 to-red-500/10'}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">✈️ Travel Conditions</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      <div className={`text-lg font-bold mb-2 ${isGood ? 'text-green-400' : 'text-orange-400'}`}>
        {isGood ? '✅ Good for travel' : hasAlert ? '⚠️ Travel not advised' : '⚡ Use caution'}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Visibility', value: `${current.visibility} km`, good: current.visibility > 5 },
          { label: 'Rain Risk', value: `${maxRain}%`, good: maxRain < 40 },
          { label: 'Wind', value: `${current.windSpeed} km/h`, good: current.windSpeed < 40 },
        ].map(({ label, value, good }) => (
          <div key={label} className="bg-white/5 rounded-xl p-2.5 text-center">
            <div className={`text-sm font-semibold ${good ? 'text-green-400' : 'text-orange-400'}`}>{value}</div>
            <div className="text-slate-400 text-[10px]">{label}</div>
          </div>
        ))}
      </div>

      {hasAlert && (
        <div className="mt-3 p-2.5 rounded-xl bg-red-500/15 border border-red-500/25">
          <p className="text-red-300 text-xs">{alerts[0]?.title} — {alerts[0]?.description.slice(0, 80)}...</p>
        </div>
      )}
    </motion.div>
  )
}
