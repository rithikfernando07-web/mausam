import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import AlertCard from '../components/cards/AlertCard'
import { Shield, AlertTriangle, Bell, Sliders, Send, CheckCircle2, Clock, MapPin, Volume2 } from 'lucide-react'
import type { WeatherAlert, AlertSeverity, AlertCategory } from '../types'

const ALERT_TYPES_CONFIG: { id: AlertCategory; emoji: string; label: string; color: string; desc: string }[] = [
  { id: 'severe', emoji: '🔴', label: 'Severe Weather', color: 'text-rose-400', desc: 'Cyclones, squalls & flash flood watches' },
  { id: 'rain', emoji: '🟠', label: 'Heavy Rain', color: 'text-amber-400', desc: 'Monsoon downpours & localized waterlogging' },
  { id: 'uv', emoji: '🟡', label: 'High UV', color: 'text-yellow-400', desc: 'Solar radiation index 8+ sun protection' },
  { id: 'aqi', emoji: '🟣', label: 'Poor Air Quality', color: 'text-purple-400', desc: 'PM2.5 spike above safe breathing limits' },
  { id: 'wind', emoji: '🔵', label: 'Strong Winds', color: 'text-sky-400', desc: 'Gale gusts & high coastal wave swells' },
  { id: 'fog', emoji: '⚠️', label: 'Fog Alert', color: 'text-amber-300', desc: 'Dense fog causing low road visibility' },
]

export default function Alerts() {
  const { weather, user, updateUserField } = useApp()
  const [activeTab, setActiveTab] = useState<'feed' | 'settings'>('feed')
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'HIGH_CRITICAL'>('ALL')
  const [simulatedNotification, setSimulatedNotification] = useState<string | null>(null)

  // Config toggles
  const [enabledCategories, setEnabledCategories] = useState<Record<AlertCategory, boolean>>({
    severe: true,
    rain: true,
    uv: true,
    aqi: true,
    wind: true,
    fog: true,
  })
  const [morningTime, setMorningTime] = useState('07:00 AM')
  const [eveningTime, setEveningTime] = useState('07:30 PM')

  if (!weather) return null

  const alerts = weather.alerts.filter(a => {
    if (priorityFilter === 'HIGH_CRITICAL' && !['CRITICAL', 'HIGH'].includes(a.severity)) {
      return false
    }
    return enabledCategories[a.category as AlertCategory] ?? true
  })

  const toggleCategory = (cat: AlertCategory) => {
    setEnabledCategories(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  const triggerSimulatedAlert = (type: string) => {
    setSimulatedNotification(`🚨 [Mausam Alert Simulator] ${type} warning active for ${weather.location.city}! Notification sent.`)
    setTimeout(() => setSimulatedNotification(null), 4500)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-white text-2xl mb-0.5">Alerts Center</h1>
          <p className="text-slate-400 text-xs">Emergency weather bulletins & notification rules</p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-white/10 rounded-2xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'feed' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Alerts
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'settings' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Simulated Live Banner */}
      <AnimatePresence>
        {simulatedNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/25 via-red-500/20 to-rose-600/15 border border-rose-500/40 text-white shadow-2xl flex items-center justify-between space-x-3"
          >
            <div className="flex items-center space-x-2.5">
              <Volume2 className="w-5 h-5 text-rose-400 shrink-0 animate-bounce" />
              <p className="text-xs font-semibold">{simulatedNotification}</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300 font-bold shrink-0">
              SIMULATED
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {activeTab === 'feed' ? (
        <div className="space-y-4">
          {/* Priority filter pills */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 text-xs">
              <button
                onClick={() => setPriorityFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  priorityFilter === 'ALL'
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                All Active ({weather.alerts.length})
              </button>
              <button
                onClick={() => setPriorityFilter('HIGH_CRITICAL')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  priorityFilter === 'HIGH_CRITICAL'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                High & Critical Priority
              </button>
            </div>

            <button
              onClick={() => triggerSimulatedAlert('Heavy Monsoon Downpour')}
              className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center space-x-1 font-semibold"
            >
              <Send className="w-3 h-3" />
              <span>Simulate Alert</span>
            </button>
          </div>

          {/* Active alerts display */}
          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 text-center rounded-3xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                <Shield size={28} />
              </div>
              <h3 className="text-white font-bold text-base mb-1">Safe & Clear Conditions</h3>
              <p className="text-slate-400 text-xs">No active hazardous weather warnings matching your filters for {weather.location.city}.</p>
            </motion.div>
          )}

          {/* Alert Categories Grid */}
          <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
            <h3 className="text-white font-bold text-xs">Alert Types Managed by Mausam</h3>
            <div className="grid grid-cols-2 gap-2">
              {ALERT_TYPES_CONFIG.map(({ emoji, label, color, desc }) => (
                <div key={label} className="p-2.5 rounded-2xl bg-white/5 border border-white/5 space-y-0.5">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold">
                    <span>{emoji}</span>
                    <span className={color}>{label}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Settings Tab */
        <div className="space-y-4">
          {/* Categories Toggle */}
          <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">Alert Categories Subscription</h3>
              <span className="text-[10px] text-sky-400">Custom Filters</span>
            </div>

            <div className="space-y-2">
              {ALERT_TYPES_CONFIG.map(({ id, emoji, label, desc }) => {
                const enabled = enabledCategories[id]
                return (
                  <button
                    key={id}
                    onClick={() => toggleCategory(id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      enabled
                        ? 'bg-sky-500/15 border-sky-500/30 text-white'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xl">{emoji}</span>
                      <div>
                        <div className="font-bold text-xs text-white">{label}</div>
                        <div className="text-[10px] text-slate-400">{desc}</div>
                      </div>
                    </div>
                    <div
                      className={`w-9 h-5 rounded-full transition-all flex items-center px-0.5 ${
                        enabled ? 'bg-sky-500' : 'bg-white/15'
                      }`}
                    >
                      <motion.div
                        className="w-4 h-4 rounded-full bg-white shadow-sm"
                        animate={{ x: enabled ? 16 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Timing Windows */}
          <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Daily Briefing Schedules</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <label className="text-slate-400 text-[10px] block">Morning Briefing</label>
                <input
                  type="text"
                  value={morningTime}
                  onChange={e => setMorningTime(e.target.value)}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold"
                />
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <label className="text-slate-400 text-[10px] block">Evening Summary</label>
                <input
                  type="text"
                  value={eveningTime}
                  onChange={e => setEveningTime(e.target.value)}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
