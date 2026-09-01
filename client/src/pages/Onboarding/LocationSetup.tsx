import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, Search, Navigation } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { Location } from '../../types'

const POPULAR_CITIES: Location[] = [
  { city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  { city: 'Bengaluru', state: 'Karnataka', country: 'India' },
  { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { city: 'Delhi', state: 'Delhi', country: 'India' },
  { city: 'Hyderabad', state: 'Telangana', country: 'India' },
  { city: 'Coimbatore', state: 'Tamil Nadu', country: 'India' },
  { city: 'Pune', state: 'Maharashtra', country: 'India' },
  { city: 'Kolkata', state: 'West Bengal', country: 'India' },
]

export default function LocationSetup() {
  const navigate = useNavigate()
  const { updateUserField } = useApp()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Location | null>(null)
  const [locating, setLocating] = useState(false)

  const filtered = POPULAR_CITIES.filter(
    c => c.city.toLowerCase().includes(search.toLowerCase()) || c.state.toLowerCase().includes(search.toLowerCase())
  )

  function selectCity(loc: Location) {
    setSelected(loc)
  }

  function handleCurrentLocation() {
    setLocating(true)
    // Simulate geolocation (fallback to Chennai for demo)
    setTimeout(() => {
      selectCity({ city: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 })
      setLocating(false)
    }, 1500)
  }

  function handleContinue() {
    if (!selected) return
    updateUserField('location', selected)
    navigate('/onboarding/interests')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h2 className="font-display font-bold text-white text-2xl mb-1">Where should we start?</h2>
        <p className="text-slate-400 text-sm">Your current location for personalized weather.</p>
      </div>

      {/* Geolocation button */}
      <button
        id="use-location-btn"
        onClick={handleCurrentLocation}
        disabled={locating}
        className="btn-secondary w-full mb-4 py-3"
      >
        <Navigation size={18} className={locating ? 'animate-spin' : ''} />
        {locating ? 'Detecting location...' : 'Use my current location'}
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-slate-500 text-xs">or search</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          id="city-search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search city, state..."
          className="input-field pl-10"
          aria-label="Search for a city"
        />
      </div>

      {/* City list */}
      <div className="space-y-2 mb-6 max-h-60 overflow-y-auto no-scrollbar">
        {filtered.map(city => (
          <button
            key={city.city}
            onClick={() => selectCity(city)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left ${
              selected?.city === city.city
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <MapPin size={16} className={selected?.city === city.city ? 'text-sky-400' : 'text-slate-500'} />
            <div>
              <div className="font-medium text-sm">{city.city}</div>
              <div className="text-xs text-slate-400">{city.state}, {city.country}</div>
            </div>
            {selected?.city === city.city && (
              <span className="ml-auto text-sky-400">✓</span>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <div className="glass-card p-3 mb-4 flex items-center gap-2">
          <MapPin size={16} className="text-sky-400" />
          <span className="text-slate-200 text-sm">Selected: <span className="text-white font-semibold">{selected.city}, {selected.state}</span></span>
        </div>
      )}

      <button
        id="location-continue-btn"
        onClick={handleContinue}
        disabled={!selected}
        className="btn-primary w-full py-4"
      >
        Continue →
      </button>
    </motion.div>
  )
}
