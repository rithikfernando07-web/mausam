import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface WindCardProps {
  reason?: string
}

const DIRECTIONS: Record<string, number> = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
  E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
  S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
  W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
}

export default function WindCard({ reason }: WindCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  const { windSpeed, windDirection, humidity, pressure } = weather.current
  const deg = DIRECTIONS[windDirection] ?? 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">💨 Wind & Pressure</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>

      <div className="flex items-center gap-4">
        {/* Compass */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-white/10 bg-white/5" />
          {['N', 'E', 'S', 'W'].map((dir, i) => (
            <span
              key={dir}
              className="absolute text-slate-400 text-[10px] font-medium"
              style={{
                top: i === 0 ? 2 : i === 2 ? 'auto' : '50%',
                bottom: i === 2 ? 2 : 'auto',
                left: i === 3 ? 2 : i === 1 ? 'auto' : '50%',
                right: i === 1 ? 2 : 'auto',
                transform: [0, 2].includes(i) ? 'translateX(-50%)' : 'translateY(-50%)',
              }}
            >
              {dir}
            </span>
          ))}
          {/* Arrow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: deg }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="w-1 h-8 rounded-full relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[14px] border-l-transparent border-r-transparent border-b-sky-400" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[10px] border-l-transparent border-r-transparent border-t-slate-600" />
            </div>
          </motion.div>
        </div>

        {/* Metrics */}
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex items-end gap-1">
              <span className="font-display font-bold text-3xl text-white">{windSpeed}</span>
              <span className="text-slate-400 text-sm pb-1">km/h {windDirection}</span>
            </div>
            <p className="text-slate-400 text-xs">
              {windSpeed > 60 ? '⚠️ Strong winds — secure loose items'
                : windSpeed > 30 ? 'Moderate winds'
                : 'Light breeze'}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/5 rounded-xl p-2 text-center flex-1">
              <div className="text-white font-semibold text-sm">{humidity}%</div>
              <div className="text-slate-400 text-[10px]">Humidity</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2 text-center flex-1">
              <div className="text-white font-semibold text-sm">{pressure}</div>
              <div className="text-slate-400 text-[10px]">hPa</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
