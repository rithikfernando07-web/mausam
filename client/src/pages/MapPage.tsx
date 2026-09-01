import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { ZoomIn, ZoomOut, Navigation, Layers, Compass, Wind, CloudRain, Sun, ShieldAlert, Sparkles } from 'lucide-react'

type MapLayer = 'rain' | 'temperature' | 'wind' | 'clouds' | 'aqi' | 'uv' | 'storm'

const LAYERS: { id: MapLayer; label: string; emoji: string; desc: string }[] = [
  { id: 'rain', label: 'Rain Radar', emoji: '🌧️', desc: 'Precipitation intensity & cloud radar' },
  { id: 'temperature', label: 'Temperature', emoji: '🌡️', desc: 'Thermal heat maps & gradient zones' },
  { id: 'wind', label: 'Wind Flow', emoji: '💨', desc: 'Vector streamlines & gust velocities' },
  { id: 'clouds', label: 'Cloud Cover', emoji: '☁️', desc: 'Satellite cloud cover density' },
  { id: 'aqi', label: 'Air Quality', emoji: '🌫️', desc: 'PM2.5 & pollution heatmaps' },
  { id: 'uv', label: 'UV Radiation', emoji: '☀️', desc: 'Solar ultraviolet intensity scale' },
  { id: 'storm', label: 'Storm Tracking', emoji: '🌀', desc: 'Cyclone & thunderstorm trajectory' },
]

const LAYER_COLORS: Record<MapLayer, string[]> = {
  rain: ['#e0f2fe', '#7dd3fc', '#38bdf8', '#0284c7', '#075985'],
  temperature: ['#60a5fa', '#a3e635', '#facc15', '#f97316', '#ef4444'],
  wind: ['#ccfbf1', '#5eead4', '#14b8a6', '#0f766e', '#134e4a'],
  clouds: ['#f1f5f9', '#cbd5e1', '#94a3b8', '#64748b', '#475569'],
  aqi: ['#86efac', '#fde047', '#fb923c', '#f87171', '#a855f7'],
  uv: ['#fef08a', '#facc15', '#fb923c', '#f87171', '#e11d48'],
  storm: ['#c084fc', '#a855f7', '#7e22ce', '#ef4444', '#b91c1c'],
}

const CITY_POINTS: { name: string; x: number; y: number; temp: number; aqi: number; wind: number }[] = [
  { name: 'Delhi', x: 50, y: 22, temp: 34, aqi: 185, wind: 12 },
  { name: 'Mumbai', x: 32, y: 55, temp: 30, aqi: 85, wind: 22 },
  { name: 'Chennai', x: 52, y: 75, temp: 32, aqi: 78, wind: 15 },
  { name: 'Bengaluru', x: 45, y: 72, temp: 26, aqi: 48, wind: 14 },
  { name: 'Hyderabad', x: 48, y: 60, temp: 31, aqi: 92, wind: 10 },
  { name: 'Kolkata', x: 68, y: 40, temp: 33, aqi: 130, wind: 16 },
  { name: 'Coimbatore', x: 44, y: 78, temp: 28, aqi: 52, wind: 18 },
  { name: 'Pune', x: 36, y: 58, temp: 29, aqi: 74, wind: 12 },
]

