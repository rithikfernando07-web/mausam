import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import WeatherIcon from '../ui/WeatherIcon'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface DailyForecastCardProps {
  reason?: string
}

export default function DailyForecastCard({ reason }: DailyForecastCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">7-Day Forecast</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      <div className="space-y-2">
        {weather.daily.map((day, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
          >
            <span className="text-slate-300 text-sm w-20 font-medium">
              {day.dayName}
            </span>
            <WeatherIcon condition={day.condition} size="sm" />
            {day.rainProbability > 10 && (
              <span className="text-blue-400 text-xs w-10 text-center">
                💧{day.rainProbability}%
              </span>
            )}
            {day.rainProbability <= 10 && <span className="w-10" />}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">{day.minTemperature}°</span>
              <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-amber-400"
                  style={{
                    width: `${((day.maxTemperature - day.minTemperature) / 20) * 100}%`,
                    marginLeft: `${((day.minTemperature - 15) / 20) * 100}%`,
                  }}
                />
              </div>
              <span className="text-white font-semibold">{day.maxTemperature}°</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
