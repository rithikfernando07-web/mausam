// ─── User & Profile ───────────────────────────────────────────────────────────

export type PersonaType =
  | 'health'
  | 'fitness'
  | 'beach'
  | 'travel'
  | 'family'
  | 'farmer'
  | 'commuter'
  | 'event';

export type InterestType = PersonaType | 'general';

export interface Location {
  city: string;
  state: string;
  country: string;
  lat?: number;
  lon?: number;
}

export interface NotificationPrefs {
  severeWeather: boolean;
  rain: boolean;
  heat: boolean;
  airQuality: boolean;
  morningBriefing: boolean;
  eveningForecast: boolean;
  travel: boolean;
  workout: boolean;
  eventReminders: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  profilePic?: string;
  location: Location;
  selectedPersonas: PersonaType[];
  interests: InterestType[]; // Backwards compatibility helper
  favoriteLocations: Location[];
  temperatureUnit: 'C' | 'F';
  windSpeedUnit: 'km/h' | 'mph';
  language: string;
  notifications: NotificationPrefs;
  theme: 'dark' | 'light' | 'system';
  onboardingCompleted: boolean;
  pinnedWidgets?: string[];
  hiddenWidgets?: string[];
  customWidgetOrder?: string[];
}

// ─── Weather Data Models ───────────────────────────────────────────────────────

export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'overcast'
  | 'light-rain'
  | 'moderate-rain'
  | 'heavy-rain'
  | 'thunderstorm'
  | 'drizzle'
  | 'fog'
  | 'haze'
  | 'snow'
  | 'cyclone'
  | 'heatwave'
  | 'windy';

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  uvIndex: number;
  precipitation: number;
  sunrise: string;
  sunset: string;
  cloudCover: number;
  dewPoint: number;
  highTemp: number;
  lowTemp: number;
}

export interface HourlyForecast {
  time: string;
  hour: number;
  temperature: number;
  condition: WeatherCondition;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  minTemperature: number;
  maxTemperature: number;
  condition: WeatherCondition;
  description: string;
  rainProbability: number;
  sunrise: string;
  sunset: string;
  humidity: number;
  uvIndex: number;
}

export type AQICategory =
  | 'Good'
  | 'Satisfactory'
  | 'Moderate'
  | 'Poor'
  | 'Very Poor'
  | 'Severe';

export interface HealthData {
  aqi: number;
  pm25: number;
  pm10: number;
  category: AQICategory;
  healthRecommendation: string;
  pollen: {
    tree: 'Low' | 'Moderate' | 'High' | 'Very High';
    grass: 'Low' | 'Moderate' | 'High' | 'Very High';
    weed: 'Low' | 'Moderate' | 'High' | 'Very High';
    allergyRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  };
  uvIndex: number;
  uvRecommendation: string;
  humidity: number;
  skinComfort: string;
  healthScore: number; // 0-100
}

export interface FitnessData {
  bestRunningWindow: string; // e.g. "6:00 AM – 8:00 AM"
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  workoutComfortScore: number; // 0-100
  smartRecommendation: string;
  heatAlert: boolean;
  hourlyFitnessTimeline: { hour: string; comfort: number; temp: number }[];
}

export interface MarineData {
  waveHeight: number; // in meters e.g. 1.2
  waveDirection: string; // e.g. "SSW 210°"
  windSpeed: number;
  windDirection: string;
  waterTemperature: number; // e.g. 27°C
  uvIndex: number;
  tideTimes: {
    highTide: string; // e.g. "07:30 AM (1.4m)"
    lowTide: string;  // e.g. "01:45 PM (0.3m)"
    nextHighTide: string; // e.g. "08:15 PM (1.3m)"
  };
  safetyRating: 'SAFE' | 'CAUTION' | 'AVOID';
  bestBeachTime: string; // e.g. "4:00 PM – 6:30 PM"
  beachRecommendation: string;
}

export interface TripDestination {
  city: string;
  country: string;
  weatherCondition: WeatherCondition;
  temperature: number;
  rainProbability: number;
  severeAlert?: string;
  packingSuggestions: string[];
}

