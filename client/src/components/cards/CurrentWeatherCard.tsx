import { motion } from 'framer-motion'
import { MapPin, Thermometer, Droplets, Wind, Eye } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import WeatherIcon, { getConditionLabel, getConditionGradient } from '../ui/WeatherIcon'

export default function CurrentWeatherCard() {
  const { weather, user, demoMode, demoScenario } = useApp()
  if (!weather) return null

  const { current, location } = weather
  const gradient = getConditionGradient(current.condition)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass-card p-5 bg-gradient-to-br ${gradient} relative overflow-hidden`}
    >
      {/* Demo badge */}
      {demoMode && (
        <div className="absolute top-3 right-3 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs px-2 py-0.5 rounded-full font-medium">
          Demo: {demoScenario.replace(/-/g, ' ')}
        </div>
      )}

      {/* Location */}
      <div className="flex items-center gap-1.5 text-slate-300 text-sm mb-4">
        <MapPin size={14} className="text-sky-400" />
        <span>{location.city}, {location.state}</span>
      </div>

      {/* Main temp */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-end gap-2">
            <span className="font-display font-bold text-7xl text-white leading-none">
              {current.temperature}
            </span>
            <span className="text-3xl text-slate-300 mb-2">°{user.temperatureUnit}</span>
          </div>
          <p className="text-slate-300 mt-1">{getConditionLabel(current.condition)}</p>
          <p className="text-slate-400 text-sm mt-0.5">
            <Thermometer size={12} className="inline mr-1" />
            Feels like {current.feelsLike}°{user.temperatureUnit}
          </p>
        </div>
        <WeatherIcon condition={current.condition} size="xl" animated />
      </div>

      {/* Metrics strip */}
      <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10">
        {[
          { icon: Droplets, label: 'Humidity', value: `${current.humidity}%` },
          { icon: Wind, label: 'Wind', value: `${current.windSpeed} km/h` },
          { icon: Eye, label: 'Visibility', value: `${current.visibility} km` },
          { icon: null, label: 'Cloud', value: `${current.cloudCover}%` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="text-center">
            {Icon && <Icon size={14} className="text-sky-400 mx-auto mb-1" />}
            {!Icon && <span className="text-base">☁️</span>}
            <div className="text-white text-xs font-semibold">{value}</div>
            <div className="text-slate-400 text-[10px]">{label}</div>
          </div>
        ))}
      </div>

      {/* Sunrise / Sunset */}
      <div className="flex justify-between mt-3 text-xs text-slate-400">
        <span>🌅 Sunrise {current.sunrise}</span>
        <span>🌇 Sunset {current.sunset}</span>
      </div>
    </motion.div>
  )
}
