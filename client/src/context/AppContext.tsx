import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { UserProfile, WeatherData, DemoScenario, DemoUserType, InterestType, PersonalizationResult } from '../types';
import { buildWeatherData } from '../data/mockData';
import { computePersonalization } from '../services/personalizationEngine';

// ─── Default User ─────────────────────────────────────────────────────────────

const DEFAULT_USER: UserProfile = {
  id: 'demo-user',
  name: 'Rithik',
  email: 'rithik@example.com',
  location: { city: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 },
  interests: ['fitness', 'outdoor'],
  favoriteLocations: [
    { city: 'Bengaluru', state: 'Karnataka', country: 'India' },
    { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
  ],
  temperatureUnit: 'C',
  language: 'en',
  notifications: {
    severeWeather: true,
    rain: true,
    heat: true,
    airQuality: false,
    morningBriefing: true,
    eveningForecast: false,
    travel: false,
  },
  theme: 'dark',
  onboardingCompleted: false,
};

// ─── User-type interest map (for Demo Mode) ────────────────────────────────────

export const DEMO_USER_INTERESTS: Record<DemoUserType, InterestType[]> = {
  fitness: ['fitness', 'health', 'outdoor'],
  traveler: ['travel', 'general'],
  commuter: ['commuting', 'general'],
  farmer: ['agriculture', 'general'],
  photographer: ['photography', 'outdoor'],
  outdoor: ['outdoor', 'sports', 'fitness'],
};

// ─── Context types ────────────────────────────────────────────────────────────

interface AppContextValue {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserField: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;

  weather: WeatherData | null;
  refreshWeather: (city?: string) => void;

  personalization: PersonalizationResult | null;

  theme: 'dark' | 'light';
  toggleTheme: () => void;

  demoMode: boolean;
  setDemoMode: (v: boolean) => void;
  demoScenario: DemoScenario;
  setDemoScenario: (s: DemoScenario) => void;
  demoUserType: DemoUserType;
  setDemoUserType: (t: DemoUserType) => void;

  activeCity: string;
  setActiveCity: (city: string) => void;

  isLoading: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mausam_user');
      return saved ? { ...DEFAULT_USER, ...JSON.parse(saved) } : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('mausam_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (user.theme === 'light') return 'light';
    return 'dark';
  });

  const [demoMode, setDemoMode] = useState(false);
  const [demoScenario, setDemoScenario] = useState<DemoScenario>('normal');
  const [demoUserType, setDemoUserType] = useState<DemoUserType>('fitness');
  const [activeCity, setActiveCity] = useState(user.location.city);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [personalization, setPersonalization] = useState<PersonalizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Persist user to localStorage
  useEffect(() => {
    localStorage.setItem('mausam_user', JSON.stringify(user));
  }, [user]);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('mausam_theme', theme);
  }, [theme]);

  const updateUserField = useCallback(<K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setUser(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const refreshWeather = useCallback((city?: string) => {
    setIsLoading(true);
    const targetCity = city ?? activeCity;

    // Determine effective interests for demo mode
    const effectiveInterests = demoMode
      ? DEMO_USER_INTERESTS[demoUserType]
      : user.interests;
    const effectiveUser = { ...user, interests: effectiveInterests };

    // Simulate async fetch
    setTimeout(() => {
      const data = buildWeatherData(targetCity, demoMode ? demoScenario : 'normal');
      setWeather(data);
      setPersonalization(computePersonalization(effectiveUser, data));
      setIsLoading(false);
    }, 400);
  }, [activeCity, demoMode, demoScenario, demoUserType, user]);

  // Refresh when city, scenario, or user type changes
  useEffect(() => {
    refreshWeather(activeCity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCity, demoMode, demoScenario, demoUserType, user.interests]);

  // Update city when user location changes
  useEffect(() => {
    setActiveCity(user.location.city);
  }, [user.location.city]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        updateUserField,
        weather,
        refreshWeather,
        personalization,
        theme,
        toggleTheme,
        demoMode,
        setDemoMode,
        demoScenario,
        setDemoScenario,
        demoUserType,
        setDemoUserType,
        activeCity,
        setActiveCity,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
