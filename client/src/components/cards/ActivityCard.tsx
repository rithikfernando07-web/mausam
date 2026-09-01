import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface ActivityCardProps {
  reason?: string
}

export default function ActivityCard({ reason }: ActivityCardProps) {
  const { personalization, weather } = useApp()
  if (!personalization || !weather) return null

  const isGood = personalization.activityRecommendation.startsWith('✅')
  const isWarning = personalization.activityRecommendation.startsWith('🌧️') || personalization.activityRecommendation.startsWith('🏠')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`glass-card p-4 bg-gradient-to-br ${
        isGood ? 'from-green-500/15 to-teal-500/10' : isWarning ? 'from-orange-500/10 to-red-500/10' : 'from-sky-500/10 to-ocean-500/10'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">🏃 Activity Recommendation</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>
      <p className="text-slate-200 text-sm leading-relaxed">{personalization.activityRecommendation}</p>

      {/* Quick conditions at a glance */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[
          { label: 'AQI', value: `${weather.airQuality.aqi}`, good: weather.airQuality.aqi < 100 },
          { label: 'UV', value: `${weather.current.uvIndex}`, good: weather.current.uvIndex < 8 },
          { label: 'Rain', value: `${Math.max(...weather.hourly.map(h => h.rainProbability))}%`, good: Math.max(...weather.hourly.map(h => h.rainProbability)) < 40 },
        ].map(({ label, value, good }) => (
          <div key={label} className="bg-white/5 rounded-xl p-2.5 text-center">
            <div className={`text-sm font-semibold ${good ? 'text-green-400' : 'text-orange-400'}`}>{value}</div>
            <div className="text-slate-400 text-[10px]">{label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
