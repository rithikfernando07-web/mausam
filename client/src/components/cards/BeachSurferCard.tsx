import React from 'react';
import type { MarineData } from '../../types';
import { Waves, Wind, Sun, ShieldCheck, ShieldAlert, AlertTriangle, Compass } from 'lucide-react';

interface Props {
  data: MarineData;
}

export default function BeachSurferCard({ data }: Props) {
  const getSafetyBadge = (rating: MarineData['safetyRating']) => {
    switch (rating) {
      case 'SAFE':
        return {
          bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
          label: 'SAFE FOR SWIMMING & SURF',
        };
      case 'CAUTION':
        return {
          bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          label: 'CAUTION ADVISED',
        };
      default:
        return {
          bg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          icon: <ShieldAlert className="w-3.5 h-3.5" />,
          label: 'UNSAFE - AVOID OCEAN',
        };
    }
  };

  const badge = getSafetyBadge(data.safetyRating);

  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-sky-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-slate-950 font-bold shadow-lg shadow-sky-500/20">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Beach & Surfing</h3>
            <p className="text-xs text-slate-400">Wave Heights & Tides</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border ${badge.bg} text-[11px] font-bold flex items-center space-x-1.5`}>
          {badge.icon}
          <span>{data.safetyRating}</span>
        </div>
      </div>

      {/* Main Wave & Water Temp Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Wave Height</span>
            <Compass className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{data.waveHeight}m</p>
          <p className="text-[11px] text-sky-300 font-medium">{data.waveDirection}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Water Temp</span>
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{data.waterTemperature}°C</p>
          <p className="text-[11px] text-amber-300 font-medium">UV Index: {data.uvIndex}</p>
        </div>
      </div>

      {/* Tide Timeline */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
        <p className="text-xs font-medium text-slate-300">Tide Timings Today</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5">
            <span className="text-slate-400 text-[11px] block">High Tide</span>
            <span className="font-semibold text-sky-300">{data.tideTimes.highTide}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-white/5">
            <span className="text-slate-400 text-[11px] block">Low Tide</span>
            <span className="font-semibold text-blue-300">{data.tideTimes.lowTide}</span>
          </div>
        </div>
      </div>

      {/* Best Time & Recommendation */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-1">
        <p className="text-xs text-sky-400 font-bold">Best Time to Visit: {data.bestBeachTime}</p>
        <p className="text-xs text-slate-300 leading-relaxed">{data.beachRecommendation}</p>
      </div>
    </div>
  );
}
