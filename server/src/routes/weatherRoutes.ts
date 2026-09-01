import { Router } from 'express';
import {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
  getWeatherAlerts,
  getAirQuality,
  getWeatherByCity,
} from '../controllers/weatherController.js';

const router = Router();

router.get('/current', getCurrentWeather);
router.get('/hourly', getHourlyForecast);
router.get('/daily', getDailyForecast);
router.get('/alerts', getWeatherAlerts);
router.get('/air-quality', getAirQuality);
router.get('/location/:city', getWeatherByCity);

export default router;
