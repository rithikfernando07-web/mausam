import type { WeatherCondition } from '../../types'

interface WeatherIconProps {
  condition: WeatherCondition
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  animated?: boolean
}

const CONDITION_EMOJI: Record<WeatherCondition, string> = {
  clear: '☀️',
  'partly-cloudy': '⛅',
  cloudy: '🌥️',
  overcast: '☁️',
  'light-rain': '🌦️',
  'moderate-rain': '🌧️',
  'heavy-rain': '⛈️',
  thunderstorm: '🌩️',
  drizzle: '🌦️',
  fog: '🌫️',
  haze: '🌫️',
  snow: '❄️',
  cyclone: '🌀',
  heatwave: '🌡️',
  windy: '💨',
}

const SIZE_CLASSES = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-5xl',
  xl: 'text-7xl',
  '2xl': 'text-9xl',
}

export function getConditionLabel(condition: WeatherCondition): string {
  const labels: Record<WeatherCondition, string> = {
    clear: 'Clear Sky',
    'partly-cloudy': 'Partly Cloudy',
    cloudy: 'Cloudy',
    overcast: 'Overcast',
    'light-rain': 'Light Rain',
    'moderate-rain': 'Moderate Rain',
    'heavy-rain': 'Heavy Rain',
    thunderstorm: 'Thunderstorm',
    drizzle: 'Drizzle',
    fog: 'Foggy',
    haze: 'Hazy',
    snow: 'Snow',
    cyclone: 'Cyclone',
    heatwave: 'Heatwave',
    windy: 'Windy',
  }
  return labels[condition] ?? 'Unknown'
}

export function getConditionGradient(condition: WeatherCondition): string {
  const gradients: Record<WeatherCondition, string> = {
    clear: 'from-amber-400/20 to-sky-400/20',
    'partly-cloudy': 'from-sky-400/20 to-slate-400/20',
    cloudy: 'from-slate-500/20 to-slate-600/20',
    overcast: 'from-slate-600/20 to-slate-700/20',
    'light-rain': 'from-sky-500/20 to-blue-600/20',
    'moderate-rain': 'from-blue-600/20 to-indigo-600/20',
    'heavy-rain': 'from-indigo-600/20 to-purple-700/20',
    thunderstorm: 'from-purple-700/20 to-slate-800/20',
    drizzle: 'from-sky-400/20 to-slate-500/20',
    fog: 'from-slate-400/20 to-slate-500/20',
    haze: 'from-amber-300/20 to-slate-500/20',
    snow: 'from-blue-200/20 to-slate-300/20',
    cyclone: 'from-indigo-700/30 to-purple-900/30',
    heatwave: 'from-orange-500/20 to-red-600/20',
    windy: 'from-teal-400/20 to-sky-400/20',
  }
  return gradients[condition] ?? 'from-sky-400/20 to-ocean-400/20'
}

export default function WeatherIcon({
  condition,
  size = 'md',
  className = '',
  animated = false,
}: WeatherIconProps) {
  const emoji = CONDITION_EMOJI[condition] ?? '🌤️'
  const sizeClass = SIZE_CLASSES[size]
  const animClass =
    animated && condition === 'clear' ? 'animate-pulse-soft'
      : animated && ['heavy-rain', 'thunderstorm', 'cyclone'].includes(condition) ? 'animate-spin-slow'
        : animated ? 'animate-float'
          : ''

  return (
    <span
      className={`${sizeClass} ${animClass} ${className} select-none`}
      role="img"
      aria-label={getConditionLabel(condition)}
    >
      {emoji}
    </span>
  )
}
