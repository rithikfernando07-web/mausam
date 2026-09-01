import { Request, Response } from 'express';
import { weatherService } from '../services/weatherService.js';

export const getCurrentWeather = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string) || 'Chennai';
    const scenario = (req.query.scenario as string) || 'normal';
    const weather = await weatherService.getWeatherData(city, scenario);
    return res.json({ success: true, data: weather.current });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHourlyForecast = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string) || 'Chennai';
    const scenario = (req.query.scenario as string) || 'normal';
    const weather = await weatherService.getWeatherData(city, scenario);
    return res.json({ success: true, data: weather.hourly });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDailyForecast = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string) || 'Chennai';
    const scenario = (req.query.scenario as string) || 'normal';
    const weather = await weatherService.getWeatherData(city, scenario);
    return res.json({ success: true, data: weather.daily });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWeatherAlerts = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string) || 'Chennai';
    const scenario = (req.query.scenario as string) || 'normal';
    const weather = await weatherService.getWeatherData(city, scenario);
    return res.json({ success: true, data: weather.alerts });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAirQuality = async (req: Request, res: Response) => {
  try {
    const city = (req.query.city as string) || 'Chennai';
    const scenario = (req.query.scenario as string) || 'normal';
    const weather = await weatherService.getWeatherData(city, scenario);
    return res.json({ success: true, data: weather.airQuality });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWeatherByCity = async (req: Request, res: Response) => {
  try {
    const city = req.params.city || 'Chennai';
    const scenario = (req.query.scenario as string) || 'normal';
    const weather = await weatherService.getWeatherData(city, scenario);
    return res.json({ success: true, data: weather });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
