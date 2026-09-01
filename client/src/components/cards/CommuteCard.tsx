import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface CommuteCardProps {
  reason?: string
}

export default function CommuteCard({ reason }: CommuteCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  const { current } = weather
  const hour = new Date().getHours()
  const isMorningCommute = hour >= 7 && hour <= 10
  const isEveningCommute = hour >= 16 && hour <= 20

  const eveningHourly = weather.hourly.filter(h => h.hour >= 16 && h.hour <= 20)
  const eveningRain = eveningHourly.length > 0
    ? Math.max(...eveningHourly.map(h => h.rainProbability))
    : 0
  const morningRain = Math.max(...weather.hourly.filter(h => h.hour >= 7 && h.hour <= 10).map(h => h.rainProbability))

  const currentCommuteRain = isMorningCommute ? morningRain : isEveningCommute ? eveningRain : Math.max(morningRain, eveningRain)
  const isGoodCommute = currentCommuteRain < 40 && current.visibility > 5

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-card p-4 bg-gradient-to-br ${isGoodCommute ? 'from-sky-500/10 to-teal-500/10' : 'from-orange-500/10 to-red-500/10'}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">🚗 Commute Alert</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      <div className={`text-base font-semibold mb-2 ${isGoodCommute ? 'text-green-400' : 'text-orange-400'}`}>
        {isGoodCommute
          ? '✅ Clear commute expected'
          : currentCommuteRain > 60
            ? '🌧️ Rain during your commute — carry umbrella'
            : '⚡ Drive with caution'}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-slate-400 text-xs mb-1">🌅 Morning commute</div>
          <div className={`text-sm font-semibold ${morningRain > 40 ? 'text-orange-400' : 'text-green-400'}`}>
            {morningRain}% rain
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-slate-400 text-xs mb-1">🌆 Evening commute</div>
          <div className={`text-sm font-semibold ${eveningRain > 40 ? 'text-orange-400' : 'text-green-400'}`}>
            {eveningRain}% rain
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 text-xs text-slate-400">
        <span>👁️ Visibility: <span className="text-white">{current.visibility} km</span></span>
        <span>•</span>
        <span>💨 Wind: <span className="text-white">{current.windSpeed} km/h</span></span>
      </div>
    </motion.div>
  )
}
