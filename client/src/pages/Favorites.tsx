import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Plus, Trash2, MapPin, ArrowRight, Search, Scale, Sparkles, Droplets, Wind, Sun } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { buildWeatherData, POPULAR_LOCATIONS } from '../data/mockData'
import WeatherIcon from '../components/ui/WeatherIcon'
import type { Location } from '../types'

export default function Favorites() {
  const { user, updateUserField, setActiveCity, activeCity } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [search, setSearch] = useState('')
  const [compareCity1, setCompareCity1] = useState(activeCity || 'Chennai')
  const [compareCity2, setCompareCity2] = useState('London')

  const favorites = user.favoriteLocations || []
  const availableCities = POPULAR_LOCATIONS.filter(
    c => !favorites.some(f => f.city === c.city) && c.city !== user.location.city
  )
  const filtered = availableCities.filter(
    c => c.city.toLowerCase().includes(search.toLowerCase()) ||
         c.country.toLowerCase().includes(search.toLowerCase())
  )

  function addFavorite(loc: Location) {
    updateUserField('favoriteLocations', [...favorites, loc])
    setShowAdd(false)
    setSearch('')
  }

  function removeFavorite(city: string) {
    updateUserField('favoriteLocations', favorites.filter(f => f.city !== city))
  }

  function switchToCity(city: string) {
    setActiveCity(city)
  }

  const w1 = buildWeatherData(compareCity1, 'normal')
  const w2 = buildWeatherData(compareCity2, 'normal')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-white text-2xl mb-1">Saved Locations</h1>
          <p className="text-slate-400 text-sm">Monitor multi-city forecasts & compare conditions</p>
        </div>
        <button
          id="add-favorite-btn"
          onClick={() => setShowAdd(!showAdd)}
          className="btn-primary px-3.5 py-2 text-xs font-bold flex items-center space-x-1"
        >
          <Plus size={16} />
          <span>Add City</span>
        </button>
      </div>

      {/* Add city modal / dropdown */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-4 space-y-3 border border-sky-500/30">
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search city (e.g. London, Dubai, New York, Bengaluru)..."
                  className="input-field pl-9 py-2.5 text-xs w-full"
                  autoFocus
                />
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                {filtered.map(city => (
                  <button
                    key={city.city}
                    onClick={() => addFavorite(city)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-sky-500/15 hover:border-sky-500/30 transition-all text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-sky-400" />
                      <div>
                        <div className="text-white font-semibold text-xs">{city.city}</div>
                        <div className="text-slate-400 text-[10px]">{city.state}, {city.country}</div>
                      </div>
                    </div>
                    <Plus size={14} className="text-sky-400" />
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="text-slate-400 text-xs text-center py-3">No matching cities available to add</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Active Location Card */}
      <div className="glass-card p-4 bg-gradient-to-br from-sky-500/20 via-slate-900 to-slate-950 border border-sky-500/30">
        <div className="flex items-center justify-between text-xs text-sky-400 font-semibold mb-2">
          <span className="flex items-center space-x-1">
            <MapPin size={12} />
            <span>Active Selected Location</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px]">LIVE</span>
        </div>
        <FavoriteCityCard
          city={activeCity}
          state={user.location.state}
          isActive={true}
          onSwitch={() => switchToCity(activeCity)}
          isPrimary
        />
      </div>

      {/* Favorites List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
          <span>Saved Favorites ({favorites.length})</span>
        </div>

        {favorites.length > 0 ? (
          favorites.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-card p-4 hover:border-sky-500/30 transition-all"
            >
              <FavoriteCityCard
                city={loc.city}
                state={loc.state}
                isActive={activeCity === loc.city}
                onSwitch={() => switchToCity(loc.city)}
                onRemove={() => removeFavorite(loc.city)}
              />
            </motion.div>
          ))
        ) : (
          <div className="glass-card p-6 text-center">
            <Heart size={28} className="text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">No extra saved cities yet.</p>
            <p className="text-slate-500 text-[11px] mt-0.5">Click "Add City" above to track global weather.</p>
          </div>
        )}
      </div>

      {/* Side-by-Side Weather Comparison Matrix */}
      <div className="glass-card p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Weather Comparison Tool</h3>
              <p className="text-[11px] text-slate-400">Compare 2 cities side-by-side in real time</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
            Comparative Matrix
          </span>
        </div>

        {/* City selectors */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">City A</label>
            <select
              value={compareCity1}
              onChange={e => setCompareCity1(e.target.value)}
              className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
            >
              {POPULAR_LOCATIONS.map(c => (
                <option key={c.city} value={c.city}>{c.city} ({c.country})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">City B</label>
            <select
              value={compareCity2}
              onChange={e => setCompareCity2(e.target.value)}
              className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
            >
              {POPULAR_LOCATIONS.map(c => (
                <option key={c.city} value={c.city}>{c.city} ({c.country})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Matrix Cards */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* City A Card */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-sky-400">{w1.location.city}</span>
              <WeatherIcon condition={w1.current.condition} size="sm" />
            </div>
            <div className="text-2xl font-black text-white">{w1.current.temperature}°C</div>
            <div className="space-y-1 text-[11px] text-slate-300 border-t border-white/5 pt-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Condition</span>
                <span className="capitalize">{w1.current.condition.replace(/-/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Humidity</span>
                <span>{w1.current.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AQI</span>
                <span className="font-semibold text-emerald-400">{w1.airQuality.aqi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wind</span>
                <span>{w1.current.windSpeed} km/h</span>
              </div>
            </div>
          </div>

          {/* City B Card */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-purple-400">{w2.location.city}</span>
              <WeatherIcon condition={w2.current.condition} size="sm" />
            </div>
            <div className="text-2xl font-black text-white">{w2.current.temperature}°C</div>
            <div className="space-y-1 text-[11px] text-slate-300 border-t border-white/5 pt-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Condition</span>
                <span className="capitalize">{w2.current.condition.replace(/-/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Humidity</span>
                <span>{w2.current.humidity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AQI</span>
                <span className="font-semibold text-emerald-400">{w2.airQuality.aqi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wind</span>
                <span>{w2.current.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FavoriteCityCard({
  city,
  state,
  isActive,
  onSwitch,
  onRemove,
  isPrimary,
}: {
  city: string
  state?: string
  isActive: boolean
  onSwitch: () => void
  onRemove?: () => void
  isPrimary?: boolean
}) {
  const w = buildWeatherData(city, 'normal')

  return (
    <div className="flex items-center gap-3">
      <WeatherIcon condition={w.current.condition} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-sm truncate">{city}</span>
          {isActive && (
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0 font-semibold">
              Active
            </span>
          )}
        </div>
        <span className="text-slate-400 text-xs">{w.current.description}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white font-display font-black text-xl">{w.current.temperature}°</span>
        {!isActive && (
          <button
            onClick={onSwitch}
            className="p-2 rounded-xl bg-white/10 hover:bg-sky-500/25 text-slate-300 hover:text-sky-300 transition-all"
            aria-label={`Switch to ${city}`}
          >
            <ArrowRight size={14} />
          </button>
        )}
        {onRemove && !isPrimary && (
          <button
            onClick={onRemove}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all"
            aria-label={`Remove ${city}`}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
