import { Router } from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  updatePreferences,
  addFavorite,
  removeFavorite,
} from '../controllers/userController.js';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.put('/:id/preferences', updatePreferences);
router.post('/:id/favorites', addFavorite);
router.delete('/:id/favorites/:locationId', removeFavorite);

export default router;
