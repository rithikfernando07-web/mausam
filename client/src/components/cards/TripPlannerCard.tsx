import React, { useState } from 'react';
import type { TripDestination } from '../../types';
import { Plane, Calendar, Luggage, CloudRain, AlertTriangle, ChevronRight } from 'lucide-react';

interface Props {
  destinations: TripDestination[];
}

export default function TripPlannerCard({ destinations }: Props) {
  const [selectedCity, setSelectedCity] = useState(destinations[1]?.city || 'London');
  const [travelDate, setTravelDate] = useState('2026-09-10');

  const activeDest = destinations.find(d => d.city === selectedCity) || destinations[0];

  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-purple-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-bold shadow-lg shadow-purple-500/20">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Trip Weather Planner</h3>
            <p className="text-xs text-slate-400">Saved Destinations & Packing</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{travelDate}</span>
        </div>
      </div>

      {/* Destination Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {destinations.map(d => (
          <button
            key={d.city}
            onClick={() => setSelectedCity(d.city)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCity === d.city
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30 scale-105'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            📍 {d.city} ({d.temperature}°C)
          </button>
        ))}
      </div>

      {/* Active Destination Forecast Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-purple-950/40 border border-purple-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-purple-300 uppercase tracking-wider font-semibold">Destination Forecast</span>
            <h4 className="text-xl font-bold text-white mt-0.5">{activeDest.city}, {activeDest.country}</h4>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-purple-300">{activeDest.temperature}°C</span>
            <p className="text-[11px] text-slate-400 font-medium">Rain prob: {activeDest.rainProbability}%</p>
          </div>
        </div>

        {activeDest.severeAlert && (
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Severe Advisory: {activeDest.severeAlert}</span>
          </div>
        )}

        {/* Automatic Packing Suggestions */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-semibold">
            <Luggage className="w-3.5 h-3.5 text-purple-400" />
            <span>Automatic Packing Recommendations</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {activeDest.packingSuggestions.map((item, idx) => (
              <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 flex items-center justify-between">
                <span>{item}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
