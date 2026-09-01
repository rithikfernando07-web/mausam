import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../../context/AppContext'
import PersonalizationBadge from '../ui/PersonalizationBadge'

interface RainCardProps {
  reason?: string
}

export default function RainCard({ reason }: RainCardProps) {
  const { weather } = useApp()
  if (!weather) return null

  const data = weather.hourly.slice(0, 12).map(h => ({
    time: h.time,
    rain: h.rainProbability,
  }))

  const maxRain = Math.max(...data.map(d => d.rain))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-white font-semibold text-sm">🌧️ Rain Probability</h3>
        {reason && <PersonalizationBadge reason={reason} />}
      </div>
      <p className="text-slate-400 text-xs mb-3">
        Peak: <span className="text-blue-400 font-semibold">{maxRain}%</span>
        {maxRain > 60 ? ' — Carry an umbrella' : maxRain > 30 ? ' — Possible showers' : ' — Low rain risk'}
      </p>

      <div style={{ height: 100 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fill: '#64748b', fontSize: 9 }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <Tooltip
              contentStyle={{ background: '#0f2744', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
              formatter={(v: number) => [`${v}%`, 'Rain']}
            />
            <Area
              type="monotone"
              dataKey="rain"
              stroke="#38bdf8"
              strokeWidth={2}
              fill="url(#rainGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
