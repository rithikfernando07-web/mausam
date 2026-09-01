import { Request, Response } from 'express';
import User from '../models/User.js';

// In-memory fallback if MongoDB is not connected
const memoryUsers = new Map<string, any>();

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    let user;

    if (User.db && User.db.readyState === 1) {
      user = await User.create(userData);
    } else {
      const id = 'user_' + Date.now();
      user = { id, _id: id, ...userData, createdAt: new Date(), updatedAt: new Date() };
      memoryUsers.set(id, user);
    }

    return res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let user;

    if (User.db && User.db.readyState === 1) {
      user = await User.findById(id);
    } else {
      user = memoryUsers.get(id);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, data: user });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    let user;

    if (User.db && User.db.readyState === 1) {
      user = await User.findByIdAndUpdate(id, updates, { new: true });
    } else {
      const existing = memoryUsers.get(id) || {};
      user = { ...existing, ...updates, updatedAt: new Date() };
      memoryUsers.set(id, user);
    }

    return res.json({ success: true, data: user });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { interests, notifications, temperatureUnit, theme } = req.body;
    let user;

    if (User.db && User.db.readyState === 1) {
      user = await User.findByIdAndUpdate(
        id,
        { $set: { interests, notifications, temperatureUnit, theme } },
        { new: true }
      );
    } else {
      const existing = memoryUsers.get(id) || {};
      user = {
        ...existing,
        interests: interests ?? existing.interests,
        notifications: notifications ?? existing.notifications,
        temperatureUnit: temperatureUnit ?? existing.temperatureUnit,
        theme: theme ?? existing.theme,
        updatedAt: new Date(),
      };
      memoryUsers.set(id, user);
    }

    return res.json({ success: true, data: user });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = req.body;
    let user;

    if (User.db && User.db.readyState === 1) {
      user = await User.findByIdAndUpdate(
        id,
        { $addToSet: { favoriteLocations: location } },
        { new: true }
      );
    } else {
      const existing = memoryUsers.get(id) || { favoriteLocations: [] };
      const favorites = existing.favoriteLocations || [];
      if (!favorites.some((f: any) => f.city === location.city)) {
        favorites.push(location);
      }
      user = { ...existing, favoriteLocations: favorites, updatedAt: new Date() };
      memoryUsers.set(id, user);
    }

    return res.json({ success: true, data: user });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { id, locationId } = req.params;
    let user;

    if (User.db && User.db.readyState === 1) {
      user = await User.findByIdAndUpdate(
        id,
        { $pull: { favoriteLocations: { city: locationId } } },
        { new: true }
      );
    } else {
      const existing = memoryUsers.get(id) || { favoriteLocations: [] };
      const favorites = (existing.favoriteLocations || []).filter((f: any) => f.city !== locationId);
      user = { ...existing, favoriteLocations: favorites, updatedAt: new Date() };
      memoryUsers.set(id, user);
    }

    return res.json({ success: true, data: user });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
