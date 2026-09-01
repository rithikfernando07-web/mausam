import { NavLink } from 'react-router-dom'
import { Home, Bell, Map, Heart, Settings, Zap, BarChart2, Info, Moon, Sun } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home', exact: true },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/map', icon: Map, label: 'Weather Map' },
  { to: '/favorites', icon: Heart, label: 'Saved Locations' },
  { to: '/demo', icon: Zap, label: 'Demo Mode' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/how-it-works', icon: Info, label: 'How It Works' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { weather, theme, toggleTheme } = useApp()
  const hasAlerts = (weather?.alerts?.length ?? 0) > 0

  return (
    <aside
      className="fixed top-0 left-0 h-screen z-40 flex flex-col"
      style={{ width: 'var(--sidebar-width)' }}
      aria-label="Sidebar navigation"
    >
      <div className="h-full backdrop-blur-xl bg-mausam-darker/95 border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-ocean-600 flex items-center justify-center">
              <span className="text-lg font-display font-black text-white">M</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-lg leading-none">Mausam</h1>
              <p className="text-xs text-slate-400 mt-0.5">Your Weather, Your Way</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon: Icon, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium
                ${isActive
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
              aria-label={label}
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon size={18} className={isActive ? 'text-sky-400' : ''} />
                    {label === 'Alerts' && hasAlerts && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </div>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Theme toggle */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-200 text-sm font-medium"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </aside>
  )
}
