import React from 'react';
import type { FitnessData } from '../../types';
import { Activity, Clock, Wind, Droplets, Flame, CheckCircle2 } from 'lucide-react';

interface Props {
  data: FitnessData;
}

export default function FitnessDashboardCard({ data }: Props) {
  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-cyan-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Outdoor Fitness</h3>
            <p className="text-xs text-slate-400">Workout Window & Comfort</p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold flex items-center space-x-1">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Comfort {data.workoutComfortScore}/100</span>
        </div>
      </div>

      {/* Best Running Time Highlight */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent border border-cyan-500/20 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1.5 text-xs text-cyan-300 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>BEST RUNNING WINDOW</span>
          </div>
          <p className="text-xl font-bold text-white mt-1">{data.bestRunningWindow}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Temp</span>
          <p className="text-lg font-bold text-cyan-300">{data.temperature}°C</p>
        </div>
      </div>

      {/* Fitness Weather Factors */}
      <div className="grid grid-cols-3 gap-2.5 text-xs">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
          <Droplets className="w-4 h-4 text-blue-400 mb-1" />
          <span className="text-slate-400 text-[11px]">Humidity</span>
          <span className="font-semibold text-white mt-0.5">{data.humidity}%</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
          <Wind className="w-4 h-4 text-teal-400 mb-1" />
          <span className="text-slate-400 text-[11px]">Wind Speed</span>
          <span className="font-semibold text-white mt-0.5">{data.windSpeed} km/h</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
          <Droplets className="w-4 h-4 text-indigo-400 mb-1" />
          <span className="text-slate-400 text-[11px]">Rain Chance</span>
          <span className="font-semibold text-white mt-0.5">{data.rainProbability}%</span>
        </div>
      </div>

      {/* Hourly Comfort Bar Chart */}
      <div className="space-y-1.5 pt-1">
        <p className="text-xs text-slate-400 font-medium">Hourly Comfort Trend</p>
        <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
          {data.hourlyFitnessTimeline.map((item, idx) => (
            <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-slate-400 block">{item.hour}</span>
              <span className="font-bold text-cyan-300 block">{item.temp}°C</span>
              <div className="w-full bg-slate-700/50 rounded-full h-1">
                <div
                  className="bg-cyan-400 h-full rounded-full"
                  style={{ width: `${item.comfort}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Outdoor Recommendation */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start space-x-3">
        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-300 leading-relaxed">{data.smartRecommendation}</p>
      </div>
    </div>
  );
}