export default function MapPage() {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('rain')
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedCity, setSelectedCity] = useState<string>('Chennai')
  const { weather, setActiveCity } = useApp()

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(1.8, Math.max(0.8, Number((prev + delta).toFixed(1)))))
  }

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName)
    setActiveCity(cityName)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-white text-2xl mb-0.5">Interactive Weather Maps</h1>
          <p className="text-slate-400 text-xs">Multi-layer meteorological radar & tracking</p>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>7 Active Layers</span>
        </div>
      </div>

      {/* Layer Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {LAYERS.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setActiveLayer(id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeLayer === id
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25 font-bold scale-105'
                : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Interactive Map Canvas Container */}
      <motion.div
        key={activeLayer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card p-4 relative overflow-hidden rounded-3xl border border-white/15"
        style={{ minHeight: 420 }}
      >
        {/* Floating Zoom & Location Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-1.5 bg-slate-900/80 backdrop-blur-md p-1 rounded-2xl border border-white/15 shadow-xl">
          <button
            onClick={() => handleZoom(0.2)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => handleZoom(-0.2)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1)
              setSelectedCity(weather?.location.city || 'Chennai')
            }}
            className="p-2 rounded-xl text-sky-400 hover:bg-sky-500/20 transition-colors"
            title="Recenter Map"
          >
            <Navigation size={16} />
          </button>
        </div>

        {/* Map SVG Canvas */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" style={{ minHeight: 380 }}>
            <defs>
              <radialGradient id={`mapGrad-${activeLayer}`} cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor={LAYER_COLORS[activeLayer][1]} stopOpacity="0.35" />
                <stop offset="50%" stopColor={LAYER_COLORS[activeLayer][2]} stopOpacity="0.18" />
                <stop offset="100%" stopColor={LAYER_COLORS[activeLayer][4]} stopOpacity="0.05" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* India Contour Map Outline */}
            <polygon
              points="45,5 55,5 65,15 70,25 72,35 70,42 68,50 60,60 55,70 52,80 48,85 42,82 38,75 32,65 28,55 30,45 32,35 38,20 42,10"
              fill={`url(#mapGrad-${activeLayer})`}
              stroke={LAYER_COLORS[activeLayer][2]}
              strokeWidth="0.6"
              strokeOpacity="0.6"
            />

            {/* Layer-Specific Animated Visuals */}
            {activeLayer === 'rain' && (
              <>
                <circle cx="52" cy="75" r="14" fill="#38bdf8" fillOpacity="0.25" className="animate-pulse" />
                <circle cx="32" cy="55" r="10" fill="#0284c7" fillOpacity="0.3" className="animate-pulse" />
                <circle cx="68" cy="40" r="12" fill="#7dd3fc" fillOpacity="0.2" />
              </>
            )}

            {activeLayer === 'temperature' && (
              <>
                <circle cx="50" cy="22" r="16" fill="#ef4444" fillOpacity="0.3" className="animate-pulse" />
                <circle cx="52" cy="75" r="12" fill="#f97316" fillOpacity="0.25" />
                <circle cx="45" cy="72" r="9" fill="#a3e635" fillOpacity="0.2" />
              </>
            )}

            {activeLayer === 'wind' && (
              <>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <line
                    key={i}
                    x1={25 + i * 8}
                    y1={35 + i * 6}
                    x2={38 + i * 8}
                    y2={30 + i * 6}
                    stroke="#14b8a6"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                    strokeLinecap="round"
                    strokeDasharray="2 2"
                  />
                ))}
              </>
            )}

            {activeLayer === 'clouds' && (
              <>
                <ellipse cx="48" cy="65" rx="16" ry="8" fill="#e2e8f0" fillOpacity="0.2" className="animate-pulse" />
                <ellipse cx="60" cy="35" rx="14" ry="7" fill="#cbd5e1" fillOpacity="0.25" />
              </>
            )}

            {activeLayer === 'aqi' && (
              <>
                <circle cx="50" cy="22" r="15" fill="#a855f7" fillOpacity="0.35" className="animate-pulse" />
                <circle cx="68" cy="40" r="10" fill="#f97316" fillOpacity="0.25" />
                <circle cx="45" cy="72" r="8" fill="#86efac" fillOpacity="0.3" />
              </>
            )}

            {activeLayer === 'uv' && (
              <>
                <circle cx="52" cy="75" r="15" fill="#f87171" fillOpacity="0.3" className="animate-pulse" />
                <circle cx="50" cy="22" r="14" fill="#fb923c" fillOpacity="0.25" />
              </>
            )}

            {activeLayer === 'storm' && (
              <>
                <circle cx="65" cy="70" r="18" fill="#7e22ce" fillOpacity="0.3" className="animate-ping" />
                <circle cx="65" cy="70" r="10" fill="#ef4444" fillOpacity="0.4" />
                <path d="M 65 70 Q 58 60 52 75" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
              </>
            )}

            {/* City Markers & Labels */}
            {CITY_POINTS.map((city) => {
              const isActive = city.name === (weather?.location.city || selectedCity)
              return (
                <g
                  key={city.name}
                  onClick={() => handleCityClick(city.name)}
                  className="cursor-pointer"
                >
                  {isActive && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="4.5"
                      fill={LAYER_COLORS[activeLayer][2]}
                      fillOpacity="0.4"
                      className="animate-pulse"
                    />
                  )}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isActive ? 2.8 : 1.8}
                    fill={isActive ? LAYER_COLORS[activeLayer][2] : '#ffffff'}
                    stroke="#0f172a"
                    strokeWidth="0.5"
                    filter={isActive ? 'url(#glow)' : undefined}
                  />
                  <text
                    x={city.x + 3.5}
                    y={city.y + 1}
                    fill={isActive ? '#ffffff' : '#cbd5e1'}
                    fontSize="3.2"
                    fontWeight={isActive ? 'bold' : 'normal'}
                  >
                    {city.name} ({city.temp}°)
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend Bar */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md rounded-2xl p-3 border border-white/10">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-white text-xs font-bold">{LAYERS.find(l => l.id === activeLayer)?.label}</span>
            <span className="text-slate-400 text-[10px]">{LAYERS.find(l => l.id === activeLayer)?.desc}</span>
          </div>
          <div className="flex h-2 rounded-full overflow-hidden">
            {LAYER_COLORS[activeLayer].map((color, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[9px] text-slate-400">
            <span>Low Intensity</span>
            <span>Moderate</span>
            <span>Severe / Extreme</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
