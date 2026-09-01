export function answerAssistantQuery(query: string, weatherData: any, userProfile: any) {
  const q = query.toLowerCase();
  const city = weatherData?.location?.city || 'your city';
  const temp = weatherData?.current?.temperature || 28;
  const cond = weatherData?.current?.description || 'partly cloudy';
  const aqi = weatherData?.airQuality?.aqi || 60;
  const rainProb = weatherData?.hourly?.[0]?.rainProbability || 20;

  if (q.includes('rain') || q.includes('umbrella')) {
    return {
      text: rainProb > 50
        ? `Yes, there is a ${rainProb}% chance of rain in ${city} today. I recommend carrying an umbrella! ☂️`
        : `Rain is unlikely in ${city} today (${rainProb}% probability). You probably won't need an umbrella! ☀️`,
      suggestions: ['What is the temperature?', 'Is today good for running?'],
    };
  }

  if (q.includes('run') || q.includes('exercise') || q.includes('workout') || q.includes('outdoor')) {
    return {
      text: aqi < 100 && temp < 35
        ? `Great conditions for outdoor exercise in ${city}! Temperature is ${temp}°C and AQI is ${aqi}. 🏃‍♂️`
        : `AQI is currently ${aqi} and temperature is ${temp}°C. Consider an indoor workout today. 🏠`,
      suggestions: ['Will it rain today?', 'What is the UV index?'],
    };
  }

  if (q.includes('travel') || q.includes('safe')) {
    return {
      text: `Travel conditions in ${city} are currently favorable. Current weather is ${cond} with visibility of ${weatherData?.current?.visibility || 10} km. 🚗`,
      suggestions: ['Is there any weather warning?', 'What is the forecast for tomorrow?'],
    };
  }

  return {
    text: `Currently in ${city}: ${temp}°C, ${cond}. AQI is ${aqi}. How else can I help with your weather plans? 🌤️`,
    suggestions: ['Will it rain today?', 'Is today good for running?', 'What is the weather tomorrow?'],
  };
}
