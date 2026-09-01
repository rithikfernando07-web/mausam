import { Router } from 'express';
import { handleQuery } from '../controllers/assistantController.js';

const router = Router();

router.post('/query', handleQuery);

export default router;
