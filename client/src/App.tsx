import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import AppLayout from './components/layout/AppLayout'
import OnboardingLayout from './layouts/OnboardingLayout'
import Welcome from './pages/Onboarding/Welcome'
import LocationSetup from './pages/Onboarding/LocationSetup'
import Interests from './pages/Onboarding/Interests'
import Notifications from './pages/Onboarding/Notifications'
import OnboardingComplete from './pages/Onboarding/Complete'
import Home from './pages/Home'
import Alerts from './pages/Alerts'
import MapPage from './pages/MapPage'
import Favorites from './pages/Favorites'
import Settings from './pages/Settings'
import Demo from './pages/Demo'
import Analytics from './pages/Analytics'
import HowItWorks from './pages/HowItWorks'
import SplashScreen from './components/ui/SplashScreen'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  const { user } = useApp()
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('mausam_splash_shown')
  })

  const handleSplashComplete = () => {
    sessionStorage.setItem('mausam_splash_shown', 'true')
    setShowSplash(false)
  }

  const onboarded = user.onboardingCompleted

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <Routes>
        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<Navigate to="/onboarding/welcome" replace />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="location" element={<LocationSetup />} />
          <Route path="interests" element={<Interests />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="complete" element={<OnboardingComplete />} />
        </Route>

        {/* Main App */}
        <Route
          path="/"
          element={
            onboarded ? <AppLayout /> : <Navigate to="/onboarding/welcome" replace />
          }
        >
          <Route index element={<Home />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="map" element={<MapPage />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="settings" element={<Settings />} />
          <Route path="demo" element={<Demo />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="how-it-works" element={<HowItWorks />} />
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to={onboarded ? '/' : '/onboarding/welcome'} replace />}
        />
      </Routes>
    </>
  )
}
