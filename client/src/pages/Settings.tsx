import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  User, MapPin, Palette, Thermometer, Wind, Bell, Flame, Award,
  Sun, Moon, ChevronRight, Zap, BarChart2, SlidersHorizontal, Info, Check
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { PersonaType, NotificationPrefs } from '../types'
import EditDashboardModal from '../components/cards/EditDashboardModal'

const ALL_PERSONAS: { id: PersonaType; emoji: string; label: string; description: string }[] = [
  { id: 'health', emoji: '❤️', label: 'Health & Wellness', description: 'AQI, PM2.5, pollen & UV index' },
  { id: 'fitness', emoji: '🏃', label: 'Fitness & Outdoor', description: 'Optimal running windows & comfort' },
  { id: 'beach', emoji: '🏄', label: 'Beach & Surfing', description: 'Wave height, tide timings & water temp' },
  { id: 'travel', emoji: '✈️', label: 'Travel', description: 'Saved destinations & smart packing' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family & Kids', description: 'School commute & outdoor play safety' },
  { id: 'farmer', emoji: '🌱', label: 'Gardening & Agri', description: 'Soil moisture, rain forecast & planting' },
  { id: 'commuter', emoji: '🚗', label: 'Daily Commute', description: 'Road conditions, visibility & delay risk' },
  { id: 'event', emoji: '🎉', label: 'Events Planning', description: 'Outdoor suitability & Plan B contingency' },
]

export default function Settings() {
  const { user, updateUserField, setUser, weather, personalization, theme, toggleTheme, setDemoMode } = useApp()
  const navigate = useNavigate()
  const [showPersonas, setShowPersonas] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showEditDashboard, setShowEditDashboard] = useState(false)
  const [nameInput, setNameInput] = useState(user.name)

  const selectedPersonas = user.selectedPersonas || []

  function togglePersona(id: PersonaType) {
    const updated = selectedPersonas.includes(id)
      ? selectedPersonas.filter(p => p !== id)
      : [...selectedPersonas, id]
    const fallback = updated.length > 0 ? updated : (['health'] as PersonaType[])
    updateUserField('selectedPersonas', fallback)
    updateUserField('interests', fallback)
  }

  function toggleNotification(key: keyof NotificationPrefs) {
    updateUserField('notifications', { ...user.notifications, [key]: !user.notifications[key] })
  }

  function saveName() {
    if (nameInput.trim()) {
      updateUserField('name', nameInput.trim())
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-white text-2xl mb-0.5">Settings & Profile</h1>
        <p className="text-slate-400 text-xs">Configure preferences, personas, units & notifications</p>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/20">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm">{user.name}</h3>
            <p className="text-slate-400 text-xs">{user.email || 'user@mausam.app'}</p>
          </div>
          <button
            onClick={() => setShowEditDashboard(true)}
            className="p-2 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold flex items-center space-x-1"
          >
            <SlidersHorizontal size={14} />
            <span>Layout</span>
          </button>
        </div>

        <div className="pt-2 border-t border-white/5 space-y-2">
          <label htmlFor="name" className="text-slate-400 text-[10px] block">Display Name</label>
          <div className="flex gap-2">
            <input
              id="name"
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="input-field py-2 text-xs flex-1 rounded-xl"
            />
            <button onClick={saveName} className="btn-primary px-4 py-2 text-xs font-bold">Save</button>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
            <MapPin size={12} className="text-sky-400" />
            <span>Primary Location: <strong className="text-white">{user.location.city}, {user.location.country}</strong></span>
          </div>
        </div>
      </div>

      {/* Gamification Streak & Badges Status */}
      {weather?.gamification && (
        <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-2.5 bg-gradient-to-r from-orange-500/10 via-slate-900 to-slate-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-orange-400 fill-current" />
              <span className="font-bold text-xs text-white">Weather Streak Status</span>
            </div>
            <span className="text-xs font-black text-orange-400">🔥 {weather.gamification.streakDays} Days</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/5">
            <span className="flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Badges Unlocked</span>
            </span>
            <span className="text-white font-bold">
              {weather.gamification.unlockedBadges.filter(b => b.unlocked).length} / {weather.gamification.unlockedBadges.length}
            </span>
          </div>
        </div>
      )}

      {/* Personas Manager */}
      <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
        <button
          onClick={() => setShowPersonas(!showPersonas)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Palette size={18} className="text-sky-400" />
            <div className="text-left">
              <div className="text-white font-semibold text-xs">Active Lifestyle Personas</div>
              <div className="text-slate-400 text-[10px]">{selectedPersonas.length} Personas active</div>
            </div>
          </div>
          <ChevronRight size={16} className={`text-slate-400 transition-transform ${showPersonas ? 'rotate-90' : ''}`} />
        </button>

        {showPersonas && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5"
          >
            {ALL_PERSONAS.map(({ id, emoji, label }) => {
              const active = selectedPersonas.includes(id)
              return (
                <button
                  key={id}
                  onClick={() => togglePersona(id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all ${
                    active
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-300 font-bold'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <span>{emoji}</span>
                  <span className="truncate">{label}</span>
                  {active && <Check size={12} className="ml-auto text-sky-400 shrink-0" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </div>

      {/* Units Customization (Temperature & Wind) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Temp Unit */}
        <div className="glass-card p-3.5 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs text-white font-semibold">
            <Thermometer size={14} className="text-sky-400" />
            <span>Temperature</span>
          </div>
          <div className="flex bg-white/10 rounded-xl p-0.5 text-xs">
            {(['C', 'F'] as const).map(unit => (
              <button
                key={unit}
                onClick={() => updateUserField('temperatureUnit', unit)}
                className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                  user.temperatureUnit === unit ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400'
                }`}
              >
                °{unit}
              </button>
            ))}
          </div>
        </div>

        {/* Wind Speed Unit */}
        <div className="glass-card p-3.5 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs text-white font-semibold">
            <Wind size={14} className="text-teal-400" />
            <span>Wind Speed</span>
          </div>
          <div className="flex bg-white/10 rounded-xl p-0.5 text-xs">
            {(['km/h', 'mph'] as const).map(unit => (
              <button
                key={unit}
                onClick={() => updateUserField('windSpeedUnit', unit)}
                className={`flex-1 py-1 rounded-lg font-bold transition-all ${
                  (user.windSpeedUnit || 'km/h') === unit ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400'
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="glass-card p-4 rounded-3xl border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {theme === 'dark' ? <Moon size={18} className="text-sky-400" /> : <Sun size={18} className="text-amber-400" />}
          <span className="text-white font-semibold text-xs">App Appearance</span>
        </div>
        <button
          onClick={toggleTheme}
          className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-slate-300 hover:bg-white/15 transition-all"
        >
          {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      {/* Notifications Drawer */}
      <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-3">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <Bell size={18} className="text-sky-400" />
            <div className="text-left">
              <div className="text-white font-semibold text-xs">Notification Channels</div>
              <div className="text-slate-400 text-[10px]">
                {Object.values(user.notifications).filter(Boolean).length} enabled
              </div>
            </div>
          </div>
          <ChevronRight size={16} className={`text-slate-400 transition-transform ${showNotifications ? 'rotate-90' : ''}`} />
        </button>

        {showNotifications && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="space-y-2 pt-2 border-t border-white/5"
          >
            {[
              { key: 'severeWeather' as const, label: 'Severe Weather', emoji: '🚨' },
              { key: 'rain' as const, label: 'Rain Alerts', emoji: '🌧️' },
              { key: 'heat' as const, label: 'Heat Alerts', emoji: '🌡️' },
              { key: 'airQuality' as const, label: 'Air Quality & UV', emoji: '🌫️' },
              { key: 'morningBriefing' as const, label: 'Morning Weather Briefing', emoji: '☀️' },
              { key: 'eveningForecast' as const, label: 'Evening Weather Summary', emoji: '🌙' },
              { key: 'travel' as const, label: 'Travel Alerts', emoji: '✈️' },
            ].map(({ key, label, emoji }) => (
              <button
                key={key}
                onClick={() => toggleNotification(key)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs"
              >
                <div className="flex items-center gap-2 text-slate-300">
                  <span>{emoji}</span>
                  <span>{label}</span>
                </div>
                <div
                  className={`w-8 h-4.5 rounded-full transition-all flex items-center px-0.5 ${
                    user.notifications[key] ? 'bg-sky-500' : 'bg-white/15'
                  }`}
                >
                  <motion.div
                    className="w-3.5 h-3.5 rounded-full bg-white shadow-sm"
                    animate={{ x: user.notifications[key] ? 14 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <button
          onClick={() => { setDemoMode(true); navigate('/demo') }}
          className="w-full glass-card p-3.5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all border border-white/10"
        >
          <div className="flex items-center gap-2.5">
            <Zap size={16} className="text-amber-400" />
            <span className="text-white font-semibold text-xs">Personalization Demo Showcase</span>
          </div>
          <ChevronRight size={14} className="text-slate-400" />
        </button>

        <button
          onClick={() => navigate('/analytics')}
          className="w-full glass-card p-3.5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all border border-white/10"
        >
          <div className="flex items-center gap-2.5">
            <BarChart2 size={16} className="text-green-400" />
            <span className="text-white font-semibold text-xs">Analytics & Engagement Dashboard</span>
          </div>
          <ChevronRight size={14} className="text-slate-400" />
        </button>

        <button
          onClick={() => navigate('/how-it-works')}
          className="w-full glass-card p-3.5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all border border-white/10"
        >
          <div className="flex items-center gap-2.5">
            <Info size={16} className="text-violet-400" />
            <span className="text-white font-semibold text-xs">How Mausam Engine Works</span>
          </div>
          <ChevronRight size={14} className="text-slate-400" />
        </button>
      </div>

      {/* About Box */}
      <div className="glass-card p-4 rounded-3xl text-center border border-white/5 space-y-1">
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-black text-[10px] text-white">
            M
          </div>
          <span className="font-display font-bold text-white text-xs">MAUSAM</span>
        </div>
        <p className="text-slate-500 text-[10px]">Personalized Weather Intelligence Mobile App</p>
        <p className="text-slate-600 text-[9px]">Weather that understands your day.</p>
      </div>

      {/* Edit Dashboard Modal */}
      {personalization && (
        <EditDashboardModal
          user={user}
          cards={personalization.cards}
          isOpen={showEditDashboard}
          onClose={() => setShowEditDashboard(false)}
          onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
        />
      )}
    </div>
  )
}
