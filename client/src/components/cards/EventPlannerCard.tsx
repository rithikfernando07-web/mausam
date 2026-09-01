import React, { useState } from 'react';
import type { OutdoorEvent } from '../../types';
import { CalendarDays, Clock, MapPin, Sparkles, AlertCircle, CheckCircle2, Plus } from 'lucide-react';

interface Props {
  events: OutdoorEvent[];
}

export default function EventPlannerCard({ events }: Props) {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [customEvents, setCustomEvents] = useState<OutdoorEvent[]>(events);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-12-15');
  const [newEventStart, setNewEventStart] = useState('04:00 PM');
  const [newEventEnd, setNewEventEnd] = useState('09:00 PM');

  const currentEvent = customEvents[activeEventIndex] || customEvents[0];

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName.trim()) return;

    const created: OutdoorEvent = {
      id: `evt-${Date.now()}`,
      eventName: newEventName,
      location: currentEvent?.location || 'Chennai',
      date: newEventDate,
      startTime: newEventStart,
      endTime: newEventEnd,
      hourlyForecast: currentEvent?.hourlyForecast || [],
      rainProbability: 25,
      temperature: 28,
      windSpeed: 12,
      humidity: 65,
      uvIndex: 4,
      sunsetTime: '06:12 PM',
      comfortIndex: 88,
      eventWeatherScore: 89,
      recommendation: 'Good weather expected for the event window. Mild humidity.',
      planBRecommendation: 'Keep an indoor transition ready in case of unexpected evening drizzle.',
    };

    setCustomEvents([...customEvents, created]);
    setActiveEventIndex(customEvents.length);
    setNewEventName('');
    setShowAddEvent(false);
  };

  if (!currentEvent) return null;

  return (
    <div className="glass-card rounded-3xl p-5 border border-white/10 shadow-xl space-y-4 hover:border-amber-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Event Weather Planner</h3>
            <p className="text-xs text-slate-400">Suitability Index & Forecast</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Score {currentEvent.eventWeatherScore}/100</span>
        </div>
      </div>

      {/* Event Selector / Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {customEvents.map((evt, idx) => (
          <button
            key={evt.id}
            onClick={() => setActiveEventIndex(idx)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              activeEventIndex === idx
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 font-bold scale-105'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            🎉 {evt.eventName}
          </button>
        ))}
        <button
          onClick={() => setShowAddEvent(!showAddEvent)}
          className="px-2.5 py-1.5 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-amber-500/20 hover:text-amber-300 transition-all flex items-center space-x-1 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Add Event Form Modal */}
      {showAddEvent && (
        <form onSubmit={handleAddEvent} className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/30 space-y-3">
          <div className="text-xs font-semibold text-amber-300">Plan New Outdoor Event</div>
          <input
            type="text"
            placeholder="Event Name (e.g. Birthday Lawn Party)"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            required
          />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Date</label>
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Start Time</label>
              <input
                type="text"
                value={newEventStart}
                onChange={(e) => setNewEventStart(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">End Time</label>
              <input
                type="text"
                value={newEventEnd}
                onChange={(e) => setNewEventEnd(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddEvent(false)}
              className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-400 text-xs hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
            >
              Calculate Weather
            </button>
          </div>
        </form>
      )}

      {/* Main Event Card Body */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-slate-950 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-white">{currentEvent.eventName}</h4>
            <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{currentEvent.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{currentEvent.startTime} – {currentEvent.endTime}</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">Suitability</span>
            <span className="text-xl font-black text-amber-300">
              {currentEvent.eventWeatherScore >= 80 ? 'EXCELLENT' : currentEvent.eventWeatherScore >= 60 ? 'GOOD' : 'POOR'}
            </span>
          </div>
        </div>

        {/* 4 Factor Grid */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-slate-400 text-[10px] block">Temp</span>
            <span className="font-bold text-white text-sm">{currentEvent.temperature}°C</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-slate-400 text-[10px] block">Rain Prob</span>
            <span className="font-bold text-amber-300 text-sm">{currentEvent.rainProbability}%</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-slate-400 text-[10px] block">Wind</span>
            <span className="font-bold text-white text-sm">{currentEvent.windSpeed} km/h</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-slate-400 text-[10px] block">Sunset</span>
            <span className="font-bold text-amber-400 text-sm">{currentEvent.sunsetTime}</span>
          </div>
        </div>

        {/* Recommendation */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-start space-x-2 text-xs text-slate-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{currentEvent.recommendation}</span>
        </div>

        {/* Plan B Recommendation */}
        {currentEvent.planBRecommendation && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-2 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-300 mb-0.5">Plan B Contingency</span>
              <span>{currentEvent.planBRecommendation}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
