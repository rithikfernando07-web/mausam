import type { WeatherData, DemoScenario, Location } from '../types';

export const POPULAR_LOCATIONS: Location[] = [
  { city: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 },
  { city: 'London', state: 'Greater London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  { city: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
  { city: 'New York', state: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
  { city: 'Bengaluru', state: 'Karnataka', country: 'India', lat: 12.9716, lon: 77.5946 },
  { city: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.0760, lon: 72.8777 },
];

export function buildWeatherData(cityName = 'Chennai', scenario: DemoScenario = 'normal'): WeatherData {
  const isRainScenario = scenario === 'heavy-rain';
  const isHeatScenario = scenario === 'heatwave';
  const isPoorAQIScenario = scenario === 'poor-aqi';
  const isIdealScenario = scenario === 'ideal-outdoor';
  const isCyclone = scenario === 'cyclone';

  // Base temps & condition based on scenario & city
  let temp = 32;
  let condition: WeatherData['current']['condition'] = 'partly-cloudy';
  let desc = 'Partly Cloudy';
  let humidity = 82;
  let windSpeed = 14;
  let aqiVal = 78;
  let rainProb = 20;

  if (cityName === 'London') {
    temp = 18;
    condition = 'light-rain';
    desc = 'Light Rain Shower';
    humidity = 88;
    windSpeed = 18;
    aqiVal = 42;
    rainProb = 75;
  } else if (cityName === 'Dubai') {
    temp = 41;
    condition = 'clear';
    desc = 'Hot & Sunny';
    humidity = 45;
    windSpeed = 12;
    aqiVal = 115;
    rainProb = 5;
  } else if (cityName === 'New York') {
    temp = 24;
    condition = 'clear';
    desc = 'Pleasant & Sunny';
    humidity = 58;
    windSpeed = 15;
    aqiVal = 55;
    rainProb = 10;
  }

  // Scenario overrides
  if (isRainScenario) {
    temp = 26;
    condition = 'heavy-rain';
    desc = 'Torrential Downpour';
    humidity = 95;
    windSpeed = 28;
    rainProb = 95;
  } else if (isHeatScenario) {
    temp = 43;
    condition = 'heatwave';
    desc = 'Extreme Heatwave Warning';
    humidity = 35;
    windSpeed = 8;
    rainProb = 0;
  } else if (isPoorAQIScenario) {
    condition = 'haze';
    desc = 'Heavy Smog & Haze';
    aqiVal = 285;
  } else if (isIdealScenario) {
    temp = 25;
    condition = 'clear';
    desc = 'Ideal Clear Sky';
    humidity = 55;
    windSpeed = 10;
    aqiVal = 35;
    rainProb = 0;
  } else if (isCyclone) {
    temp = 27;
    condition = 'cyclone';
    desc = 'Severe Cyclonic Storm Alert';
    humidity = 98;
    windSpeed = 65;
    rainProb = 100;
  }

  const feelsLike = temp > 35 ? temp + 4 : temp < 15 ? temp - 2 : temp + 2;

  // Hourly mock
  const hours = [
    { hourLabel: '6 AM', temp: temp - 4, cond: 'clear' as const, rain: 5 },
    { hourLabel: '8 AM', temp: temp - 2, cond: 'partly-cloudy' as const, rain: 10 },
    { hourLabel: '10 AM', temp: temp, cond: condition, rain: rainProb },
    { hourLabel: '12 PM', temp: temp + 2, cond: condition, rain: rainProb + 10 },
    { hourLabel: '2 PM', temp: temp + 3, cond: condition, rain: rainProb },
    { hourLabel: '4 PM', temp: temp + 1, cond: 'cloudy' as const, rain: Math.min(100, rainProb + 20) },
    { hourLabel: '6 PM', temp: temp - 1, cond: 'light-rain' as const, rain: Math.min(100, rainProb + 30) },
    { hourLabel: '8 PM', temp: temp - 3, cond: 'partly-cloudy' as const, rain: 20 },
    { hourLabel: '10 PM', temp: temp - 4, cond: 'clear' as const, rain: 10 },
  ];

  const hourlyForecast = hours.map((h, idx) => ({
    time: h.hourLabel,
    hour: 6 + idx * 2,
    temperature: h.temp,
    condition: h.cond,
    rainProbability: h.rain,
    humidity: Math.min(99, humidity + (idx % 3 === 0 ? 5 : -5)),
    windSpeed: windSpeed + (idx % 2 === 0 ? 2 : -2),
  }));

  // Daily 7-day mock
  const days = [
    { dayName: 'Today', min: temp - 4, max: temp + 2, cond: condition, rain: rainProb },
    { dayName: 'Wed', min: temp - 5, max: temp + 1, cond: 'partly-cloudy' as const, rain: 30 },
    { dayName: 'Thu', min: temp - 4, max: temp + 3, cond: 'clear' as const, rain: 10 },
    { dayName: 'Fri', min: temp - 3, max: temp + 4, cond: 'thunderstorm' as const, rain: 80 },
    { dayName: 'Sat', min: temp - 4, max: temp + 2, cond: 'light-rain' as const, rain: 45 },
    { dayName: 'Sun', min: temp - 5, max: temp + 1, cond: 'clear' as const, rain: 5 },
    { dayName: 'Mon', min: temp - 4, max: temp + 2, cond: 'cloudy' as const, rain: 20 },
  ];

  const dailyForecast = days.map((d, i) => ({
    date: `2026-09-0${i + 1}`,
    dayName: d.dayName,
    minTemperature: d.min,
    maxTemperature: d.max,
    condition: d.cond,
    description: d.cond === 'thunderstorm' ? 'Thunderstorms expected' : 'Mild weather',
    rainProbability: d.rain,
    sunrise: '06:02 AM',
    sunset: '06:34 PM',
    humidity: humidity,
    uvIndex: isHeatScenario ? 11 : 8,
  }));

  // Health data
  let aqiCategory: WeatherData['airQuality']['category'] = 'Moderate';
  if (aqiVal <= 50) aqiCategory = 'Good';
  else if (aqiVal <= 100) aqiCategory = 'Moderate';
  else if (aqiVal <= 200) aqiCategory = 'Poor';
  else aqiCategory = 'Severe';

  // Marine data
  const safetyRating: WeatherData['marine']['safetyRating'] =
    isCyclone || windSpeed > 40 ? 'AVOID' : windSpeed > 25 ? 'CAUTION' : 'SAFE';

  return {
    location: {
      city: cityName,
      state: cityName === 'Chennai' ? 'Tamil Nadu' : 'State',
      country: cityName === 'Chennai' ? 'India' : 'Country',
      lat: 13.0827,
      lon: 80.2707,
    },
    current: {
      temperature: temp,
      feelsLike: feelsLike,
      condition: condition,
      description: desc,
      humidity: humidity,
      pressure: 1012,
      windSpeed: windSpeed,
      windDirection: 'ENE 12°',
      visibility: isPoorAQIScenario || isCyclone ? 2.5 : 9.5,
      uvIndex: isHeatScenario ? 11 : isRainScenario ? 3 : 9,
      precipitation: isRainScenario ? 24.5 : 0.2,
      sunrise: '06:02 AM',
      sunset: '06:34 PM',
      cloudCover: isRainScenario ? 92 : 45,
      dewPoint: temp - 4,
      highTemp: temp + 3,
      lowTemp: temp - 4,
    },
    hourly: hourlyForecast,
    daily: dailyForecast,

    // Health-Conscious
    airQuality: {
      aqi: aqiVal,
      pm25: Math.round(aqiVal * 0.45),
      pm10: Math.round(aqiVal * 0.85),
      category: aqiCategory,
      healthRecommendation:
        aqiVal > 150
          ? 'Sensitive individuals should avoid outdoor activities and use an N95 mask.'
          : aqiVal > 100
          ? 'Moderate air quality. Sensitive individuals should reduce prolonged outdoor activity.'
          : 'Air quality is satisfactory. Ideal time for outdoor fresh air.',
      pollen: {
        tree: 'Moderate',
        grass: 'Low',
        weed: 'High',
        allergyRisk: aqiVal > 150 ? 'High' : 'Moderate',
      },
      uvIndex: isHeatScenario ? 11 : 9,
      uvRecommendation:
        temp > 35 || isHeatScenario
          ? 'Apply SPF 50+ sunscreen, wear UV sunglasses, and avoid direct sun 11 AM – 3 PM.'
          : 'Apply SPF 30 sunscreen during midday.',
      humidity: humidity,
      skinComfort: humidity > 75 ? 'High humidity. Stay hydrated & use light moisturizer.' : 'Balanced skin comfort.',
      healthScore: Math.max(20, Math.min(98, 100 - Math.round(aqiVal / 3) - (humidity > 80 ? 10 : 0))),
    },

    // Fitness
    fitness: {
      bestRunningWindow: '6:00 AM – 8:00 AM',
      temperature: temp - 4,
      humidity: 60,
      windSpeed: 10,
      rainProbability: 5,
      workoutComfortScore: isHeatScenario ? 35 : isRainScenario ? 40 : 92,
      smartRecommendation:
        isHeatScenario
          ? 'High heat expected after 10 AM. Consider exercising earlier in the air-conditioned indoor area.'
          : isRainScenario
          ? 'Rain likely around afternoon. Schedule your outdoor run early morning.'
          : 'Perfect conditions for a morning run! High comfort score.',
      heatAlert: temp > 36,
      hourlyFitnessTimeline: [
        { hour: '6 AM', comfort: 95, temp: 26 },
        { hour: '7 AM', comfort: 90, temp: 27 },
        { hour: '8 AM', comfort: 82, temp: 29 },
        { hour: '9 AM', comfort: 70, temp: 31 },
        { hour: '10 AM', comfort: 55, temp: 33 },
      ],
    },

    // Beach & Surfer
    marine: {
      waveHeight: isCyclone ? 3.8 : isRainScenario ? 2.4 : 1.2,
      waveDirection: 'SSW 210°',
      windSpeed: windSpeed,
      windDirection: 'E 15 km/h',
      waterTemperature: 27,
      uvIndex: 9,
      tideTimes: {
        highTide: '07:30 AM (1.4m)',
        lowTide: '01:45 PM (0.3m)',
        nextHighTide: '08:15 PM (1.3m)',
      },
      safetyRating: safetyRating,
      bestBeachTime: '4:00 PM – 6:30 PM',
      beachRecommendation:
        safetyRating === 'AVOID'
          ? 'High swell and strong rip currents reported. Avoid swimming or surfing today.'
          : safetyRating === 'CAUTION'
          ? 'Moderate chop. Exercise caution if swimming or surfing near breakwaters.'
          : 'Great wave structure for surfing and sunbathing! Low tide at 1:45 PM.',
    },

    // Family & School Commute
    family: {
      morningWeather: {
        condition: isRainScenario ? 'light-rain' : 'partly-cloudy',
        temp: temp - 3,
        description: isRainScenario ? 'Light Rain Morning' : 'Pleasant breeze',
      },
      recommendation: isRainScenario
        ? 'Carry umbrellas & rain jackets for children during morning school drop.'
        : 'Pleasant morning! Safe for school commute.',
      schoolCommuteScore: isRainScenario ? 65 : 94,
      outdoorPlaySuitability: isRainScenario ? 'Low' : 'High',
      outdoorPlayNote: isRainScenario ? 'Outdoor play restricted due to rain.' : 'Possible light rain after 5 PM.',
      visibility: isRainScenario ? 5.0 : 9.8,
      rainAlert: isRainScenario,
      heatAlert: isHeatScenario,
      thunderstormAlert: isCyclone,
    },

    // Gardening & Agriculture
    agri: {
      soilMoisture: 42,
      rainfallForecast24h: isRainScenario ? 35 : 2,
      frostAlert: false,
      sunlightHours: isRainScenario ? 3.2 : 7.8,
      recommendation: isRainScenario
        ? 'Rain expected today. Delay manual garden watering.'
        : soilMoisture < 50
        ? 'Low soil moisture detected. Water garden plants in the early evening.'
        : 'Optimal soil moisture levels.',
      seasonalPlantingGuide: [
        { crop: 'Tomatoes', plantType: 'Vegetable', season: 'Autumn/Monsoon', advice: 'Ensure adequate drainage during rainfall.' },
        { crop: 'Marigold', plantType: 'Flower', season: 'All-season', advice: 'Requires 6+ hours of full sun daily.' },
        { crop: 'Spinach', plantType: 'Greens', season: 'Cool Season', advice: 'Keep soil consistently damp.' },
      ],
    },

    // Daily Commuter
    commuter: {
      visibility: isRainScenario ? 4.2 : 9.5,
      rainIntensity: isRainScenario ? 'Heavy' : 'Light',
      windSpeed: windSpeed,
      fogAlert: isPoorAQIScenario,
      stormAlert: isCyclone,
      roadCondition: isRainScenario ? 'Slippery' : 'Dry',
      commuteRiskScore: isRainScenario ? 'HIGH' : isHeatScenario ? 'MODERATE' : 'LOW',
      travelAdvice: isRainScenario
        ? 'Heavy rain expected between 8:00 AM and 9:30 AM. Expect delayed office traffic.'
        : 'Clear roads and normal traffic expected for morning peak hours.',
      weatherImpact: isRainScenario ? 'Major disruption' : 'No delay',
    },

    // Event Planner
    events: [
      {
        id: 'event-1',
        eventName: 'Outdoor Wedding Reception',
        location: cityName,
        date: '2026-12-12',
        startTime: '05:00 PM',
        endTime: '10:00 PM',
        hourlyForecast: hourlyForecast.slice(4, 9),
        rainProbability: isRainScenario ? 85 : 15,
        temperature: temp - 2,
        windSpeed: windSpeed,
        humidity: humidity,
        uvIndex: 4,
        sunsetTime: '06:15 PM',
        comfortIndex: isRainScenario ? 40 : 92,
        eventWeatherScore: isRainScenario ? 42 : 92,
        recommendation: isRainScenario
          ? 'High rain probability during 6 PM - 8 PM. Water disruption likely.'
          : 'Excellent weather conditions for an outdoor event!',
        planBRecommendation:
          'Set up waterproof marquees/tents and keep an indoor banquet area ready as backup.',
      },
    ],

    // Alerts Center
    alerts: [
      {
        id: 'alt-1',
        category: 'rain',
        type: 'Heavy Rain Warning',
        title: 'Monsoon Downpour Alert',
        description: 'Expect 25-40mm rainfall in coastal zones within the next 6 hours.',
        severity: isRainScenario ? 'HIGH' : 'MODERATE',
        startTime: '10:00 AM',
        endTime: '04:00 PM',
        affectedArea: `${cityName} Metropolitan Area`,
      },
      {
        id: 'alt-2',
        category: 'uv',
        type: 'High UV Radiation',
        title: 'Very High UV Warning',
        description: 'UV index reaching Level 9. High risk of skin sunburn.',
        severity: 'MODERATE',
        startTime: '11:30 AM',
        endTime: '03:00 PM',
        affectedArea: cityName,
      },
    ],

    // Destinations for Travel Planner
    destinations: [
      {
        city: 'Chennai',
        country: 'India',
        weatherCondition: 'partly-cloudy',
        temperature: 32,
        rainProbability: 20,
        packingSuggestions: ['🧢 Wear breathable cotton', '🕶 Sunglasses', '💧 Carry hydration bottle'],
      },
      {
        city: 'London',
        country: 'United Kingdom',
        weatherCondition: 'light-rain',
        temperature: 18,
        rainProbability: 75,
        severeAlert: 'Wind Advisory',
        packingSuggestions: ['☔ Carry a compact raincoat', '🧥 Pack a light jacket', '👟 Wear waterproof shoes'],
      },
      {
        city: 'Dubai',
        country: 'United Arab Emirates',
        weatherCondition: 'clear',
        temperature: 41,
        rainProbability: 0,
        packingSuggestions: ['🧴 SPF 50 Sunscreen', '🧢 Sun hat', '🕶 UV protection sunglasses'],
      },
      {
        city: 'New York',
        country: 'United States',
        weatherCondition: 'clear',
        temperature: 24,
        rainProbability: 10,
        packingSuggestions: ['👟 Walking shoes', '🧥 Layered sweater', '🕶 Sunglasses'],
      },
    ],

    // Gamification
    gamification: {
      streakDays: 7,
      streakActive: true,
      unlockedBadges: [
        { id: 'b1', name: 'Sun Seeker', icon: '☀️', unlocked: true, description: 'Checked forecast for 5 sunny days' },
        { id: 'b2', name: 'Rain Ready', icon: '🌧️', unlocked: true, description: 'Prepared for rain alerts 3 times' },
        { id: 'b3', name: 'Weather Athlete', icon: '🏃', unlocked: true, description: 'Tracked optimal fitness running windows' },
        { id: 'b4', name: 'Wave Explorer', icon: '🌊', unlocked: true, description: 'Checked ocean wave & tide conditions' },
        { id: 'b5', name: 'Green Thumb', icon: '🌱', unlocked: false, description: 'Utilized soil moisture & watering guides' },
      ],
      weeklySummary: {
        sunnyDays: 4,
        rainyDays: 2,
        cloudyDays: 1,
        totalDaysTracked: 7,
      },
    },

    updatedAt: new Date().toISOString(),
  };
}
