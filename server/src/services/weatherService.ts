import { CITY_BASE_WEATHER } from '../data/mockWeatherData.js';

export interface IWeatherService {
  getWeatherData(city: string, scenario?: string): Promise<any>;
}

export class MockWeatherService implements IWeatherService {
  async getWeatherData(city: string, scenario: string = 'normal'): Promise<any> {
    const cityKey = city.toLowerCase().replace(/\s+/g, '');
    const base = CITY_BASE_WEATHER[cityKey] || CITY_BASE_WEATHER['chennai'];
    
    // Construct realistic hourly and daily forecasts
    const now = new Date();
    const hourly = [];
    for (let i = 0; i < 24; i++) {
      const h = new Date(now);
      h.setHours(now.getHours() + i, 0, 0, 0);
      const hourNum = h.getHours();
      hourly.push({
        time: h.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
        hour: hourNum,
        temperature: base.current.temperature + (hourNum > 12 && hourNum < 16 ? 3 : -2),
        condition: base.current.condition,
        rainProbability: scenario === 'heavy-rain' ? 90 : 25,
        humidity: base.current.humidity,
        windSpeed: base.current.windSpeed,
      });
    }

    const daily = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date().getDay() + i) % 7],
      minTemperature: base.current.temperature - 5,
      maxTemperature: base.current.temperature + 4,
      condition: base.current.condition,
      description: base.current.description,
      rainProbability: scenario === 'heavy-rain' ? 85 : 20,
      sunrise: base.current.sunrise,
      sunset: base.current.sunset,
      humidity: base.current.humidity,
      uvIndex: base.current.uvIndex,
    }));

    return {
      location: base.location,
      current: base.current,
      hourly,
      daily,
      airQuality: base.airQuality,
      alerts: scenario === 'heavy-rain' ? [{
        id: 'alert-1',
        type: 'Heavy Rain',
        title: 'Heavy Rainfall Warning',
        description: 'Heavy to very heavy rainfall expected in the area.',
        severity: 'HIGH',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 6 * 3600000).toISOString(),
        affectedArea: base.location.city,
      }] : [],
      updatedAt: new Date().toISOString(),
    };
  }
}

// Extensible factory for live API integration
export class RealWeatherService implements IWeatherService {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeatherData(city: string, scenario?: string): Promise<any> {
    // Interface placeholder for real OpenWeather / IMD API call
    throw new Error('Real weather API key not configured. Using MockWeatherService fallback.');
  }
}

export const weatherService = new MockWeatherService();
