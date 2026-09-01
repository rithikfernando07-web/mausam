import { motion } from 'framer-motion'
import { AlertTriangle, AlertOctagon, Info, AlertCircle } from 'lucide-react'
import type { WeatherAlert } from '../../types'

interface AlertCardProps {
  alert: WeatherAlert
  compact?: boolean
}

const SEVERITY_CONFIG = {
  INFO: { icon: Info, classes: 'severity-info', label: 'INFO' },
  MODERATE: { icon: AlertCircle, classes: 'severity-moderate', label: 'MODERATE' },
  HIGH: { icon: AlertTriangle, classes: 'severity-high', label: 'HIGH' },
  CRITICAL: { icon: AlertOctagon, classes: 'severity-critical', label: 'CRITICAL' },
}

export default function AlertCard({ alert, compact = false }: AlertCardProps) {
  const config = SEVERITY_CONFIG[alert.severity]
  const Icon = config.icon

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-start gap-3 p-3 rounded-xl border ${config.classes}`}
      >
        <Icon size={16} className="flex-shrink-0 mt-0.5" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{alert.title}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${config.classes} font-medium`}>
              {config.label}
            </span>
          </div>
          <p className="text-xs opacity-80 mt-0.5 line-clamp-2">{alert.description}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-2xl border ${config.classes}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-current/10">
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-base">{alert.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${config.classes} font-medium`}>
              {config.label}
            </span>
          </div>
          <p className="text-sm opacity-80 leading-relaxed mb-2">{alert.description}</p>
          <div className="flex items-center justify-between text-xs opacity-60">
            <span>📍 {alert.affectedArea}</span>
            <span>Until {new Date(alert.endTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