export interface FamilyCommuteData {
  morningWeather: {
    condition: WeatherCondition;
    temp: number;
    description: string;
  };
  recommendation: string; // "Carry umbrellas for children."
  schoolCommuteScore: number; // 0-100
  outdoorPlaySuitability: 'High' | 'Moderate' | 'Low' | 'Unfavorable';
  outdoorPlayNote: string; // "Possible rain after 5 PM."
  visibility: number;
  rainAlert: boolean;
  heatAlert: boolean;
  thunderstormAlert: boolean;
}

export interface AgriGardenData {
  soilMoisture: number; // % e.g. 42%
  rainfallForecast24h: number; // mm
  frostAlert: boolean;
  sunlightHours: number; // e.g. 7.5 hrs
  recommendation: string; // "Rain expected tomorrow. Delay watering."
  seasonalPlantingGuide: {
    crop: string;
    plantType: string;
    season: string;
    advice: string;
  }[];
}

export interface CommuterRiskData {
  visibility: number; // km
  rainIntensity: 'None' | 'Light' | 'Moderate' | 'Heavy' | 'Torrential';
  windSpeed: number;
  fogAlert: boolean;
  stormAlert: boolean;
  roadCondition: 'Dry' | 'Wet' | 'Slippery' | 'Hazardous';
  commuteRiskScore: 'LOW' | 'MODERATE' | 'HIGH';
  travelAdvice: string;
  weatherImpact: 'No delay' | 'Possible delays' | 'Major disruption';
}

export interface OutdoorEvent {
  id: string;
  eventName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  hourlyForecast: HourlyForecast[];
  rainProbability: number;
  temperature: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
  sunsetTime: string;
  comfortIndex: number; // 0-100
  eventWeatherScore: number; // 0-100
  recommendation: string;
  planBRecommendation: string;
}

export type AlertSeverity = 'INFO' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type AlertCategory = 'severe' | 'rain' | 'uv' | 'aqi' | 'wind' | 'fog';

export interface WeatherAlert {
  id: string;
  category: AlertCategory;
  type: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  startTime: string;
  endTime: string;
  affectedArea: string;
}

export interface GamificationData {
  streakDays: number;
  streakActive: boolean;
  unlockedBadges: {
    id: string;
    name: string;
    icon: string;
    unlocked: boolean;
    description: string;
  }[];
  weeklySummary: {
    sunnyDays: number;
    rainyDays: number;
    cloudyDays: number;
    totalDaysTracked: number;
  };
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  airQuality: HealthData;
  fitness: FitnessData;
  marine: MarineData;
  family: FamilyCommuteData;
  agri: AgriGardenData;
  commuter: CommuterRiskData;
  events: OutdoorEvent[];
  alerts: WeatherAlert[];
  destinations: TripDestination[];
  gamification: GamificationData;
  updatedAt: string;
}

// ─── Personalization Engine Types ─────────────────────────────────────────────

export type CardType =
  | 'current-weather'
  | 'insight'
  | 'health-dashboard'
  | 'fitness-dashboard'
  | 'beach-surfer'
  | 'trip-planner'
  | 'family-commute'
  | 'gardening-agri'
  | 'commuter-risk'
  | 'event-planner'
  | 'hourly-forecast'
  | 'daily-forecast'
  | 'gamification-streak';

export interface PersonalizationCard {
  id: string;
  type: CardType;
  title: string;
  score: number;
  reason: string; // e.g. "Prioritized for Health-Conscious persona"
  priority: number; // 1 = highest
}

export interface PersonalizationResult {
  cards: PersonalizationCard[];
  insights: string[];
  morningBriefing: string;
}

// ─── Demo & AI Assistant Types ────────────────────────────────────────────────

export type DemoScenario =
  | 'normal'
  | 'heavy-rain'
  | 'heatwave'
  | 'cyclone'
  | 'poor-aqi'
  | 'ideal-outdoor';

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
