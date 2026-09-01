/**
 * Rule-based Mausam Weather AI Assistant Engine
 * Responds to natural language queries using real-time weather & persona context.
 */

import type { WeatherData, UserProfile } from '../types';

export interface AssistantResponse {
  text: string;
  suggestions?: string[];
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, '');
}

export function processAssistantQuery(
  query: string,
  weather: WeatherData,
  user: UserProfile
): AssistantResponse {
  const q = normalize(query);
  const { current, airQuality, marine, destinations, events, daily, hourly, location } = weather;
  const maxRain = Math.max(...hourly.map(h => h.rainProbability));
  const tomorrow = daily[1];

  // ── 1. Beach / Surfing queries ──────────────────────────────────────────
  if (/beach|surf|wave|ocean|swimming|sea|tide/.test(q)) {
    if (marine.safetyRating === 'AVOID') {
      return {
        text: `🌊 Ocean Alert: Beach conditions in ${location.city} are rated AVOID today. Wave height is ${marine.waveHeight}m with rough sea chop. It is NOT safe for swimming or surfing.`,
        suggestions: ['When is next safe beach time?', 'What is the wind speed?'],
      };
    }
    return {
      text: `🏄 Beach & Surfing Outlook: Beach conditions are ${marine.safetyRating}. Wave height is ${marine.waveHeight}m from ${marine.waveDirection}, water temperature is ${marine.waterTemperature}°C. Best time to visit: ${marine.bestBeachTime}. Low tide at ${marine.tideTimes.lowTide}.`,
      suggestions: ['What is the UV index at the beach?', 'Tide timings today?'],
    };
  }

  // ── 2. Travel & Packing queries (e.g. "What should I pack for London?") ──
  if (/pack|packing|travel|trip|london|dubai|new york/.test(q)) {
    const dest = destinations.find(d => q.includes(d.city.toLowerCase())) || destinations[1]; // default London
    return {
      text: `✈️ Packing for ${dest.city}: Current temp is ${dest.temperature}°C with ${dest.rainProbability}% rain probability (${dest.weatherCondition.replace(/-/g, ' ')}). Packing suggestions: ${dest.packingSuggestions.join(', ')}. ${dest.severeAlert ? `⚠️ Note: ${dest.severeAlert}` : ''}`,
      suggestions: ['What about Dubai weather?', 'Weather in New York?'],
    };
  }

  // ── 3. Event Planning queries (e.g. "Is tomorrow good for an outdoor wedding?") ─
  if (/wedding|event|party|outdoor gathering|reception|function/.test(q)) {
    const firstEvent = events[0];
    const score = firstEvent ? firstEvent.eventWeatherScore : 88;
    const rainChance = firstEvent ? firstEvent.rainProbability : tomorrow?.rainProbability || 20;

    if (rainChance > 50) {
      return {
        text: `⚠️ Event Weather Advisory: Rain probability is elevated (${rainChance}%). Event Weather Suitability Score: ${score}/100. Plan B Recommendation: Have covered tents or an indoor backup banquet hall ready!`,
        suggestions: ['Hourly forecast for the evening?', 'Wind speed during event?'],
      };
    }
    return {
      text: `🎉 Great News! Weather suitability for an outdoor event in ${location.city} is ${score}/100 (EXCELLENT). Expected temperature is ~${current.temperature - 2}°C, wind is ${current.windSpeed} km/h, and rain chance is low (${rainChance}%). Sunset around ${current.sunset}.`,
      suggestions: ['What is the humidity level?', 'Should I prepare Plan B?'],
    };
  }

  // ── 4. Running & Fitness queries (e.g. "Can I go running this evening?") ──
  if (/running|run|fitness|jog|exercise|workout|jogging/.test(q)) {
    const bestTime = weather.fitness.bestRunningWindow;
    const comfort = weather.fitness.workoutComfortScore;

    if (/evening|tonight/.test(q)) {
      return {
        text: `🏃 Evening Workout: Temperature will cool down to around ${current.temperature - 3}°C. ${maxRain > 50 ? '⚠️ Keep an eye on rain clouds.' : 'Conditions will be pleasant with comfort score 85/100.'} Stay hydrated!`,
        suggestions: ['Best morning running window?', 'Current AQI level?'],
      };
    }

    return {
      text: `🏃 Fitness Recommendation: ${weather.fitness.smartRecommendation} Best running window today: ${bestTime}. Workout Comfort Score: ${comfort}/100. Humidity: ${weather.fitness.humidity}%.`,
      suggestions: ['Can I go running this evening?', 'How is the air quality?'],
    };
  }

  // ── 5. Umbrella & Rain queries ──────────────────────────────────────────
  if (/umbrella|rain|raincoat|wet|shower|downpour/.test(q)) {
    if (maxRain > 60) {
      return {
        text: `☔ Yes, definitely carry an umbrella! Rain probability reaches ${maxRain}% today in ${location.city}, with afternoon downpours likely.`,
        suggestions: ['When will rain start?', 'Commute risk today?'],
      };
    }
    if (maxRain > 30) {
      return {
        text: `🌂 Light to moderate rain is possible (${maxRain}% chance). Carrying a compact umbrella is recommended just in case!`,
        suggestions: ['Is it safe to run outdoors?', 'Tomorrow rain forecast?'],
      };
    }
    return {
      text: `☀️ Rain probability is low today (${maxRain}%). You likely won't need an umbrella. Enjoy the clear skies!`,
      suggestions: ['What is the UV index?', 'What is the temperature?'],
    };
  }

  // ── 6. Commute & Traffic queries ────────────────────────────────────────
  if (/commute|traffic|drive|road|visibility|office/.test(q)) {
    return {
      text: `🚗 Commute Risk: ${weather.commuter.commuteRiskScore} Risk. Traffic Impact: ${weather.commuter.weatherImpact}. ${weather.commuter.travelAdvice} Road condition is ${weather.commuter.roadCondition}, visibility ${weather.commuter.visibility} km.`,
      suggestions: ['Will rain affect evening commute?', 'Should I take umbrella?'],
    };
  }

  // ── 7. Air Quality & UV queries ────────────────────────────────────────
  if (/aqi|air quality|pm25|pollution|smog|uv|sunscreen/.test(q)) {
    return {
      text: `🌫️ Air Quality Index in ${location.city} is ${airQuality.aqi} (${airQuality.category}). PM2.5: ${airQuality.pm25} μg/m³. UV Index is ${airQuality.uvIndex} (Very High). Health Advice: ${airQuality.healthRecommendation} ${airQuality.uvRecommendation}`,
      suggestions: ['Is it safe for outdoor sports?', 'Pollen allergy risk?'],
    };
  }

  // ── 8. Gardening & Farming queries ──────────────────────────────────────
  if (/plant|garden|gardening|soil|crop|water plants/.test(q)) {
    return {
      text: `🌱 Gardening Advisor: Soil moisture is at ${weather.agri.soilMoisture}%. ${weather.agri.recommendation} Sunlight forecast: ${weather.agri.sunlightHours} hrs.`,
      suggestions: ['Seasonal planting recommendations?', 'Rain forecast for 24h?'],
    };
  }

  // ── Fallback General Response ──────────────────────────────────────────
  return {
    text: `Hi ${user.name}! In ${location.city}, it is currently ${current.temperature}°C (${current.description}) with AQI ${airQuality.aqi}. Ask me anything about running times, umbrella necessity, beach conditions, trip packing, or event planning!`,
    suggestions: [
      'Can I go running this evening?',
      'Should I carry an umbrella?',
      'Is it safe to go to the beach tomorrow?',
      'What should I pack for London?',
      'Is tomorrow good for an outdoor wedding?',
    ],
  };
}

export const QUICK_QUESTIONS = [
  'Can I go running this evening?',
  'Should I carry an umbrella?',
  'Is it safe to go to the beach tomorrow?',
  'What should I pack for London?',
  'Is tomorrow good for an outdoor wedding?',
];
