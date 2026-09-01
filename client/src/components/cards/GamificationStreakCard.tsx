import React from 'react';
import type { GamificationData } from '../../types';
import { Flame, Award, Sun, CloudRain, Cloud, Sparkles } from 'lucide-react';

interface Props {
  data: GamificationData;
}

export default function GamificationStreakCard({ data }: Props) {
  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-orange-500/30 transition-all duration-300">
      {/* Header with Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 font-bold shadow-lg shadow-orange-500/20">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Weather Streak</h3>
            <p className="text-xs text-slate-400">Daily Forecast & Engagement</p>
          </div>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold flex items-center space-x-1.5 shadow-sm">
          <span>🔥 {data.streakDays} Day Streak!</span>
        </div>
      </div>

      {/* Badges Carousel / Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Unlocked Badges</span>
          <span className="text-orange-300 font-semibold flex items-center space-x-1">
            <Award className="w-3.5 h-3.5" />
            <span>{data.unlockedBadges.filter(b => b.unlocked).length}/{data.unlockedBadges.length}</span>
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {data.unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-2.5 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center ${
                badge.unlocked
                  ? 'bg-gradient-to-b from-white/10 to-white/5 border-amber-500/30 text-white shadow-sm'
                  : 'bg-white/5 border-white/5 opacity-40 grayscale'
              }`}
              title={badge.description}
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-[10px] font-semibold leading-tight line-clamp-1">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Weather Summary */}
      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-semibold">This Week's Weather Tracker</span>
          <span className="text-[11px] text-slate-400">{data.weeklySummary.totalDaysTracked} Days logged</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center space-x-1.5">
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="font-bold">{data.weeklySummary.sunnyDays} Sunny</span>
          </div>
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center justify-center space-x-1.5">
            <CloudRain className="w-4 h-4 text-blue-400" />
            <span className="font-bold">{data.weeklySummary.rainyDays} Rainy</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-500/10 border border-slate-500/20 text-slate-300 flex items-center justify-center space-x-1.5">
            <Cloud className="w-4 h-4 text-slate-400" />
            <span className="font-bold">{data.weeklySummary.cloudyDays} Cloudy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
