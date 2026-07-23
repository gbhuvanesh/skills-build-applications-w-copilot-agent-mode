import { Router } from 'express';
import { Workout } from '../models/Workout.js';
export const workoutsRouter = Router();
workoutsRouter.get('/', async (_req, res, next) => {
    try {
        const workouts = await Workout.find().sort({ level: 1, title: 1 });
        res.status(200).json({ workouts });
    }
    catch (error) {
        next(error);
    }
});
