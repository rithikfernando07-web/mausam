import { Outlet } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import BottomNav from './BottomNav'
import Sidebar from './Sidebar'
import AssistantButton from '../assistant/AssistantButton'

export default function AppLayout() {
  const { theme } = useApp()

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-dvh`}>
      <div className="bg-weather-gradient dark:bg-weather-gradient min-h-dvh">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex">
          <Sidebar />
          <main
            className="flex-1 ml-[var(--sidebar-width)] overflow-y-auto"
            style={{ minHeight: '100dvh' }}
          >
            <div className="max-w-4xl mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          <main className="pb-[var(--nav-height)] overflow-y-auto">
            <div className="px-4 py-6">
              <Outlet />
            </div>
          </main>
          <BottomNav />
        </div>

        {/* Floating AI assistant */}
        <AssistantButton />
      </div>
    </div>
  )
}
