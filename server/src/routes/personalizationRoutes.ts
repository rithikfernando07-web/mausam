import { Router } from 'express';
import { recommendCards } from '../controllers/personalizationController.js';

const router = Router();

router.post('/recommend', recommendCards);

export default router;
