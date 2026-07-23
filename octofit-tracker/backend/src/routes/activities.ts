import { Router } from 'express';
import { Activity } from '../models/Activity.js';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().sort({ activityDate: -1 });
    res.status(200).json({ activities });
  } catch (error) {
    next(error);
  }
});