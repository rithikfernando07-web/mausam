import { Request, Response } from 'express';
import { computeServerPersonalization } from '../services/personalizationEngine.js';
import { weatherService } from '../services/weatherService.js';

export const recommendCards = async (req: Request, res: Response) => {
  try {
    const { userProfile, city, scenario } = req.body;
    const targetCity = city || userProfile?.location?.city || 'Chennai';
    const weatherData = await weatherService.getWeatherData(targetCity, scenario || 'normal');
    
    const result = computeServerPersonalization(userProfile || { name: 'User', interests: ['general'] }, weatherData);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
