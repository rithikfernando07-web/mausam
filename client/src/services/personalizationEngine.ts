import type { UserProfile, WeatherData, PersonalizationResult, PersonalizationCard, CardType, PersonaType } from '../types';

export function computePersonalization(user: UserProfile, weather: WeatherData): PersonalizationResult {
  const personas = user.selectedPersonas && user.selectedPersonas.length > 0
    ? user.selectedPersonas
    : (user.interests as PersonaType[]).filter(i => i !== ('general' as any));

  const cards: PersonalizationCard[] = [];
  const insights: string[] = [];

  // Core base widgets present for everyone
  cards.push({
    id: 'c-current-weather',
    type: 'current-weather',
    title: 'Current Weather',
    score: 100,
    reason: 'Essential weather overview',
    priority: 1,
  });

  // Insights Card
  cards.push({
    id: 'c-insight',
    type: 'insight',
    title: 'Mausam Insights',
    score: 95,
    reason: 'Personalized recommendations',
    priority: 2,
  });

  // Gamification Streak Widget
  cards.push({
    id: 'c-gamification',
    type: 'gamification-streak',
    title: 'Weather Streak & Achievements',
    score: 50,
    reason: 'Active engagement tracking',
    priority: 10,
  });

  // Evaluate each selected persona to add and score relevant widgets
  personas.forEach(persona => {
    if (persona === 'health') {
      cards.push({
        id: 'c-health-dashboard',
        type: 'health-dashboard',
        title: 'Health & Air Quality Dashboard',
        score: 90,
        reason: 'Prioritized for Health & Wellness persona',
        priority: 3,
      });
      insights.push(
        `Air quality index is ${weather.airQuality.aqi} (${weather.airQuality.category}). ${weather.airQuality.healthRecommendation}`
      );
      if (weather.airQuality.uvIndex >= 8) {
        insights.push(`High UV Index (${weather.airQuality.uvIndex}). ${weather.airQuality.uvRecommendation}`);
      }
    }

    if (persona === 'fitness') {
      cards.push({
        id: 'c-fitness-dashboard',
        type: 'fitness-dashboard',
        title: 'Outdoor Fitness & Running',
        score: 89,
        reason: 'Prioritized for Outdoor Fitness Enthusiast persona',
        priority: 3,
      });
      insights.push(
        `Best running window today: ${weather.fitness.bestRunningWindow}. ${weather.fitness.smartRecommendation}`
      );
    }

    if (persona === 'beach') {
      cards.push({
        id: 'c-beach-surfer',
        type: 'beach-surfer',
        title: 'Beach & Surfing Conditions',
        score: 88,
        reason: 'Prioritized for Beachgoer & Surfer persona',
        priority: 3,
      });
      insights.push(
        `Beach Safety Rating: ${weather.marine.safetyRating}. Wave height ${weather.marine.waveHeight}m, Water temp ${weather.marine.waterTemperature}°C.`
      );
    }

    if (persona === 'travel') {
      cards.push({
        id: 'c-trip-planner',
        type: 'trip-planner',
        title: 'Trip & Travel Weather Planner',
        score: 87,
        reason: 'Prioritized for Traveler persona',
        priority: 4,
      });
      insights.push(`Traveling to London? Rain expected. Carry raincoat and light jacket.`);
    }

    if (persona === 'family') {
      cards.push({
        id: 'c-family-commute',
        type: 'family-commute',
        title: 'School Commute & Family Outings',
        score: 86,
        reason: 'Prioritized for Parent & Family persona',
        priority: 4,
      });
      insights.push(`School Commute: ${weather.family.recommendation} Outdoor play suitability: ${weather.family.outdoorPlaySuitability}.`);
    }

    if (persona === 'farmer') {
      cards.push({
        id: 'c-gardening-agri',
        type: 'gardening-agri',
        title: 'Agriculture & Gardening Guide',
        score: 85,
        reason: 'Prioritized for Farmer & Gardener persona',
        priority: 4,
      });
      insights.push(`Gardening Tip: ${weather.agri.recommendation} Soil moisture is at ${weather.agri.soilMoisture}%.`);
    }

    if (persona === 'commuter') {
      cards.push({
        id: 'c-commuter-risk',
        type: 'commuter-risk',
        title: 'Daily Commute & Travel Risk',
        score: 88,
        reason: 'Prioritized for Daily Commuter persona',
        priority: 3,
      });
      insights.push(`Commute Risk: ${weather.commuter.commuteRiskScore}. ${weather.commuter.travelAdvice}`);
    }

    if (persona === 'event') {
      cards.push({
        id: 'c-event-planner',
        type: 'event-planner',
        title: 'Event Weather Planner',
        score: 84,
        reason: 'Prioritized for Event Planner persona',
        priority: 4,
      });
      if (weather.events.length > 0) {
        insights.push(`Event Suitability: ${weather.events[0].eventWeatherScore}/100. ${weather.events[0].recommendation}`);
      }
    }
  });

  // Base forecast timelines present for all
  cards.push({
    id: 'c-hourly-forecast',
    type: 'hourly-forecast',
    title: 'Hourly Forecast',
    score: 80,
    reason: 'Timeline analysis',
    priority: 6,
  });

  cards.push({
    id: 'c-daily-forecast',
    type: 'daily-forecast',
    title: '7-Day Extended Forecast',
    score: 75,
    reason: 'Multi-day outlook',
    priority: 7,
  });

  // Remove duplicate card types if any
  const uniqueCardsMap = new Map<CardType, PersonalizationCard>();
  cards.forEach(card => {
    if (!uniqueCardsMap.has(card.type) || card.score > uniqueCardsMap.get(card.type)!.score) {
      uniqueCardsMap.set(card.type, card);
    }
  });

  // Handle User Custom Pinning / Hiding / Ordering
  let sortedCards = Array.from(uniqueCardsMap.values());

  if (user.hiddenWidgets && user.hiddenWidgets.length > 0) {
    sortedCards = sortedCards.filter(c => !user.hiddenWidgets!.includes(c.id) && !user.hiddenWidgets!.includes(c.type));
  }

  if (user.customWidgetOrder && user.customWidgetOrder.length > 0) {
    sortedCards.sort((a, b) => {
      const idxA = user.customWidgetOrder!.indexOf(a.id);
      const idxB = user.customWidgetOrder!.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return b.score - a.score;
    });
  } else {
    // Default priority sort
    sortedCards.sort((a, b) => b.score - a.score);
  }

  // Deduplicate insights
  const uniqueInsights = Array.from(new Set(insights));
  if (uniqueInsights.length === 0) {
    uniqueInsights.push(`Good morning, ${user.name}! Clear weather expected today. Enjoy your day.`);
  }

  const morningBriefing = `Good Morning ${user.name}! Current temperature in ${weather.location.city} is ${weather.current.temperature}°C (${weather.current.description}). ${uniqueInsights[0] || ''}`;

  return {
    cards: sortedCards,
    insights: uniqueInsights,
    morningBriefing,
  };
}
