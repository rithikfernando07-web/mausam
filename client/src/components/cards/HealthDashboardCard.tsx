import React from 'react';
import type { HealthData } from '../../types';
import { Heart, Activity, Sun, ShieldAlert, Sparkles } from 'lucide-react';

interface Props {
  data: HealthData;
}

export default function HealthDashboardCard({ data }: Props) {
  const getAQIColor = (cat: string) => {
    switch (cat) {
      case 'Good': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Satisfactory': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'Moderate': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Poor': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-emerald-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Health & Air Quality</h3>
            <p className="text-xs text-slate-400">Personalized Health Index</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Score {data.healthScore}/100</span>
        </div>
      </div>

      {/* Main AQI Display */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className={`p-4 rounded-2xl border ${getAQIColor(data.category)} flex flex-col justify-between`}>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider opacity-80">Air Quality Index</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold">{data.aqi}</span>
              <span className="text-sm font-semibold">{data.category}</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1 text-[11px] opacity-90 border-t border-current/10 pt-2">
            <div>PM2.5: <span className="font-bold">{data.pm25}</span></div>
            <div>PM10: <span className="font-bold">{data.pm10}</span></div>
          </div>
        </div>

        {/* UV Index & Sun Protection */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>UV Index</span>
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-3xl font-extrabold text-amber-400">{data.uvIndex}</span>
              <span className="text-xs text-amber-300 font-medium">Very High</span>
            </div>
          </div>
          {/* UV Meter bar */}
          <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden mt-3">
            <div
              className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (data.uvIndex / 12) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pollen & Skin Comfort */}
      <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <p className="text-slate-400 text-[11px]">Tree Pollen</p>
          <p className="font-semibold text-emerald-400 mt-0.5">{data.pollen.tree}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <p className="text-slate-400 text-[11px]">Grass Pollen</p>
          <p className="font-semibold text-teal-400 mt-0.5">{data.pollen.grass}</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <p className="text-slate-400 text-[11px]">Allergy Risk</p>
          <p className="font-semibold text-amber-400 mt-0.5">{data.pollen.allergyRisk}</p>
        </div>
      </div>

      {/* Smart Health Recommendation */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start space-x-3">
        <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-300 leading-relaxed">{data.healthRecommendation}</p>
      </div>
    </div>
  );
}
