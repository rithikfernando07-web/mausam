import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function InsightCard() {
  const { personalization, weather } = useApp()
  if (!personalization || !weather) return null

  const hasAlert = weather.alerts.some(a => a.severity === 'CRITICAL' || a.severity === 'HIGH')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-card p-4 bg-gradient-to-br ${
        hasAlert
          ? 'from-red-500/15 to-orange-500/10 border-red-500/20'
          : 'from-sky-500/15 to-ocean-500/10 border-sky-500/20'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-lg ${hasAlert ? 'bg-red-500/20' : 'bg-sky-500/20'}`}>
          <Sparkles size={14} className={hasAlert ? 'text-red-400' : 'text-sky-400'} />
        </div>
        <h3 className="text-white font-semibold text-sm">Your Weather Insight</h3>
      </div>
      <p className="text-slate-200 text-sm leading-relaxed">{personalization.insight}</p>
    </motion.div>
  )
}
