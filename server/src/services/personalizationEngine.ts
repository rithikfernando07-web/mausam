export function computeServerPersonalization(user: any, weatherData: any) {
  const interests: string[] = user.interests && user.interests.length > 0 ? user.interests : ['general'];
  
  const cards = [
    { type: 'morning-briefing', score: 95, reason: 'Start your day prepared', priority: 1 },
    { type: 'current-weather', score: 90, reason: 'Current conditions at a glance', priority: 2 },
    { type: 'insight', score: 88, reason: 'Personalized for your day', priority: 3 },
  ];

  if (interests.includes('fitness') || interests.includes('health')) {
    cards.push(
      { type: 'aqi', score: 85, reason: 'Because you care about your health & fitness', priority: 4 },
      { type: 'uv-index', score: 82, reason: 'Important for your outdoor activities', priority: 5 },
      { type: 'activity-recommendation', score: 80, reason: 'Personalized for your active lifestyle', priority: 6 }
    );
  }

  if (interests.includes('travel')) {
    cards.push(
      { type: 'travel-conditions', score: 86, reason: 'Relevant to your travel interests', priority: 4 },
      { type: 'rain-forecast', score: 84, reason: 'Because rain affects your travel plans', priority: 5 }
    );
  }

  if (interests.includes('commuting')) {
    cards.push(
      { type: 'commute-alert', score: 87, reason: 'Tailored for your daily commute', priority: 4 },
      { type: 'visibility', score: 78, reason: 'Important for safe driving', priority: 5 }
    );
  }

  if (interests.includes('agriculture')) {
    cards.push(
      { type: 'agriculture-advisory', score: 89, reason: 'Customized for farming & agriculture', priority: 4 },
      { type: 'rain-forecast', score: 85, reason: 'Rainfall planning for crops', priority: 5 }
    );
  }

  if (interests.includes('photography')) {
    cards.push(
      { type: 'photography-window', score: 83, reason: 'Best windows for photography today', priority: 4 }
    );
  }

  // Always include standard cards
  cards.push(
    { type: 'hourly-forecast', score: 75, reason: 'Plan your day hour by hour', priority: 7 },
    { type: 'daily-forecast', score: 70, reason: 'Your week ahead', priority: 8 },
    { type: 'wind', score: 65, reason: 'Wind & atmospheric pressure', priority: 9 }
  );

  // De-duplicate cards by type
  const uniqueCardsMap = new Map<string, any>();
  cards.forEach(c => {
    if (!uniqueCardsMap.has(c.type) || uniqueCardsMap.get(c.type).score < c.score) {
      uniqueCardsMap.set(c.type, c);
    }
  });

  const sortedCards = Array.from(uniqueCardsMap.values())
    .sort((a, b) => b.score - a.score)
    .map((c, i) => ({ ...c, priority: i + 1 }));

  return {
    cards: sortedCards,
    insight: `Personalized insight for ${user.name || 'User'} in ${weatherData.location.city}: ${weatherData.current.description}. Temperature is ${weatherData.current.temperature}°C.`,
    morningBriefing: `Good day, ${user.name || 'User'}! Weather in ${weatherData.location.city} is currently ${weatherData.current.description}.`,
    activityRecommendation: `Conditions in ${weatherData.location.city} are suitable for your preferences. AQI is ${weatherData.airQuality.aqi} (${weatherData.airQuality.category}).`,
  };
}
