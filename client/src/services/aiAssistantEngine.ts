import type { UserProfile, WeatherData } from '../types';

export function queryMausamAI(query: string, user: UserProfile, weather: WeatherData | null): string {
  const q = query.toLowerCase().trim();
  if (!weather) return "Loading real-time atmospheric weather metrics... Please try again in a moment.";

  const city = weather.location.city;
  const temp = weather.current.temperature;
  const cond = weather.current.condition;
  const rainProb = weather.hourly[0]?.rainProbability || 20;

  // Question 1: Running / Fitness
  if (q.includes('run') || q.includes('workout') || q.includes('jog') || q.includes('exercise')) {
    return `🏃 **Fitness Recommendation for ${city}**:\n\n` +
      `Current Temp: ${temp}°C | Workout Comfort Score: ${weather.fitness.workoutComfortScore}/100\n` +
      `Best Time: **${weather.fitness.bestRunningWindow}**\n\n` +
      `💡 *Mausam Insight*: ${weather.fitness.smartRecommendation}`;
  }

  // Question 2: Umbrella / Rain
  if (q.includes('umbrella') || q.includes('rain') || q.includes('shower') || q.includes('coat')) {
    const willRain = rainProb > 40 || cond.includes('rain') || cond === 'thunderstorm';
    if (willRain) {
      return `☔ **Umbrella Advisory for ${city}**:\n\n` +
        `**Yes, carry an umbrella!** Rain probability is **${rainProb}%** with ${weather.current.description}.\n` +
        `Highest chance of rainfall is around late afternoon. Stay dry!`;
    } else {
      return `☀️ **Umbrella Advisory for ${city}**:\n\n` +
        `**No umbrella needed right now.** Rain chance is low (${rainProb}%). Skies are ${weather.current.description}. Enjoy the clear weather!`;
    }
  }

  // Question 3: Beach / Surf
  if (q.includes('beach') || q.includes('surf') || q.includes('swim') || q.includes('ocean') || q.includes('tide')) {
    return `🌊 **Beach & Surfing Status (${city})**:\n\n` +
      `Safety Rating: **${weather.marine.safetyRating}**\n` +
      `Wave Height: ${weather.marine.waveHeight}m | Water Temp: ${weather.marine.waterTemperature}°C\n` +
      `High Tide: ${weather.marine.tideTimes.highTide} | Low Tide: ${weather.marine.tideTimes.lowTide}\n\n` +
      `🏄 *Best Time to Visit*: **${weather.marine.bestBeachTime}**\n` +
      `💡 ${weather.marine.beachRecommendation}`;
  }

  // Question 4: Packing for London / Travel
  if (q.includes('london') || q.includes('pack') || q.includes('travel') || q.includes('trip') || q.includes('dubai') || q.includes('york')) {
    const targetDest = weather.destinations.find(d => q.includes(d.city.toLowerCase())) || weather.destinations[1]; // default London
    return `✈️ **Travel & Packing Guide for ${targetDest.city}**:\n\n` +
      `Forecast: **${targetDest.temperature}°C**, ${targetDest.weatherCondition}\n` +
      `Rain Chance: ${targetDest.rainProbability}%\n\n` +
      `🧳 **Smart Packing Suggestions**:\n` +
      targetDest.packingSuggestions.map(s => `- ${s}`).join('\n');
  }

  // Question 5: Outdoor Wedding / Event
  if (q.includes('wedding') || q.includes('event') || q.includes('party') || q.includes('outdoor plan')) {
    const ev = weather.events[0];
    if (ev) {
      return `🎉 **Event Weather Planner (${ev.eventName})**:\n\n` +
        `Event Suitability Score: **${ev.eventWeatherScore}/100**\n` +
        `Forecast during event: ${ev.temperature}°C, Rain Chance: ${ev.rainProbability}%, Sunset: ${ev.sunsetTime}\n\n` +
        `💡 *Recommendation*: ${ev.recommendation}\n` +
        `🛡️ *Plan B Backup*: ${ev.planBRecommendation}`;
    }
  }

  // Question 6: Air Quality / AQI / Pollen / Health
  if (q.includes('aqi') || q.includes('air') || q.includes('health') || q.includes('pollen') || q.includes('smog') || q.includes('pollution')) {
    return `🩺 **Health & Air Quality Overview (${city})**:\n\n` +
      `AQI: **${weather.airQuality.aqi} (${weather.airQuality.category})**\n` +
      `PM2.5: ${weather.airQuality.pm25} µg/m³ | PM10: ${weather.airQuality.pm10} µg/m³\n` +
      `Pollen Allergy Risk: ${weather.airQuality.pollen.allergyRisk}\n` +
      `Health Score: **${weather.airQuality.healthScore}/100**\n\n` +
      `💡 *Advice*: ${weather.airQuality.healthRecommendation}`;
  }

  // Question 7: Commute / Traffic
  if (q.includes('commute') || q.includes('traffic') || q.includes('drive') || q.includes('road')) {
    return `🚗 **Daily Commute Weather Status**:\n\n` +
      `Commute Risk: **${weather.commuter.commuteRiskScore}**\n` +
      `Visibility: ${weather.commuter.visibility} km | Road Condition: ${weather.commuter.roadCondition}\n` +
      `Traffic Impact: ${weather.commuter.weatherImpact}\n\n` +
      `💡 *Advice*: ${weather.commuter.travelAdvice}`;
  }

  // Default response analyzing current weather
  return `✨ **Mausam AI Response for ${city}**:\n\n` +
    `Currently in ${city}, it is **${temp}°C** with **${weather.current.description}**. Feels like ${weather.current.feelsLike}°C.\n` +
    `Humidity is at ${weather.current.humidity}% with winds blowing at ${weather.current.windSpeed} km/h.\n\n` +
    `Based on your active personas (${user.selectedPersonas.join(', ')}), ${weather.fitness.smartRecommendation}`;
}
