import { Request, Response } from 'express';
import { answerAssistantQuery } from '../services/assistantService.js';
import { weatherService } from '../services/weatherService.js';

export const handleQuery = async (req: Request, res: Response) => {
  try {
    const { query, city, scenario, userProfile } = req.body;
    const targetCity = city || userProfile?.location?.city || 'Chennai';
    const weatherData = await weatherService.getWeatherData(targetCity, scenario || 'normal');

    const response = answerAssistantQuery(query || '', weatherData, userProfile);
    return res.json({ success: true, data: response });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
