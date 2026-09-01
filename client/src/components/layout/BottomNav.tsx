import { NavLink } from 'react-router-dom'
import { Home, Bell, Map, Heart, Settings } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home', exact: true },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/map', icon: Map, label: 'Map' },
  { to: '/favorites', icon: Heart, label: 'Saved' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function BottomNav() {
  const { weather } = useApp()
  const hasAlerts = (weather?.alerts?.length ?? 0) > 0

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{ height: 'var(--nav-height)' }}
      aria-label="Main navigation"
    >
      <div className="h-full backdrop-blur-xl bg-mausam-darker/90 dark:bg-mausam-darker/90 border-t border-white/10 flex items-center justify-around px-2">
        {NAV_ITEMS.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
            aria-label={label}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon
                    size={22}
                    className={isActive ? 'text-sky-400' : 'text-slate-400'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {label === 'Alerts' && hasAlerts && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${isActive ? 'text-sky-400' : 'text-slate-500'}`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
