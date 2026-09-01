import React from 'react';
import type { FamilyCommuteData } from '../../types';
import { Users, Umbrella, CloudRain, Sun, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  data: FamilyCommuteData;
}

export default function FamilyCommuteCard({ data }: Props) {
  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-pink-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-slate-950 font-bold shadow-lg shadow-pink-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">School Commute & Family</h3>
            <p className="text-xs text-slate-400">Kids Safety & Play Index</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold">
          Score {data.schoolCommuteScore}/100
        </div>
      </div>

      {/* School Commute Conditions Widget */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium uppercase tracking-wider">Morning Commute Window</span>
          <span className="text-pink-300 font-semibold">{data.morningWeather.temp}°C</span>
        </div>
        <div className="flex items-center space-x-2 text-white font-bold text-lg">
          <CloudRain className="w-5 h-5 text-blue-400" />
          <span>{data.morningWeather.description}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center space-x-2 text-xs text-pink-200">
          <Umbrella className="w-4 h-4 text-pink-400 shrink-0" />
          <span>{data.recommendation}</span>
        </div>
      </div>

      {/* Outdoor Play Suitability */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Outdoor Play</span>
          <p className="text-lg font-bold text-amber-400">{data.outdoorPlaySuitability}</p>
          <p className="text-[11px] text-slate-400 leading-tight">{data.outdoorPlayNote}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Road Visibility</span>
          <p className="text-lg font-bold text-emerald-400">{data.visibility} km</p>
          <p className="text-[11px] text-emerald-300 font-medium">Clear road conditions</p>
        </div>
      </div>
    </div>
  );
}
