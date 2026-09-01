import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'

const STEPS = ['welcome', 'location', 'interests', 'notifications', 'complete']

export default function OnboardingLayout() {
  const { theme } = useApp()
  const location = useLocation()

  const currentStep = STEPS.findIndex(s => location.pathname.includes(s))
  const progress = currentStep >= 0 ? ((currentStep + 1) / STEPS.length) * 100 : 0

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-dvh bg-weather-gradient flex flex-col">
        {/* Progress bar (hidden on welcome) */}
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <div className="fixed top-0 left-0 right-0 z-50">
            <div className="h-1 bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 to-ocean-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        {/* Decorative blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-600/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-ocean-600/10 blur-3xl" />
        </div>

        <main className="flex-1 flex items-center justify-center p-4 pt-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>

        {/* Step indicator dots */}
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <div className="flex justify-center gap-2 py-4">
            {STEPS.slice(1, -1).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentStep - 1 ? 'bg-sky-400 w-6' : i < currentStep - 1 ? 'bg-sky-600' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
