import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import type { CardType } from '../types';

import MorningBriefingCard from '../components/cards/MorningBriefingCard';
import CurrentWeatherCard from '../components/cards/CurrentWeatherCard';
import InsightCard from '../components/cards/InsightCard';
import HealthDashboardCard from '../components/cards/HealthDashboardCard';
import FitnessDashboardCard from '../components/cards/FitnessDashboardCard';
import BeachSurferCard from '../components/cards/BeachSurferCard';
import TripPlannerCard from '../components/cards/TripPlannerCard';
import FamilyCommuteCard from '../components/cards/FamilyCommuteCard';
import GardeningAgriCard from '../components/cards/GardeningAgriCard';
import CommuterRiskCard from '../components/cards/CommuterRiskCard';
import EventPlannerCard from '../components/cards/EventPlannerCard';
import GamificationStreakCard from '../components/cards/GamificationStreakCard';
import HourlyForecastCard from '../components/cards/HourlyForecastCard';
import DailyForecastCard from '../components/cards/DailyForecastCard';
import AlertCard from '../components/cards/AlertCard';
import WeatherDetailModal from '../components/cards/WeatherDetailModal';
import EditDashboardModal from '../components/cards/EditDashboardModal';

import { MapPin, SlidersHorizontal, ChevronDown, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/mockData';

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in p-2">
      <div className="skeleton h-10 w-48 rounded-xl" />
      <div className="skeleton h-64 rounded-3xl" />
      <div className="skeleton h-24 rounded-2xl" />
      <div className="grid grid-cols-2 gap-3">
        <div className="skeleton h-40 rounded-3xl" />
        <div className="skeleton h-40 rounded-3xl" />
      </div>
      <div className="skeleton h-48 rounded-3xl" />
    </div>
  );
}

export default function Home() {
  const { personalization, weather, user, setUser, isLoading, demoMode, activeCity, setActiveCity, refreshWeather } = useApp();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditDashboard, setShowEditDashboard] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  if (isLoading || !weather || !personalization) {
    return <LoadingSkeleton />;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Build dynamic card renderer map
  const CARD_RENDERER: Record<CardType, (reason: string) => React.ReactNode> = {
    'morning-briefing': () => <MorningBriefingCard key="morning-briefing" />,
    'current-weather': () => (
      <div key="current-weather" onClick={() => setShowDetailModal(true)} className="cursor-pointer group">
        <div className="relative">
          <CurrentWeatherCard />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full border border-white/20 flex items-center space-x-1">
            <BarChart2 className="w-3 h-3 text-sky-400" />
            <span>View Deep Metrics</span>
          </div>
        </div>
      </div>
    ),
    'insight': () => <InsightCard key="insight" />,
    'health-dashboard': () => <HealthDashboardCard key="health-dashboard" data={weather.airQuality} />,
    'fitness-dashboard': () => <FitnessDashboardCard key="fitness-dashboard" data={weather.fitness} />,
    'beach-surfer': () => <BeachSurferCard key="beach-surfer" data={weather.marine} />,
    'trip-planner': () => <TripPlannerCard key="trip-planner" destinations={weather.destinations} />,
    'family-commute': () => <FamilyCommuteCard key="family-commute" data={weather.family} />,
    'gardening-agri': () => <GardeningAgriCard key="gardening-agri" data={weather.agri} />,
    'commuter-risk': () => <CommuterRiskCard key="commuter-risk" data={weather.commuter} />,
    'event-planner': () => <EventPlannerCard key="event-planner" events={weather.events} />,
    'gamification-streak': () => <GamificationStreakCard key="gamification-streak" data={weather.gamification} />,
    'hourly-forecast': (reason) => <HourlyForecastCard key="hourly" reason={reason} />,
    'daily-forecast': (reason) => <DailyForecastCard key="daily" reason={reason} />,
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Top Header: Greeting + Location Selector + Customize Button */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-bold font-display text-white flex items-center space-x-1.5">
            <span>{getGreeting()}, {user.name}</span>
            <span>👋</span>
          </h1>

          {/* Location Selector Dropdown */}
          <div className="relative mt-0.5">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white transition-colors bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold">{weather.location.city}, {weather.location.state}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showCityDropdown && (
              <div className="absolute top-8 left-0 z-30 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-2xl space-y-1">
                {POPULAR_LOCATIONS.map((loc) => (
                  <button
                    key={loc.city}
                    onClick={() => {
                      setActiveCity(loc.city);
                      setShowCityDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      activeCity === loc.city
                        ? 'bg-sky-500/20 text-sky-300 font-bold'
                        : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{loc.city}</span>
                    <span className="text-[10px] text-slate-400">{loc.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Refresh & Customize */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => refreshWeather()}
            className="p-2 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            title="Refresh Weather Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowEditDashboard(true)}
            className="px-3 py-2 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-300 font-semibold text-xs flex items-center space-x-1.5 hover:bg-sky-500/25 transition-all shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>
      </div>

      {/* Demo Mode Indicator */}
      {demoMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/15 border border-amber-500/30 rounded-2xl p-3 flex items-center justify-between shadow-lg shadow-amber-500/5"
        >
          <div className="flex items-center space-x-2">
            <span className="text-amber-400 text-sm">⚡</span>
            <span className="text-amber-300 text-xs font-semibold">
              Live Personalization Demo Active ({user.selectedPersonas?.join(', ') || 'Custom'})
            </span>
          </div>
          <button
            onClick={() => setShowEditDashboard(true)}
            className="text-[11px] font-bold text-amber-300 underline"
          >
            Edit
          </button>
        </motion.div>
      )}

      {/* Render Cards in Personalization Priority Order */}
      <div className="space-y-4">
        {personalization.cards.map((card) => {
          const renderer = CARD_RENDERER[card.type];
          if (!renderer) return null;
          return renderer(card.reason);
        })}
      </div>

      {/* Weather Detail Modal */}
      <WeatherDetailModal
        weather={weather}
        user={user}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />

      {/* Edit Dashboard Modal */}
      <EditDashboardModal
        user={user}
        cards={personalization.cards}
        isOpen={showEditDashboard}
        onClose={() => setShowEditDashboard(false)}
        onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
      />
    </div>
  );
}
