import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Thermometer, Droplets, Wind, Eye, Gauge, Compass, Sun, Moon, ArrowUpRight, CloudRain, BarChart3 } from 'lucide-react';
import type { WeatherData, UserProfile } from '../../types';
import WeatherIcon from '../ui/WeatherIcon';

interface Props {
  weather: WeatherData;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

type ChartMetric = 'temperature' | 'rain' | 'wind' | 'humidity';

export default function WeatherDetailModal({ weather, user, isOpen, onClose }: Props) {
  const [activeChart, setActiveChart] = useState<ChartMetric>('temperature');

  if (!isOpen) return null;

  const { current, hourly, location } = weather;

  // Chart data calculations
  const maxVal = {
    temperature: Math.max(...hourly.map(h => h.temperature)) + 2,
    rain: 100,
    wind: Math.max(...hourly.map(h => h.windSpeed)) + 10,
    humidity: 100,
  }[activeChart];

  const minVal = {
    temperature: Math.min(...hourly.map(h => h.temperature)) - 2,
    rain: 0,
    wind: 0,
    humidity: 0,
  }[activeChart];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900/95 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5 text-white my-8 max-h-[90vh] overflow-y-auto scrollbar-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold font-display">{location.city} Detailed Forecast</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {current.condition.replace(/-/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive meteorological metrics & hourly trends</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Highlight */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-sky-500/20 via-blue-500/15 to-transparent border border-sky-500/30">
            <div className="flex items-center space-x-4">
              <WeatherIcon condition={current.condition} size="lg" animated />
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-5xl font-black">{current.temperature}°</span>
                  <span className="text-lg text-slate-300">Feels like {current.feelsLike}°</span>
                </div>
                <p className="text-xs text-sky-300 mt-1">High: {current.highTemp}° | Low: {current.lowTemp}°</p>
              </div>
            </div>
          </div>

          {/* Interactive 24h Trend Chart */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                <BarChart3 className="w-4 h-4 text-sky-400" />
                <span>Interactive Hourly Chart</span>
              </span>

              {/* Chart Metric Selector */}
              <div className="flex bg-white/10 rounded-xl p-1 text-[11px]">
                {(['temperature', 'rain', 'wind', 'humidity'] as ChartMetric[]).map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setActiveChart(metric)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                      activeChart === metric ? 'bg-sky-500 text-white font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {metric === 'temperature' ? 'Temp' : metric === 'rain' ? 'Rain' : metric === 'wind' ? 'Wind' : 'Humidity'}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Visual Chart */}
            <div className="pt-2">
              <svg viewBox="0 0 320 100" className="w-full h-32 overflow-visible">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="320" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                {/* Points & Path */}
                {(() => {
                  const points = hourly.map((h, i) => {
                    const x = 10 + (i * (300 / (hourly.length - 1)));
                    let val = h.temperature;
                    if (activeChart === 'rain') val = h.rainProbability;
                    if (activeChart === 'wind') val = h.windSpeed;
                    if (activeChart === 'humidity') val = h.humidity;

                    const norm = (val - minVal) / Math.max(1, maxVal - minVal);
                    const y = 85 - norm * 70;
                    return { x, y, val, label: h.time };
                  });

                  const dPath = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
                  const dArea = `${dPath} L ${points[points.length - 1].x} 90 L ${points[0].x} 90 Z`;

                  return (
                    <>
                      <path d={dArea} fill="url(#chartGrad)" />
                      <path d={dPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                      {points.map((p, idx) => (
                        <g key={idx}>
                          <circle cx={p.x} cy={p.y} r="3.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                          <text x={p.x} y={p.y - 8} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                            {p.val}{activeChart === 'temperature' ? '°' : activeChart === 'rain' || activeChart === 'humidity' ? '%' : ''}
                          </text>
                          <text x={p.x} y="98" fill="#94a3b8" fontSize="8" textAnchor="middle">
                            {p.label}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Deep Meteorological Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Humidity</span>
                <Droplets className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-xl font-bold text-white">{current.humidity}%</p>
              <p className="text-[10px] text-slate-400">Dew point: {current.dewPoint}°C</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Wind & Gusts</span>
                <Wind className="w-4 h-4 text-teal-400" />
              </div>
              <p className="text-xl font-bold text-white">{current.windSpeed} km/h</p>
              <p className="text-[10px] text-slate-400">{current.windDirection}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Pressure</span>
                <Gauge className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xl font-bold text-white">{current.pressure} hPa</p>
              <p className="text-[10px] text-emerald-400 font-medium">Standard Atmospheric</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Visibility</span>
                <Eye className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xl font-bold text-white">{current.visibility} km</p>
              <p className="text-[10px] text-slate-400">Clear horizon visibility</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>UV Radiation</span>
                <Sun className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xl font-bold text-amber-400">Index {current.uvIndex}</p>
              <p className="text-[10px] text-amber-300">SPF 50+ Recommended</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Air Quality</span>
                <Compass className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xl font-bold text-emerald-400">AQI {weather.airQuality.aqi}</p>
              <p className="text-[10px] text-emerald-300">{weather.airQuality.category}</p>
            </div>
          </div>

          {/* Sun & Moon Timings */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-around text-xs">
            <div className="flex items-center space-x-3">
              <Sun className="w-6 h-6 text-amber-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">Sunrise</span>
                <span className="font-bold text-white text-sm">{current.sunrise}</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center space-x-3">
              <Moon className="w-6 h-6 text-indigo-300" />
              <div>
                <span className="text-slate-400 block text-[10px]">Sunset</span>
                <span className="font-bold text-white text-sm">{current.sunset}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
